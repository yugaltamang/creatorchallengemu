import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ExternalLink, Search, Download, Star, Copy, Trophy } from "lucide-react";
import { toast } from "sonner";

const SUBMISSION_COLS = "id,full_name,email,university,instagram_handle,brand_choice,notes,whatsapp_number,shortlisted,created_at";
const FINAL_COLS = "id,full_name,email,university,instagram_handle,brand_choice,reel_1,reel_2,reel_3,whatsapp_number,is_winner,created_at";

export const Route = createFileRoute("/admin")({
  component: Admin,
  head: () => ({ meta: [{ title: "Admin · Creator Challenge" }] }),
});

type Submission = {
  id: string;
  full_name: string;
  email: string;
  university: string;
  instagram_handle: string;
  brand_choice: string;
  notes: string | null;
  whatsapp_number: string | null;
  shortlisted: boolean;
  created_at: string;
};

type FinalSubmission = {
  id: string;
  full_name: string;
  email: string;
  university: string;
  instagram_handle: string;
  brand_choice: string;
  reel_1: string;
  reel_2: string | null;
  reel_3: string | null;
  whatsapp_number: string | null;
  is_winner: boolean;
  created_at: string;
};

function Admin() {
  const queryClient = useQueryClient();
  const [q, setQ] = useState("");
  const [uni, setUni] = useState<string>("All");
  const [brand, setBrand] = useState<string>("All");
  const [view, setView] = useState<"first" | "final">("first");
  const [page, setPage] = useState(1);
  const PAGE_SIZE = 10;

  const submissionsQuery = useQuery({
    queryKey: ["admin", "submissions"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("submissions")
        .select(SUBMISSION_COLS)
        .order("created_at", { ascending: false });
      if (error) throw error;
      return (data ?? []) as Submission[];
    },
    staleTime: 30_000,
  });

  const finalsQuery = useQuery({
    queryKey: ["admin", "final_submissions"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("final_submissions")
        .select(FINAL_COLS)
        .order("created_at", { ascending: false });
      if (error) throw error;
      return (data ?? []) as FinalSubmission[];
    },
    staleTime: 30_000,
  });

  const rows = submissionsQuery.data ?? [];
  const finals = finalsQuery.data ?? [];
  const loading = submissionsQuery.isLoading || finalsQuery.isLoading;

  async function toggleShortlist(r: Submission) {
    const next = !r.shortlisted;
    queryClient.setQueryData<Submission[]>(["admin", "submissions"], (prev) =>
      (prev ?? []).map((x) => (x.id === r.id ? { ...x, shortlisted: next } : x))
    );
    const { error } = await supabase
      .from("submissions")
      .update({ shortlisted: next })
      .eq("id", r.id);
    if (error) {
      queryClient.setQueryData<Submission[]>(["admin", "submissions"], (prev) =>
        (prev ?? []).map((x) => (x.id === r.id ? { ...x, shortlisted: !next } : x))
      );
      toast.error("Could not update shortlist.");
    } else {
      toast.success(next ? `Shortlisted ${r.full_name}` : `Removed ${r.full_name} from shortlist`);
    }
  }

  async function toggleWinner(r: FinalSubmission) {
    const next = !r.is_winner;
    queryClient.setQueryData<FinalSubmission[]>(["admin", "final_submissions"], (prev) =>
      (prev ?? []).map((x) => (x.id === r.id ? { ...x, is_winner: next } : x))
    );
    const { error } = await supabase
      .from("final_submissions")
      .update({ is_winner: next })
      .eq("id", r.id);
    if (error) {
      queryClient.setQueryData<FinalSubmission[]>(["admin", "final_submissions"], (prev) =>
        (prev ?? []).map((x) => (x.id === r.id ? { ...x, is_winner: !next } : x))
      );
      toast.error("Could not update winners.");
    } else {
      toast.success(next ? `Marked ${r.full_name} as winner` : `Removed ${r.full_name} from winners`);
    }
  }

  const filtered = useMemo(() => {
    return rows.filter((r) => {
      if (uni !== "All" && r.university !== uni) return false;
      if (brand !== "All" && r.brand_choice !== brand) return false;
      if (q) {
        const s = q.toLowerCase();
        if (
          !r.full_name.toLowerCase().includes(s) &&
          !r.email.toLowerCase().includes(s) &&
          !r.instagram_handle.toLowerCase().includes(s)
        )
          return false;
      }
      return true;
    });
  }, [rows, q, uni, brand]);

  const filteredFinals = useMemo(() => {
    return finals.filter((r) => {
      if (uni !== "All" && r.university !== uni) return false;
      if (brand !== "All" && r.brand_choice !== brand) return false;
      if (q) {
        const s = q.toLowerCase();
        if (
          !r.full_name.toLowerCase().includes(s) &&
          !r.email.toLowerCase().includes(s) &&
          !r.instagram_handle.toLowerCase().includes(s)
        )
          return false;
      }
      return true;
    });
  }, [finals, q, uni, brand]);

  useEffect(() => { setPage(1); }, [q, uni, brand, view]);
  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const currentPage = Math.min(page, totalPages);
  const paginated = useMemo(
    () => filtered.slice((currentPage - 1) * PAGE_SIZE, currentPage * PAGE_SIZE),
    [filtered, currentPage]
  );

  const shortlisted = useMemo(() => rows.filter((r) => r.shortlisted), [rows]);
  const winners = useMemo(() => finals.filter((r) => r.is_winner), [finals]);

  const stats = useMemo(() => {
    const byUni: Record<string, number> = {};
    const byBrand: Record<string, number> = {};
    for (const r of rows) {
      byUni[r.university] = (byUni[r.university] || 0) + 1;
      byBrand[r.brand_choice] = (byBrand[r.brand_choice] || 0) + 1;
    }
    return { byUni, byBrand };
  }, [rows]);

  const finalStats = useMemo(() => {
    const byUni: Record<string, number> = {};
    const byBrand: Record<string, number> = {};
    let reelCount = 0;
    for (const r of finals) {
      byUni[r.university] = (byUni[r.university] || 0) + 1;
      byBrand[r.brand_choice] = (byBrand[r.brand_choice] || 0) + 1;
      reelCount += [r.reel_1, r.reel_2, r.reel_3].filter(Boolean).length;
    }
    return { byUni, byBrand, reelCount };
  }, [finals]);

  function exportCSV() {
    if (view === "final") {
      const head = ["Name", "Email", "University", "Brand", "Instagram", "Reel 1", "Reel 2", "Reel 3", "Submitted"];
      const lines = [head.join(",")];
      for (const r of filteredFinals) {
        lines.push(
          [r.full_name, r.email, r.university, r.brand_choice, r.instagram_handle, r.reel_1, r.reel_2 ?? "", r.reel_3 ?? "", r.created_at]
            .map((v) => `"${String(v).replace(/"/g, '""')}"`)
            .join(",")
        );
      }
      downloadCSV(lines.join("\n"), `final-submissions-${new Date().toISOString().slice(0, 10)}.csv`);
      return;
    }
    const head = ["Name", "Email", "University", "Brand", "Instagram", "Reel", "Submitted"];
    const lines = [head.join(",")];
    for (const r of filtered) {
      lines.push(
        [r.full_name, r.email, r.university, r.brand_choice, r.instagram_handle, r.notes ?? "", r.created_at]
          .map((v) => `"${String(v).replace(/"/g, '""')}"`)
          .join(",")
      );
    }
    downloadCSV(lines.join("\n"), `submissions-${new Date().toISOString().slice(0, 10)}.csv`);
  }

  const universities = ["All", "Masters' Union", "LPU", "Tetr"];
  const brands = ["All", "NOIR Audio", "PULSE Energy"];

  return (
    <div
      className="min-h-screen bg-background text-foreground"
      style={{
        ['--background' as any]: 'hsl(0 0% 100%)',
        ['--foreground' as any]: 'hsl(0 0% 9%)',
        ['--card' as any]: 'hsl(0 0% 100%)',
        ['--card-foreground' as any]: 'hsl(0 0% 9%)',
        ['--popover' as any]: 'hsl(0 0% 100%)',
        ['--popover-foreground' as any]: 'hsl(0 0% 9%)',
        ['--secondary' as any]: 'hsl(0 0% 96%)',
        ['--secondary-foreground' as any]: 'hsl(0 0% 9%)',
        ['--muted' as any]: 'hsl(0 0% 96%)',
        ['--muted-foreground' as any]: 'hsl(0 0% 40%)',
        ['--border' as any]: 'hsl(0 0% 88%)',
        ['--input' as any]: 'hsl(0 0% 88%)',
      }}
    >
      <div className="flex min-h-screen">
        <aside className="hidden md:flex w-60 shrink-0 flex-col border-r border-border bg-muted/20">
          <div className="border-b border-border px-5 py-5">
            <p className="text-xs uppercase tracking-widest text-muted-foreground">Admin</p>
            <p className="font-display text-lg leading-tight">Creator Challenge</p>
          </div>
          <nav className="flex-1 space-y-1 p-3">
            <button
              onClick={() => setView("first")}
              className={`block w-full rounded-md px-3 py-2 text-left text-sm transition ${view === "first" ? "bg-primary text-primary-foreground" : "hover:bg-muted"}`}
            >
              First Stage
            </button>
            <button
              onClick={() => setView("final")}
              className={`block w-full rounded-md px-3 py-2 text-left text-sm transition ${view === "final" ? "bg-primary text-primary-foreground" : "hover:bg-muted"}`}
            >
              Final Stage
            </button>
          </nav>
          <div className="border-t border-border p-3">
            <Link to="/" className="block rounded-md px-3 py-2 text-sm text-muted-foreground hover:bg-muted">
              ← Back to site
            </Link>
          </div>
        </aside>

        <div className="flex-1 min-w-0">
          <header className="border-b border-border">
            <div className="flex items-center justify-between gap-4 px-6 py-5">
              <div className="flex items-center gap-3">
                <div className="md:hidden flex gap-1 rounded-full border border-border p-1">
                  <button
                    onClick={() => setView("first")}
                    className={`rounded-full px-3 py-1 text-xs ${view === "first" ? "bg-primary text-primary-foreground" : ""}`}
                  >First</button>
                  <button
                    onClick={() => setView("final")}
                    className={`rounded-full px-3 py-1 text-xs ${view === "final" ? "bg-primary text-primary-foreground" : ""}`}
                  >Final</button>
                </div>
                <div>
                  <p className="text-xs uppercase tracking-widest text-muted-foreground">
                    {view === "first" ? "First Stage" : "Final Stage"}
                  </p>
                  <h1 className="font-display text-2xl">
                    {view === "first" ? "Entries" : "Final Submissions"}
                  </h1>
                </div>
              </div>
              <Button variant="outline" onClick={exportCSV} className="gap-2 rounded-full">
                <Download className="h-4 w-4" /> Export CSV
              </Button>
            </div>
          </header>

          <div className="mx-auto max-w-7xl space-y-8 px-6 py-10">
            {view === "first" ? (
              <>
                <section className="grid gap-4 md:grid-cols-4">
                  <StatCard label="Total entries" value={rows.length} accent />
                  <StatCard label="Masters' Union" value={stats.byUni["Masters' Union"] || 0} />
                  <StatCard label="LPU" value={stats.byUni["LPU"] || 0} />
                  <StatCard label="Tetr" value={stats.byUni["Tetr"] || 0} />
                </section>

                <section className="grid gap-4 md:grid-cols-2">
                  <BrandCard label="NOIR Audio" value={stats.byBrand["NOIR Audio"] || 0} total={rows.length} />
                  <BrandCard label="PULSE Energy" value={stats.byBrand["PULSE Energy"] || 0} total={rows.length} />
                </section>

                <section className="border border-border bg-card">
                  <div className="flex items-center justify-between border-b border-border p-4">
                    <div className="flex items-center gap-2">
                      <Star className="h-4 w-4 fill-primary text-primary" />
                      <h2 className="font-display text-lg">Shortlisted Entries</h2>
                    </div>
                    <span className="text-sm text-muted-foreground">{shortlisted.length} selected</span>
                  </div>
                  {shortlisted.length === 0 ? (
                    <div className="p-8 text-center text-sm text-muted-foreground">
                      No entries shortlisted yet. Tap the star next to any entry below to add it here.
                    </div>
                  ) : (
                    <ul className="divide-y divide-border">
                      {shortlisted.map((r) => (
                        <li key={r.id} className="flex flex-wrap items-center gap-4 px-4 py-3 hover:bg-muted/20">
                          <button
                            onClick={() => toggleShortlist(r)}
                            aria-label="Remove from shortlist"
                            className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-primary text-primary"
                          >
                            <Star className="h-4 w-4 fill-primary" />
                          </button>
                          <div className="min-w-[160px] flex-1">
                            <div className="font-medium">{r.full_name}</div>
                            <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                              <span className="truncate">{r.email}</span>
                              <button
                                type="button"
                                onClick={async () => {
                                  try {
                                    await navigator.clipboard.writeText(r.email);
                                    toast.success("Email copied");
                                  } catch {
                                    toast.error("Could not copy");
                                  }
                                }}
                                aria-label="Copy email"
                                title="Copy email"
                                className="inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-md border border-border text-muted-foreground transition hover:border-primary hover:text-primary"
                              >
                                <Copy className="h-3 w-3" />
                              </button>
                            </div>
                          </div>
                          <span className="text-sm text-muted-foreground">{r.university}</span>
                          <span className="border border-primary/40 px-2 py-1 text-xs text-primary">{r.brand_choice}</span>
                          <a
                            href={`https://instagram.com/${r.instagram_handle}`}
                            target="_blank"
                            rel="noreferrer"
                            className="inline-flex items-center gap-1 text-sm text-primary hover:underline"
                          >
                            @{r.instagram_handle}
                            <ExternalLink className="h-3 w-3" />
                          </a>
                          {r.notes && (
                            <a
                              href={r.notes}
                              target="_blank"
                              rel="noreferrer"
                              className="inline-flex items-center gap-1 text-sm text-primary hover:underline"
                            >
                              View reel <ExternalLink className="h-3 w-3" />
                            </a>
                          )}
                        </li>
                      ))}
                    </ul>
                  )}
                </section>

                <section className="border border-border bg-card">
                  <div className="flex flex-wrap items-center gap-3 border-b border-border p-4">
                    <div className="relative flex-1 min-w-[220px]">
                      <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                      <Input
                        value={q}
                        onChange={(e) => setQ(e.target.value)}
                        placeholder="Search by name, email, or handle"
                        className="pl-9"
                      />
                    </div>
                    <Select value={uni} onChange={setUni} options={universities} label="University" />
                    <Select value={brand} onChange={setBrand} options={brands} label="Brand" />
                    <span className="text-sm text-muted-foreground">{filtered.length} of {rows.length}</span>
                  </div>

                  {loading ? (
                    <div className="p-12 text-center text-muted-foreground">Loading entries…</div>
                  ) : filtered.length === 0 ? (
                    <div className="p-12 text-center text-muted-foreground">
                      {rows.length === 0 ? "No entries yet." : "No entries match these filters."}
                    </div>
                  ) : (
                    <div className="overflow-x-auto">
                      <table className="w-full text-sm">
                        <thead className="bg-muted/40 text-left text-xs uppercase tracking-wider text-muted-foreground">
                          <tr>
                            <th className="px-4 py-3 w-10"></th>
                            <th className="px-4 py-3">Creator</th>
                            <th className="px-4 py-3">University</th>
                            <th className="px-4 py-3">Brand</th>
                            <th className="px-4 py-3">Instagram</th>
                            <th className="px-4 py-3">Reel</th>
                            <th className="px-4 py-3">Submitted</th>
                          </tr>
                        </thead>
                        <tbody>
                          {paginated.map((r) => (
                            <tr key={r.id} className="border-t border-border hover:bg-muted/20">
                              <td className="px-4 py-3">
                                <button
                                  onClick={() => toggleShortlist(r)}
                                  aria-label={r.shortlisted ? "Remove from shortlist" : "Add to shortlist"}
                                  className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-border transition hover:border-primary hover:text-primary"
                                >
                                  <Star className={`h-4 w-4 ${r.shortlisted ? "fill-primary text-primary" : ""}`} />
                                </button>
                              </td>
                              <td className="px-4 py-3">
                                <div className="font-medium">{r.full_name}</div>
                                <div className="text-xs text-muted-foreground">{r.email}</div>
                              </td>
                              <td className="px-4 py-3">{r.university}</td>
                              <td className="px-4 py-3">
                                <span className="border border-primary/40 px-2 py-1 text-xs text-primary">{r.brand_choice}</span>
                              </td>
                              <td className="px-4 py-3">
                                <a
                                  href={`https://instagram.com/${r.instagram_handle}`}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="inline-flex items-center gap-1 text-primary hover:underline"
                                >
                                  @{r.instagram_handle}
                                  <ExternalLink className="h-3 w-3" />
                                </a>
                              </td>
                              <td className="px-4 py-3 max-w-xs truncate">
                                {r.notes ? (
                                  <a href={r.notes} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1 text-primary hover:underline">
                                    View reel <ExternalLink className="h-3 w-3" />
                                  </a>
                                ) : (
                                  <span className="text-muted-foreground">—</span>
                                )}
                              </td>
                              <td className="px-4 py-3 text-muted-foreground">
                                {new Date(r.created_at).toLocaleDateString()}{" "}
                                <span className="text-xs">{new Date(r.created_at).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}</span>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  )}
                  {filtered.length > PAGE_SIZE && (
                    <div className="flex items-center justify-between gap-3 border-t border-border p-3 text-sm">
                      <span className="text-muted-foreground">
                        Showing {(currentPage - 1) * PAGE_SIZE + 1}–{Math.min(currentPage * PAGE_SIZE, filtered.length)} of {filtered.length}
                      </span>
                      <div className="flex items-center gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => setPage((p) => Math.max(1, p - 1))}
                          disabled={currentPage <= 1}
                        >
                          Previous
                        </Button>
                        <span className="text-muted-foreground">Page {currentPage} of {totalPages}</span>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                          disabled={currentPage >= totalPages}
                        >
                          Next
                        </Button>
                      </div>
                    </div>
                  )}
                </section>
              </>
            ) : (
              <>
                <section className="grid gap-4 md:grid-cols-4">
                  <StatCard label="Final entries" value={finals.length} accent />
                  <StatCard label="Masters' Union" value={finalStats.byUni["Masters' Union"] || 0} />
                  <StatCard label="LPU" value={finalStats.byUni["LPU"] || 0} />
                  <StatCard label="Tetr" value={finalStats.byUni["Tetr"] || 0} />
                </section>

                <section className="grid gap-4 md:grid-cols-2">
                  <BrandCard label="NOIR Audio" value={finalStats.byBrand["NOIR Audio"] || 0} total={finals.length} />
                  <BrandCard label="PULSE Energy" value={finalStats.byBrand["PULSE Energy"] || 0} total={finals.length} />
                </section>

                <section className="border border-border bg-card p-6">
                  <p className="text-xs uppercase tracking-wider text-muted-foreground">Total reels submitted</p>
                  <p className="mt-2 font-display text-4xl text-primary">{finalStats.reelCount}</p>
                </section>

                <section className="border border-border bg-card">
                  <div className="flex items-center justify-between border-b border-border p-4">
                    <div className="flex items-center gap-2">
                      <Trophy className="h-4 w-4 text-primary" />
                      <h2 className="font-display text-lg">Winners</h2>
                    </div>
                    <span className="text-sm text-muted-foreground">{winners.length} selected</span>
                  </div>
                  {winners.length === 0 ? (
                    <div className="p-8 text-center text-sm text-muted-foreground">
                      No winners yet. Tap the trophy next to any final entry below to crown them.
                    </div>
                  ) : (
                    <ul className="divide-y divide-border">
                      {winners.map((r) => (
                        <li key={r.id} className="flex flex-wrap items-center gap-4 px-4 py-3 hover:bg-muted/20">
                          <button
                            onClick={() => toggleWinner(r)}
                            aria-label="Remove from winners"
                            className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-primary text-primary"
                          >
                            <Trophy className="h-4 w-4" />
                          </button>
                          <div className="min-w-[160px] flex-1">
                            <div className="font-medium">{r.full_name}</div>
                            <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                              <span className="truncate">{r.email}</span>
                              <button
                                type="button"
                                onClick={async () => {
                                  try {
                                    await navigator.clipboard.writeText(r.email);
                                    toast.success("Email copied");
                                  } catch {
                                    toast.error("Could not copy");
                                  }
                                }}
                                aria-label="Copy email"
                                title="Copy email"
                                className="inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-md border border-border text-muted-foreground transition hover:border-primary hover:text-primary"
                              >
                                <Copy className="h-3 w-3" />
                              </button>
                            </div>
                          </div>
                          <span className="text-sm text-muted-foreground">{r.university}</span>
                          <span className="border border-primary/40 px-2 py-1 text-xs text-primary">{r.brand_choice}</span>
                          <a
                            href={`https://instagram.com/${r.instagram_handle}`}
                            target="_blank"
                            rel="noreferrer"
                            className="inline-flex items-center gap-1 text-sm text-primary hover:underline"
                          >
                            @{r.instagram_handle}
                            <ExternalLink className="h-3 w-3" />
                          </a>
                          <div className="flex flex-wrap gap-2">
                            {[r.reel_1, r.reel_2, r.reel_3].filter(Boolean).map((url, i) => (
                              <a
                                key={i}
                                href={url as string}
                                target="_blank"
                                rel="noreferrer"
                                className="inline-flex items-center gap-1 text-sm text-primary hover:underline"
                              >
                                Reel {i + 1} <ExternalLink className="h-3 w-3" />
                              </a>
                            ))}
                          </div>
                        </li>
                      ))}
                    </ul>
                  )}
                </section>

                <section className="border border-border bg-card">
                  <div className="border-b border-border p-4">
                    <div className="mb-3 flex items-center justify-between">
                      <div>
                        <h2 className="font-display text-lg">Final Submissions</h2>
                        <p className="text-xs text-muted-foreground">Stage 2 entries with up to 3 reels each</p>
                      </div>
                      <span className="text-sm text-muted-foreground">{filteredFinals.length} of {finals.length}</span>
                    </div>
                    <div className="flex flex-wrap items-center gap-3">
                      <div className="relative flex-1 min-w-[220px]">
                        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                        <Input
                          value={q}
                          onChange={(e) => setQ(e.target.value)}
                          placeholder="Search by name, email, or handle"
                          className="pl-9"
                        />
                      </div>
                      <Select value={uni} onChange={setUni} options={universities} label="University" />
                      <Select value={brand} onChange={setBrand} options={brands} label="Brand" />
                    </div>
                  </div>
                  {loading ? (
                    <div className="p-12 text-center text-muted-foreground">Loading entries…</div>
                  ) : filteredFinals.length === 0 ? (
                    <div className="p-8 text-center text-sm text-muted-foreground">
                      {finals.length === 0 ? "No final submissions yet." : "No entries match these filters."}
                    </div>
                  ) : (
                    <div className="overflow-x-auto">
                      <table className="w-full text-sm">
                        <thead className="bg-muted/40 text-left text-xs uppercase tracking-wider text-muted-foreground">
                          <tr>
                            <th className="px-4 py-3 w-10"></th>
                            <th className="px-4 py-3">Creator</th>
                            <th className="px-4 py-3">University</th>
                            <th className="px-4 py-3">Brand</th>
                            <th className="px-4 py-3">Instagram</th>
                            <th className="px-4 py-3">Reels</th>
                            <th className="px-4 py-3">Submitted</th>
                          </tr>
                        </thead>
                        <tbody>
                          {filteredFinals.map((r) => {
                            const reels = [r.reel_1, r.reel_2, r.reel_3].filter(Boolean) as string[];
                            return (
                              <tr key={r.id} className="border-t border-border hover:bg-muted/20 align-top">
                                <td className="px-4 py-3">
                                  <button
                                    onClick={() => toggleWinner(r)}
                                    aria-label={r.is_winner ? "Remove from winners" : "Mark as winner"}
                                    title={r.is_winner ? "Remove from winners" : "Mark as winner"}
                                    className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-border transition hover:border-primary hover:text-primary"
                                  >
                                    <Trophy className={`h-4 w-4 ${r.is_winner ? "text-primary fill-primary" : ""}`} />
                                  </button>
                                </td>
                                <td className="px-4 py-3">
                                  <div className="font-medium">{r.full_name}</div>
                                  <div className="text-xs text-muted-foreground">{r.email}</div>
                                </td>
                                <td className="px-4 py-3">{r.university}</td>
                                <td className="px-4 py-3">
                                  <span className="border border-primary/40 px-2 py-1 text-xs text-primary">{r.brand_choice}</span>
                                </td>
                                <td className="px-4 py-3">
                                  <a
                                    href={`https://instagram.com/${r.instagram_handle}`}
                                    target="_blank"
                                    rel="noreferrer"
                                    className="inline-flex items-center gap-1 text-primary hover:underline"
                                  >
                                    @{r.instagram_handle}
                                    <ExternalLink className="h-3 w-3" />
                                  </a>
                                </td>
                                <td className="px-4 py-3">
                                  <div className="flex flex-col gap-1">
                                    {reels.map((url, i) => (
                                      <a
                                        key={i}
                                        href={url}
                                        target="_blank"
                                        rel="noreferrer"
                                        className="inline-flex items-center gap-1 text-primary hover:underline"
                                      >
                                        Reel {i + 1} <ExternalLink className="h-3 w-3" />
                                      </a>
                                    ))}
                                  </div>
                                </td>
                                <td className="px-4 py-3 text-muted-foreground">
                                  {new Date(r.created_at).toLocaleDateString()}{" "}
                                  <span className="text-xs">{new Date(r.created_at).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}</span>
                                </td>
                              </tr>
                            );
                          })}
                        </tbody>
                      </table>
                    </div>
                  )}
                </section>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

function downloadCSV(content: string, filename: string) {
  const blob = new Blob([content], { type: "text/csv" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  a.click();
  URL.revokeObjectURL(url);
}

function StatCard({ label, value, accent }: { label: string; value: number; accent?: boolean }) {
  return (
    <div className={`border p-6 ${accent ? "border-primary bg-primary/10" : "border-border bg-card"}`}>
      <p className="text-xs uppercase tracking-wider text-muted-foreground">{label}</p>
      <p className={`mt-2 font-display text-4xl ${accent ? "text-primary" : ""}`}>{value}</p>
    </div>
  );
}

function BrandCard({ label, value, total }: { label: string; value: number; total: number }) {
  const pct = total ? Math.round((value / total) * 100) : 0;
  return (
    <div className="border border-border bg-card p-6">
      <div className="flex items-baseline justify-between">
        <p className="font-display text-xl">{label}</p>
        <p className="text-sm text-muted-foreground">{pct}%</p>
      </div>
      <p className="mt-2 font-display text-4xl text-primary">{value}</p>
      <div className="mt-4 h-2 bg-muted">
        <div className="h-full bg-primary transition-all" style={{ width: `${pct}%` }} />
      </div>
    </div>
  );
}

function Select({
  value, onChange, options, label,
}: { value: string; onChange: (v: string) => void; options: string[]; label: string }) {
  return (
    <label className="flex items-center gap-2 text-sm text-muted-foreground">
      <span className="hidden md:inline">{label}:</span>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="border border-border bg-background px-3 py-2 text-sm text-foreground"
      >
        {options.map((o) => <option key={o} value={o}>{o}</option>)}
      </select>
    </label>
  );
}

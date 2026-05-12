import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ExternalLink, Search, Download, Star, Copy } from "lucide-react";
import { toast } from "sonner";

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
  created_at: string;
};

function Admin() {
  const [rows, setRows] = useState<Submission[]>([]);
  const [finals, setFinals] = useState<FinalSubmission[]>([]);
  const [loading, setLoading] = useState(true);
  const [q, setQ] = useState("");
  const [uni, setUni] = useState<string>("All");
  const [brand, setBrand] = useState<string>("All");

  useEffect(() => {
    (async () => {
      const [{ data, error }, { data: finalData }] = await Promise.all([
        supabase.from("submissions").select("*").order("created_at", { ascending: false }),
        supabase.from("final_submissions").select("*").order("created_at", { ascending: false }),
      ]);
      if (!error && data) setRows(data as Submission[]);
      if (finalData) setFinals(finalData as FinalSubmission[]);
      setLoading(false);
    })();
  }, []);

  async function toggleShortlist(r: Submission) {
    const next = !r.shortlisted;
    setRows((prev) => prev.map((x) => (x.id === r.id ? { ...x, shortlisted: next } : x)));
    const { error } = await supabase
      .from("submissions")
      .update({ shortlisted: next })
      .eq("id", r.id);
    if (error) {
      setRows((prev) => prev.map((x) => (x.id === r.id ? { ...x, shortlisted: !next } : x)));
      toast.error("Could not update shortlist.");
    } else {
      toast.success(next ? `Shortlisted ${r.full_name}` : `Removed ${r.full_name} from shortlist`);
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

  const shortlisted = useMemo(() => rows.filter((r) => r.shortlisted), [rows]);

  const stats = useMemo(() => {
    const byUni: Record<string, number> = {};
    const byBrand: Record<string, number> = {};
    for (const r of rows) {
      byUni[r.university] = (byUni[r.university] || 0) + 1;
      byBrand[r.brand_choice] = (byBrand[r.brand_choice] || 0) + 1;
    }
    return { byUni, byBrand };
  }, [rows]);

  function exportCSV() {
    const head = ["Name", "Email", "University", "Brand", "Instagram", "Reel", "Submitted"];
    const lines = [head.join(",")];
    for (const r of filtered) {
      lines.push(
        [r.full_name, r.email, r.university, r.brand_choice, r.instagram_handle, r.notes ?? "", r.created_at]
          .map((v) => `"${String(v).replace(/"/g, '""')}"`)
          .join(",")
      );
    }
    const blob = new Blob([lines.join("\n")], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `submissions-${new Date().toISOString().slice(0, 10)}.csv`;
    a.click();
    URL.revokeObjectURL(url);
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
      <header className="border-b border-border">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5">
          <div>
            <p className="text-xs uppercase tracking-widest text-muted-foreground">Admin Dashboard</p>
            <h1 className="font-display text-2xl">Creator Challenge — Entries</h1>
          </div>
          <div className="flex gap-3">
            <Button variant="outline" onClick={exportCSV} className="gap-2 rounded-full">
              <Download className="h-4 w-4" /> Export CSV
            </Button>
            <Link to="/" className="rounded-full border border-border px-4 py-2 text-sm hover:border-primary hover:text-primary">
              ← Back to site
            </Link>
          </div>
        </div>
      </header>

      <div className="mx-auto max-w-7xl space-y-8 px-6 py-10">
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
                  {filtered.map((r) => (
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
        </section>

        <section className="border border-border bg-card">
          <div className="flex items-center justify-between border-b border-border p-4">
            <div>
              <h2 className="font-display text-lg">Final Submission</h2>
              <p className="text-xs text-muted-foreground">Stage 2 entries with up to 3 reels each</p>
            </div>
            <span className="text-sm text-muted-foreground">{finals.length} entries</span>
          </div>
          {finals.length === 0 ? (
            <div className="p-8 text-center text-sm text-muted-foreground">
              No final submissions yet.
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="bg-muted/40 text-left text-xs uppercase tracking-wider text-muted-foreground">
                  <tr>
                    <th className="px-4 py-3">Creator</th>
                    <th className="px-4 py-3">University</th>
                    <th className="px-4 py-3">Brand</th>
                    <th className="px-4 py-3">Instagram</th>
                    <th className="px-4 py-3">Reels</th>
                    <th className="px-4 py-3">Submitted</th>
                  </tr>
                </thead>
                <tbody>
                  {finals.map((r) => {
                    const reels = [r.reel_1, r.reel_2, r.reel_3].filter(Boolean) as string[];
                    return (
                      <tr key={r.id} className="border-t border-border hover:bg-muted/20 align-top">
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
      </div>
    </div>
  );
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

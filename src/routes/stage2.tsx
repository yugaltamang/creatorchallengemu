import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { Toaster } from "@/components/ui/sonner";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import User from "lucide-react/dist/esm/icons/user";
import Mail from "lucide-react/dist/esm/icons/mail";
import AtSign from "lucide-react/dist/esm/icons/at-sign";
import GraduationCap from "lucide-react/dist/esm/icons/graduation-cap";
import Sparkles from "lucide-react/dist/esm/icons/sparkles";
import Check from "lucide-react/dist/esm/icons/check";
import ArrowRight from "lucide-react/dist/esm/icons/arrow-right";
import LinkIcon from "lucide-react/dist/esm/icons/link";
import Loader2 from "lucide-react/dist/esm/icons/loader-2";
import PartyPopper from "lucide-react/dist/esm/icons/party-popper";
import Phone from "lucide-react/dist/esm/icons/phone";
import FileText from "lucide-react/dist/esm/icons/file-text";
import Download from "lucide-react/dist/esm/icons/download";
import Eye from "lucide-react/dist/esm/icons/eye";
import logo from "@/assets/logo.svg";
import permeaImg from "@/assets/permea-logo.jpg";
import justpourImg from "@/assets/justpour.jpg";
import creatorGirl from "@/assets/creator-girl.webp";

const UNIVERSITIES = ["Masters' Union", "LPU", "Tetr"] as const;
const BRANDS = ["PERMEA", "JustPour"] as const;

export const Route = createFileRoute("/stage2")({
  component: Stage2,
  head: () => ({
    meta: [
      { title: "Stage 2 — Final Submission · Creator Challenge" },
      { name: "description", content: "Submit your final reels for the Creator Challenge — up to three reel links." },
    ],
  }),
});

function Stage2() {
  return (
    <div className="relative min-h-screen overflow-hidden bg-background text-foreground">
      <Toaster theme="dark" />
      <Header />
      <Hero />
      
    </div>
  );
}

const BRIEFS = [
  {
    brand: "PERMEA",
    tagline: "Skincare, decoded",
    file: "/briefs/Permea_Content_Brief.pdf",
    accent: "from-pop-violet to-primary",
  },
  {
    brand: "JustPour",
    tagline: "Coffee, on your terms",
    file: "/briefs/JustPour_Creative_Brief.pdf",
    accent: "from-primary to-pop-violet",
  },
];

function BriefWidgets() {
  return (
    <div className="mb-6">
      <div className="mb-3 flex items-center gap-3 font-mono text-[10px] uppercase tracking-[0.28em] text-muted-foreground">
        <FileText className="h-3 w-3" />
        <span>Brand Content Briefs</span>
      </div>
      <div className="grid gap-3 sm:grid-cols-2">
        {BRIEFS.map((b) => (
          <div
            key={b.brand}
            className="group relative overflow-hidden rounded-xl border border-white/10 bg-card/40 p-4 backdrop-blur-md transition hover:-translate-y-0.5 hover:border-primary/40 hover:shadow-[0_15px_40px_-15px_var(--primary)]"
          >
            <div className={`absolute inset-x-0 top-0 h-0.5 bg-gradient-to-r ${b.accent}`} />
            <div className="flex items-center gap-3">
              <div className="grid h-10 w-10 shrink-0 place-items-center rounded-lg bg-gradient-to-br from-primary/20 to-pop-violet/20 text-primary">
                <FileText className="h-4 w-4" />
              </div>
              <div className="min-w-0 flex-1">
                <p className="truncate text-[14px] font-semibold leading-tight text-foreground">{b.brand}</p>
                <p className="truncate text-[11px] text-muted-foreground">{b.tagline}</p>
              </div>
              <div className="flex items-center gap-1.5">
                <a
                  href={b.file}
                  target="_blank"
                  rel="noreferrer noopener"
                  title="View brief"
                  className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-primary/15 text-primary transition hover:bg-primary hover:text-primary-foreground"
                >
                  <Eye className="h-3.5 w-3.5" />
                </a>
                <a
                  href={b.file}
                  download
                  title="Download PDF"
                  className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-border text-foreground transition hover:border-primary/60 hover:text-primary"
                >
                  <Download className="h-3.5 w-3.5" />
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}


function Header() {
  return (
    <header className="relative z-30 border-b border-border">
      <div className="mx-auto flex max-w-[1400px] items-center justify-between gap-4 border-b border-border px-4 py-3 sm:gap-8 sm:px-6 sm:py-4 lg:px-8">
        <div className="flex items-center">
          <img src={logo} alt="Creator Challenge 2026" className="h-8 w-auto invert sm:h-10" />
        </div>
        <nav className="hidden items-center gap-7 text-[14px] md:flex">
          <span className="text-primary">Stage 2</span>
        </nav>
        <div className="grid h-12 w-12 shrink-0 place-items-center rounded-full border border-primary text-center text-[10px] leading-tight text-primary sm:h-14 sm:w-14 sm:text-[11px]">
          Stage<br />02
        </div>
      </div>
      <div className="mx-auto hidden max-w-[1400px] items-start justify-end gap-8 px-4 pt-5 pb-5 sm:px-6 md:flex lg:px-8">
        <div className="text-right text-[13px] leading-tight">
          <p>Final Submission</p>
          <p className="text-muted-foreground">Up to 3 reels per entry</p>
        </div>
      </div>
    </header>
  );
}

function Hero() {
  return (
    <section className="relative">
      <svg
        className="pointer-events-none absolute -bottom-40 -left-40 h-[1100px] w-[1100px] text-primary opacity-90"
        viewBox="0 0 600 600"
        fill="none"
        aria-hidden
      >
        <path d="M 600 0 A 600 600 0 0 0 0 600" stroke="currentColor" strokeWidth="3" />
      </svg>

      <div className="relative mx-auto grid max-w-[1400px] grid-cols-12 gap-6 px-4 pt-32 pb-16 sm:px-6 sm:pt-40 sm:pb-24 md:pt-24 md:pb-32 lg:px-8">
        {/* Phone mock — matches homepage hero */}
        <div className="col-span-12 md:col-span-4">
          <div className="relative mx-auto w-[200px] sm:w-[240px] md:w-[260px]">
            <img
              src={creatorGirl}
              alt="Student creating an Instagram reel"
              className="pointer-events-none absolute left-1/2 bottom-[58px] z-20 w-[115%] max-w-none -translate-x-1/2 drop-shadow-[0_25px_40px_rgba(0,0,0,0.6)] sm:w-[130%] md:w-[140%]"
            />
            <div className="relative rounded-[36px] border-[3px] border-primary bg-card p-2 shadow-[0_0_0_1px_var(--color-primary)]">
              <div className="overflow-hidden rounded-[28px] bg-black">
                <div className="flex items-center justify-between px-4 py-3 text-[11px] tracking-widest text-primary">
                  <span>● FINAL</span>
                  <span>STAGE · 02</span>
                </div>
                <div className="relative aspect-[3/4] overflow-hidden bg-primary/20">
                  <div className="absolute inset-x-0 bottom-0 z-10 bg-gradient-to-t from-black/80 to-transparent p-3">
                    <p className="text-[11px] text-foreground">Drop your reels</p>
                    <p className="text-[10px] text-muted-foreground">up to 3 per brand</p>
                  </div>
                </div>
                <div className="flex justify-around px-4 py-3 text-primary text-[10px]">
                  <span>≡</span><span>♡</span><span>▤</span><span>★</span><span>⌕</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Form replaces hero text */}
        <div className="col-span-12 md:col-span-8 md:pt-6">
          <div className="mb-6 flex items-center gap-3 font-mono text-[11px] uppercase tracking-[0.28em] text-muted-foreground">
            <span className="h-px w-10 bg-primary" />
            <span>Stage 02 · Final Submission</span>
          </div>
          <BriefWidgets />
          <div className="mb-6 rounded-2xl border border-primary/30 bg-primary/10 p-4 backdrop-blur-md sm:p-5">
            <p className="font-mono text-[11px] uppercase tracking-[0.28em] text-primary">🎉 Congratulations</p>
            <h2 className="mt-2 text-2xl font-semibold text-foreground md:text-3xl">You've been shortlisted!</h2>
            <p className="mt-2 text-sm text-muted-foreground md:text-base">
              You've made it to the final stage. Drop up to 3 of your best reels below for your shot at the win.
            </p>
          </div>
          <Stage2Form />
        </div>
      </div>
    </section>
  );
}

function Stage2Form() {
  const [submitting, setSubmitting] = useState(false);
  const [successOpen, setSuccessOpen] = useState(false);
  const [submittedName, setSubmittedName] = useState("");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const fd = new FormData(form);
    const handle = String(fd.get("instagram_handle") || "").replace(/^@/, "").trim().toLowerCase();
    const whatsapp = String(fd.get("whatsapp_number") || "").trim();
    const reel1 = String(fd.get("reel_1") || "").trim();
    const reel2 = String(fd.get("reel_2") || "").trim();
    const reel3 = String(fd.get("reel_3") || "").trim();
    const payload = {
      full_name: String(fd.get("full_name") || "").trim(),
      email: String(fd.get("email") || "").trim().toLowerCase(),
      university: String(fd.get("university") || ""),
      brand_choice: String(fd.get("brand_choice") || ""),
      instagram_handle: handle,
      whatsapp_number: whatsapp,
      reel_1: reel1,
      reel_2: reel2 || null,
      reel_3: reel3 || null,
    };
    if (!payload.full_name || !payload.email || !payload.university || !payload.brand_choice || !handle || !whatsapp || !reel1) {
      toast.error("Please fill in all required fields.");
      return;
    }
    if (!/^\+?[0-9\s\-()]{7,20}$/.test(whatsapp)) {
      toast.error("Please enter a valid WhatsApp number.");
      return;
    }

    setSubmitting(true);
    const { data: existing } = await supabase
      .from("final_submissions")
      .select("brand_choice")
      .or(`email.eq.${payload.email},instagram_handle.eq.${handle}`);
    const enteredBrands = new Set((existing || []).map((r) => r.brand_choice));
    if (enteredBrands.size >= BRANDS.length) {
      setSubmitting(false);
      toast.error("You have already submitted for both products.");
      return;
    }

    const { error } = await supabase.from("final_submissions").insert(payload);
    setSubmitting(false);
    if (error) {
      if (error.code === "23505") {
        const dupField = error.message?.toLowerCase().includes("handle") ? "Instagram handle" : "email";
        toast.error(`This ${dupField} has already entered for ${payload.brand_choice}.`);
      } else {
        toast.error("Could not submit. Try again.");
      }
      return;
    }
    setSubmittedName(payload.full_name.split(" ")[0]);
    form.reset();
    setSuccessOpen(true);
    toast.success("Final submission received!");
  }

  return (
    <>
      <form onSubmit={handleSubmit} method="post" action="#">
        <div className="rounded-2xl border border-white/10 bg-background/70 p-4 backdrop-blur-md sm:rounded-3xl sm:p-6 md:p-8 space-y-6 shadow-[inset_0_1px_0_rgba(255,255,255,0.05),0_30px_80px_-20px_rgba(0,0,0,0.8)]">
          <div className="grid gap-5 md:grid-cols-2">
            <Field label="Full name" icon={User} withInputIcon>
              <Input name="full_name" required placeholder="Your name" className="h-12 rounded-xl border border-border bg-background/60 pl-11 pr-4 transition focus-visible:border-primary focus-visible:bg-background focus-visible:ring-2 focus-visible:ring-primary/30" />
            </Field>
            <Field label="University email" icon={Mail} withInputIcon>
              <Input name="email" type="email" required placeholder="you@university.edu" className="h-12 rounded-xl border border-border bg-background/60 pl-11 pr-4 transition focus-visible:border-primary focus-visible:bg-background focus-visible:ring-2 focus-visible:ring-primary/30" />
            </Field>
          </div>

          <Field label="University" icon={GraduationCap}>
            <div className="grid grid-cols-3 gap-3 pt-2">
              {UNIVERSITIES.map((u) => (
                <label key={u} className="group cursor-pointer">
                  <input type="radio" name="university" value={u} className="peer sr-only" required />
                  <div className="relative flex h-14 items-center justify-center rounded-xl border border-border bg-background/60 px-3 text-center text-[13px] font-medium transition hover:border-primary/50 hover:-translate-y-0.5 peer-checked:border-primary peer-checked:bg-gradient-to-br peer-checked:from-primary peer-checked:to-pop-violet peer-checked:text-primary-foreground peer-checked:shadow-pop">
                    <span className="absolute right-2 top-2 hidden h-4 w-4 items-center justify-center rounded-full bg-background/30">
                      <Check className="h-3 w-3" />
                    </span>
                    {u}
                  </div>
                </label>
              ))}
            </div>
          </Field>

          <Field label="Brand you're creating for" icon={Sparkles}>
            <div className="grid grid-cols-2 gap-3 pt-2">
              {BRANDS.map((b) => (
                <label key={b} className="group cursor-pointer">
                  <input type="radio" name="brand_choice" value={b} className="peer sr-only" required />
                  <div className="relative flex h-16 items-center justify-center rounded-xl border border-border bg-background/60 px-4 text-center text-[14px] font-medium transition hover:border-primary/50 hover:-translate-y-0.5 peer-checked:border-primary peer-checked:bg-gradient-to-br peer-checked:from-primary peer-checked:to-pop-violet peer-checked:text-primary-foreground peer-checked:shadow-pop">
                    {b}
                  </div>
                </label>
              ))}
            </div>
          </Field>

          <Field label="Instagram handle" icon={AtSign} withInputIcon>
            <Input name="instagram_handle" required placeholder="yourhandle" className="h-12 rounded-xl border border-border bg-background/60 pl-11 pr-4 transition focus-visible:border-primary focus-visible:bg-background focus-visible:ring-2 focus-visible:ring-primary/30" />
          </Field>

          <Field label="WhatsApp number" icon={Phone} withInputIcon>
            <Input name="whatsapp_number" type="tel" required inputMode="tel" pattern="^\+?[0-9\s\-()]{7,20}$" placeholder="+91 98765 43210" className="h-12 rounded-xl border border-border bg-background/60 pl-11 pr-4 transition focus-visible:border-primary focus-visible:bg-background focus-visible:ring-2 focus-visible:ring-primary/30" />
            <p className="mt-1.5 text-[12px] text-muted-foreground">Used to intimate you if you are shortlisted.</p>
          </Field>

          <Field label="Paste your reel here" icon={LinkIcon} withInputIcon>
            <Input name="reel_1" type="url" required placeholder="https://instagram.com/reel/… (required)" className="h-12 rounded-xl border border-border bg-background/60 pl-11 pr-4 transition focus-visible:border-primary focus-visible:bg-background focus-visible:ring-2 focus-visible:ring-primary/30" />
          </Field>
          <Field label="Reel 2 (optional)" icon={LinkIcon} withInputIcon>
            <Input name="reel_2" type="url" placeholder="https://instagram.com/reel/…" className="h-12 rounded-xl border border-border bg-background/60 pl-11 pr-4 transition focus-visible:border-primary focus-visible:bg-background focus-visible:ring-2 focus-visible:ring-primary/30" />
          </Field>
          <Field label="Reel 3 (optional)" icon={LinkIcon} withInputIcon>
            <Input name="reel_3" type="url" placeholder="https://instagram.com/reel/…" className="h-12 rounded-xl border border-border bg-background/60 pl-11 pr-4 transition focus-visible:border-primary focus-visible:bg-background focus-visible:ring-2 focus-visible:ring-primary/30" />
          </Field>

          <div className="flex flex-wrap items-center justify-between gap-4 pt-2">
            <p className="text-[12px] text-muted-foreground">
              You can paste up to 3 reels for this brand.
            </p>
            <Button type="submit" disabled={submitting} className="group h-14 rounded-full gradient-pop px-8 text-[14px] font-semibold tracking-wide text-primary-foreground shadow-pop transition hover:opacity-95 hover:shadow-[0_25px_60px_-15px_var(--primary)] disabled:opacity-80">
              {submitting ? (
                <span className="flex items-center gap-2">
                  <Loader2 className="h-4 w-4 animate-spin" />
                  Submitting…
                </span>
              ) : (
                <span className="flex items-center gap-2">
                  Submit final entry
                  <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
                </span>
              )}
            </Button>
          </div>
        </div>
      </form>

      <Dialog open={successOpen} onOpenChange={setSuccessOpen}>
        <DialogContent className="sm:max-w-md rounded-3xl border border-white/10 bg-background/95 backdrop-blur-xl">
          <DialogHeader className="items-center text-center">
            <div className="mx-auto mb-2 flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-br from-primary to-pop-violet shadow-pop">
              <PartyPopper className="h-7 w-7 text-primary-foreground" />
            </div>
            <DialogTitle className="text-2xl">Final submission locked{submittedName ? `, ${submittedName}` : ""}!</DialogTitle>
            <DialogDescription className="text-balance pt-1">
              Your reels are in. Our team will review and reach out with the next steps.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="sm:justify-center">
            <Button onClick={() => setSuccessOpen(false)} className="h-11 rounded-full gradient-pop px-6 font-semibold text-primary-foreground shadow-pop">
              Got it
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}

function Field({ label, icon: Icon, withInputIcon = false, children }: { label: string; icon?: React.ComponentType<{ className?: string }>; withInputIcon?: boolean; children: React.ReactNode }) {
  return (
    <div className="space-y-2">
      <div className="flex items-center gap-2 text-[12px] uppercase tracking-[0.18em] text-muted-foreground">
        {Icon && !withInputIcon ? <Icon className="h-3.5 w-3.5" /> : null}
        <span>{label}</span>
      </div>
      <div className="relative">
        {Icon && withInputIcon ? <Icon className="pointer-events-none absolute left-4 top-1/2 z-10 h-4 w-4 -translate-y-1/2 text-muted-foreground" /> : null}
        {children}
      </div>
    </div>
  );
}

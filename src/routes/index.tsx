import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { Toaster } from "@/components/ui/sonner";
import { Twitter, Sparkles, Instagram, Trophy, Calendar, Users, Music2, Zap, User, Mail, AtSign, MessageSquare, GraduationCap, Check, ArrowRight } from "lucide-react";
import brand1 from "@/assets/brand-1.jpg";
import brand2 from "@/assets/brand-2.jpg";
import creatorGirl from "@/assets/creator-girl.png";

export const Route = createFileRoute("/")({
  component: Landing,
  head: () => ({
    meta: [
      { title: "Creator Challenge 2026 — MU × LPU × Tetr" },
      { name: "description", content: "Content creator challenge for students of Masters' Union, LPU and Tetr." },
    ],
  }),
});

const UNIVERSITIES = ["Masters' Union", "LPU", "Tetr"] as const;
const BRANDS = ["NOIR Audio", "PULSE Energy"] as const;

function Landing() {
  return (
    <div className="relative min-h-screen overflow-hidden bg-background text-foreground">
      <Toaster theme="dark" />
      <Header />
      <Hero />
      <ImageStrip />
      <SocialBar />
      <Brands />
      <Guidelines />
      <SignupSection />
      <Footer />
    </div>
  );
}

function Header() {
  return (
    <header className="relative z-30 border-b border-border">
      {/* Nav row */}
      <div className="mx-auto flex max-w-[1400px] items-center justify-between gap-8 border-b border-border px-8 py-4">
        {/* Logo block */}
        <div className="flex items-center gap-3">
          <div className="grid h-10 w-10 place-items-center bg-primary">
            <span className="font-serif text-base italic text-primary-foreground">CC</span>
          </div>
          <h1 className="font-display text-[18px] leading-[0.95] tracking-tight">
            creator<br />
            challenge 2026
          </h1>
        </div>

        <nav className="hidden flex-wrap items-center gap-7 text-[14px] md:flex">
          <a href="#brands" className="hover:text-primary">Brands</a>
          <a href="#rules" className="hover:text-primary">Rules</a>
          <a href="#prizes" className="hover:text-primary">Prizes</a>
          <a href="#about" className="hover:text-primary">About</a>
          <a href="#signup" className="hover:text-primary">Submit</a>
          <Link to="/admin" className="text-muted-foreground hover:text-primary">Admin</Link>
        </nav>

        <a
          href="#signup"
          className="grid h-14 w-14 place-items-center rounded-full border border-primary text-center text-[11px] leading-tight text-primary transition hover:bg-primary hover:text-primary-foreground"
        >
          Enter<br />Now
        </a>
      </div>

      <div className="mx-auto flex max-w-[1400px] items-start justify-end gap-8 px-8 pt-5 pb-5">
        {/* Right meta */}
        <div className="hidden text-right text-[13px] leading-tight md:block">
          <p>India · 3 Campuses</p>
          <p className="text-muted-foreground">Feb 14 – Mar 30, 2026</p>
        </div>
      </div>
    </header>
  );
}

function Hero() {
  return (
    <section className="relative">
      {/* Sweeping pink arc — AIGA-style */}
      <svg
        className="pointer-events-none absolute -bottom-40 -left-40 h-[1100px] w-[1100px] text-primary opacity-90"
        viewBox="0 0 600 600"
        fill="none"
        aria-hidden
      >
        <path d="M 600 0 A 600 600 0 0 0 0 600" stroke="currentColor" strokeWidth="3" />
      </svg>

      <div className="relative mx-auto grid max-w-[1400px] grid-cols-12 gap-6 px-8 pt-16 pb-24 md:pt-24 md:pb-32">
        {/* Phone mock / left visual */}
        <div className="col-span-12 md:col-span-4">
          <div className="relative mx-auto w-[260px]">
            {/* Girl image breaking out of phone */}
            <img
              src={creatorGirl}
              alt="Student creating an Instagram reel"
              className="pointer-events-none absolute left-1/2 bottom-[58px] z-20 w-[140%] max-w-none -translate-x-1/2 drop-shadow-[0_25px_40px_rgba(0,0,0,0.6)]"
            />
            <div className="relative rounded-[36px] border-[3px] border-primary bg-card p-2 shadow-[0_0_0_1px_var(--color-primary)]">
              <div className="overflow-hidden rounded-[28px] bg-black">
                <div className="flex items-center justify-between px-4 py-3 text-[11px] tracking-widest text-primary">
                  <span>● LIVE</span>
                  <span>REEL · 0:23</span>
                </div>
                <div className="relative aspect-[3/4] overflow-hidden bg-primary/20">
                  <div className="absolute inset-x-0 bottom-0 z-10 bg-gradient-to-t from-black/80 to-transparent p-3">
                    <p className="text-[11px] text-foreground">@maya.shoots</p>
                    <p className="text-[10px] text-muted-foreground">making it for NOIR Audio</p>
                  </div>
                </div>
                <div className="flex justify-around px-4 py-3 text-primary text-[10px]">
                  <span>≡</span><span>♡</span><span>▤</span><span>★</span><span>⌕</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Big headline */}
        <div className="col-span-12 md:col-span-8 md:pt-6">
          <h2 className="font-display text-[clamp(64px,10vw,160px)] leading-[0.86]">
            <span className="text-primary">Let's</span>{" "}<br className="hidden sm:block" />
            <span className="text-primary">build</span>{" "}<br className="hidden sm:block" />
            <span className="text-primary">stories,</span><br />
            <span className="text-foreground">together.</span>
          </h2>
        </div>
      </div>
    </section>
  );
}

function ImageStrip() {
  const items = [
    "🎬 Lights",
    "✨ Camera",
    "📱 Action",
    "🎵 Trending audio",
    "💖 1M views",
    "🏆 ₹5L prize pool",
    "🔥 #CreatorChallenge26",
    "🎤 Brand collabs",
  ];
  const loop = [...items, ...items];
  return (
    <section className="relative overflow-hidden border-y border-border gradient-pop py-5">
      <div className="flex w-max animate-marquee gap-12 whitespace-nowrap font-display text-2xl text-primary-foreground">
        {loop.map((t, i) => (
          <span key={i} className="flex items-center gap-3">
            {t}
            <Sparkles className="h-5 w-5" />
          </span>
        ))}
      </div>
    </section>
  );
}

function SocialBar() {
  const stats = [
    { n: "3", l: "Campuses", icon: Users, accent: "text-pop-cyan" },
    { n: "2", l: "Real brands", icon: Zap, accent: "text-pop-yellow" },
    { n: "₹5L", l: "Prize pool", icon: Trophy, accent: "text-pop-lime" },
    { n: "45d", l: "To create", icon: Calendar, accent: "text-pop-violet" },
  ];
  return (
    <section id="about" className="border-b border-border">
      <div className="mx-auto max-w-[1400px] px-8 py-20">
        <div className="grid gap-10 md:grid-cols-12">
          <div className="md:col-span-5">
            <span className="inline-flex items-center gap-2 rounded-full border border-primary/40 bg-primary/10 px-4 py-1.5 text-[12px] uppercase tracking-[0.18em] text-primary">
              <Instagram className="h-3.5 w-3.5" /> @CreatorChallenge
            </span>
            <h2 className="mt-6 font-display text-[clamp(40px,5vw,68px)] leading-[0.92]">
              The 2026<br />
              <span className="bg-gradient-to-r from-primary to-pop-violet bg-clip-text text-transparent">
                Creator Challenge.
              </span>
            </h2>
            <p className="mt-6 max-w-md text-[15px] leading-relaxed text-muted-foreground">
              Students from <span className="text-foreground">Masters' Union</span>,{" "}
              <span className="text-foreground">LPU</span> and{" "}
              <span className="text-foreground">Tetr</span> create reels for two real brands.
              Winners get cash, mentorship, and a feature on the brand handles.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-4 md:col-span-7">
            {stats.map((s) => (
              <div
                key={s.l}
                className="gradient-card group relative overflow-hidden rounded-2xl border border-border p-6 shadow-soft transition hover:-translate-y-1 hover:border-primary/50"
              >
                <s.icon className={`h-6 w-6 ${s.accent}`} />
                <div className="mt-6 font-display text-5xl">{s.n}</div>
                <p className="mt-2 text-[13px] uppercase tracking-widest text-muted-foreground">{s.l}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function Brands() {
  const brands = [
    {
      name: "NOIR Audio",
      tagline: "Headphones built for the dark.",
      image: brand1,
      summary:
        "Premium over-ear headphones for late-night creators. Active noise cancellation, 40-hour battery, studio-grade drivers.",
      angles: ["Late-night workflow", "Studio aesthetic", "Travel + commute"],
      icon: Music2,
      accent: "from-pop-violet to-primary",
      chip: "bg-pop-violet/15 text-pop-violet border-pop-violet/30",
    },
    {
      name: "PULSE Energy",
      tagline: "Clean energy. Loud personality.",
      image: brand2,
      summary:
        "Sugar-free sparkling energy drink. 150mg natural caffeine, zero crash. Make your reel feel like the first sip.",
      angles: ["Workout / fitness", "Study + hustle", "Friends + nightlife"],
      icon: Zap,
      accent: "from-pop-yellow to-primary",
      chip: "bg-pop-yellow/15 text-pop-yellow border-pop-yellow/30",
    },
  ];

  return (
    <section id="brands" className="border-b border-border">
      <div className="mx-auto max-w-[1400px] px-8 py-24">
        <div className="mb-14 flex flex-wrap items-end justify-between gap-6">
          <div>
            <span className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-4 py-1.5 text-[12px] uppercase tracking-[0.18em] text-muted-foreground">
              <Sparkles className="h-3.5 w-3.5" /> The Brief
            </span>
            <h2 className="mt-5 font-display text-[clamp(48px,7vw,100px)]">
              Two brands.{" "}
              <span className="bg-gradient-to-r from-primary via-pop-violet to-pop-cyan bg-clip-text text-transparent">
                One reel.
              </span>
            </h2>
          </div>
          <p className="max-w-xs text-[14px] text-muted-foreground">
            Pick one. Build a 15–30s vertical reel. Make it impossible to scroll past.
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-2">
          {brands.map((b, i) => (
            <article
              key={b.name}
              className="group relative overflow-hidden rounded-3xl border border-border bg-card transition hover:-translate-y-1 hover:shadow-pop"
            >
              <div className={`absolute inset-x-0 top-0 h-1 bg-gradient-to-r ${b.accent}`} />
              <div className="relative aspect-[5/4] overflow-hidden">
                <img
                  src={b.image}
                  alt={b.name}
                  loading="lazy"
                  className="h-full w-full object-cover transition duration-700 group-hover:scale-[1.05]"
                />
                <div className="absolute left-4 top-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-background/80 backdrop-blur">
                  <b.icon className="h-5 w-5 text-primary" />
                </div>
                <span className="absolute right-4 top-4 rounded-full bg-background/80 px-3 py-1 text-[11px] uppercase tracking-widest backdrop-blur">
                  Brief 0{i + 1}
                </span>
              </div>
              <div className="p-7">
                <h3 className="font-display text-4xl">{b.name}</h3>
                <p className="mt-2 text-primary text-[15px]">{b.tagline}</p>
                <p className="mt-4 text-[14px] leading-relaxed text-muted-foreground">{b.summary}</p>
                <div className="mt-5 flex flex-wrap gap-2">
                  {b.angles.map((a) => (
                    <span key={a} className={`rounded-full border px-3 py-1 text-[12px] ${b.chip}`}>
                      {a}
                    </span>
                  ))}
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function Guidelines() {
  const rules = [
    { n: "01", t: "Eligibility", d: "Open to currently enrolled students of Masters' Union, LPU, or Tetr. Verify with your university email.", color: "text-pop-cyan", bg: "from-pop-cyan/20" },
    { n: "02", t: "Format", d: "One Instagram reel, 15–30 seconds, vertical 9:16. Original or licensed audio only.", color: "text-pop-yellow", bg: "from-pop-yellow/20" },
    { n: "03", t: "The brand", d: "Feature the chosen product clearly. Tag the brand and use #CreatorChallenge26.", color: "text-primary", bg: "from-primary/20" },
    { n: "04", t: "Originality", d: "Created by you. No reposts, no AI voiceovers without disclosure, no copyrighted footage.", color: "text-pop-lime", bg: "from-pop-lime/20" },
    { n: "05", t: "Account", d: "Your Instagram profile must be public throughout the judging window.", color: "text-pop-peach", bg: "from-pop-peach/20" },
    { n: "06", t: "Deadline", d: "Submit by midnight, March 30. Winners announced April 15 across all three campuses.", color: "text-pop-violet", bg: "from-pop-violet/20" },
  ];

  return (
    <section id="rules" className="border-b border-border">
      <div className="mx-auto max-w-[1400px] px-8 py-24">
        <div className="mb-14 flex flex-wrap items-end justify-between gap-6">
          <div>
            <span className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-4 py-1.5 text-[12px] uppercase tracking-[0.18em] text-muted-foreground">
              <Sparkles className="h-3.5 w-3.5" /> Guidelines
            </span>
            <h2 className="mt-5 font-display text-[clamp(48px,7vw,100px)]">
              <span className="bg-gradient-to-r from-primary to-pop-cyan bg-clip-text text-transparent">
                Rules
              </span>{" "}
              of play.
            </h2>
          </div>
          <p className="max-w-xs text-[14px] text-muted-foreground">
            Six things to keep in mind. Break the algorithm, not the rules.
          </p>
        </div>

        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {rules.map((r) => (
            <div
              key={r.n}
              className={`group relative overflow-hidden rounded-3xl border border-border bg-gradient-to-br ${r.bg} to-card p-7 transition hover:-translate-y-1 hover:border-primary/40`}
            >
              <div className={`font-display text-6xl ${r.color}`}>{r.n}</div>
              <h3 className="mt-5 font-display text-xl">{r.t}</h3>
              <p className="mt-2 text-[14px] leading-relaxed text-muted-foreground">{r.d}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function SignupSection() {
  const [submitting, setSubmitting] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const fd = new FormData(form);
    const handle = String(fd.get("instagram_handle") || "").replace(/^@/, "").trim();
    const payload = {
      full_name: String(fd.get("full_name") || "").trim(),
      email: String(fd.get("email") || "").trim(),
      university: String(fd.get("university") || ""),
      brand_choice: String(fd.get("brand_choice") || ""),
      instagram_handle: handle,
      notes: String(fd.get("notes") || "").trim() || null,
    };
    if (!payload.full_name || !payload.email || !payload.university || !payload.brand_choice || !handle) {
      toast.error("Please fill in all required fields.");
      return;
    }
    setSubmitting(true);
    const { error } = await supabase.from("submissions").insert(payload);
    setSubmitting(false);
    if (error) {
      toast.error("Could not submit. Try again.");
      return;
    }
    form.reset();
    toast.success("You're in. We'll review your profile soon.");
  }

  return (
    <section id="signup" className="border-b border-border">
      <div className="mx-auto max-w-[1400px] px-8 py-24">
        <div className="relative overflow-hidden rounded-[32px] border border-border gradient-card p-8 shadow-pop md:p-14">
          <div className="pointer-events-none absolute -top-32 -right-32 h-80 w-80 rounded-full bg-primary/30 blur-3xl" />
          <div className="pointer-events-none absolute -bottom-32 -left-32 h-80 w-80 rounded-full bg-pop-violet/30 blur-3xl" />

          <div className="relative grid gap-10 md:grid-cols-12">
            <div className="md:col-span-5">
              <span className="inline-flex items-center gap-2 rounded-full border border-primary/40 bg-primary/10 px-4 py-1.5 text-[12px] uppercase tracking-[0.18em] text-primary">
                <Instagram className="h-3.5 w-3.5" /> Submit
              </span>
              <h2 className="mt-5 font-display text-[clamp(48px,7vw,96px)] leading-[0.9]">
                Drop your{" "}
                <span className="bg-gradient-to-r from-primary to-pop-cyan bg-clip-text text-transparent">
                  handle.
                </span>
              </h2>
              <p className="mt-6 max-w-sm text-[14px] leading-relaxed text-muted-foreground">
                Submit your details and the Instagram profile we should review. Update your reel any
                time before the deadline — we'll always pull the latest version.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="md:col-span-7">
              <div className="rounded-3xl border border-border bg-background/50 p-6 backdrop-blur-md md:p-8 space-y-6">
                <div className="grid gap-5 md:grid-cols-2">
                  <Field label="Full name" icon={User}>
                    <Input name="full_name" required placeholder="Your name" className="h-12 rounded-xl border border-border bg-background/60 pl-11 pr-4 transition focus-visible:border-primary focus-visible:bg-background focus-visible:ring-2 focus-visible:ring-primary/30" />
                  </Field>
                  <Field label="University email" icon={Mail}>
                    <Input name="email" type="email" required placeholder="you@university.edu" className="h-12 rounded-xl border border-border bg-background/60 pl-11 pr-4 transition focus-visible:border-primary focus-visible:bg-background focus-visible:ring-2 focus-visible:ring-primary/30" />
                  </Field>
                </div>

                <Field label="University" icon={GraduationCap}>
                  <div className="grid grid-cols-3 gap-3 pt-2">
                    {UNIVERSITIES.map((u) => (
                      <label key={u} className="group cursor-pointer">
                        <input type="radio" name="university" value={u} className="peer sr-only" required />
                        <div className="relative flex h-14 items-center justify-center rounded-xl border border-border bg-background/60 px-3 text-center text-[13px] font-medium transition hover:border-primary/50 hover:-translate-y-0.5 peer-checked:border-primary peer-checked:bg-gradient-to-br peer-checked:from-primary peer-checked:to-pop-violet peer-checked:text-primary-foreground peer-checked:shadow-pop">
                          <span className="absolute right-2 top-2 hidden h-4 w-4 items-center justify-center rounded-full bg-background/30 peer-checked:group-[]:flex">
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

                <Field label="Instagram handle" icon={AtSign}>
                  <Input name="instagram_handle" required placeholder="yourhandle" className="h-12 rounded-xl border border-border bg-background/60 pl-11 pr-4 transition focus-visible:border-primary focus-visible:bg-background focus-visible:ring-2 focus-visible:ring-primary/30" />
                </Field>

                <Field label="Anything we should know? (optional)" icon={MessageSquare}>
                  <Textarea name="notes" rows={3} placeholder="Concept, experience, follower count…" className="rounded-xl border border-border bg-background/60 p-4 transition focus-visible:border-primary focus-visible:bg-background focus-visible:ring-2 focus-visible:ring-primary/30" />
                </Field>

                <div className="flex flex-wrap items-center justify-between gap-4 pt-2">
                  <p className="text-[12px] text-muted-foreground">
                    By submitting you agree to the contest rules.
                  </p>
                  <Button type="submit" disabled={submitting} className="group h-14 rounded-full gradient-pop px-8 text-[14px] font-semibold tracking-wide text-primary-foreground shadow-pop transition hover:opacity-95 hover:shadow-[0_25px_60px_-15px_var(--primary)]">
                    {submitting ? "Submitting…" : (
                      <span className="flex items-center gap-2">
                        Submit my profile
                        <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
                      </span>
                    )}
                  </Button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="space-y-1">
      <Label className="text-[11px] uppercase tracking-[0.18em] text-muted-foreground">{label}</Label>
      {children}
    </div>
  );
}

function Footer() {
  return (
    <footer className="border-t border-border">
      <div className="mx-auto max-w-[1400px] px-8 py-14">
        <div className="grid gap-10 md:grid-cols-12">
          <div className="md:col-span-6">
            <div className="flex items-center gap-3">
              <div className="grid h-10 w-10 place-items-center rounded-xl gradient-pop">
                <span className="font-serif text-base italic text-primary-foreground">CC</span>
              </div>
              <p className="font-display text-xl">creator challenge 2026</p>
            </div>
            <p className="mt-5 max-w-sm text-[14px] leading-relaxed text-muted-foreground">
              Built with Masters' Union, LPU and Tetr. Powered by real brands and creators who refuse to scroll past.
            </p>
          </div>
          <div className="md:col-span-3">
            <p className="text-[11px] uppercase tracking-[0.18em] text-muted-foreground">Explore</p>
            <ul className="mt-4 space-y-2 text-[14px]">
              <li><a href="#brands" className="hover:text-primary">Brands</a></li>
              <li><a href="#rules" className="hover:text-primary">Rules</a></li>
              <li><a href="#signup" className="hover:text-primary">Submit</a></li>
              <li><Link to="/admin" className="hover:text-primary">Admin</Link></li>
            </ul>
          </div>
          <div className="md:col-span-3">
            <p className="text-[11px] uppercase tracking-[0.18em] text-muted-foreground">Follow</p>
            <ul className="mt-4 space-y-2 text-[14px]">
              <li className="flex items-center gap-2"><Instagram className="h-4 w-4 text-primary" /> @creatorchallenge</li>
              <li className="flex items-center gap-2"><Twitter className="h-4 w-4 text-primary" /> @cc26</li>
            </ul>
          </div>
        </div>
        <div className="mt-12 flex flex-wrap items-center justify-between gap-4 border-t border-border pt-6 text-[13px] text-muted-foreground">
          <p>© 2026 Creator Challenge · MU × LPU × Tetr</p>
          <p>Feb 14 – Mar 30, 2026</p>
        </div>
      </div>
    </footer>
  );
}

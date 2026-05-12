import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { Toaster } from "@/components/ui/sonner";
import { Twitter, Sparkles, Instagram, Trophy, Calendar, Users, Music2, Zap } from "lucide-react";
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
  return (
    <section className="relative border-y border-border">
      <button className="absolute left-4 top-1/2 z-10 -translate-y-1/2 text-foreground/70 hover:text-primary">
        <ArrowLeft className="h-5 w-5" />
      </button>
      <button className="absolute right-4 top-1/2 z-10 -translate-y-1/2 text-foreground/70 hover:text-primary">
        <ArrowRight className="h-5 w-5" />
      </button>
      <div className="mx-auto grid max-w-[1400px] grid-cols-1 gap-6 px-16 py-16 md:grid-cols-2">
        {[
          { img: brand1, cap: "Submissions open. Drop your reel by midnight, March 30, 2026" },
          { img: brand2, cap: "Connect with brand teams during reviews, mentor sessions, and the live finale" },
        ].map((c, i) => (
          <figure key={i} className="space-y-3">
            <div className="aspect-[4/3] overflow-hidden bg-muted grayscale">
              <img src={c.img} alt="" loading="lazy" className="h-full w-full object-cover" />
            </div>
            <figcaption className="text-[13px] leading-snug">{c.cap}</figcaption>
          </figure>
        ))}
      </div>
    </section>
  );
}

function SocialBar() {
  return (
    <section className="border-b border-border">
      <div className="mx-auto grid max-w-[1400px] grid-cols-12 gap-6 px-8 py-14">
        <div className="col-span-12 md:col-span-3">
          <div className="mb-4 h-[3px] w-32 bg-primary" />
          <p className="font-display text-2xl leading-tight">
            The 2026<br />Creator<br />Challenge
          </p>
        </div>
        <div className="col-span-12 md:col-span-5">
          <Twitter className="mb-3 h-5 w-5" />
          <p className="text-[14px]">
            Follow <span className="text-primary">@CreatorChallenge</span> for updates
          </p>
          <p className="mt-3 max-w-md text-[14px] leading-relaxed text-muted-foreground">
            You're invited 🎬 Join us for the inaugural Creator Challenge where students from{" "}
            <span className="text-foreground">Masters' Union</span>,{" "}
            <span className="text-foreground">LPU</span>, and{" "}
            <span className="text-foreground">Tetr</span> create reels for two real brands.{" "}
            <span className="text-primary underline">cc26.in/brief</span>
          </p>
          <p className="mt-3 text-[12px] text-muted-foreground">2 DAYS AGO</p>
        </div>
        <div className="col-span-12 flex items-end justify-end md:col-span-4">
          <a href="#signup" className="font-display text-5xl text-primary leading-[0.9] hover:underline">
            Submit<br />today!
          </a>
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
        "Premium over-ear headphones for late-night creators. Active noise cancellation, 40-hour battery, studio-grade drivers. Make us feel the silence before the bass.",
      angles: ["Late-night workflow", "Studio aesthetic", "Travel + commute"],
    },
    {
      name: "PULSE Energy",
      tagline: "Clean energy. Loud personality.",
      image: brand2,
      summary:
        "Sugar-free sparkling energy drink for the gym, the desk, the all-nighter. 150mg natural caffeine, zero crash. Make your reel feel like the first sip — sharp, electric, impossible to ignore.",
      angles: ["Workout / fitness", "Study + hustle", "Friends + nightlife"],
    },
  ];

  return (
    <section id="brands" className="border-b border-border">
      <div className="mx-auto max-w-[1400px] px-8 py-24">
        <div className="mb-16 grid grid-cols-12 gap-6">
          <p className="col-span-12 md:col-span-4 text-[13px] uppercase tracking-[0.2em] text-muted-foreground">
            ⌐ The Brief
          </p>
          <h2 className="col-span-12 md:col-span-8 font-display text-[clamp(48px,7vw,110px)]">
            <span className="text-foreground">Two brands.</span><br />
            <span className="text-primary">One reel.</span>
          </h2>
        </div>

        <div className="grid gap-12 md:grid-cols-2">
          {brands.map((b, i) => (
            <article key={b.name} className="group">
              <div className="aspect-[4/5] overflow-hidden bg-muted">
                <img
                  src={b.image}
                  alt={b.name}
                  loading="lazy"
                  className="h-full w-full object-cover transition duration-700 group-hover:scale-[1.03]"
                />
              </div>
              <div className="mt-6 grid grid-cols-12 gap-4">
                <div className="col-span-12 sm:col-span-7">
                  <p className="text-[12px] uppercase tracking-widest text-muted-foreground">Brief 0{i + 1}</p>
                  <h3 className="mt-1 font-display text-4xl">{b.name}</h3>
                  <p className="mt-2 text-primary text-[15px]">{b.tagline}</p>
                </div>
                <div className="col-span-12 sm:col-span-5 self-end text-right text-[13px] text-muted-foreground">
                  Featured product
                </div>
              </div>
              <p className="mt-5 max-w-md text-[14px] leading-relaxed text-muted-foreground">{b.summary}</p>
              <div className="mt-5 flex flex-wrap gap-2">
                {b.angles.map((a) => (
                  <span key={a} className="border border-border px-3 py-1 text-[12px]">{a}</span>
                ))}
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
    { n: "01", t: "Eligibility", d: "Open only to currently enrolled students of Masters' Union, LPU, or Tetr. Verify with your university email." },
    { n: "02", t: "Format", d: "One Instagram reel, 15–30 seconds, vertical 9:16. Original audio or licensed music only." },
    { n: "03", t: "The brand", d: "Feature the chosen product clearly. Tag the brand and use #CreatorChallenge26." },
    { n: "04", t: "Originality", d: "Created by you. No reposts, no AI voiceovers without disclosure, no copyrighted footage." },
    { n: "05", t: "Account", d: "Your Instagram profile must be public throughout the judging window." },
    { n: "06", t: "Deadline", d: "Submit by midnight, March 30. Winners announced April 15 across all three campuses." },
  ];

  return (
    <section id="rules" className="border-b border-border">
      <div className="mx-auto max-w-[1400px] px-8 py-24">
        <div className="mb-16 grid grid-cols-12 gap-6">
          <p className="col-span-12 md:col-span-4 text-[13px] uppercase tracking-[0.2em] text-muted-foreground">
            ⌐ Guidelines
          </p>
          <h2 className="col-span-12 md:col-span-8 font-display text-[clamp(48px,7vw,110px)]">
            <span className="text-primary">Rules</span> of play.
          </h2>
        </div>

        <div className="grid gap-px bg-border md:grid-cols-2 lg:grid-cols-3">
          {rules.map((r) => (
            <div key={r.n} className="bg-background p-8">
              <div className="mb-6 font-display text-5xl text-primary">{r.n}</div>
              <h3 className="font-display text-xl">{r.t}</h3>
              <p className="mt-3 text-[14px] leading-relaxed text-muted-foreground">{r.d}</p>
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
      <div className="mx-auto grid max-w-[1400px] grid-cols-12 gap-8 px-8 py-24">
        <div className="col-span-12 md:col-span-5">
          <p className="text-[13px] uppercase tracking-[0.2em] text-muted-foreground">⌐ Submit</p>
          <h2 className="mt-4 font-display text-[clamp(56px,8vw,120px)]">
            Drop<br />
            your<br />
            <span className="text-primary">handle.</span>
          </h2>
          <p className="mt-6 max-w-sm text-[14px] leading-relaxed text-muted-foreground">
            Submit your details and the Instagram profile we should review. Update your reel any
            time before the deadline — we'll always pull the latest version.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="col-span-12 md:col-span-7 space-y-6 border-l border-border md:pl-12">
          <div className="grid gap-5 md:grid-cols-2">
            <Field label="Full name">
              <Input name="full_name" required placeholder="Your name" className="h-12 rounded-none border-0 border-b border-border bg-transparent px-0 focus-visible:ring-0" />
            </Field>
            <Field label="University email">
              <Input name="email" type="email" required placeholder="you@university.edu" className="h-12 rounded-none border-0 border-b border-border bg-transparent px-0 focus-visible:ring-0" />
            </Field>
          </div>

          <Field label="University">
            <div className="grid grid-cols-3 gap-3 pt-2">
              {UNIVERSITIES.map((u) => (
                <label key={u} className="cursor-pointer">
                  <input type="radio" name="university" value={u} className="peer sr-only" required />
                  <div className="border border-border bg-background p-3 text-center text-[13px] transition peer-checked:border-primary peer-checked:bg-primary peer-checked:text-primary-foreground">
                    {u}
                  </div>
                </label>
              ))}
            </div>
          </Field>

          <Field label="Brand you're creating for">
            <div className="grid grid-cols-2 gap-3 pt-2">
              {BRANDS.map((b) => (
                <label key={b} className="cursor-pointer">
                  <input type="radio" name="brand_choice" value={b} className="peer sr-only" required />
                  <div className="border border-border bg-background p-3 text-center text-[13px] transition peer-checked:border-primary peer-checked:bg-primary peer-checked:text-primary-foreground">
                    {b}
                  </div>
                </label>
              ))}
            </div>
          </Field>

          <Field label="Instagram handle">
            <Input name="instagram_handle" required placeholder="@yourhandle" className="h-12 rounded-none border-0 border-b border-border bg-transparent px-0 focus-visible:ring-0" />
          </Field>

          <Field label="Anything we should know? (optional)">
            <Textarea name="notes" rows={3} placeholder="Concept, experience, follower count…" className="rounded-none border border-border bg-transparent" />
          </Field>

          <div className="pt-2">
            <Button type="submit" disabled={submitting} className="h-14 rounded-full bg-primary px-10 text-[14px] tracking-wide text-primary-foreground hover:bg-primary/90">
              {submitting ? "Submitting…" : "Submit my profile →"}
            </Button>
          </div>
        </form>
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
    <footer className="mx-auto max-w-[1400px] px-8 py-10 text-[13px] text-muted-foreground">
      <div className="mb-6 h-[3px] w-32 bg-primary" />
      <div className="flex flex-wrap items-center justify-between gap-4">
        <p>© 2026 Creator Challenge · MU × LPU × Tetr</p>
        <Link to="/admin" className="hover:text-primary">Admin dashboard →</Link>
      </div>
    </footer>
  );
}

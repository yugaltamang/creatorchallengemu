import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { Toaster } from "@/components/ui/sonner";
import brand1 from "@/assets/brand-1.jpg";
import brand2 from "@/assets/brand-2.jpg";

export const Route = createFileRoute("/")({
  component: Landing,
  head: () => ({
    meta: [
      { title: "Creator Challenge 2026 — MU × LPU × Tetr" },
      { name: "description", content: "Content creator challenge for students of Masters' Union, LPU and Tetr. Pick a brand. Make a reel. Win." },
    ],
  }),
});

const UNIVERSITIES = ["Masters' Union", "LPU", "Tetr"] as const;
const BRANDS = ["NOIR Audio", "PULSE Energy"] as const;

function Landing() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Toaster theme="dark" />
      <Header />
      <Hero />
      <Brands />
      <Guidelines />
      <SignupSection />
      <Footer />
    </div>
  );
}

function Header() {
  return (
    <header className="sticky top-0 z-40 border-b border-border bg-background/80 backdrop-blur">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        <Link to="/" className="flex items-center gap-3">
          <span className="grid h-9 w-9 place-items-center bg-primary font-display text-primary-foreground">CC</span>
          <span className="font-display text-lg leading-none">creator<br />challenge</span>
        </Link>
        <nav className="hidden gap-7 text-sm md:flex">
          <a href="#brands" className="hover:text-primary">Brands</a>
          <a href="#rules" className="hover:text-primary">Rules</a>
          <a href="#signup" className="hover:text-primary">Sign up</a>
          <Link to="/admin" className="text-muted-foreground hover:text-primary">Admin</Link>
        </nav>
        <a href="#signup" className="hidden rounded-full border border-primary px-5 py-2 text-sm text-primary transition hover:bg-primary hover:text-primary-foreground md:inline-block">
          Enter now
        </a>
      </div>
    </header>
  );
}

function Hero() {
  return (
    <section className="relative overflow-hidden border-b border-border">
      <div className="mx-auto grid max-w-7xl gap-12 px-6 py-20 md:grid-cols-2 md:py-28">
        <div className="flex flex-col justify-end">
          <p className="mb-4 text-sm uppercase tracking-widest text-muted-foreground">India · Spring 2026</p>
          <p className="text-sm text-muted-foreground">Open to students of</p>
          <p className="mt-2 font-display text-2xl text-foreground">Masters' Union · LPU · Tetr</p>
        </div>
        <div>
          <h1 className="font-display text-6xl text-primary md:text-8xl">
            Make<br />the reel<br /><span className="text-foreground">that wins.</span>
          </h1>
          <p className="mt-8 max-w-md text-lg text-muted-foreground">
            Pick one of two brands. Create a 30-second Instagram reel. Submit your handle.
            The best creators get cash, gear, and a campaign credit.
          </p>
          <div className="mt-8 flex gap-4">
            <a href="#signup">
              <Button size="lg" className="rounded-full bg-primary px-8 text-primary-foreground hover:bg-primary/90">
                Submit your profile
              </Button>
            </a>
            <a href="#brands">
              <Button size="lg" variant="outline" className="rounded-full border-foreground/20 px-8">
                See the brands
              </Button>
            </a>
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
        "NOIR makes premium over-ear headphones engineered for late-night creators. Active noise cancellation, 40-hour battery, studio-grade drivers. Your reel should make us feel the silence before the bass.",
      angles: ["Late-night creator workflow", "Studio / producer aesthetic", "Travel + commute"],
    },
    {
      name: "PULSE Energy",
      tagline: "Clean energy. Loud personality.",
      image: brand2,
      summary:
        "PULSE is a sugar-free sparkling energy drink built for the gym, the desk, and the all-nighter. 150mg natural caffeine, zero crash. Your reel should feel like the first sip — sharp, electric, and impossible to ignore.",
      angles: ["Workout / fitness", "Study / hustle culture", "Friends + nightlife"],
    },
  ];

  return (
    <section id="brands" className="border-b border-border">
      <div className="mx-auto max-w-7xl px-6 py-20">
        <div className="mb-14 flex items-end justify-between">
          <h2 className="font-display text-5xl md:text-7xl">
            Two brands.<br />
            <span className="text-primary">One reel.</span>
          </h2>
          <p className="hidden max-w-sm text-muted-foreground md:block">
            Choose the brand you want to create for. Your reel must feature the product naturally and tell a story in under 30 seconds.
          </p>
        </div>

        <div className="grid gap-10 md:grid-cols-2">
          {brands.map((b, i) => (
            <article key={b.name} className="group overflow-hidden border border-border bg-card">
              <div className="aspect-square overflow-hidden bg-muted">
                <img
                  src={b.image}
                  alt={b.name}
                  loading="lazy"
                  width={1024}
                  height={1024}
                  className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
                />
              </div>
              <div className="p-8">
                <div className="mb-3 flex items-baseline justify-between">
                  <h3 className="font-display text-3xl">{b.name}</h3>
                  <span className="text-sm text-muted-foreground">Brief 0{i + 1}</span>
                </div>
                <p className="text-primary">{b.tagline}</p>
                <p className="mt-4 text-muted-foreground">{b.summary}</p>
                <div className="mt-6">
                  <p className="mb-2 text-xs uppercase tracking-wider text-muted-foreground">Suggested angles</p>
                  <div className="flex flex-wrap gap-2">
                    {b.angles.map((a) => (
                      <span key={a} className="border border-border px-3 py-1 text-sm">{a}</span>
                    ))}
                  </div>
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
    { n: "01", t: "Eligibility", d: "Open only to currently enrolled students of Masters' Union, LPU, or Tetr. You must verify with your university email." },
    { n: "02", t: "Format", d: "One Instagram reel, 15–30 seconds, vertical 9:16. Original audio or licensed music only." },
    { n: "03", t: "The brand", d: "Feature the chosen product clearly. Tag the brand and use the campaign hashtag #CreatorChallenge26." },
    { n: "04", t: "Originality", d: "Content must be created by you. No reposts, no AI-generated voiceovers without disclosure, no copyrighted footage." },
    { n: "05", t: "Account", d: "Your Instagram profile must be public throughout the judging window so the team can review submissions." },
    { n: "06", t: "Deadline", d: "Submit your handle by midnight, March 30. Winners announced April 15 across all three campuses." },
  ];

  return (
    <section id="rules" className="border-b border-border bg-card/30">
      <div className="mx-auto max-w-7xl px-6 py-20">
        <h2 className="mb-3 font-display text-5xl md:text-7xl">Rules of play.</h2>
        <p className="mb-12 max-w-xl text-muted-foreground">
          Read this carefully before you submit. Entries that don't follow the brief will be removed during the first review pass.
        </p>
        <div className="grid gap-px bg-border md:grid-cols-2 lg:grid-cols-3">
          {rules.map((r) => (
            <div key={r.n} className="bg-background p-8">
              <div className="mb-4 font-display text-4xl text-primary">{r.n}</div>
              <h3 className="mb-2 font-display text-xl">{r.t}</h3>
              <p className="text-sm text-muted-foreground">{r.d}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function SignupSection() {
  const [submitting, setSubmitting] = useState(false);
  const [done, setDone] = useState(false);

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
    setDone(true);
    form.reset();
    toast.success("You're in. We'll be reviewing your profile soon.");
  }

  return (
    <section id="signup" className="border-b border-border">
      <div className="mx-auto grid max-w-7xl gap-16 px-6 py-20 md:grid-cols-2">
        <div>
          <h2 className="font-display text-5xl md:text-7xl">
            Drop your<br />
            <span className="text-primary">handle.</span>
          </h2>
          <p className="mt-6 max-w-md text-muted-foreground">
            Submit your details and the Instagram profile we should review. You can update your reel any time before the deadline — we'll always pull the latest version of your account.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5 border border-border bg-card p-8">
          <div className="grid gap-4 md:grid-cols-2">
            <Field label="Full name *">
              <Input name="full_name" required placeholder="Your name" />
            </Field>
            <Field label="University email *">
              <Input name="email" type="email" required placeholder="you@university.edu" />
            </Field>
          </div>

          <Field label="University *">
            <div className="grid grid-cols-3 gap-2">
              {UNIVERSITIES.map((u) => (
                <label key={u} className="cursor-pointer">
                  <input type="radio" name="university" value={u} className="peer sr-only" required />
                  <div className="border border-border bg-background p-3 text-center text-sm transition peer-checked:border-primary peer-checked:text-primary">
                    {u}
                  </div>
                </label>
              ))}
            </div>
          </Field>

          <Field label="Brand you're creating for *">
            <div className="grid grid-cols-2 gap-2">
              {BRANDS.map((b) => (
                <label key={b} className="cursor-pointer">
                  <input type="radio" name="brand_choice" value={b} className="peer sr-only" required />
                  <div className="border border-border bg-background p-3 text-center text-sm transition peer-checked:border-primary peer-checked:text-primary">
                    {b}
                  </div>
                </label>
              ))}
            </div>
          </Field>

          <Field label="Instagram handle *">
            <Input name="instagram_handle" required placeholder="@yourhandle" />
          </Field>

          <Field label="Anything we should know? (optional)">
            <Textarea name="notes" rows={3} placeholder="A note about your concept, experience, or follower count." />
          </Field>

          <Button type="submit" disabled={submitting} size="lg" className="w-full rounded-full bg-primary text-primary-foreground hover:bg-primary/90">
            {submitting ? "Submitting…" : done ? "Submit another entry" : "Submit my profile"}
          </Button>
        </form>
      </div>
    </section>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="space-y-2">
      <Label className="text-xs uppercase tracking-wider text-muted-foreground">{label}</Label>
      {children}
    </div>
  );
}

function Footer() {
  return (
    <footer className="mx-auto max-w-7xl px-6 py-10 text-sm text-muted-foreground">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <p>© 2026 Creator Challenge. All briefs by participating brands.</p>
        <Link to="/admin" className="hover:text-primary">Admin dashboard →</Link>
      </div>
    </footer>
  );
}

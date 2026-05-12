import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { Toaster } from "@/components/ui/sonner";
import { Twitter, Instagram, ArrowRight, ArrowUpRight } from "lucide-react";

export const Route = createFileRoute("/")({
  component: Landing,
  head: () => ({
    meta: [
      { title: "Creator Challenge 2026 — MU × LPU × Tetr" },
      { name: "description", content: "A typographic creator competition for students of Masters' Union, LPU and Tetr." },
    ],
  }),
});

const UNIVERSITIES = ["Masters' Union", "LPU", "Tetr"] as const;
const BRANDS = ["NOIR Audio", "PULSE Energy"] as const;
const HANDLE = "@creatorchallenge26";

/* Poster color tokens */
const C = {
  ink: "#15171C",
  cream: "#F2EBDD",
  orange: "#E8853A",
  blue: "#2E5BE8",
  red: "#F0413E",
  mint: "#C8E6CB",
  olive: "#4A5A2E",
  peach: "#F2B27A",
  pink: "#E9B7E0",
  black: "#0E0F12",
};

function Landing() {
  return (
    <div className="relative min-h-screen overflow-hidden" style={{ background: C.ink, color: C.cream }}>
      <Toaster theme="dark" />
      <Header />
      <Hero />
      <Marquee />
      <Brands />
      <Stats />
      <Guidelines />
      <SignupSection />
      <Footer />
    </div>
  );
}

/* ================= POSTER CARD ================= */
type PosterProps = {
  bg: string;
  fg?: string;
  className?: string;
  rotate?: number;
  handle?: string;
  arrow?: boolean;
  children: React.ReactNode;
};
function Poster({ bg, fg = C.ink, className = "", rotate = 0, handle = HANDLE, arrow = true, children }: PosterProps) {
  return (
    <div
      className={"poster-grain relative flex flex-col overflow-hidden rounded-[14px] " + className}
      style={{ background: bg, color: fg, transform: `rotate(${rotate}deg)`, boxShadow: "0 30px 60px -25px rgba(0,0,0,0.5)" }}
    >
      <div className="flex items-center justify-between px-5 pt-4">
        <span className="text-[12px] tracking-tight" style={{ color: fg, opacity: 0.85 }}>{handle}</span>
      </div>
      <div className="mx-5 mt-2 h-px" style={{ background: fg, opacity: 0.35 }} />
      <div className="relative z-[1] flex flex-1 flex-col justify-center px-6 py-7">
        {children}
      </div>
      {arrow && (
        <div className="px-5 pb-4">
          <ArrowRight className="h-4 w-4" style={{ color: fg, opacity: 0.6 }} />
        </div>
      )}
    </div>
  );
}

/* ================= HEADER ================= */
function Header() {
  return (
    <header className="relative z-30" style={{ borderBottom: `1px solid ${C.cream}22` }}>
      <div className="mx-auto flex max-w-[1400px] items-center justify-between gap-8 px-6 py-5 md:px-10">
        <div className="flex items-center gap-3">
          <div className="grid h-10 w-10 place-items-center rounded-md" style={{ background: C.red, color: C.cream }}>
            <span className="font-serif text-[15px] italic">cc</span>
          </div>
          <div className="leading-[0.95]">
            <p className="font-display text-[14px] uppercase tracking-tight" style={{ color: C.cream }}>Creator Challenge</p>
            <p className="font-serif text-[14px] italic" style={{ color: C.peach }}>vol. 2026</p>
          </div>
        </div>

        <nav className="hidden items-center gap-7 text-[13px] md:flex" style={{ color: C.cream }}>
          <a href="#brands" className="hover:opacity-70">Brands</a>
          <a href="#stats" className="hover:opacity-70">Numbers</a>
          <a href="#rules" className="hover:opacity-70">Rules</a>
          <a href="#signup" className="hover:opacity-70">Submit</a>
          <Link to="/admin" className="opacity-50 hover:opacity-100">Admin</Link>
        </nav>

        <a
          href="#signup"
          className="hidden items-center gap-2 rounded-full px-4 py-2 text-[12px] font-bold uppercase tracking-[0.16em] md:inline-flex"
          style={{ background: C.cream, color: C.ink }}
        >
          Enter Now <ArrowUpRight className="h-3.5 w-3.5" />
        </a>
      </div>
    </header>
  );
}

/* ================= HERO ================= */
function Hero() {
  return (
    <section className="relative">
      <div className="mx-auto max-w-[1400px] px-6 pt-16 pb-24 md:px-10 md:pt-24 md:pb-32">
        <div className="grid grid-cols-12 gap-8 lg:gap-10">
          {/* Left text */}
          <div className="col-span-12 lg:col-span-6">
            <p className="font-serif text-[18px] italic" style={{ color: C.peach }}>
              — Issue 02 / Spring 2026
            </p>
            <h1 className="mt-6 font-display text-[clamp(56px,9vw,140px)] leading-[0.86] tracking-tight" style={{ color: C.cream }}>
              Make a<br />
              <span className="font-serif italic" style={{ color: C.peach }}>reel</span> that's<br />
              <span style={{ color: C.red }}>impossible</span><br />
              to scroll.
            </h1>
            <p className="mt-8 max-w-md text-[15px] leading-relaxed" style={{ color: C.cream, opacity: 0.8 }}>
              A 45-day typographic-poster competition styled like a magazine cover.
              Two real brands. Three campuses. One feed-stopping reel.
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-4">
              <a href="#signup" className="inline-flex items-center gap-2 rounded-full px-6 py-3 text-[12px] font-bold uppercase tracking-[0.18em]" style={{ background: C.red, color: C.cream }}>
                Enter the contest <ArrowUpRight className="h-4 w-4" />
              </a>
              <a href="#brands" className="inline-flex items-center gap-2 rounded-full px-6 py-3 text-[12px] font-bold uppercase tracking-[0.18em]" style={{ border: `1px solid ${C.cream}55`, color: C.cream }}>
                See the briefs
              </a>
            </div>
          </div>

          {/* Right poster collage */}
          <div className="col-span-12 lg:col-span-6">
            <div className="grid grid-cols-2 gap-5">
              <Poster bg={C.orange} rotate={-2} className="aspect-[4/5]">
                <p className="font-display text-[44px] leading-[0.9]" style={{ color: C.ink }}>
                  3<br />Campuses
                </p>
                <p className="mt-2 font-serif text-[18px] italic" style={{ color: C.ink }}>
                  one stage.
                </p>
              </Poster>

              <Poster bg={C.blue} fg={C.cream} rotate={2} className="mt-10 aspect-[4/5]">
                <p className="font-display text-[40px] leading-[0.9]">
                  Your reel<br />
                  <span className="font-serif italic" style={{ color: C.mint }}>is not</span><br />
                  a draft
                </p>
              </Poster>

              <Poster bg={C.red} fg={C.cream} rotate={1.5} className="-mt-2 aspect-[4/5]">
                <p className="font-serif text-[28px] italic">Safeword:</p>
                <p className="font-serif text-[28px] italic">Permission</p>
                <p className="font-serif text-[28px] italic">to <span className="font-display not-italic">post</span></p>
                <p className="mt-3 font-display text-[64px] leading-[0.85]">EP.02</p>
              </Poster>

              <Poster bg={C.mint} rotate={-1.5} className="mt-6 aspect-[4/5]">
                <p className="font-display text-[80px] leading-[0.85]" style={{ color: C.olive }}>
                  45
                </p>
                <p className="mt-2 font-serif text-[18px] italic" style={{ color: C.olive }}>
                  days to make<br />the cover story.
                </p>
              </Poster>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ================= MARQUEE ================= */
function Marquee() {
  const items = ["Lights", "Camera", "Action", "Cover story", "Trending audio", "Brand collabs", "#CreatorChallenge26", "Front page energy"];
  const loop = [...items, ...items, ...items];
  return (
    <section className="overflow-hidden" style={{ background: C.cream, color: C.ink, borderTop: `1px solid ${C.cream}22`, borderBottom: `1px solid ${C.cream}22` }}>
      <div className="flex w-max animate-marquee gap-10 whitespace-nowrap py-5 font-serif text-[34px] italic">
        {loop.map((t, i) => (
          <span key={i} className="flex items-center gap-10">
            {t}
            <span style={{ color: C.red }}>★</span>
          </span>
        ))}
      </div>
    </section>
  );
}

/* ================= BRANDS ================= */
function Brands() {
  const briefs = [
    {
      name: "NOIR Audio",
      tagline: "Headphones built for the dark.",
      summary: "Premium over-ear headphones for late-night creators. Active noise cancellation, 40-hour battery, studio-grade drivers.",
      angles: ["Late-night workflow", "Studio aesthetic", "Travel + commute"],
      bg: C.olive, fg: C.mint, accent: C.mint, issue: "BRIEF / 01", rotate: -1.5,
    },
    {
      name: "PULSE Energy",
      tagline: "Clean energy. Loud personality.",
      summary: "Sugar-free sparkling energy drink. 150mg natural caffeine, zero crash. Make your reel feel like the first sip.",
      angles: ["Workout / fitness", "Study + hustle", "Friends + nightlife"],
      bg: C.pink, fg: C.blue, accent: C.blue, issue: "BRIEF / 02", rotate: 1.5,
    },
  ];

  return (
    <section id="brands" className="relative" style={{ background: C.ink }}>
      <div className="mx-auto max-w-[1400px] px-6 py-28 md:px-10 md:py-36">
        <div className="mb-16 grid items-end gap-6 md:grid-cols-12">
          <div className="md:col-span-8">
            <p className="font-serif text-[18px] italic" style={{ color: C.peach }}>The brief — pick one.</p>
            <h2 className="mt-4 font-display text-[clamp(48px,7vw,108px)] leading-[0.9]" style={{ color: C.cream }}>
              Two brands.<br />
              <span className="font-serif italic" style={{ color: C.red }}>One</span> reel.
            </h2>
          </div>
          <p className="md:col-span-4 text-[14px] leading-relaxed" style={{ color: C.cream, opacity: 0.75 }}>
            Build a 15–30s vertical reel for the brand of your choice. Make it feel like a magazine cover, not an ad.
          </p>
        </div>

        <div className="grid gap-12 md:grid-cols-2">
          {briefs.map((b) => (
            <article key={b.name} className="group">
              <Poster bg={b.bg} fg={b.fg} rotate={b.rotate} className="aspect-[4/5]" handle={`@${b.name.toLowerCase().replace(" ", "")}`}>
                <p className="font-serif text-[22px] italic">{b.tagline.split(" ").slice(0, 3).join(" ")}</p>
                <p className="font-serif text-[22px] italic">{b.tagline.split(" ").slice(3).join(" ")}</p>
                <p className="mt-6 font-display text-[clamp(56px,8vw,96px)] leading-[0.85]" style={{ color: b.accent }}>
                  {b.name.split(" ")[0]}
                </p>
                <p className="font-display text-[clamp(56px,8vw,96px)] leading-[0.85]" style={{ color: b.fg }}>
                  {b.name.split(" ")[1]}
                </p>
                <p className="mt-4 text-[11px] uppercase tracking-[0.22em]" style={{ color: b.fg, opacity: 0.7 }}>{b.issue}</p>
              </Poster>

              <div className="mt-8 grid grid-cols-12 gap-5">
                <div className="col-span-12 md:col-span-7">
                  <p className="font-serif text-[22px] italic" style={{ color: C.peach }}>"{b.tagline}"</p>
                  <p className="mt-3 text-[14px] leading-relaxed" style={{ color: C.cream, opacity: 0.8 }}>{b.summary}</p>
                </div>
                <ul className="col-span-12 space-y-1 text-[12px] uppercase tracking-[0.16em] md:col-span-5" style={{ color: C.cream }}>
                  {b.angles.map((a) => (
                    <li key={a} className="flex items-center gap-2 border-b py-2" style={{ borderColor: `${C.cream}22` }}>
                      <span style={{ color: C.red }}>→</span> {a}
                    </li>
                  ))}
                </ul>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ================= STATS ================= */
function Stats() {
  const stats = [
    { n: "3", l: "Campuses", bg: C.orange, fg: C.ink },
    { n: "2", l: "Real Brands", bg: C.mint, fg: C.olive },
    { n: "₹5L", l: "Prize Pool", bg: C.red, fg: C.cream },
    { n: "45d", l: "To Create", bg: C.blue, fg: C.cream },
  ];
  return (
    <section id="stats" style={{ background: C.ink }}>
      <div className="mx-auto max-w-[1400px] px-6 pb-24 md:px-10">
        <p className="mb-8 font-serif text-[18px] italic" style={{ color: C.peach }}>— By the numbers</p>
        <div className="grid grid-cols-2 gap-5 md:grid-cols-4">
          {stats.map((s, i) => (
            <Poster key={s.l} bg={s.bg} fg={s.fg} rotate={i % 2 === 0 ? -1 : 1} className="aspect-[4/5]" handle={HANDLE} arrow={false}>
              <p className="font-display text-[clamp(64px,10vw,140px)] leading-[0.82]" style={{ color: s.fg }}>{s.n}</p>
              <p className="mt-3 font-serif text-[20px] italic" style={{ color: s.fg }}>{s.l}</p>
            </Poster>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ================= GUIDELINES ================= */
function Guidelines() {
  const rules = [
    { n: "01", t: "Eligibility", d: "Open to enrolled students of Masters' Union, LPU, or Tetr. Verify with your university email.", bg: C.peach, fg: C.ink, accent: C.red },
    { n: "02", t: "Format", d: "One Instagram reel, 15–30 seconds, vertical 9:16. Original or licensed audio only.", bg: C.blue, fg: C.cream, accent: C.mint },
    { n: "03", t: "The brand", d: "Feature the chosen product clearly. Tag the brand and use #CreatorChallenge26.", bg: C.red, fg: C.cream, accent: C.peach },
    { n: "04", t: "Originality", d: "Created by you. No reposts, no AI voiceovers without disclosure, no copyrighted footage.", bg: C.olive, fg: C.mint, accent: C.peach },
    { n: "05", t: "Account", d: "Your Instagram profile must be public throughout the judging window.", bg: C.pink, fg: C.ink, accent: C.blue },
    { n: "06", t: "Deadline", d: "Submit by midnight, March 30. Winners announced April 15 across all three campuses.", bg: C.mint, fg: C.olive, accent: C.red },
  ];

  return (
    <section id="rules" style={{ background: C.cream, color: C.ink }}>
      <div className="mx-auto max-w-[1400px] px-6 py-28 md:px-10 md:py-36">
        <div className="mb-14 grid gap-8 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-8">
            <p className="font-serif text-[18px] italic" style={{ color: C.red }}>The playbook</p>
            <h2 className="mt-4 font-display text-[clamp(48px,7.5vw,108px)] leading-[0.92]" style={{ color: C.ink }}>
              Rules of <span className="font-serif italic" style={{ color: C.blue }}>play</span>
              <span style={{ color: C.red }}>.</span>
            </h2>
          </div>
          <p className="lg:col-span-4 text-[14px] leading-relaxed" style={{ color: C.ink, opacity: 0.7 }}>
            Six things to keep in mind before you hit submit. Read once. Then go make something worth watching.
          </p>
        </div>

        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {rules.map((r, i) => (
            <Poster
              key={r.n}
              bg={r.bg}
              fg={r.fg}
              rotate={[-1.5, 1, -1, 1.5, -1, 1][i]}
              className="aspect-[4/5]"
              arrow={false}
            >
              <div className="flex items-center justify-between">
                <span className="font-serif text-[16px] italic" style={{ color: r.fg, opacity: 0.7 }}>/ {r.n}</span>
                <span className="rounded-full px-3 py-1 text-[10px] font-bold uppercase tracking-[0.18em]" style={{ background: r.accent, color: r.bg }}>
                  Rule
                </span>
              </div>
              <h3 className="mt-8 font-display text-[clamp(36px,4.5vw,56px)] leading-[0.95]" style={{ color: r.fg }}>
                {r.t}
                <span style={{ color: r.accent }}>.</span>
              </h3>
              <p className="mt-4 font-serif text-[18px] italic leading-snug" style={{ color: r.fg, opacity: 0.85 }}>
                {r.d}
              </p>
            </Poster>
          ))}
        </div>

        <div className="mt-12 flex flex-wrap items-center justify-between gap-6 rounded-2xl px-8 py-7" style={{ background: C.ink, color: C.cream }}>
          <div className="flex items-center gap-4">
            <span className="rounded-full px-3 py-1 text-[10px] font-bold uppercase tracking-[0.2em]" style={{ background: C.red, color: C.cream }}>Heads up</span>
            <p className="font-serif text-[22px] italic">Miss a rule, miss the prize. We disqualify quietly.</p>
          </div>
          <a href="#signup" className="inline-flex items-center gap-2 rounded-full px-6 py-3 text-[12px] font-bold uppercase tracking-[0.18em]" style={{ background: C.cream, color: C.ink }}>
            I'm in <ArrowUpRight className="h-4 w-4" />
          </a>
        </div>
      </div>
    </section>
  );
}

/* ================= SIGNUP ================= */
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

  const inputCls = "h-12 w-full rounded-lg bg-white px-4 text-[14px] text-[#15171C] placeholder:text-black/40 focus:outline-none focus:ring-2 focus:ring-black/40";

  return (
    <section id="signup" style={{ background: C.ink }}>
      <div className="mx-auto max-w-[1400px] px-6 py-28 md:px-10 md:py-36">
        <div className="grid gap-12 md:grid-cols-12">
          <div className="md:col-span-5">
            <p className="font-serif text-[18px] italic" style={{ color: C.peach }}>The application</p>
            <h2 className="mt-4 font-display text-[clamp(44px,6.5vw,92px)] leading-[0.9]" style={{ color: C.cream }}>
              Drop your<br />
              <span className="font-serif italic" style={{ color: C.red }}>handle</span>
              <span style={{ color: C.peach }}>.</span>
            </h2>
            <p className="mt-6 max-w-sm text-[14px] leading-relaxed" style={{ color: C.cream, opacity: 0.75 }}>
              Submit your details and the Instagram profile we should review. Update your reel any
              time before the deadline — we'll always pull the latest version.
            </p>

            <div className="mt-8 inline-block rounded-2xl px-5 py-4" style={{ background: C.red, color: C.cream }}>
              <p className="font-serif text-[13px] italic">— Submission window</p>
              <p className="mt-1 font-display text-[24px]">FEB 14 → MAR 30</p>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="md:col-span-7">
            <div className="space-y-5 rounded-3xl p-8" style={{ background: C.cream }}>
              <div className="grid gap-5 md:grid-cols-2">
                <Field label="Full name">
                  <input name="full_name" required placeholder="Your name" className={inputCls} />
                </Field>
                <Field label="University email">
                  <input name="email" type="email" required placeholder="you@university.edu" className={inputCls} />
                </Field>
              </div>

              <Field label="University">
                <div className="grid grid-cols-3 gap-3">
                  {UNIVERSITIES.map((u) => (
                    <label key={u} className="cursor-pointer">
                      <input type="radio" name="university" value={u} className="peer sr-only" required />
                      <div
                        className="flex h-12 items-center justify-center rounded-lg bg-white px-3 text-center text-[12px] font-bold uppercase tracking-[0.12em] text-[#15171C] transition peer-checked:bg-[#15171C] peer-checked:text-[#F2EBDD]"
                      >
                        {u}
                      </div>
                    </label>
                  ))}
                </div>
              </Field>

              <Field label="Brand you're creating for">
                <div className="grid grid-cols-2 gap-3">
                  {BRANDS.map((b, i) => (
                    <label key={b} className="cursor-pointer">
                      <input type="radio" name="brand_choice" value={b} className="peer sr-only" required />
                      <div
                        className="flex h-14 items-center justify-center gap-2 rounded-lg bg-white px-4 text-center text-[13px] font-bold uppercase tracking-[0.14em] text-[#15171C] transition peer-checked:ring-2 peer-checked:ring-[#15171C]"
                      >
                        <span className="inline-block h-3 w-3 rounded-sm" style={{ background: i === 0 ? C.olive : C.blue }} />
                        {b}
                      </div>
                    </label>
                  ))}
                </div>
              </Field>

              <Field label="Instagram handle">
                <input name="instagram_handle" required placeholder="yourhandle" className={inputCls} />
              </Field>

              <Field label="Anything we should know? (optional)">
                <Textarea name="notes" rows={3} placeholder="Concept, experience, follower count…" className="rounded-lg bg-white p-4 text-[14px] text-[#15171C]" />
              </Field>

              <div className="flex flex-wrap items-center justify-between gap-4 pt-2">
                <p className="text-[11px] uppercase tracking-[0.16em]" style={{ color: C.ink, opacity: 0.55 }}>By submitting you agree to the contest rules.</p>
                <Button
                  type="submit"
                  disabled={submitting}
                  className="h-12 rounded-full px-8 text-[12px] font-bold uppercase tracking-[0.2em]"
                  style={{ background: C.red, color: C.cream }}
                >
                  {submitting ? "Submitting…" : "Submit my profile →"}
                </Button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="space-y-2">
      <Label className="text-[11px] font-bold uppercase tracking-[0.18em]" style={{ color: C.ink }}>{label}</Label>
      {children}
    </div>
  );
}

/* ================= FOOTER ================= */
function Footer() {
  return (
    <footer style={{ background: C.black, color: C.cream }}>
      <div className="mx-auto max-w-[1400px] px-6 py-16 md:px-10">
        <div className="grid gap-10 md:grid-cols-12">
          <div className="md:col-span-6">
            <div className="flex items-center gap-3">
              <div className="grid h-10 w-10 place-items-center rounded-md" style={{ background: C.red, color: C.cream }}>
                <span className="font-serif italic">cc</span>
              </div>
              <p className="font-display text-[20px] uppercase tracking-tight">Creator Challenge 2026</p>
            </div>
            <p className="mt-6 max-w-md font-serif text-[28px] italic leading-tight" style={{ color: C.peach }}>
              "The cover story belongs to the bravest reel."
            </p>
            <p className="mt-4 max-w-sm text-[13px] leading-relaxed opacity-70">
              Built with Masters' Union, LPU and Tetr. Powered by real brands and creators who refuse to scroll past.
            </p>
          </div>
          <div className="md:col-span-3">
            <p className="text-[11px] uppercase tracking-[0.18em] opacity-60">Sections</p>
            <ul className="mt-4 space-y-2 text-[14px]">
              <li><a href="#brands" className="hover:opacity-70">Brands</a></li>
              <li><a href="#rules" className="hover:opacity-70">Rules</a></li>
              <li><a href="#signup" className="hover:opacity-70">Submit</a></li>
              <li><Link to="/admin" className="hover:opacity-70">Admin</Link></li>
            </ul>
          </div>
          <div className="md:col-span-3">
            <p className="text-[11px] uppercase tracking-[0.18em] opacity-60">Follow</p>
            <ul className="mt-4 space-y-2 text-[14px]">
              <li className="flex items-center gap-2"><Instagram className="h-4 w-4" style={{ color: C.red }} /> @creatorchallenge</li>
              <li className="flex items-center gap-2"><Twitter className="h-4 w-4" style={{ color: C.red }} /> @cc26</li>
            </ul>
          </div>
        </div>
        <div className="mt-12 flex flex-wrap items-center justify-between gap-4 border-t pt-6 text-[12px] uppercase tracking-[0.18em] opacity-60" style={{ borderColor: "rgba(255,255,255,0.12)" }}>
          <p>© 2026 Creator Challenge · MU × LPU × Tetr</p>
          <p>Issue 02 — Spring '26</p>
        </div>
      </div>
    </footer>
  );
}

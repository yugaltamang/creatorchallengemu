import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { Toaster } from "@/components/ui/sonner";
import { Twitter, Sparkles, Instagram, Heart, MessageCircle, Send, Bookmark, MoreHorizontal, ArrowRight } from "lucide-react";
import brand1 from "@/assets/brand-1.jpg";
import brand2 from "@/assets/brand-2.jpg";
import creatorGirl from "@/assets/creator-girl.png";

export const Route = createFileRoute("/")({
  component: Landing,
  head: () => ({
    meta: [
      { title: "Creator Challenge 2026 — MU × LPU × Tetr" },
      { name: "description", content: "An editorial creator competition for students of Masters' Union, LPU and Tetr." },
    ],
  }),
});

const UNIVERSITIES = ["Masters' Union", "LPU", "Tetr"] as const;
const BRANDS = ["NOIR Audio", "PULSE Energy"] as const;

const INK = "#16181D";
const CREAM = "#EFE8DA";
const RED = "#E33C2B";
const GREEN = "#1F8A4C";
const BLUE = "#3D7BD9";

function Landing() {
  return (
    <div className="relative min-h-screen overflow-hidden" style={{ background: CREAM, color: INK }}>
      <Toaster theme="light" />
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

/* ---------------- Instagram-style card ---------------- */
function IGCard({
  bg,
  caption,
  username = "creatorchallenge",
  rotate = 0,
  className = "",
  children,
}: {
  bg: string;
  caption?: string;
  username?: string;
  rotate?: number;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <div
      className={"relative bg-white shadow-[6px_6px_0_0_#16181D] " + className}
      style={{ transform: `rotate(${rotate}deg)`, border: `1px solid ${INK}` }}
    >
      {/* Header */}
      <div className="flex items-center justify-between border-b px-3 py-2" style={{ borderColor: INK }}>
        <div className="flex items-center gap-2">
          <div className="grid h-6 w-6 place-items-center rounded-full" style={{ background: INK, color: CREAM }}>
            <span className="font-serif text-[11px] italic">cc</span>
          </div>
          <span className="font-serif text-[15px] italic" style={{ color: INK }}>Instagram</span>
        </div>
        <MoreHorizontal className="h-4 w-4" style={{ color: INK }} />
      </div>

      {/* Body */}
      <div className="relative aspect-square overflow-hidden" style={{ background: bg }}>
        {children}
        {caption && (
          <div className="absolute left-3 top-3 max-w-[70%]">
            <h3 className="font-display text-[20px] leading-[0.95] tracking-tight text-white">
              {caption}
            </h3>
          </div>
        )}
        <span className="absolute bottom-2 right-3 text-[10px] font-medium uppercase tracking-[0.18em] text-white/85">
          @{username}
        </span>
      </div>

      {/* Footer actions */}
      <div className="flex items-center gap-3 px-3 py-2" style={{ color: INK }}>
        <Heart className="h-4 w-4" />
        <MessageCircle className="h-4 w-4" />
        <Send className="h-4 w-4" />
        <Bookmark className="ml-auto h-4 w-4" />
      </div>
    </div>
  );
}

/* ---------------- Header ---------------- */
function Header() {
  return (
    <header className="relative z-30" style={{ borderBottom: `1px solid ${INK}` }}>
      <div className="mx-auto flex max-w-[1400px] items-center justify-between gap-8 px-6 py-5 md:px-10">
        <div className="flex items-center gap-3">
          <div className="grid h-10 w-10 place-items-center" style={{ background: INK, color: CREAM }}>
            <span className="font-serif text-[15px] italic">cc</span>
          </div>
          <div className="leading-[0.95]">
            <p className="font-display text-[15px] uppercase tracking-tight">Creator Challenge</p>
            <p className="font-serif text-[14px] italic" style={{ color: RED }}>vol. 2026</p>
          </div>
        </div>

        <nav className="hidden items-center gap-8 text-[13px] font-medium md:flex">
          <a href="#brands" className="hover:underline">Brands</a>
          <a href="#stats" className="hover:underline">Numbers</a>
          <a href="#rules" className="hover:underline">Rules</a>
          <a href="#signup" className="hover:underline">Submit</a>
          <Link to="/admin" className="opacity-60 hover:underline">Admin</Link>
        </nav>

        <a
          href="#signup"
          className="hidden items-center gap-2 px-4 py-2 text-[12px] font-bold uppercase tracking-[0.18em] md:inline-flex"
          style={{ background: RED, color: CREAM }}
        >
          Enter Now <ArrowRight className="h-3.5 w-3.5" />
        </a>
      </div>

      {/* Top thin meta bar */}
      <div className="mx-auto flex max-w-[1400px] items-center justify-between gap-6 px-6 py-2 text-[11px] uppercase tracking-[0.22em] md:px-10" style={{ borderTop: `1px solid ${INK}`, background: INK, color: CREAM }}>
        <span>Issue 02 — Spring '26</span>
        <span className="hidden md:inline">A reel-making contest for India's most chaotic students</span>
        <span>Feb 14 — Mar 30</span>
      </div>
    </header>
  );
}

/* ---------------- Hero ---------------- */
function Hero() {
  return (
    <section className="relative">
      <div className="mx-auto grid max-w-[1400px] grid-cols-12 gap-6 px-6 pb-20 pt-14 md:px-10 md:pb-28 md:pt-20">
        {/* Left — headline */}
        <div className="col-span-12 lg:col-span-7">
          <p className="mb-6 font-serif text-[18px] italic" style={{ color: RED }}>
            Featuring — Masters' Union · LPU · Tetr
          </p>
          <h1 className="font-display text-[clamp(56px,9vw,150px)] leading-[0.86] tracking-tight" style={{ color: INK }}>
            Make a reel.<br />
            <span className="font-serif italic" style={{ color: RED }}>Get</span> picked.<br />
            <span style={{ color: GREEN }}>Get</span> <span style={{ color: BLUE }}>paid</span>.
          </h1>
          <p className="mt-8 max-w-md text-[15px] leading-relaxed" style={{ color: INK }}>
            A 45-day creator competition styled like a magazine you'd actually keep.
            Two real brands, three campuses, one shot at the cover.
          </p>
          <div className="mt-8 flex flex-wrap items-center gap-4">
            <a href="#signup" className="inline-flex items-center gap-2 px-6 py-3 text-[13px] font-bold uppercase tracking-[0.18em]" style={{ background: INK, color: CREAM }}>
              Enter the contest <ArrowRight className="h-4 w-4" />
            </a>
            <a href="#brands" className="inline-flex items-center gap-2 px-6 py-3 text-[13px] font-bold uppercase tracking-[0.18em]" style={{ border: `1px solid ${INK}` }}>
              See the briefs
            </a>
          </div>
        </div>

        {/* Right — IG card grid */}
        <div className="col-span-12 lg:col-span-5">
          <div className="grid grid-cols-2 gap-4">
            <IGCard bg={RED} username="maya.shoots" rotate={-2} className="mt-6">
              <div className="absolute inset-0" style={{ background: BLUE, clipPath: "polygon(0 0, 55% 0, 0 100%)" }} />
              <img src={creatorGirl} alt="Creator" className="duotone-red absolute inset-0 h-full w-full object-cover object-top" />
              <div className="absolute left-3 top-3 max-w-[80%]">
                <h3 className="font-display text-[22px] leading-[0.95] text-white">Creator<br/>Challenge<br/>2026</h3>
                <p className="mt-1 text-[10px] uppercase tracking-[0.2em] text-white/90">3 campuses · India</p>
              </div>
            </IGCard>

            <IGCard bg={GREEN} username="noir.audio" rotate={1.5} className="mt-16">
              <div className="absolute inset-0" style={{ background: RED, clipPath: "polygon(45% 0, 100% 0, 100% 100%, 70% 100%)" }} />
              <img src={brand1} alt="NOIR Audio" className="duotone-green absolute inset-0 h-full w-full object-cover" />
              <div className="absolute bottom-10 left-3">
                <p className="font-display text-[18px] text-white leading-tight">NOIR<br/>Audio</p>
              </div>
            </IGCard>

            <IGCard bg={BLUE} username="pulse.energy" rotate={1} className="-mt-2 col-span-2 mx-auto w-2/3">
              <div className="absolute inset-0" style={{ background: GREEN, clipPath: "polygon(0 60%, 100% 30%, 100% 100%, 0 100%)" }} />
              <img src={brand2} alt="PULSE Energy" className="duotone-blue absolute inset-0 h-full w-full object-cover" />
              <div className="absolute right-3 top-3 max-w-[60%] text-right">
                <p className="font-display text-[18px] text-white leading-tight">PULSE<br/>Energy</p>
              </div>
            </IGCard>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------------- Marquee ---------------- */
function Marquee() {
  const items = ["Lights", "Camera", "Action", "Trending audio", "Brand collabs", "#CreatorChallenge26", "Cover story", "Front page energy"];
  const loop = [...items, ...items, ...items];
  return (
    <section className="overflow-hidden" style={{ background: INK, color: CREAM, borderTop: `1px solid ${INK}`, borderBottom: `1px solid ${INK}` }}>
      <div className="flex w-max animate-marquee gap-10 whitespace-nowrap py-5 font-serif text-[34px] italic">
        {loop.map((t, i) => (
          <span key={i} className="flex items-center gap-10">
            {t}
            <span style={{ color: RED }}>★</span>
          </span>
        ))}
      </div>
    </section>
  );
}

/* ---------------- Brands ---------------- */
function Brands() {
  const brands = [
    {
      name: "NOIR Audio",
      tagline: "Headphones built for the dark.",
      image: brand1,
      summary:
        "Premium over-ear headphones for late-night creators. Active noise cancellation, 40-hour battery, studio-grade drivers.",
      angles: ["Late-night workflow", "Studio aesthetic", "Travel + commute"],
      bg: GREEN,
      block: RED,
      duotone: "duotone-green",
      issue: "Brief 01",
    },
    {
      name: "PULSE Energy",
      tagline: "Clean energy. Loud personality.",
      image: brand2,
      summary:
        "Sugar-free sparkling energy drink. 150mg natural caffeine, zero crash. Make your reel feel like the first sip.",
      angles: ["Workout / fitness", "Study + hustle", "Friends + nightlife"],
      bg: BLUE,
      block: RED,
      duotone: "duotone-blue",
      issue: "Brief 02",
    },
  ];

  return (
    <section id="brands" style={{ borderBottom: `1px solid ${INK}` }}>
      <div className="mx-auto max-w-[1400px] px-6 py-24 md:px-10 md:py-32">
        <div className="mb-14 grid items-end gap-6 md:grid-cols-12">
          <div className="md:col-span-8">
            <p className="font-serif text-[18px] italic" style={{ color: RED }}>The Brief — pick one.</p>
            <h2 className="mt-4 font-display text-[clamp(48px,7vw,108px)] leading-[0.9]">
              Two brands.<br />
              <span className="font-serif italic" style={{ color: BLUE }}>One</span> reel.
            </h2>
          </div>
          <p className="md:col-span-4 text-[14px] leading-relaxed">
            Build a 15–30s vertical reel for the brand of your choice. Make it impossible to scroll past.
          </p>
        </div>

        <div className="grid gap-10 md:grid-cols-2">
          {brands.map((b, i) => (
            <article key={b.name} className="group">
              <IGCard bg={b.bg} username={b.name.toLowerCase().replace(" ", ".")} rotate={i === 0 ? -1 : 1}>
                <div className="absolute inset-0" style={{ background: b.block, clipPath: i === 0 ? "polygon(0 0, 45% 0, 0 100%)" : "polygon(55% 0, 100% 0, 100% 100%, 80% 100%)" }} />
                <img src={b.image} alt={b.name} className={`${b.duotone} absolute inset-0 h-full w-full object-cover`} />
                <div className={`absolute ${i === 0 ? "right-4 top-4 text-right" : "left-4 top-4"} max-w-[60%]`}>
                  <p className="text-[10px] uppercase tracking-[0.22em] text-white/85">{b.issue}</p>
                  <h3 className="mt-1 font-display text-[28px] leading-[0.92] text-white">{b.name}</h3>
                </div>
              </IGCard>

              <div className="mt-6 grid grid-cols-12 gap-4">
                <div className="col-span-12 md:col-span-8">
                  <p className="font-serif text-[20px] italic" style={{ color: RED }}>"{b.tagline}"</p>
                  <p className="mt-3 text-[14px] leading-relaxed">{b.summary}</p>
                </div>
                <ul className="col-span-12 space-y-1 text-[12px] uppercase tracking-[0.16em] md:col-span-4">
                  {b.angles.map((a) => (
                    <li key={a} className="flex items-center gap-2 border-b py-1.5" style={{ borderColor: INK }}>
                      <span style={{ color: RED }}>→</span> {a}
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

/* ---------------- Stats strip ---------------- */
function Stats() {
  const stats = [
    { n: "3", l: "Campuses", color: RED },
    { n: "2", l: "Real Brands", color: GREEN },
    { n: "₹5L", l: "Prize Pool", color: BLUE },
    { n: "45d", l: "To Create", color: INK },
  ];
  return (
    <section id="stats" style={{ borderBottom: `1px solid ${INK}` }}>
      <div className="mx-auto grid max-w-[1400px] grid-cols-2 md:grid-cols-4">
        {stats.map((s, i) => (
          <div
            key={s.l}
            className="flex flex-col justify-between p-8 md:p-10"
            style={{
              background: s.color,
              color: s.color === INK ? CREAM : "white",
              borderRight: i < 3 ? `1px solid ${INK}` : undefined,
              borderBottom: i < 2 ? `1px solid ${INK}` : undefined,
            }}
          >
            <p className="font-serif text-[14px] italic">— {s.l}</p>
            <p className="mt-10 font-display text-[clamp(56px,8vw,120px)] leading-[0.85] tracking-tight">{s.n}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

/* ---------------- Guidelines (editorial dark bento) ---------------- */
function Guidelines() {
  const rules = [
    { n: "01", t: "Eligibility", d: "Open to currently enrolled students of Masters' Union, LPU, or Tetr. Verify with your university email.", chip: "Who can enter" },
    { n: "02", t: "Format", d: "One Instagram reel, 15–30 seconds, vertical 9:16. Original or licensed audio only.", chip: "Spec sheet" },
    { n: "03", t: "The brand", d: "Feature the chosen product clearly. Tag the brand and use #CreatorChallenge26.", chip: "Brand brief" },
    { n: "04", t: "Originality", d: "Created by you. No reposts, no AI voiceovers without disclosure, no copyrighted footage.", chip: "Be original" },
    { n: "05", t: "Account", d: "Your Instagram profile must be public throughout the judging window.", chip: "Visibility" },
    { n: "06", t: "Deadline", d: "Submit by midnight, March 30. Winners announced April 15 across all three campuses.", chip: "Timeline" },
  ];

  const accents = [RED, INK, BLUE, INK, GREEN, INK];

  return (
    <section id="rules" style={{ background: INK, color: CREAM, borderBottom: `1px solid ${INK}` }}>
      <div className="mx-auto max-w-[1400px] px-6 py-28 md:px-10">
        <div className="mb-14 grid gap-8 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-8">
            <p className="font-serif text-[18px] italic" style={{ color: RED }}>The Playbook</p>
            <h2 className="mt-4 font-display text-[clamp(48px,7.5vw,108px)] leading-[0.92]">
              Rules of <span className="font-serif italic" style={{ color: BLUE }}>play</span>
              <span style={{ color: RED }}>.</span>
            </h2>
          </div>
          <p className="lg:col-span-4 text-[14px] leading-relaxed text-white/70">
            Six things to keep in mind before you hit submit. Read once. Then go make something worth watching.
          </p>
        </div>

        <div className="grid gap-0 md:grid-cols-2 lg:grid-cols-3" style={{ border: `1px solid ${CREAM}` }}>
          {rules.map((r, i) => {
            const accent = accents[i];
            return (
              <article
                key={r.n}
                className="relative flex min-h-[300px] flex-col justify-between p-7"
                style={{
                  borderRight: (i + 1) % 3 !== 0 ? `1px solid ${CREAM}` : undefined,
                  borderBottom: i < 3 ? `1px solid ${CREAM}` : undefined,
                }}
              >
                <div className="flex items-start justify-between">
                  <span className="font-serif text-[16px] italic text-white/60">/ {r.n}</span>
                  <span className="px-2 py-1 text-[10px] font-bold uppercase tracking-[0.16em]" style={{ background: accent, color: accent === INK ? CREAM : "white" }}>
                    {r.chip}
                  </span>
                </div>
                <div className="mt-12">
                  <h3 className="font-display text-[34px] leading-[1.02] tracking-tight">
                    {r.t}<span style={{ color: accent === INK ? RED : accent }}>.</span>
                  </h3>
                  <div className="mt-3 h-[3px] w-16" style={{ background: accent === INK ? RED : accent }} />
                </div>
                <p className="mt-6 text-[14px] leading-relaxed text-white/70">{r.d}</p>
              </article>
            );
          })}
        </div>

        <div className="mt-10 flex flex-wrap items-center justify-between gap-6 px-8 py-6" style={{ background: CREAM, color: INK }}>
          <div className="flex items-center gap-4">
            <span className="px-2 py-1 text-[10px] font-bold uppercase tracking-[0.2em]" style={{ background: RED, color: CREAM }}>Heads up</span>
            <p className="font-serif text-[22px] italic">Miss a rule, miss the prize. We disqualify quietly.</p>
          </div>
          <a href="#signup" className="inline-flex items-center gap-2 px-6 py-3 text-[13px] font-bold uppercase tracking-[0.18em]" style={{ background: INK, color: CREAM }}>
            I'm in <ArrowRight className="h-4 w-4" />
          </a>
        </div>
      </div>
    </section>
  );
}

/* ---------------- Signup ---------------- */
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

  const inputCls = "h-12 w-full bg-white px-4 text-[14px] focus:outline-none focus:ring-2";
  const inputStyle = { border: `1px solid ${INK}`, color: INK } as React.CSSProperties;

  return (
    <section id="signup" style={{ borderBottom: `1px solid ${INK}` }}>
      <div className="mx-auto max-w-[1400px] px-6 py-24 md:px-10 md:py-32">
        <div className="grid gap-12 md:grid-cols-12">
          <div className="md:col-span-5">
            <p className="font-serif text-[18px] italic" style={{ color: RED }}>The application</p>
            <h2 className="mt-4 font-display text-[clamp(44px,6.5vw,92px)] leading-[0.9]">
              Drop your<br /><span className="font-serif italic" style={{ color: BLUE }}>handle</span>
              <span style={{ color: RED }}>.</span>
            </h2>
            <p className="mt-6 max-w-sm text-[14px] leading-relaxed">
              Submit your details and the Instagram profile we should review. Update your reel any
              time before the deadline — we'll always pull the latest version.
            </p>

            <div className="mt-10 inline-block px-5 py-4" style={{ background: INK, color: CREAM }}>
              <p className="font-serif text-[13px] italic">— Submission window</p>
              <p className="mt-1 font-display text-[24px]">FEB 14 → MAR 30</p>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="md:col-span-7">
            <div className="space-y-5 p-8" style={{ background: CREAM, border: `1px solid ${INK}` }}>
              <div className="grid gap-5 md:grid-cols-2">
                <Field label="Full name">
                  <input name="full_name" required placeholder="Your name" className={inputCls} style={inputStyle} />
                </Field>
                <Field label="University email">
                  <input name="email" type="email" required placeholder="you@university.edu" className={inputCls} style={inputStyle} />
                </Field>
              </div>

              <Field label="University">
                <div className="grid grid-cols-3 gap-3">
                  {UNIVERSITIES.map((u) => (
                    <label key={u} className="cursor-pointer">
                      <input type="radio" name="university" value={u} className="peer sr-only" required />
                      <div
                        className="flex h-12 items-center justify-center bg-white px-3 text-center text-[12px] font-bold uppercase tracking-[0.12em] transition peer-checked:bg-[var(--zine-ink)] peer-checked:text-[var(--zine-cream)]"
                        style={{ border: `1px solid ${INK}` }}
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
                        className="flex h-14 items-center justify-center bg-white px-4 text-center text-[13px] font-bold uppercase tracking-[0.14em] transition"
                        style={{ border: `1px solid ${INK}` }}
                        data-brand={b}
                      >
                        <span className="mr-2 inline-block h-3 w-3" style={{ background: i === 0 ? GREEN : BLUE }} />
                        {b}
                      </div>
                    </label>
                  ))}
                </div>
              </Field>

              <Field label="Instagram handle">
                <input name="instagram_handle" required placeholder="yourhandle" className={inputCls} style={inputStyle} />
              </Field>

              <Field label="Anything we should know? (optional)">
                <Textarea name="notes" rows={3} placeholder="Concept, experience, follower count…" className="bg-white p-4 text-[14px]" style={inputStyle} />
              </Field>

              <div className="flex flex-wrap items-center justify-between gap-4 pt-2">
                <p className="text-[11px] uppercase tracking-[0.16em] opacity-60">By submitting you agree to the contest rules.</p>
                <Button
                  type="submit"
                  disabled={submitting}
                  className="h-12 rounded-none px-8 text-[12px] font-bold uppercase tracking-[0.2em]"
                  style={{ background: RED, color: CREAM }}
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
      <Label className="text-[11px] font-bold uppercase tracking-[0.18em]" style={{ color: INK }}>{label}</Label>
      {children}
    </div>
  );
}

/* ---------------- Footer ---------------- */
function Footer() {
  return (
    <footer style={{ background: INK, color: CREAM }}>
      <div className="mx-auto max-w-[1400px] px-6 py-16 md:px-10">
        <div className="grid gap-10 md:grid-cols-12">
          <div className="md:col-span-6">
            <div className="flex items-center gap-3">
              <div className="grid h-10 w-10 place-items-center" style={{ background: RED, color: CREAM }}>
                <span className="font-serif italic">cc</span>
              </div>
              <p className="font-display text-[20px] uppercase tracking-tight">Creator Challenge 2026</p>
            </div>
            <p className="mt-6 max-w-md font-serif text-[24px] italic leading-tight">
              "The cover story belongs to the bravest reel."
            </p>
            <p className="mt-4 max-w-sm text-[13px] leading-relaxed text-white/70">
              Built with Masters' Union, LPU and Tetr. Powered by real brands and creators who refuse to scroll past.
            </p>
          </div>
          <div className="md:col-span-3">
            <p className="text-[11px] uppercase tracking-[0.18em] text-white/60">Sections</p>
            <ul className="mt-4 space-y-2 text-[14px]">
              <li><a href="#brands" className="hover:underline">Brands</a></li>
              <li><a href="#rules" className="hover:underline">Rules</a></li>
              <li><a href="#signup" className="hover:underline">Submit</a></li>
              <li><Link to="/admin" className="hover:underline">Admin</Link></li>
            </ul>
          </div>
          <div className="md:col-span-3">
            <p className="text-[11px] uppercase tracking-[0.18em] text-white/60">Follow</p>
            <ul className="mt-4 space-y-2 text-[14px]">
              <li className="flex items-center gap-2"><Instagram className="h-4 w-4" style={{ color: RED }} /> @creatorchallenge</li>
              <li className="flex items-center gap-2"><Twitter className="h-4 w-4" style={{ color: RED }} /> @cc26</li>
              <li className="flex items-center gap-2"><Sparkles className="h-4 w-4" style={{ color: RED }} /> #CreatorChallenge26</li>
            </ul>
          </div>
        </div>
        <div className="mt-12 flex flex-wrap items-center justify-between gap-4 border-t pt-6 text-[12px] uppercase tracking-[0.18em] text-white/60" style={{ borderColor: "rgba(255,255,255,0.15)" }}>
          <p>© 2026 Creator Challenge · MU × LPU × Tetr</p>
          <p>Issue 02 — Spring '26</p>
        </div>
      </div>
    </footer>
  );
}

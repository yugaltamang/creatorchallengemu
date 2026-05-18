import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { Toaster } from "@/components/ui/sonner";
import Twitter from "lucide-react/dist/esm/icons/twitter";
import Sparkles from "lucide-react/dist/esm/icons/sparkles";
import Instagram from "lucide-react/dist/esm/icons/instagram";
import Trophy from "lucide-react/dist/esm/icons/trophy";
import Calendar from "lucide-react/dist/esm/icons/calendar";
import Users from "lucide-react/dist/esm/icons/users";
import Music2 from "lucide-react/dist/esm/icons/music-2";
import Zap from "lucide-react/dist/esm/icons/zap";
import User from "lucide-react/dist/esm/icons/user";
import Mail from "lucide-react/dist/esm/icons/mail";
import AtSign from "lucide-react/dist/esm/icons/at-sign";
import MessageSquare from "lucide-react/dist/esm/icons/message-square";
import GraduationCap from "lucide-react/dist/esm/icons/graduation-cap";
import Check from "lucide-react/dist/esm/icons/check";
import ArrowRight from "lucide-react/dist/esm/icons/arrow-right";
import LinkIcon from "lucide-react/dist/esm/icons/link";
import Loader2 from "lucide-react/dist/esm/icons/loader-2";
import PartyPopper from "lucide-react/dist/esm/icons/party-popper";
import Phone from "lucide-react/dist/esm/icons/phone";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import brand1 from "@/assets/permea-logo.jpg";
import brand2 from "@/assets/justpour.jpg";
import creatorGirl from "@/assets/creator-girl.webp";
import logo from "@/assets/logo.svg";

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
const BRANDS = ["PERMEA", "JustPour"] as const;

function Landing() {
  return (
    <div className="relative min-h-screen overflow-hidden bg-background text-foreground">
      <Toaster theme="dark" />
      <Header />
      <Hero />
      <ImageStrip />
      <SocialBar />
      <Brands />
      <Journey />
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
      <div className="mx-auto flex max-w-[1400px] items-center justify-between gap-4 border-b border-border px-4 py-3 sm:gap-8 sm:px-6 sm:py-4 lg:px-8">
        {/* Logo block */}
        <Link to="/" className="flex items-center">
          <img src={logo} alt="Creator Challenge 2026" className="h-8 w-auto invert sm:h-10" />
        </Link>

        <nav className="hidden flex-wrap items-center gap-7 text-[14px] md:flex">
          <a href="#brands" className="hover:text-primary">Brands</a>
          <a href="#rules" className="hover:text-primary">Rules</a>
          <a href="#prizes" className="hover:text-primary">Prizes</a>
          <a href="#about" className="hover:text-primary">About</a>
          <a href="#signup" className="hover:text-primary">Submit</a>
        </nav>

        <a
          href="#signup"
          className="grid h-12 w-12 shrink-0 place-items-center rounded-full border border-primary text-center text-[10px] leading-tight text-primary transition hover:bg-primary hover:text-primary-foreground sm:h-14 sm:w-14 sm:text-[11px]"
        >
          Enter<br />Now
        </a>
      </div>

      <div className="mx-auto hidden max-w-[1400px] items-start justify-end gap-8 px-4 pt-5 pb-5 sm:px-6 md:flex lg:px-8">
        {/* Right meta */}
        <div className="text-right text-[13px] leading-tight">
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

      <div className="relative mx-auto grid max-w-[1400px] grid-cols-12 gap-6 px-4 pt-32 pb-16 sm:px-6 sm:pt-40 sm:pb-24 md:pt-24 md:pb-32 lg:px-8">
        {/* Phone mock / left visual */}
        <div className="col-span-12 md:col-span-4">
          <div className="relative mx-auto w-[200px] sm:w-[240px] md:w-[260px]">
            {/* Girl image breaking out of phone */}
            <img
              src={creatorGirl}
              alt="Student creating an Instagram reel"
              className="pointer-events-none absolute left-1/2 bottom-[58px] z-20 w-[115%] max-w-none -translate-x-1/2 drop-shadow-[0_25px_40px_rgba(0,0,0,0.6)] sm:w-[130%] md:w-[140%]"
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
                    <p className="text-[10px] text-muted-foreground">making it for PERMEA</p>
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
          <div className="mb-6 flex items-center gap-3 font-mono text-[11px] uppercase tracking-[0.28em] text-muted-foreground">
            <span className="h-px w-10 bg-primary" />
            <span>Issue 01 · Creator Challenge 26</span>
          </div>
          <h2 className="font-display text-[clamp(56px,12vw,180px)] leading-[0.82] tracking-[-0.04em]">
            <span className="block relative z-10 mb-2 md:mb-4">Let<span className="text-primary">'</span>s</span>
            <span className="block">
              <span className="mu-gradient-text">build</span>
            </span>
            <span className="block font-serif italic font-normal tracking-[-0.02em] text-foreground">
              stories<span className="text-primary">,</span>
            </span>
            <span className="block text-outline-strong">together.</span>
          </h2>
          <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-2 font-mono text-[11px] uppercase tracking-[0.22em] text-muted-foreground">
            <span className="ticker-dot text-foreground">Live now</span>
            <span>3 campuses</span>
            <span>2 brands</span>
            <span className="text-primary">→ scroll</span>
          </div>
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
    "🔥 #CreatorChallenge26",
    "🎤 Brand collabs",
  ];
  const loop = [...items, ...items];
  return (
    <section className="relative overflow-hidden border-y border-border tape py-4 sm:py-5">
      <div className="flex w-max animate-marquee gap-8 whitespace-nowrap font-display text-lg text-primary-foreground sm:gap-12 sm:text-2xl">
        {loop.map((t, i) => (
          <span key={i} className="flex items-center gap-3">
            {t}
            <span className="font-mono text-[12px] opacity-70 sm:text-[14px]">/</span>
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
    
  ];
  return (
    <section id="about" className="relative border-b border-border bp-grid">
      <div className="mx-auto max-w-[1400px] px-4 py-12 sm:px-6 sm:py-16 md:py-20 lg:px-8">
        <div className="grid gap-10 md:grid-cols-12">
          <div className="md:col-span-5">
            <span className="ticker-dot inline-flex items-center font-mono text-[11px] uppercase tracking-[0.22em] text-muted-foreground">
              @CreatorChallenge / live
            </span>
            <h2 className="mt-6 font-display text-[clamp(40px,5vw,68px)] leading-[0.92]">
              The 2026<br />
              <span className="text-primary">Creator Challenge.</span>
            </h2>
            <p className="mt-6 max-w-md text-[15px] leading-relaxed text-muted-foreground">
              Students from <span className="text-foreground">Masters' Union</span>,{" "}
              <span className="text-foreground">LPU</span> and{" "}
              <span className="text-foreground">Tetr</span> create reels for two real brands.
              Winners get cash, mentorship, and a feature on the brand handles.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-4 md:col-span-7">
            {stats.map((s, i) => (
              <div
                key={s.l}
                className="corner-tick group relative overflow-hidden border border-border bg-card p-4 shadow-soft transition hover:border-primary/60 sm:p-6"
              >
                <div className="flex items-center justify-between">
                  <s.icon className="h-5 w-5 text-primary" />
                  <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
                    / {String(i + 1).padStart(2, "0")}
                  </span>
                </div>
                <div className="mt-6 font-display text-4xl sm:mt-8 sm:text-5xl">{s.n}</div>
                <p className="mt-2 font-mono text-[11px] uppercase tracking-[0.22em] text-muted-foreground">{s.l}</p>
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
      name: "PERMEA",
      tagline: "Skincare that actually gets in.",
      image: brand1,
      summary:
        "India's first absorption-focused skincare brand. Advanced delivery tech drives actives up to 20x deeper than typical skincare — so what you apply truly absorbs and delivers visible results.",
      angles: ["Absorption science", "Visible results", "Everyday ritual"],
      icon: Music2,
      accent: "from-pop-violet to-primary",
      chip: "bg-pop-violet/15 text-pop-violet border-pop-violet/30",
    },
    {
      name: "JustPour",
      tagline: "Coffee, on your terms.",
      image: brand2,
      summary:
        "Our mission is to give people complete control over how they enjoy their coffee — without being limited by time, money, or effort.",
      angles: ["Morning ritual", "On-the-go brew", "Cafe-quality at home"],
      icon: Zap,
      accent: "from-pop-yellow to-primary",
      chip: "bg-pop-yellow/15 text-pop-yellow border-pop-yellow/30",
    },
  ];

  return (
    <section id="brands" className="border-b border-border">
      <div className="mx-auto max-w-[1400px] px-4 py-14 sm:px-6 sm:py-20 md:py-24 lg:px-8">
        <div className="mb-14 flex flex-wrap items-end justify-between gap-6">
          <div>
            <span className="ticker-dot inline-flex items-center font-mono text-[11px] uppercase tracking-[0.22em] text-muted-foreground">
              The Brief / 02
            </span>
            <h2 className="mt-5 font-display text-[clamp(48px,7vw,100px)]">
              Two brands.{" "}
              <span className="text-primary">One reel.</span>
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
              className="corner-tick group relative overflow-hidden border border-border bg-card transition hover:border-primary/60"
            >
              <div className="absolute inset-x-0 top-0 h-1 bg-primary z-10" />
              <div className="relative aspect-[5/4] overflow-hidden">
                <img
                  src={b.image}
                  alt={b.name}
                  loading="lazy"
                  className="h-full w-full object-cover grayscale transition duration-700 group-hover:scale-[1.04] group-hover:grayscale-0"
                />
                <div className="absolute left-4 top-4 flex h-10 w-10 items-center justify-center bg-background/85 backdrop-blur">
                  <b.icon className="h-4 w-4 text-primary" />
                </div>
                <span className="absolute right-4 top-4 bg-background/85 px-3 py-1 font-mono text-[10px] uppercase tracking-[0.22em] backdrop-blur">
                  Brief / 0{i + 1}
                </span>
              </div>
              <div className="p-5 sm:p-7">
                <h3 className="font-display text-3xl sm:text-4xl">{b.name}</h3>
                <p className="mt-2 text-primary text-[15px]">{b.tagline}</p>
                <p className="mt-4 text-[14px] leading-relaxed text-muted-foreground">{b.summary}</p>
                <div className="mt-5 flex flex-wrap gap-2">
                  {b.angles.map((a) => (
                    <span key={a} className="border border-border px-3 py-1 font-mono text-[11px] uppercase tracking-[0.18em] text-muted-foreground">
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

function Journey() {
  const blue = "#E8A838";
  const steps = [
    { n: "01", t: "Drop your entry", d: "Pick the brand(s) you'd love to create for and apply with your best reel.", date: "Feb 14", phase: "Applications open" },
    { n: "02", t: "Crack the Top 25", d: "Top 25 entries get shortlisted by the\nbrand.", date: "Mar 02", phase: "Shortlists drop" },
    { n: "03", t: "Brief in your DMs", d: "Shortlisted creators get the brand brief and creative guardrails.", date: "Mar 05", phase: "Brief released" },
    { n: "04", t: "Shoot. Edit. Ship.", d: "Make the reel, tag the brand, hit submit before the buzzer.", date: "Mar 30", phase: "Submission deadline" },
    { n: "05", t: "Win the spotlight", d: "Cash, gear, brand deals, and campus-wide bragging rights.", date: "Apr 15", phase: "Winners announced" },
  ];

  return (
    <section id="journey" className="border-y border-border bg-background">
      <div className="mx-auto max-w-[1400px] px-4 py-12 sm:px-6 sm:py-16 lg:px-8">
        <div className="border border-white/15">
          {/* Header bar */}
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-white/15 px-4 py-3 sm:gap-4 sm:px-6 sm:py-4">
            <div className="flex items-center gap-4">
              <span
                className="inline-flex items-center gap-2 px-2.5 py-1 font-mono text-[10px] font-bold uppercase tracking-[0.22em] text-white"
                style={{ background: blue }}
              >
                <span className="inline-block h-1.5 w-1.5 rotate-45 bg-white" />
                The Run
              </span>
              <h2 className="font-display text-[22px] uppercase leading-none tracking-tight text-foreground">
                From apply to{" "}
                <span className="font-serif italic normal-case" style={{ color: blue }}>
                  applause
                </span>
                <span style={{ color: blue }}>.</span>
              </h2>
            </div>
            <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-muted-foreground">
              Five steps · One reel · All the glory
            </p>
          </div>

          {/* Giant numerals poster */}
          <div className="relative px-4 py-8 sm:px-6 sm:py-12 lg:px-10 lg:py-14">
            {/* Red dashed track behind numerals */}
            <div
              aria-hidden
              className="pointer-events-none absolute left-6 right-6 top-[78px] hidden border-t border-dashed md:block lg:top-[110px]"
              style={{ borderColor: blue, opacity: 0.5 }}
            />
            <ol className="grid grid-cols-1 gap-10 sm:grid-cols-2 md:grid-cols-5 md:gap-4 lg:gap-6">
              {steps.map((s) => (
                <li
                  key={s.n}
                  className="group relative grid grid-rows-[auto_auto_auto_1fr_auto] items-start"
                >
                  {/* Row 1 — Giant outlined number */}
                  <span
                    className="text-outline-strong font-display leading-[0.85] tracking-tight transition-colors duration-300 group-hover:text-white"
                    style={{ fontSize: "clamp(72px, 11vw, 140px)" }}
                  >
                    {s.n}
                  </span>
                  {/* Red dot anchor on the track */}
                  <span
                    aria-hidden
                    className="absolute right-2 top-[58px] hidden h-3 w-3 rounded-full ring-4 ring-background transition-transform group-hover:scale-125 md:block lg:top-[88px]"
                    style={{ background: blue }}
                  />
                  {/* Row 2 — Title */}
                  <h3 className="mt-3 font-display text-[15px] uppercase leading-tight tracking-tight text-foreground sm:text-[16px]">
                    {s.t}
                  </h3>
                  {/* Row 3 — Underline */}
                  <span
                    aria-hidden
                    className="mt-2 block h-[2px] w-8 transition-all duration-300 group-hover:w-16"
                    style={{ background: blue }}
                  />
                  {/* Row 4 — Blurb (flex 1fr → fills slack so deadlines align) */}
                  <p className="mt-2 whitespace-pre-line text-[12.5px] leading-relaxed text-muted-foreground sm:text-[13px]">
                    {s.d}
                  </p>
                  {/* Row 5 — Deadline pinned bottom */}
                  <div className="mt-4 flex items-center gap-1.5">
                    <span className="font-mono text-[9px] font-bold uppercase tracking-[0.22em] text-muted-foreground">
                      Deadline
                    </span>
                    <span
                      className="font-mono text-[10px] font-bold uppercase tracking-[0.22em] text-white px-1.5 py-0.5"
                      style={{ background: blue }}
                    >
                      {s.date}
                    </span>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </div>
    </section>
  );
}


function Guidelines() {
  const rules = [
    { n: "01", t: "Eligibility", d: "Open to currently enrolled students of Masters' Union, LPU, or Tetr. Verify with your university email.", chip: "Who can enter" },
    { n: "02", t: "Format", d: "One Instagram reel, 15–30 seconds, vertical 9:16. Original or licensed audio only.", chip: "Spec sheet" },
    { n: "03", t: "The brand", d: "Feature the chosen product clearly. Tag the brand and use #CreatorChallenge26.", chip: "Brand brief" },
    { n: "04", t: "Originality", d: "Created by you. No reposts, no AI voiceovers without disclosure, no copyrighted footage.", chip: "Be original" },
    { n: "05", t: "Account", d: "Your Instagram profile must be public throughout the judging window.", chip: "Visibility" },
    { n: "06", t: "Deadline", d: "Submit by midnight, March 30. Winners announced April 15 across all three campuses.", chip: "Timeline" },
  ];

  // Editorial poster — pure black, white, signature red.
  const ink = "#000000";
  const blue = "#ED1C24";
  const lime = "#FFFFFF";
  const muted = "rgba(255,255,255,0.62)";

  return (
    <section id="rules" className="border-y border-border bg-background">
      <div className="mx-auto max-w-[1400px] px-4 py-12 sm:px-6 sm:py-16 lg:px-8">
        {/* Single compact box */}
        <div className="border border-white/15">
          {/* Header bar */}
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-white/15 px-4 py-3 sm:gap-4 sm:px-6 sm:py-4">
            <div className="flex items-center gap-4">
              <span
                className="inline-flex items-center gap-2 px-2.5 py-1 font-mono text-[10px] font-bold uppercase tracking-[0.22em] text-white"
                style={{ background: blue }}
              >
                <span className="inline-block h-1.5 w-1.5 rotate-45 bg-white" />
                Playbook
              </span>
              <h2 className="font-display text-[22px] uppercase leading-none tracking-tight text-foreground">
                Rules of{" "}
                <span className="font-serif italic normal-case" style={{ color: blue }}>
                  play
                </span>
                <span style={{ color: blue }}>.</span>
              </h2>
            </div>
            <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-muted-foreground">
              Six things · Read once · Then ship
            </p>
          </div>

          {/* Compact rule rows */}
          <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
            {rules.map((r, i) => {
              const isAccent = i === 2;
              return (
                <li
                  key={r.n}
                  className={`group relative flex gap-4 border-white/15 p-5 [&:not(:last-child)]:border-b md:[&:nth-child(odd)]:border-r md:[&:nth-last-child(2)]:border-b-0 lg:[&]:border-b-0 lg:[&:not(:nth-child(3n))]:border-r lg:[&:nth-child(-n+3)]:border-b lg:[&:nth-child(odd)]:border-r ${
                    isAccent ? "" : "hover:bg-white/[0.03]"
                  }`}
                  style={{ background: isAccent ? blue : "transparent", color: "#fff" }}
                >
                  <span
                    className="font-mono text-[13px] leading-none pt-1"
                    style={{ color: isAccent ? "rgba(255,255,255,0.9)" : blue }}
                  >
                    /{r.n}
                  </span>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-baseline justify-between gap-3">
                      <h3 className="font-display text-[16px] uppercase leading-tight tracking-tight">
                        {r.t}
                        <span style={{ color: isAccent ? "#000" : blue }}>.</span>
                      </h3>
                      <span
                        className="font-mono text-[9px] font-bold uppercase tracking-[0.18em]"
                        style={{ color: isAccent ? "rgba(255,255,255,0.85)" : muted }}
                      >
                        {r.chip}
                      </span>
                    </div>
                    <p
                      className="mt-1.5 text-[12.5px] leading-snug"
                      style={{ color: isAccent ? "rgba(255,255,255,0.95)" : muted }}
                    >
                      {r.d}
                    </p>
                  </div>
                </li>
              );
            })}
          </ul>

          {/* Footer strip */}
          <div
            className="flex flex-wrap items-center justify-between gap-3 border-t border-white/15 px-4 py-3 sm:gap-4 sm:px-6 sm:py-4"
            style={{ background: ink, color: "#fff" }}
          >
            <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-white/70">
              Miss a rule · We disqualify quietly
            </p>
            <a
              href="#signup"
              className="inline-flex items-center gap-2 px-4 py-2 font-mono text-[11px] font-bold uppercase tracking-[0.18em] transition hover:opacity-90"
              style={{ background: blue, color: "#fff" }}
            >
              I'm in <span aria-hidden>→</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

function SignupSection() {
  const [submitting, setSubmitting] = useState(false);
  const [successOpen, setSuccessOpen] = useState(false);
  const [submittedName, setSubmittedName] = useState("");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const fd = new FormData(form);
    const handle = String(fd.get("instagram_handle") || "").replace(/^@/, "").trim().toLowerCase();
    const whatsapp = String(fd.get("whatsapp_number") || "").trim();
    const payload = {
      full_name: String(fd.get("full_name") || "").trim(),
      email: String(fd.get("email") || "").trim().toLowerCase(),
      university: String(fd.get("university") || ""),
      brand_choice: String(fd.get("brand_choice") || ""),
      instagram_handle: handle,
      whatsapp_number: whatsapp,
      notes: String(fd.get("notes") || "").trim(),
    };
    if (!payload.full_name || !payload.email || !payload.university || !payload.brand_choice || !handle || !whatsapp || !payload.notes) {
      toast.error("Please fill in all required fields.");
      return;
    }
    if (!/^\+?[0-9\s\-()]{7,20}$/.test(whatsapp)) {
      toast.error("Please enter a valid WhatsApp number.");
      return;
    }
    setSubmitting(true);

    // Pre-check: if this email or handle has already entered for every brand, block.
    const { data: existing } = await supabase
      .from("submissions")
      .select("brand_choice")
      .or(`email.eq.${payload.email},instagram_handle.eq.${handle}`);
    const enteredBrands = new Set((existing || []).map((r) => r.brand_choice));
    if (enteredBrands.size >= BRANDS.length) {
      setSubmitting(false);
      toast.error("You have already submitted for both products.");
      return;
    }

    const { error } = await supabase.from("submissions").insert(payload);
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
    toast.success("You're in. We'll review your profile soon.");
  }

  return (
    <section id="signup" className="border-b border-border">
      <div className="mx-auto max-w-[1400px] px-4 py-14 sm:px-6 sm:py-20 md:py-24 lg:px-8">
        <div className="relative overflow-hidden rounded-2xl border-2 border-primary/30 gradient-card p-5 sm:rounded-[32px] sm:p-8 md:p-14 shadow-[0_50px_120px_-20px_rgba(0,0,0,0.95),0_0_0_1px_rgba(255,255,255,0.04),0_25px_60px_-15px_var(--primary)] ring-1 ring-white/5">
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

            <form onSubmit={handleSubmit} method="post" action="#" className="md:col-span-7">
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

                <Field label="Link to your best reel" icon={LinkIcon} withInputIcon>
                  <Input name="notes" type="url" required placeholder="https://instagram.com/reel/…" className="h-12 rounded-xl border border-border bg-background/60 pl-11 pr-4 transition focus-visible:border-primary focus-visible:bg-background focus-visible:ring-2 focus-visible:ring-primary/30" />
                </Field>

                <div className="flex flex-wrap items-center justify-between gap-4 pt-2">
                  <p className="text-[12px] text-muted-foreground">
                    By submitting you agree to the contest rules.
                  </p>
                  <Button type="submit" disabled={submitting} className="group h-14 rounded-full gradient-pop px-8 text-[14px] font-semibold tracking-wide text-primary-foreground shadow-pop transition hover:opacity-95 hover:shadow-[0_25px_60px_-15px_var(--primary)] disabled:opacity-80">
                    {submitting ? (
                      <span className="flex items-center gap-2">
                        <Loader2 className="h-4 w-4 animate-spin" />
                        Submitting…
                      </span>
                    ) : (
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

      <Dialog open={successOpen} onOpenChange={setSuccessOpen}>
        <DialogContent className="sm:max-w-md rounded-3xl border border-white/10 bg-background/95 backdrop-blur-xl">
          <DialogHeader className="items-center text-center">
            <div className="mx-auto mb-2 flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-br from-primary to-pop-violet shadow-pop">
              <PartyPopper className="h-7 w-7 text-primary-foreground" />
            </div>
            <DialogTitle className="text-2xl">You're in{submittedName ? `, ${submittedName}` : ""}!</DialogTitle>
            <DialogDescription className="text-balance pt-1">
              Your profile is locked in. Our team will review your reel and reach out on Instagram or email with the next steps.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="sm:justify-center">
            <Button onClick={() => setSuccessOpen(false)} className="h-11 rounded-full gradient-pop px-6 font-semibold text-primary-foreground shadow-pop">
              Got it
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </section>
  );
}

function Field({ label, icon: Icon, withInputIcon = false, children }: { label: string; icon?: React.ComponentType<{ className?: string }>; withInputIcon?: boolean; children: React.ReactNode }) {
  return (
    <div className="space-y-2">
      <Label className="flex items-center gap-2 text-[11px] uppercase tracking-[0.18em] text-muted-foreground">
        {Icon ? <Icon className="h-3.5 w-3.5 text-primary" /> : null}
        {label}
      </Label>
      <div className="relative">
        {Icon && withInputIcon ? <Icon className="pointer-events-none absolute left-4 top-1/2 z-10 h-4 w-4 -translate-y-1/2 text-muted-foreground" /> : null}
        {children}
      </div>
    </div>
  );
}

function Footer() {
  return (
    <footer className="border-t border-border">
      <div className="mx-auto max-w-[1400px] px-4 py-10 sm:px-6 sm:py-14 lg:px-8">
        <div className="grid gap-10 md:grid-cols-12">
          <div className="md:col-span-6">
            <div className="flex items-center">
              <img src={logo} alt="Creator Challenge 2026" className="h-12 w-auto invert" />
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

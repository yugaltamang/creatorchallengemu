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
      { title: "Creator on Reels — Get paid to make reels" },
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
    <header className="relative z-30">
      <div className="mx-auto flex max-w-[1400px] items-center justify-between gap-4 px-4 py-5 sm:px-6 sm:py-6 lg:px-10">
        <Link to="/" className="flex items-center gap-3">
          <span aria-hidden className="flex flex-col gap-[3px]">
            <span className="block h-[2px] w-5 bg-foreground" />
            <span className="block h-[2px] w-5 bg-foreground" />
            <span className="block h-[2px] w-5 bg-foreground" />
          </span>
          <span className="font-display text-[15px] uppercase tracking-[0.08em] sm:text-[17px]">
            CREATOR<span className="px-2 font-mono text-[13px] font-normal text-muted-foreground">\</span>
            <span className="text-primary">ON REELS</span>
          </span>
        </Link>

        <div className="flex items-center gap-3 sm:gap-5">
          <span className="hidden font-mono text-[11px] uppercase tracking-[0.22em] text-muted-foreground sm:inline">
            Feb 14 — Mar 30 · 2026
          </span>
          <img src={logo} alt="Creator on Reels" className="h-9 w-auto invert sm:h-11" />
        </div>
      </div>
    </header>
  );
}

function Hero() {
  return (
    <section className="relative overflow-hidden">
      {/* Atmospheric spotlight + stadium grain */}
      <div className="pointer-events-none absolute inset-0" style={{ background: "var(--gradient-spotlight)" }} aria-hidden />
      <div className="pointer-events-none absolute inset-0 bp-grid opacity-40" aria-hidden />
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.07]"
        aria-hidden
        style={{
          background:
            "radial-gradient(circle at 70% 30%, var(--primary) 0%, transparent 45%), radial-gradient(circle at 20% 80%, var(--primary) 0%, transparent 50%)",
        }}
      />

      <div className="relative mx-auto grid max-w-[1400px] grid-cols-12 gap-6 px-4 pb-20 pt-6 sm:px-6 sm:pb-28 sm:pt-8 lg:px-10 lg:pb-36">
        {/* LEFT — vertical section nav (sidebar) */}
        <aside className="col-span-12 md:col-span-2">
          <div className="relative pl-4">
            <span aria-hidden className="absolute left-0 top-1 block h-12 w-[2px] bg-primary" />
            <ul className="space-y-3 font-display text-[13px] uppercase tracking-[0.12em]">
              {[
                { href: "#brands", label: "Brands", active: true },
                { href: "#journey", label: "Journey" },
                { href: "#rules", label: "Rules" },
                { href: "#signup", label: "Submit" },
                { href: "#about", label: "About" },
              ].map((i) => (
                <li key={i.label}>
                  <a
                    href={i.href}
                    className={
                      i.active
                        ? "text-primary"
                        : "text-foreground/85 transition hover:text-primary"
                    }
                  >
                    {i.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </aside>

        {/* CENTER — Hero image + dramatic poster type */}
        <div className="relative col-span-12 md:col-span-10">
          {/* Massive poster type */}
          <div className="relative">
            <div className="mb-4 flex items-end gap-3 sm:mb-6">
              <span className="font-display text-[clamp(56px,9vw,140px)] leading-[0.85] text-primary">
                ▸
              </span>
              <span className="pb-3 font-mono text-[11px] uppercase tracking-[0.28em] text-muted-foreground sm:pb-5">
                Get paid · Get discovered · Go big
              </span>
            </div>

            <h1 className="relative z-10 -mt-2 font-display leading-[0.84] tracking-[-0.04em]">
              <span className="block text-[clamp(40px,7vw,110px)] text-foreground">
                BECOME THE NEXT BIG
              </span>
              <span className="block text-[clamp(64px,13vw,200px)] text-primary">
                CREATOR ON REELS
              </span>
            </h1>


            {/* Floating creator image on the right */}
            <div className="pointer-events-none absolute -right-4 -top-6 z-0 hidden w-[44%] md:block lg:-right-2 lg:w-[42%]">
              <div className="relative aspect-[3/4] overflow-hidden">
                <img
                  src={creatorGirl}
                  alt="Creator filming an Instagram reel"
                  className="absolute inset-0 h-full w-full object-cover object-top mix-blend-luminosity opacity-90"
                />
                <div
                  className="absolute inset-0"
                  style={{
                    background:
                      "linear-gradient(135deg, transparent 30%, hsl(230 42% 9% / 0.4) 70%, hsl(230 42% 9%) 100%)",
                  }}
                />
              </div>
            </div>
          </div>

          {/* Sub-headline */}
          <p className="relative z-10 mt-8 max-w-xl text-[15px] leading-relaxed text-muted-foreground sm:text-[17px]">
            The platform that turns your phone into a paycheck. Create reels for real brands, get paid for every brief you ship, and grow into the next big creator on the feed.
          </p>

          {/* Floating editorial cards row */}
          <div className="relative z-10 mt-12 grid gap-5 sm:mt-16 sm:grid-cols-12">
            {/* Card 1 — outlined "how it works" card */}
            <article className="corner-tick group relative border-2 border-primary/70 bg-background/40 p-6 backdrop-blur-sm transition hover:bg-background/70 sm:col-span-5">
              <span className="font-mono text-[10px] uppercase tracking-[0.28em] text-primary">
                How it works / 01
              </span>
              <h3 className="mt-4 font-display text-[22px] uppercase leading-[1.05] tracking-tight sm:text-[26px]">
                Begin — submit us
                <br />your best reel.
              </h3>
              <p className="mt-3 max-w-xs text-[13px] leading-relaxed text-muted-foreground">
                Drop your handle and one reel you're proud of. We review every submission and unlock live brand briefs for shortlisted creators.
              </p>
              <a
                href="#signup"
                className="mt-6 inline-flex items-center gap-2 border border-primary/60 px-3 py-2 font-mono text-[11px] font-bold uppercase tracking-[0.22em] text-primary transition group-hover:bg-primary group-hover:text-primary-foreground"
              >
                ▸ Apply now
                <span className="ml-1 inline-grid h-5 w-5 place-items-center border border-primary/60 text-[10px]">
                  +
                </span>
              </a>
            </article>

            {/* Card 2 — solid gold prize-pool widget */}
            <article className="relative bg-primary p-6 text-primary-foreground shadow-pop sm:col-span-7 sm:-translate-y-6">
              <div className="flex items-start justify-between gap-4">
                <span className="font-mono text-[10px] uppercase tracking-[0.28em] opacity-80">
                  Prize pool / 02
                </span>
                <span className="font-mono text-[10px] uppercase tracking-[0.28em] opacity-80">
                  Total ₹1,00,000
                </span>
              </div>
              <h3 className="mt-4 font-display text-[28px] uppercase leading-[0.95] tracking-tight sm:text-[40px]">
                Earn up to <span className="italic">₹1L</span> in
                <br />total prize money.
              </h3>
              <div className="mt-6 grid grid-cols-2 gap-3 border-t border-primary-foreground/20 pt-5">
                <div>
                  <div className="font-display text-[28px] leading-none sm:text-[34px]">₹50K</div>
                  <div className="mt-1 font-mono text-[10px] uppercase tracking-[0.22em] opacity-80">
                    Cash payout
                  </div>
                </div>
                <div>
                  <div className="font-display text-[28px] leading-none sm:text-[34px]">₹50K</div>
                  <div className="mt-1 font-mono text-[10px] uppercase tracking-[0.22em] opacity-80">
                    Scholarships on courses
                  </div>
                </div>
              </div>
              <p className="mt-4 text-[12px] leading-relaxed opacity-80">
                Plus brand deals, a feature on the brand handle and ongoing paid briefs after the challenge.
              </p>
            </article>
          </div>

          {/* Bottom meta strip */}
          <div className="mt-10 flex flex-wrap items-center gap-x-6 gap-y-2 border-t border-border pt-5 font-mono text-[11px] uppercase tracking-[0.22em] text-muted-foreground">
            <span className="ticker-dot text-foreground">Briefs live now</span>
            <span>Open to all creators</span>
            <span>Paid per reel</span>
            <span>Instagram-first</span>
            <span className="ml-auto text-primary">↓ scroll</span>
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
    "🔥 #CreatorOnReels",
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

/* Shared editorial masthead — breadcrumb + sidebar nav, applied to every section */
function SectionMast({
  id,
  crumb,
  active,
  tag,
  title,
  titleAccent,
  blurb,
  children,
}: {
  id: string;
  crumb: string;
  active: string;
  tag: string;
  title: string;
  titleAccent: string;
  blurb?: string;
  children: React.ReactNode;
}) {
  const items = ["Brands", "Journey", "Rules", "Submit", "About"];
  return (
    <section id={id} className="relative overflow-hidden border-t border-border">
      <div className="pointer-events-none absolute inset-0 bp-grid opacity-30" aria-hidden />
      <div className="relative mx-auto max-w-[1400px] px-4 py-16 sm:px-6 sm:py-20 lg:px-10 lg:py-24">
        {/* Top breadcrumb row */}
        <div className="mb-10 flex flex-wrap items-center justify-between gap-3 border-b border-border pb-4">
          <span className="font-display text-[13px] uppercase tracking-[0.1em] sm:text-[15px]">
            CREATOR
            <span className="px-2 font-mono text-[12px] font-normal text-muted-foreground">\</span>
            <span className="text-primary">{crumb}</span>
          </span>
          <span className="font-mono text-[11px] uppercase tracking-[0.22em] text-muted-foreground">
            {tag}
          </span>
        </div>

        <div className="grid grid-cols-12 gap-6">
          {/* Sidebar mini-nav */}
          <aside className="col-span-12 md:col-span-2">
            <div className="relative pl-4">
              <span aria-hidden className="absolute left-0 top-1 block h-12 w-[2px] bg-primary" />
              <ul className="space-y-3 font-display text-[13px] uppercase tracking-[0.12em]">
                {items.map((label) => (
                  <li key={label}>
                    <a
                      href={`#${label.toLowerCase()}`}
                      className={
                        label.toLowerCase() === active.toLowerCase()
                          ? "text-primary"
                          : "text-foreground/85 transition hover:text-primary"
                      }
                    >
                      {label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </aside>

          {/* Body — poster headline + content */}
          <div className="relative col-span-12 md:col-span-10">
            <h2 className="relative font-display leading-[0.88] tracking-[-0.03em]">
              <span className="block text-[clamp(40px,7vw,110px)] text-foreground">{title}</span>
              <span className="block text-[clamp(40px,7vw,110px)] text-primary">{titleAccent}</span>
            </h2>
            {blurb ? (
              <p className="mt-6 max-w-xl text-[15px] leading-relaxed text-muted-foreground sm:text-[16px]">
                {blurb}
              </p>
            ) : null}
            <div className="mt-12">{children}</div>
          </div>
        </div>
      </div>
    </section>
  );
}

function SocialBar() {
  const stats = [
    { n: "100%", l: "Real brand briefs", icon: Zap },
    { n: "₹", l: "Paid per reel that ships", icon: Sparkles },
    { n: "∞", l: "Open to every creator", icon: Users },
    { n: "9:16", l: "Instagram-first reels", icon: Music2 },
  ];
  return (
    <SectionMast
      id="about"
      crumb="ABOUT"
      active="about"
      tag="The platform · Live now"
      title="A REEL THAT PAYS."
      titleAccent="A SHOT AT GOING BIG."
      blurb="Creator on Reels is the platform that connects creators with real brand briefs. Pick a brief, ship a 15–30s reel, get paid when it goes live, and grow into the next big name on the feed."
    >
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
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
            <p className="mt-2 font-mono text-[11px] uppercase tracking-[0.22em] text-muted-foreground">
              {s.l}
            </p>
          </div>
        ))}
      </div>
    </SectionMast>
  );
}


function Brands() {
  const brands = [
    {
      name: "PERMEA",
      number: "01",
      tagline: "Skincare that actually gets in.",
      image: brand1,
      hook: "Actives 20× deeper.",
      angles: ["Absorption science", "Visible results"],
    },
    {
      name: "JustPour",
      number: "02",
      tagline: "Coffee, on your terms.",
      image: brand2,
      hook: "Cafe-quality, anywhere.",
      angles: ["Morning ritual", "On-the-go brew"],
    },
  ];

  return (
    <SectionMast
      id="brands"
      crumb="BRANDS"
      active="brands"
      tag="Live briefs · 02 open"
      title="TWO BRANDS."
      titleAccent="ONE VERTICAL REEL."
      blurb="Browse the briefs. Pick the brand whose story you can tell best. Ship one 15–30s vertical reel and get paid when it goes live."
    >
      {/* Player-style portrait panels with overlay type (Messi carousel feel) */}
      <div className="grid gap-4 sm:gap-6 md:grid-cols-2">
        {brands.map((b) => (
          <article
            key={b.name}
            className="group relative aspect-[3/4] overflow-hidden border border-border bg-card transition hover:border-primary/60"
          >
            <img
              src={b.image}
              alt={b.name}
              loading="lazy"
              className="absolute inset-0 h-full w-full object-cover grayscale transition duration-700 group-hover:scale-[1.03] group-hover:grayscale-0"
            />
            {/* Bottom gradient veil */}
            <div
              className="absolute inset-0"
              style={{
                background:
                  "linear-gradient(180deg, transparent 35%, hsl(230 42% 9% / 0.4) 55%, hsl(230 42% 9%) 100%)",
              }}
            />
            {/* Top badge */}
            <span className="absolute left-4 top-4 z-10 bg-background/80 px-3 py-1 font-mono text-[10px] uppercase tracking-[0.22em] backdrop-blur">
              Brief / {b.number}
            </span>
            <span className="absolute right-4 top-4 z-10 font-display text-[clamp(40px,5vw,72px)] leading-none text-primary opacity-90">
              {b.number}
            </span>

            {/* Overlay headline — name in white + tagline in gold */}
            <div className="absolute inset-x-0 bottom-0 z-10 p-5 sm:p-7">
              <h3 className="font-display text-[clamp(40px,6vw,72px)] leading-[0.85] tracking-[-0.02em] text-foreground">
                {b.name}
              </h3>
              <p className="mt-2 font-display text-[16px] uppercase tracking-[0.05em] text-primary sm:text-[18px]">
                {b.tagline}
              </p>
              <p className="mt-2 text-[13px] leading-snug text-foreground/75">
                {b.hook}
              </p>
              <div className="mt-4 flex flex-wrap gap-2">
                {b.angles.map((a) => (
                  <span
                    key={a}
                    className="border border-foreground/30 bg-background/30 px-2.5 py-1 font-mono text-[10px] uppercase tracking-[0.18em] text-foreground/85 backdrop-blur"
                  >
                    {a}
                  </span>
                ))}
              </div>
              <a
                href="#signup"
                className="mt-5 inline-flex items-center gap-2 border border-primary/70 bg-primary/10 px-3 py-2 font-mono text-[11px] font-bold uppercase tracking-[0.22em] text-primary backdrop-blur transition hover:bg-primary hover:text-primary-foreground"
              >
                ▸ Full brief
                <span className="ml-1 inline-grid h-5 w-5 place-items-center border border-primary/60 text-[10px]">
                  +
                </span>
              </a>
            </div>
          </article>
        ))}
      </div>
    </SectionMast>
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
      <div className="mx-auto max-w-[1400px] px-4 pt-10 sm:px-6 lg:px-10">
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-border pb-4">
          <span className="font-display text-[13px] uppercase tracking-[0.1em] sm:text-[15px]">
            CREATOR<span className="px-2 font-mono text-[12px] font-normal text-muted-foreground">\</span><span className="text-primary">JOURNEY</span>
          </span>
          <span className="font-mono text-[11px] uppercase tracking-[0.22em] text-muted-foreground">Five steps · One reel · Get paid</span>
        </div>
      </div>
      <div className="mx-auto max-w-[1400px] px-4 py-12 sm:px-6 sm:py-16 lg:px-8">
        <div className="border border-white/15">
          {/* Header bar */}
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-white/15 px-4 py-3 sm:gap-4 sm:px-6 sm:py-4">
            <div className="flex items-center gap-4">
              <span
                className="inline-flex items-center gap-2 px-2.5 py-1 font-mono text-[10px] font-bold uppercase tracking-[0.22em] text-[#0e1226]"
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
    { n: "01", t: "Eligibility", d: "Open to any creator 16+ with a public Instagram account. Verify with your email to get on the platform.", chip: "Who can enter" },
    { n: "02", t: "Format", d: "One Instagram reel, 15–30 seconds, vertical 9:16. Original or licensed audio only.", chip: "Spec sheet" },
    { n: "03", t: "The brand", d: "Feature the chosen product clearly. Tag the brand and use #CreatorOnReels.", chip: "Brand brief" },
    { n: "04", t: "Originality", d: "Created by you. No reposts, no AI voiceovers without disclosure, no copyrighted footage.", chip: "Be original" },
    { n: "05", t: "Account", d: "Your Instagram profile must be public throughout the judging window.", chip: "Visibility" },
    { n: "06", t: "Deadline", d: "Each brief has its own deadline shown on the brief page. Submit before the buzzer to be eligible for payout.", chip: "Timeline" },
  ];

  // Editorial poster — pure black, white, signature red.
  const ink = "#000000";
  const blue = "#E8A838";
  const lime = "#FFFFFF";
  const muted = "rgba(255,255,255,0.62)";

  return (
    <section id="rules" className="border-y border-border bg-background">
      <div className="mx-auto max-w-[1400px] px-4 pt-10 sm:px-6 lg:px-10">
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-border pb-4">
          <span className="font-display text-[13px] uppercase tracking-[0.1em] sm:text-[15px]">
            CREATOR<span className="px-2 font-mono text-[12px] font-normal text-muted-foreground">\</span><span className="text-primary">RULES</span>
          </span>
          <span className="font-mono text-[11px] uppercase tracking-[0.22em] text-muted-foreground">Read once · Then ship</span>
        </div>
      </div>
      <div className="mx-auto max-w-[1400px] px-4 py-12 sm:px-6 sm:py-16 lg:px-8">
        {/* Single compact box */}
        <div className="border border-white/15">
          {/* Header bar */}
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-white/15 px-4 py-3 sm:gap-4 sm:px-6 sm:py-4">
            <div className="flex items-center gap-4">
              <span
                className="inline-flex items-center gap-2 px-2.5 py-1 font-mono text-[10px] font-bold uppercase tracking-[0.22em] text-[#0e1226]"
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
                  style={{ background: isAccent ? blue : "transparent", color: isAccent ? "#0e1226" : "#fff" }}
                >
                  <span
                    className="font-mono text-[13px] leading-none pt-1"
                    style={{ color: isAccent ? "rgba(14,18,38,0.75)" : blue }}
                  >
                    /{r.n}
                  </span>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-baseline justify-between gap-3">
                      <h3 className="font-display text-[16px] uppercase leading-tight tracking-tight">
                        {r.t}
                        <span style={{ color: isAccent ? "#0e1226" : blue }}>.</span>
                      </h3>
                      <span
                        className="font-mono text-[9px] font-bold uppercase tracking-[0.18em]"
                        style={{ color: isAccent ? "rgba(14,18,38,0.75)" : muted }}
                      >
                        {r.chip}
                      </span>
                    </div>
                    <p
                      className="mt-1.5 text-[12.5px] leading-snug"
                      style={{ color: isAccent ? "rgba(14,18,38,0.9)" : muted }}
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
              style={{ background: blue, color: "#0e1226" }}
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
      <div className="mx-auto max-w-[1400px] px-4 pt-10 sm:px-6 lg:px-10">
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-border pb-4">
          <span className="font-display text-[13px] uppercase tracking-[0.1em] sm:text-[15px]">
            CREATOR<span className="px-2 font-mono text-[12px] font-normal text-muted-foreground">\</span><span className="text-primary">SUBMIT</span>
          </span>
          <span className="font-mono text-[11px] uppercase tracking-[0.22em] text-muted-foreground">Drop your handle · Get on the list</span>
        </div>
      </div>
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
              <img src={logo} alt="Creator on Reels" className="h-12 w-auto invert" />
            </div>
            <p className="mt-5 max-w-sm text-[14px] leading-relaxed text-muted-foreground">
              The platform that turns your phone into a paycheck. Real brand briefs, paid reels, and a runway to becoming the next big creator on the feed.
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
              <li className="flex items-center gap-2"><Instagram className="h-4 w-4 text-primary" /> @creatoronreels</li>
              <li className="flex items-center gap-2"><Twitter className="h-4 w-4 text-primary" /> @cc26</li>
            </ul>
          </div>
        </div>
        <div className="mt-12 flex flex-wrap items-center justify-between gap-4 border-t border-border pt-6 text-[13px] text-muted-foreground">
          <p>© 2026 Creator on Reels</p>
          <p>Feb 14 – Mar 30, 2026</p>
        </div>
      </div>
    </footer>
  );
}

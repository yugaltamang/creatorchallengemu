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
import creatorGirl from "@/assets/creator-duo.png";
import logo from "@/assets/logo.svg";
import mastersUnionLogo from "@/assets/masters-union-logo.png";

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

      <div
        className="relative"
        style={{ backgroundColor: "hsl(145 35% 94%)" }}
      >
        <div className="relative">
          <SocialBar />
          <Brands />
          <ReelExamples />
          <Journey />
          <SignupSection />
          <Footer />
        </div>
      </div>

    </div>
  );
}

function Header() {
  return (
    <header className="relative z-30">
      <div className="mx-auto flex max-w-[1400px] items-center justify-between gap-4 px-4 py-5 sm:px-6 sm:py-6 lg:px-10">
        <Link to="/" className="flex items-center gap-3">
          <img src={mastersUnionLogo} alt="Masters' Union" className="h-9 w-auto sm:h-11" />
        </Link>

        <div className="flex items-center gap-3 sm:gap-5">
          <span className="hidden font-mono text-[11px] uppercase tracking-[0.22em] text-muted-foreground sm:inline">
            May 28 — Jun 20 · 2026
          </span>
          <img src={logo} alt="Creator on Reels" className="h-9 w-auto invert sm:h-11" />
        </div>
      </div>
    </header>
  );
}

function Hero() {
  return (
    <section className="relative overflow-hidden" style={{ backgroundColor: "hsl(340 60% 95%)" }}>


      <div className="relative mx-auto grid max-w-[1400px] grid-cols-12 gap-6 px-4 pb-12 pt-2 sm:px-6 sm:pb-28 sm:pt-8 lg:px-10 lg:pb-36">
        {/* LEFT — vertical section nav (sidebar) — hidden on mobile */}
        <aside className="hidden md:col-span-2 md:block">
          <div className="relative pl-4">
            <span aria-hidden className="absolute left-0 top-1 block h-12 w-[2px] bg-primary" />
            <ul className="space-y-3 font-display text-[13px] uppercase tracking-[0.12em]">
              {[
                { href: "#brands", label: "Brands", active: true },
                { href: "#journey", label: "Journey" },
                
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

            <h1
              className="relative z-10 -mt-2 font-display leading-[0.84] tracking-[-0.04em]"
            >
              <span className="block text-foreground text-xl sm:text-2xl md:text-3xl">
                BECOME THE NEXT BIG
              </span>
              <span className="block font-bold text-5xl sm:text-7xl md:text-8xl">
                <span className="text-primary">CREATOR</span>
                <br />
                <span className="text-pop-yellow">ON{" "}</span>
                <span className="text-pop-cyan">REELS</span>
              </span>
            </h1>

            {/* Mobile hero image */}
            <div className="mt-6 block md:hidden">
              <img
                src={creatorGirl}
                alt="Creators filming an Instagram reel"
                className="mx-auto h-auto w-full max-w-sm object-contain drop-shadow-[0_20px_40px_rgba(255,62,165,0.25)]"
              />
            </div>


            {/* Floating creator image on the right */}
            <div className="pointer-events-none absolute -right-8 -top-20 z-0 hidden w-[62%] md:block lg:-right-6 lg:-top-28 lg:w-[60%] xl:-right-10 xl:w-[58%]">
              <div className="relative aspect-[3/4]">
                <img
                  src={creatorGirl}
                  alt="Creators filming an Instagram reel"
                  className="absolute inset-0 h-full w-full object-contain object-bottom drop-shadow-[0_30px_60px_rgba(255,62,165,0.25)]"
                />
              </div>
            </div>
          </div>

          {/* Step flow */}
          <div className="relative z-10 mt-8 flex flex-wrap items-center gap-2 sm:gap-3">
            {[
              "Get Shortlisted",
              "Pick a brief",
              "Ship Your Video",
              "Make Money",
            ].map((step, i, arr) => (
              <div key={step} className="flex items-center gap-2 sm:gap-3">
                <span className="inline-flex items-center rounded-full border border-border bg-background px-3.5 py-1.5 font-mono text-[11px] font-bold uppercase tracking-[0.18em] text-foreground shadow-sm">
                  {step}
                </span>
                {i < arr.length - 1 && (
                  <span className="font-mono text-[16px] font-bold text-foreground">→</span>
                )}
              </div>
            ))}
          </div>

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
                className="mt-6 inline-flex items-center gap-2 rounded-full gradient-pop bg-slate-600 px-4 py-2 font-mono text-[11px] font-bold uppercase tracking-[0.22em] text-primary-foreground shadow-pop transition hover:opacity-95 hover:shadow-[0_25px_60px_-15px_var(--primary)]"
              >
                ▸ Apply now
                <span className="ml-1 inline-grid h-5 w-5 place-items-center border border-primary-foreground/40 text-[10px]">
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
                  Cash · Hampers · Perks
                </span>
              </div>
              <h3 className="mt-4 font-display text-[28px] uppercase leading-[0.95] tracking-tight sm:text-[40px]">
                Cash in hand,
                <br />spotlight on you.
              </h3>
              <div className="mt-6 grid grid-cols-2 gap-3 border-t border-primary-foreground/20 pt-5">
                <div>
                  <div className="font-display text-[28px] leading-none sm:text-[34px]">₹50K</div>
                  <div className="mt-1 font-mono text-[10px] uppercase tracking-[0.22em] opacity-80">
                    Cash payout
                  </div>
                </div>
                <div>
                  <div className="font-display text-[28px] leading-none sm:text-[34px]">+</div>
                  <div className="mt-1 font-mono text-[10px] uppercase tracking-[0.22em] opacity-80">
                    Loads of gift hampers
                  </div>
                </div>
              </div>
              <p className="mt-4 text-[12px] leading-relaxed opacity-80">
                Plus brand deals, a feature on the brand handle and ongoing paid briefs after the challenge.
              </p>
            </article>
          </div>

          {/* Bottom meta strip */}
          <div className="mt-10 flex flex-wrap items-center gap-x-4 gap-y-2 border-t border-border pt-5 font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground sm:text-[11px] sm:tracking-[0.22em]">
            <span className="ticker-dot text-foreground">Briefs live now</span>
            <span>Open to all creators</span>
            <span>Paid per reel</span>
            <span className="hidden sm:inline">Instagram-first</span>
            <span className="ml-auto text-primary">↓ scroll</span>
          </div>
        </div>
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
  accentClass = "text-primary",
  blurb,
  children,
}: {
  id: string;
  crumb: string;
  active: string;
  tag: string;
  title: string;
  titleAccent: string;
  accentClass?: string;
  blurb?: string;
  children: React.ReactNode;
}) {
  const items = ["Brands", "Journey", "Submit", "About"];
  return (
    <section id={id} className="relative overflow-hidden border-t border-border">
      <div className="relative mx-auto max-w-[1400px] px-4 py-12 sm:px-6 sm:py-20 lg:px-10 lg:py-24">
        {/* Top breadcrumb row */}
        <div className="mb-8 flex flex-wrap items-center justify-between gap-x-3 gap-y-1 border-b border-border pb-4 sm:mb-10 sm:gap-3">
          <span className="font-display text-[12px] uppercase tracking-[0.08em] sm:text-[15px] sm:tracking-[0.1em]">
            CREATOR
            <span className="px-1.5 font-mono text-[10px] font-normal text-muted-foreground sm:px-2 sm:text-[12px]">\</span>
            <span className="text-primary">{crumb}</span>
          </span>
          <span className="font-mono text-[9px] uppercase tracking-[0.16em] text-muted-foreground sm:text-[11px] sm:tracking-[0.22em]">
            {tag}
          </span>
        </div>

        <div className="grid grid-cols-12 gap-6">
          {/* Sidebar mini-nav — hidden on mobile */}
          <aside className="hidden md:col-span-2 md:block" aria-hidden />


          {/* Body — poster headline + content */}
          <div className="relative col-span-12 md:col-span-10">
            <h2 className="relative font-display font-black leading-[0.88] tracking-[-0.03em]">
              <span className="block text-[clamp(32px,7vw,110px)] font-black text-foreground">{title}</span>
              <span className={`block text-[clamp(32px,7vw,110px)] font-black ${accentClass}`}>{titleAccent}</span>
            </h2>
            {blurb ? (
              <p className="mt-5 max-w-xl text-[14px] leading-relaxed text-muted-foreground sm:mt-6 sm:text-[16px]">
                {blurb}
              </p>
            ) : null}
            <div className="mt-8 sm:mt-12">{children}</div>
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
      accentClass="text-pop-yellow"
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
      accentClass="text-pop-cyan"
      blurb="Browse the briefs. Pick the brand whose story you can tell best. Ship one 15–30s vertical reel and get paid when it goes live."
    >
      {/* Editorial split cards — image left, info right */}
      <div className="grid gap-5 sm:gap-6 lg:grid-cols-2">
        {brands.map((b) => (
          <article
            key={b.name}
            className="group relative grid grid-cols-1 sm:grid-cols-5 overflow-hidden border border-border bg-card transition hover:border-primary/60"
          >
            {/* Image panel */}
            <div className="relative sm:col-span-2 aspect-[4/3] sm:aspect-auto overflow-hidden">
              <img
                src={b.image}
                alt={b.name}
                loading="lazy"
                className="absolute inset-0 h-full w-full object-cover grayscale transition duration-700 group-hover:scale-[1.04] group-hover:grayscale-0"
              />
              <div
                className="absolute inset-0"
                style={{
                  background:
                    "linear-gradient(180deg, hsl(230 42% 9% / 0.15) 0%, transparent 40%, hsl(230 42% 9% / 0.55) 100%)",
                }}
              />
              <span className="absolute left-3 top-3 z-10 bg-background/85 px-2.5 py-1 font-mono text-[10px] uppercase tracking-[0.22em] backdrop-blur">
                Brief / {b.number}
              </span>
            </div>

            {/* Content panel */}
            <div className="relative sm:col-span-3 flex flex-col justify-between p-5 sm:p-6 lg:p-7">
              {/* Giant numeral watermark */}
              <span
                aria-hidden
                className="pointer-events-none absolute -right-2 -top-4 font-display text-[clamp(90px,14vw,160px)] leading-none text-primary/10 select-none"
              >
                {b.number}
              </span>

              <div className="relative">
                <div className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.22em] text-muted-foreground">
                  <span className="h-px w-6 bg-primary" />
                  Live brief
                </div>
                <h3 className="mt-3 font-display text-[clamp(34px,5vw,56px)] leading-[0.9] tracking-[-0.02em] text-foreground">
                  {b.name}
                </h3>
                <p className="mt-2 font-display text-[15px] uppercase tracking-[0.05em] text-primary sm:text-[17px]">
                  {b.tagline}
                </p>
                <p className="mt-3 text-[13px] leading-snug text-foreground/70">
                  {b.hook}
                </p>
              </div>

              <div className="relative mt-5 space-y-4">
                <div className="flex flex-wrap gap-1.5">
                  {b.angles.map((a) => (
                    <span
                      key={a}
                      className="border border-border bg-background/40 px-2 py-1 font-mono text-[10px] uppercase tracking-[0.18em] text-foreground/80"
                    >
                      {a}
                    </span>
                  ))}
                </div>
                <a
                  href="#signup"
                  className="inline-flex w-full items-center justify-between gap-2 border border-primary/70 bg-primary/10 px-3.5 py-2.5 font-mono text-[11px] font-bold uppercase tracking-[0.22em] text-primary transition hover:bg-primary hover:text-primary-foreground"
                >
                  <span>▸ Pick this brief</span>
                  <span className="inline-grid h-5 w-5 place-items-center border border-primary/60 text-[10px]">
                    →
                  </span>
                </a>
              </div>
            </div>
          </article>
        ))}
      </div>
    </SectionMast>
  );
}

function ReelExamples() {
  const reels = [
    { id: "C_vOzOKhbdJ", brand: "PERMEA", caption: "Skincare reel — absorption angle" },
    { id: "DNSvE16pr8R", brand: "JustPour", caption: "Coffee reel — on-the-go ritual" },
    { id: "DXBq0LRjVu5", brand: "PERMEA", caption: "Skincare reel — routine hook" },
    { id: "DMxI0FCyDOv", brand: "JustPour", caption: "Coffee reel — morning energy" },
  ];
  return (
    <SectionMast
      id="examples"
      crumb="EXAMPLES"
      active="brands"
      tag="Reference reels · From the feed"
      title="THE VIBE."
      titleAccent="REELS THAT LAND."
      accentClass="text-pop-cyan"
      blurb="A taste of the kind of reels these brands are after. Watch, get the tone, then make it yours."
    >
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4 sm:gap-4">
        {reels.map((r) => (
          <div key={r.id} className="relative">
            <div className="relative w-full max-h-[320px]" style={{ aspectRatio: "9 / 16" }}>
              <iframe
                src={`https://www.instagram.com/reel/${r.id}/embed`}
                title={`${r.brand} reference reel`}
                loading="lazy"
                allow="encrypted-media; picture-in-picture; web-share"
                allowFullScreen
                scrolling="no"
                className="absolute inset-0 h-full w-full"
              />
            </div>
          </div>
        ))}
      </div>
    </SectionMast>
  );
}


function Journey() {
  const blue = "#006A4E";
  const steps = [
    { n: "01", t: "Drop your entry", d: "Pick the brand(s) you'd love to create for and apply with your best reel.", date: "May 28", phase: "Applications open" },
    { n: "02", t: "Crack the Top 25", d: "Top 25 entries get shortlisted by the\nbrand.", date: "Jun 05", phase: "Shortlists drop" },
    { n: "03", t: "Brief in your DMs", d: "Shortlisted creators get the sample product, brand brief and creative guardrails.", date: "Jun 07", phase: "Brief released" },
    { n: "04", t: "Shoot. Edit. Ship.", d: "Make the reel, tag the brand, hit submit before the buzzer.", date: "Jun 15", phase: "Submission deadline" },
    { n: "05", t: "Win the spotlight", d: "Cash, gear, brand deals, and campus-wide bragging rights.", date: "Jun 23", phase: "Winners announced" },
  ];

  return (
    <section id="journey" className="border-y border-border">
      <div className="mx-auto max-w-[1400px] px-4 pt-10 sm:px-6 lg:px-10">
        <div className="flex flex-wrap items-center justify-between gap-x-3 gap-y-1 border-b border-border pb-4 sm:gap-3">
          <span className="font-display text-[12px] uppercase tracking-[0.08em] sm:text-[15px] sm:tracking-[0.1em]">
            CREATOR<span className="px-1.5 font-mono text-[10px] font-normal text-muted-foreground sm:px-2 sm:text-[12px]">\</span><span className="text-pop-yellow">JOURNEY</span>
          </span>
          <span className="font-mono text-[9px] uppercase tracking-[0.16em] text-muted-foreground sm:text-[11px] sm:tracking-[0.22em]">Five steps · One reel · Get paid</span>
        </div>
      </div>
      <div className="mx-auto max-w-[1400px] px-4 py-10 sm:px-6 sm:py-16 lg:px-8">
        <div className="border border-white/15">
          {/* Header bar */}
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-white/15 px-4 py-3 sm:gap-4 sm:px-6 sm:py-4">
            <div className="flex flex-wrap items-center gap-3 sm:gap-4">
              <span
                className="inline-flex items-center gap-2 px-2.5 py-1 font-mono text-[10px] font-bold uppercase tracking-[0.22em] text-white"
                style={{ background: blue }}
              >
                <span className="inline-block h-1.5 w-1.5 rotate-45 bg-white" />
                The Run
              </span>
              <h2 className="font-display text-[18px] uppercase leading-none tracking-tight text-foreground sm:text-[22px]">
                From apply to{" "}
                <span className="font-serif italic normal-case" style={{ color: blue }}>
                  applause
                </span>
                <span style={{ color: blue }}>.</span>
              </h2>
            </div>
            <p className="hidden font-mono text-[11px] uppercase tracking-[0.18em] text-muted-foreground sm:block">
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
                    className="text-outline-strong font-display leading-[0.85] tracking-tight transition-colors duration-300 group-hover:text-foreground"
                    style={{ fontSize: "clamp(60px, 11vw, 140px)" }}
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
                  <div className="mt-5 inline-flex items-stretch border border-white/15 bg-background/40 backdrop-blur-sm">
                    <span className="flex items-center px-2 font-mono text-[9px] font-bold uppercase tracking-[0.22em] text-muted-foreground">
                      Due
                    </span>
                    <span
                      className="flex items-center gap-1.5 px-2.5 py-1 font-display text-[13px] font-bold uppercase leading-none tracking-[0.04em] text-white sm:text-[14px]"
                      style={{ background: blue }}
                    >
                      <Calendar className="h-3 w-3" aria-hidden />
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
        <div className="flex flex-wrap items-center justify-between gap-x-3 gap-y-1 border-b border-border pb-4 sm:gap-3">
          <span className="font-display text-[12px] uppercase tracking-[0.08em] sm:text-[15px] sm:tracking-[0.1em]">
            CREATOR<span className="px-1.5 font-mono text-[10px] font-normal text-muted-foreground sm:px-2 sm:text-[12px]">\</span><span className="text-primary">SUBMIT</span>
          </span>
          <span className="font-mono text-[9px] uppercase tracking-[0.16em] text-muted-foreground sm:text-[11px] sm:tracking-[0.22em]">Drop your handle · Get on the list</span>
        </div>
      </div>
      <div className="mx-auto max-w-[1400px] px-4 py-8 sm:px-6 sm:py-14 lg:px-8">
        <div className="relative overflow-hidden rounded-[2.5rem] border border-[#EBE8E0] bg-white shadow-[0_24px_80px_-15px_rgba(0,0,0,0.08)]">
          {/* Soft blooms */}
          <div className="pointer-events-none absolute inset-0 overflow-hidden">
            <div className="absolute -top-[10%] -left-[10%] h-[40%] w-[40%] rounded-full bg-primary/5 blur-[120px]" />
            <div className="absolute -bottom-[10%] -right-[10%] h-[40%] w-[40%] rounded-full bg-pop-cyan/5 blur-[120px]" />
          </div>

          <div className="relative grid lg:grid-cols-[38%_62%]">
            {/* Left: Hero */}
            <div className="flex flex-col justify-between gap-12 border-b border-[#F3F1ED] bg-gradient-to-br from-white to-[#FAF9F6] p-8 sm:p-12 lg:border-b-0 lg:border-r lg:p-14">
              <div className="space-y-8">
                <div className="inline-flex items-center gap-2 rounded-full border border-[#EBE8E0] bg-white px-3 py-1 shadow-sm">
                  <span className="h-2 w-2 animate-pulse rounded-full bg-primary" />
                  <span className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Submit Entry</span>
                </div>
                <div className="space-y-4">
                  <h2 className="font-display text-[clamp(44px,5.5vw,72px)] font-bold leading-[0.95] tracking-tight text-foreground">
                    Drop your<br />
                    <span className="bg-gradient-to-r from-primary via-pop-violet to-pop-cyan bg-clip-text text-transparent">handle.</span>
                  </h2>
                  <p className="max-w-xs text-base leading-relaxed text-muted-foreground">
                    Submit your details and the Instagram profile we should review. Update your reel any time before the deadline.
                  </p>
                </div>
              </div>
              <div className="hidden lg:flex items-center gap-2 text-[11px] font-semibold uppercase tracking-widest text-muted-foreground">
                <span>CREATOR</span>
                <span className="text-border">\</span>
                <span className="text-primary">SUBMIT</span>
              </div>
            </div>

            {/* Right: Form */}
            <div className="bg-white p-6 sm:p-10 lg:p-14">
              <form onSubmit={handleSubmit} method="post" action="#" className="space-y-8">
                <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                  <div className="space-y-2">
                    <label className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-muted-foreground">
                      <User className="h-3 w-3 text-pop-cyan" /> Full Name
                    </label>
                    <Input name="full_name" required placeholder="Your name" className="h-auto w-full rounded-2xl border border-[#EBE8E0] bg-[#F9F8F6] px-5 py-4 text-foreground placeholder:text-muted-foreground/50 transition-all focus-visible:border-primary focus-visible:ring-2 focus-visible:ring-primary/20" />
                  </div>
                  <div className="space-y-2">
                    <label className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-muted-foreground">
                      <Mail className="h-3 w-3 text-pop-cyan" /> University Email
                    </label>
                    <Input name="email" type="email" required placeholder="you@university.edu" className="h-auto w-full rounded-2xl border border-[#EBE8E0] bg-[#F9F8F6] px-5 py-4 text-foreground placeholder:text-muted-foreground/50 transition-all focus-visible:border-primary focus-visible:ring-2 focus-visible:ring-primary/20" />
                  </div>
                </div>

                <div className="space-y-3">
                  <label className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">University Selection</label>
                  <div className="flex flex-wrap gap-2">
                    {UNIVERSITIES.map((u) => (
                      <label key={u} className="cursor-pointer">
                        <input type="radio" name="university" value={u} className="peer sr-only" required />
                        <span className="inline-block rounded-full border border-[#EBE8E0] bg-[#F9F8F6] px-6 py-2 text-sm font-medium text-muted-foreground transition-all hover:border-foreground/30 peer-checked:border-primary peer-checked:bg-primary/10 peer-checked:text-primary">
                          {u}
                        </span>
                      </label>
                    ))}
                  </div>
                </div>

                <div className="space-y-3">
                  <label className="text-[10px] font-bold uppercase tracking-widest text-primary">Brand You're Creating For</label>
                  <div className="grid grid-cols-2 gap-4">
                    {BRANDS.map((b) => (
                      <label key={b} className="cursor-pointer">
                        <input type="radio" name="brand_choice" value={b} className="peer sr-only" required />
                        <span className="relative flex items-center justify-center rounded-2xl border border-[#EBE8E0] bg-white p-4 text-xs font-bold uppercase tracking-widest text-foreground transition-all hover:bg-[#F9F8F6] peer-checked:border-2 peer-checked:border-primary peer-checked:text-primary">
                          {b}
                        </span>
                      </label>
                    ))}
                  </div>
                </div>

                <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                  <div className="space-y-2">
                    <label className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-muted-foreground">
                      <AtSign className="h-3 w-3 text-pop-violet" /> Instagram Handle
                    </label>
                    <Input name="instagram_handle" required placeholder="@yourhandle" className="h-auto w-full rounded-2xl border border-[#EBE8E0] bg-[#F9F8F6] px-5 py-4 text-foreground placeholder:text-muted-foreground/50 transition-all focus-visible:border-pop-violet focus-visible:ring-2 focus-visible:ring-pop-violet/20" />
                  </div>
                  <div className="space-y-2">
                    <label className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-muted-foreground">
                      <Phone className="h-3 w-3 text-pop-violet" /> WhatsApp Number
                    </label>
                    <Input name="whatsapp_number" type="tel" required inputMode="tel" pattern="^\+?[0-9\s\-()]{7,20}$" placeholder="+91 98765 43210" className="h-auto w-full rounded-2xl border border-[#EBE8E0] bg-[#F9F8F6] px-5 py-4 text-foreground placeholder:text-muted-foreground/50 transition-all focus-visible:border-pop-violet focus-visible:ring-2 focus-visible:ring-pop-violet/20" />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-muted-foreground">
                    <LinkIcon className="h-3 w-3 text-primary" /> Link to your best reel
                  </label>
                  <Input name="notes" type="url" required placeholder="https://instagram.com/reel/…" className="h-auto w-full rounded-2xl border border-[#EBE8E0] bg-[#F9F8F6] px-5 py-4 text-foreground placeholder:text-muted-foreground/50 transition-all focus-visible:border-primary focus-visible:ring-2 focus-visible:ring-primary/20" />
                </div>

                <div className="flex flex-col items-center justify-between gap-6 pt-6 md:flex-row">
                  <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-muted-foreground/60">
                    By submitting you agree to the contest rules.
                  </p>
                  <Button type="submit" disabled={submitting} className="group h-auto w-full rounded-full gradient-pop bg-slate-600 px-6 py-3 font-mono text-[11px] font-bold uppercase tracking-[0.22em] text-primary-foreground shadow-pop transition hover:opacity-95 hover:shadow-[0_25px_60px_-15px_var(--primary)] disabled:opacity-80 md:w-auto">
                    {submitting ? (
                      <span className="flex items-center gap-2">
                        <Loader2 className="h-4 w-4 animate-spin" /> Submitting…
                      </span>
                    ) : (
                      <span className="flex items-center gap-3">
                        Submit my profile
                        <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                      </span>
                    )}
                  </Button>
                </div>
              </form>
            </div>
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
            <div className="flex items-center gap-4">
              <img src={mastersUnionLogo} alt="Masters' Union" className="h-10 w-auto" />
            </div>
            <p className="mt-5 max-w-sm text-[14px] leading-relaxed text-muted-foreground">
              The platform that turns your phone into a paycheck. Real brand briefs, paid reels, and a runway to becoming the next big creator on the feed.
            </p>
          </div>
          <div className="md:col-span-3">
            <p className="text-[11px] uppercase tracking-[0.18em] text-muted-foreground">Explore</p>
            <ul className="mt-4 space-y-2 text-[14px]">
              <li><a href="#brands" className="hover:text-primary">Brands</a></li>
              
              <li><a href="#signup" className="hover:text-primary">Submit</a></li>
            </ul>
          </div>
          <div className="md:col-span-3">
            <p className="text-[11px] uppercase tracking-[0.18em] text-muted-foreground">Follow</p>
            <ul className="mt-4 space-y-2 text-[14px]">
              <li className="flex items-center gap-2">
                <Instagram className="h-4 w-4 text-primary" />
                <a href="https://instagram.com/mastersunion" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition">@mastersunion</a>
              </li>
            </ul>
          </div>
        </div>
        <div className="mt-12 flex flex-wrap items-center justify-between gap-4 border-t border-border pt-6 text-[13px] text-muted-foreground">
          <p>© 2026 Creator on Reels</p>
          
        </div>
      </div>
    </footer>
  );
}

import Link from "next/link";
import { cn } from "@/lib/cn";

export default function Home() {
  return (
    <main className="mx-auto max-w-3xl px-6 py-20">
      <div className="text-xs font-mono uppercase tracking-wider text-primary">
        System Design Visual
      </div>
      <h1 className="mt-3 text-5xl font-bold tracking-tight leading-[1.05]">
        Learn system design by{" "}
        <span className="text-primary">watching it work.</span>
      </h1>
      <p className="mt-6 text-lg text-foreground/80 max-w-xl leading-relaxed">
        Interactive, animated lessons built for absolute beginners. Hover any
        underlined term to see what it means — no jargon left behind.
      </p>

      <div className="mt-10">
        <Link
          href="/concepts/request-journey"
          className="inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-primary-fg font-medium shadow hover:opacity-90 transition"
        >
          Start with Lesson 1 →
        </Link>
      </div>

      <div className="mt-16">
        <div className="font-mono text-[11px] uppercase tracking-wider text-muted mb-4">
          Curriculum
        </div>
        <div className="grid gap-3 sm:grid-cols-2">
          <LessonCard
            num="1"
            title="The journey of one request"
            blurb="What actually happens when you visit a website."
            status="ready"
            href="/concepts/request-journey"
          />
          <LessonCard
            num="2"
            title="Latency & throughput"
            blurb="The two numbers that decide if your site feels fast."
            status="coming"
          />
          <LessonCard
            num="3"
            title="The database"
            blurb="Why apps split memory from logic."
            status="coming"
          />
          <LessonCard
            num="4"
            title="When one server isn't enough"
            blurb="How systems melt under load — and why."
            status="coming"
          />
          <LessonCard
            num="5"
            title="Load balancers"
            blurb="Spreading the work across many servers."
            status="coming"
          />
          <LessonCard
            num="6"
            title="Caching"
            blurb="Remembering answers to avoid doing the work twice."
            status="coming"
          />
        </div>
      </div>
    </main>
  );
}

type LessonCardProps = {
  num: string;
  title: string;
  blurb: string;
  status: "ready" | "coming";
  href?: string;
};

function LessonCard({ num, title, blurb, status, href }: LessonCardProps) {
  const inner = (
    <div
      className={cn(
        "rounded-xl border bg-surface p-5 transition h-full",
        status === "ready"
          ? "border-border hover:border-primary hover:shadow-md cursor-pointer"
          : "border-border/60 opacity-55"
      )}
    >
      <div className="flex items-baseline gap-3">
        <span className="font-mono text-[11px] text-muted">Lesson {num}</span>
        {status === "coming" && (
          <span className="text-[9px] uppercase tracking-wider text-muted">
            coming soon
          </span>
        )}
        {status === "ready" && (
          <span className="text-[9px] uppercase tracking-wider text-primary">
            available
          </span>
        )}
      </div>
      <div className="mt-1.5 text-base font-semibold leading-snug">{title}</div>
      <div className="mt-1 text-sm text-foreground/65">{blurb}</div>
    </div>
  );
  return href ? <Link href={href}>{inner}</Link> : inner;
}

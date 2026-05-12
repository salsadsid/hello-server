import Link from "next/link";
import { Term } from "@/components/glossary/Term";
import { CafeDemo } from "@/components/sim/cafe/CafeDemo";

export default function LatencyThroughputPage() {
  return (
    <main className="mx-auto max-w-3xl px-6 py-12">
      <p className="font-mono text-[11px] uppercase tracking-wider text-muted">
        Lesson 2
      </p>
      <h1 className="mt-2 text-4xl font-bold tracking-tight leading-tight">
        Fast for whom?
      </h1>
      <p className="mt-5 text-lg text-foreground/80 leading-relaxed">
        Last time, we sent <Term name="request">one request</Term> from your{" "}
        <Term name="browser">browser</Term> to a{" "}
        <Term name="server">server</Term> and watched it come back. Maybe 100
        milliseconds, round trip. Snappy.
      </p>
      <p className="mt-4 text-lg text-foreground/80 leading-relaxed">
        Now answer this: when your friend says{" "}
        <strong className="text-foreground">&ldquo;this site is fast,&rdquo;</strong>{" "}
        what do they actually mean?
      </p>

      <div className="mt-8 grid sm:grid-cols-2 gap-3">
        <Definition
          label="Meaning 1"
          phrase="My page loaded quickly."
          term="latency"
          termLabel="latency"
          tail="how long one request takes — your personal wait."
        />
        <Definition
          label="Meaning 2"
          phrase="The site stays fast even when everyone's on it."
          term="throughput"
          termLabel="throughput"
          tail="how many requests the system finishes per second — the system's output."
        />
      </div>

      <p className="mt-8 text-foreground/85 leading-relaxed">
        These feel similar. They are <em>not</em> the same thing — and to see
        why, it helps to step away from browsers for a moment. Imagine three
        cafes.
      </p>

      <div className="mt-3 text-foreground/85 leading-relaxed">
        <p>
          Each cafe gets the <strong>same customers, arriving at the same rate</strong>:
          one every second. Each cafe handles them differently. Press{" "}
          <strong>Play</strong> and watch the dots.
        </p>
      </div>

      <div className="my-8">
        <CafeDemo />
      </div>

      <p className="text-sm text-muted italic">
        Tip: dots in the <span className="text-foreground/80">Queue</span> are
        waiting customers. The bars on the right are drinks being made. The
        numbers at the top of each cafe update live — keep an eye on{" "}
        <strong>avg wait</strong> and <strong>drinks/s</strong>.
      </p>

      <div className="mt-10 space-y-7 text-foreground/85 leading-relaxed">
        <section>
          <h2 className="text-xl font-semibold pt-4 border-t border-border">
            What you just saw
          </h2>

          <div className="mt-4 space-y-4">
            <CafeRecap accent="amber" name="Cafe Solo">
              One barista, three seconds per drink. She works hard. But
              customers keep showing up faster than drinks come out — so the{" "}
              <Term name="queue">queue</Term> grows, and grows, and grows. Every
              new customer waits longer than the one before.
            </CafeRecap>
            <CafeRecap accent="primary" name="Cafe Crew">
              Same slow recipe, but <em>four</em> baristas working in{" "}
              <Term name="parallel">parallel</Term>. Four drinks are now in
              progress at once, so the shop finishes them four times faster —
              the queue stays short. But look closely:{" "}
              <strong>each individual customer still waits about 3 seconds.</strong>{" "}
              Adding baristas didn&apos;t make any single drink come out faster.
            </CafeRecap>
            <CafeRecap accent="accent" name="Cafe Speedy">
              One barista — but trained to make drinks in 0.75 seconds. The
              shop finishes drinks at the same rate as Crew (4 drinks every 3
              seconds, either way), <em>and</em> every customer&apos;s wait is
              tiny. Best of both worlds.
            </CafeRecap>
          </div>
        </section>

        <section>
          <h2 className="text-xl font-semibold pt-4">The plot twist</h2>
          <p className="mt-3">
            Here&apos;s the part that catches everyone the first time:
          </p>
          <blockquote className="mt-4 rounded-xl border-l-4 border-primary bg-primary/5 px-5 py-4">
            <p className="text-foreground font-medium">
              Adding workers raises throughput.{" "}
              <span className="text-primary">
                It doesn&apos;t lower latency.
              </span>
            </p>
          </blockquote>
          <p className="mt-4">
            Cafe Crew handles 4× as many drinks per second as Cafe Solo. But if
            you walked in alone, your drink would <em>still</em> take 3
            seconds. More baristas means more drinks can be made at the same
            time. It doesn&apos;t mean each drink is finished any faster.
          </p>
          <p className="mt-3">
            The only way to lower <em>your</em> wait is to make the actual
            work faster.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold pt-4">Two knobs</h2>
          <div className="mt-4 overflow-hidden rounded-xl border border-border">
            <table className="w-full text-sm">
              <thead className="bg-foreground/5 text-left">
                <tr>
                  <th className="px-4 py-2 font-mono text-[11px] uppercase tracking-wider text-muted">
                    To improve…
                  </th>
                  <th className="px-4 py-2 font-mono text-[11px] uppercase tracking-wider text-muted">
                    …turn this knob
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                <tr>
                  <td className="px-4 py-3 font-medium">
                    <Term name="throughput">Throughput</Term>
                  </td>
                  <td className="px-4 py-3 text-foreground/80">
                    Add <Term name="parallel">parallel</Term> workers
                    {" "}(or speed each one up).
                  </td>
                </tr>
                <tr>
                  <td className="px-4 py-3 font-medium">
                    <Term name="latency">Latency</Term>
                  </td>
                  <td className="px-4 py-3 text-foreground/80">
                    Speed each worker up. (More workers won&apos;t help.)
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <p className="mt-4 text-sm text-muted">
            There&apos;s actually a third trick — <em>skip the work entirely</em>{" "}
            by remembering an old answer. That&apos;s caching, and we&apos;ll
            get to it.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold pt-4">
            Out on the real internet
          </h2>
          <p className="mt-3">
            Once you see this distinction, you spot it everywhere:
          </p>
          <ul className="mt-3 space-y-2 list-disc pl-5">
            <li>
              When Netflix says <em>&ldquo;we can serve 200 million viewers at once&rdquo;</em>{" "}
              — that&apos;s throughput.
            </li>
            <li>
              When Netflix says <em>&ldquo;your show starts playing in 2 seconds&rdquo;</em>{" "}
              — that&apos;s latency.
            </li>
            <li>
              A small blog can have <strong>great throughput</strong> (it&apos;ll
              never run out of capacity for its five readers) and{" "}
              <strong>terrible latency</strong> (3 seconds per page on a slow
              host).
            </li>
            <li>
              A stock-trading system might have <strong>microsecond latency</strong>{" "}
              (because every millisecond costs money) but{" "}
              <strong>tiny throughput</strong> (it only needs to serve one
              trader).
            </li>
          </ul>
          <p className="mt-4">
            So when somebody says <em>&ldquo;we need to make it faster&rdquo;</em>
            , the very first question is:{" "}
            <strong>fast for whom?</strong> For one person, or for everyone at
            once?
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold pt-4">
            One honest caveat
          </h2>
          <p className="mt-3">
            Our cafes pretended baristas never get tired and queues never
            affect how fast they work. Real{" "}
            <Term name="server">servers</Term> aren&apos;t like that. When too
            many <Term name="request">requests</Term> pile up, the{" "}
            <Term name="queue">queue</Term> itself starts to hurt — handling all
            those waiting requests costs memory, attention, and time.
            Eventually the whole server starts to wobble, and the picture from
            lesson 1 melts.
          </p>
          <p className="mt-3">
            We&apos;ll watch that meltdown for real in <strong>lesson 4</strong>.
            For now, hold onto this:
          </p>
          <p className="mt-4 text-lg font-semibold text-foreground">
            &ldquo;Fast&rdquo; is two numbers, not one.
          </p>
        </section>

        <div className="mt-10 rounded-xl border border-primary/30 bg-primary/5 p-5">
          <div className="font-mono text-[11px] uppercase tracking-wider text-primary">
            quick recap
          </div>
          <ul className="mt-2 text-foreground/85 space-y-1 list-disc pl-5">
            <li>
              <strong>Latency</strong> = how long <em>one</em> request takes.
            </li>
            <li>
              <strong>Throughput</strong> = how many requests finish{" "}
              <em>per second</em>.
            </li>
            <li>More workers in parallel → more throughput, same latency.</li>
            <li>Faster work per request → less latency AND more throughput.</li>
          </ul>
        </div>

        <Link
          href="/"
          className="mt-10 flex items-center justify-between rounded-xl border border-dashed border-border p-4 hover:border-primary/60 hover:bg-primary/[0.03] transition"
        >
          <div>
            <div className="font-mono text-[10px] uppercase tracking-wider text-muted">
              Up next
            </div>
            <div className="text-sm font-semibold mt-0.5">
              Lesson 3 — The database
            </div>
          </div>
          <span className="text-xs text-muted">coming soon</span>
        </Link>
      </div>
    </main>
  );
}

function Definition({
  label,
  phrase,
  term,
  termLabel,
  tail,
}: {
  label: string;
  phrase: string;
  term: string;
  termLabel: string;
  tail: string;
}) {
  return (
    <div className="rounded-xl border border-border bg-surface p-4">
      <div className="font-mono text-[10px] uppercase tracking-wider text-muted">
        {label}
      </div>
      <div className="mt-1.5 text-foreground/90 italic">&ldquo;{phrase}&rdquo;</div>
      <div className="mt-3 text-sm text-foreground/75">
        That&apos;s <Term name={term}>{termLabel}</Term> — {tail}
      </div>
    </div>
  );
}

const ACCENT_BAR: Record<string, string> = {
  amber: "bg-amber-500",
  primary: "bg-primary",
  accent: "bg-accent",
};

const ACCENT_TEXT: Record<string, string> = {
  amber: "text-amber-600 dark:text-amber-400",
  primary: "text-primary",
  accent: "text-accent",
};

function CafeRecap({
  accent,
  name,
  children,
}: {
  accent: "amber" | "primary" | "accent";
  name: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex gap-3">
      <div
        className={`shrink-0 w-1 rounded-full ${ACCENT_BAR[accent]}`}
        aria-hidden
      />
      <div className="min-w-0">
        <div className={`font-semibold text-sm ${ACCENT_TEXT[accent]}`}>
          {name}
        </div>
        <p className="mt-1">{children}</p>
      </div>
    </div>
  );
}

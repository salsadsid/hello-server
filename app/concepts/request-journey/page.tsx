import Link from "next/link";
import { Term } from "@/components/glossary/Term";
import { RequestJourneyDemo } from "@/components/sim/RequestJourneyDemo";

export default function RequestJourneyPage() {
  return (
    <main className="mx-auto max-w-3xl px-6 py-12">
      <Link
        href="/"
        className="text-xs text-muted hover:text-foreground transition"
      >
        ← Back home
      </Link>

      <p className="mt-6 font-mono text-[11px] uppercase tracking-wider text-muted">
        Lesson 1
      </p>
      <h1 className="mt-2 text-4xl font-bold tracking-tight leading-tight">
        The journey of one request
      </h1>
      <p className="mt-5 text-lg text-foreground/80 leading-relaxed">
        Every website you&apos;ve ever visited starts with one tiny conversation:
        your <Term name="browser">browser</Term> asks a{" "}
        <Term name="server">server</Term> for a page, and the server sends one
        back. That&apos;s it. The rest of system design is just variations on
        this picture.
      </p>

      <div className="my-10">
        <RequestJourneyDemo />
      </div>

      <p className="text-sm text-muted italic">
        Tip: hover any underlined word to see what it means.
      </p>

      <div className="mt-10 space-y-6 text-foreground/85 leading-relaxed">
        <p>
          Press <strong>Play</strong> above and watch a single request travel out
          from your browser, find its way to a server, and come back. Here&apos;s
          what just happened, step by step:
        </p>

        <section>
          <h2 className="text-xl font-semibold mt-8 pt-4 border-t border-border">
            Step 1 — Looking up the address
          </h2>
          <p className="mt-3">
            You typed{" "}
            <code className="px-1 py-0.5 rounded bg-foreground/5 font-mono text-sm">
              google.com
            </code>{" "}
            into your browser. But computers don&apos;t actually understand names
            like &quot;google.com&quot; — they only know numbers called{" "}
            <Term name="ip-address">IP addresses</Term>. So the first thing the
            browser does is ask <Term name="dns">DNS</Term> — the internet&apos;s
            phonebook — for the correct number.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold mt-6">Step 2 — Sending the request</h2>
          <p className="mt-3">
            Once your browser knows the IP, it sends an{" "}
            <Term name="http">HTTP</Term> <Term name="request">request</Term> to
            that address. The request basically says: &quot;Hi, GET me the
            homepage.&quot;
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold mt-6">Step 3 — The server answers</h2>
          <p className="mt-3">
            The server reads the request, gathers what was asked for, and sends a{" "}
            <Term name="response">response</Term> back — usually HTML (the
            language web pages are written in), along with a small code like{" "}
            <code className="font-mono text-sm">200</code> meaning success.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold mt-6">Step 4 — The browser draws it</h2>
          <p className="mt-3">
            Your browser receives the HTML and paints it onto the screen as the
            page you see. The whole round-trip might take only ~100 milliseconds
            of <Term name="latency">latency</Term> — but every single one of
            those four steps had to happen, in order.
          </p>
        </section>

        <div className="mt-10 rounded-xl border border-primary/30 bg-primary/5 p-5">
          <div className="font-mono text-[11px] uppercase tracking-wider text-primary">
            why this matters
          </div>
          <p className="mt-2 text-foreground/85">
            Every system design idea you&apos;ll meet later — <em>load
            balancers</em>, <em>caches</em>, <em>databases</em>, <em>CDNs</em>{" "}
            — exists because this simple picture stops working when millions of
            people ask for the homepage at once. Hold onto this image. We&apos;re
            going to break it on purpose, lesson by lesson.
          </p>
        </div>

        <div className="mt-10 flex items-center justify-between rounded-xl border border-dashed border-border p-4">
          <div>
            <div className="font-mono text-[10px] uppercase tracking-wider text-muted">
              Up next
            </div>
            <div className="text-sm font-semibold">
              Lesson 2 — Latency &amp; throughput
            </div>
          </div>
          <span className="text-xs text-muted">coming soon</span>
        </div>
      </div>
    </main>
  );
}

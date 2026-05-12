import { Term } from "@/components/glossary/Term";
import type { GlossaryRegistry } from "./registry";

export const entries: GlossaryRegistry = {
  browser: {
    name: "browser",
    label: "browser",
    short: "The app on your phone or computer that shows web pages.",
    body: (
      <>
        A browser is what you use to visit websites — Chrome, Safari, Firefox, Edge.
        When you type a web address, the browser is the{" "}
        <Term name="client">client</Term> that asks the internet for a page and shows
        you the result.
      </>
    ),
    related: ["client", "request"],
  },
  client: {
    name: "client",
    label: "client",
    short: "The side that asks for something.",
    body: (
      <>
        In a conversation between two computers, the <em>client</em> is the one that
        asks (&quot;send me the homepage&quot;), and the{" "}
        <Term name="server">server</Term> is the one that answers. Your{" "}
        <Term name="browser">browser</Term> is a client. So is a mobile app.
      </>
    ),
    related: ["server", "request"],
  },
  server: {
    name: "server",
    label: "server",
    short: "A computer that waits for requests and answers them.",
    body: (
      <>
        A server is a computer that runs all day waiting to answer{" "}
        <Term name="request">requests</Term>. When you visit a website, somewhere a
        server reads your request, looks up what you need, and sends a{" "}
        <Term name="response">response</Term> back. The same physical machine can
        host many servers for different websites.
      </>
    ),
    related: ["request", "response", "client"],
  },
  request: {
    name: "request",
    label: "request",
    short: "A message asking for something — usually from a client to a server.",
    body: (
      <>
        A request is the message a <Term name="client">client</Term> sends to a{" "}
        <Term name="server">server</Term>. It typically says <em>what</em> action
        (&quot;GET&quot;), <em>where</em> (&quot;/products&quot;), and sometimes
        carries extra info. The server reads the request and sends back a{" "}
        <Term name="response">response</Term>.
      </>
    ),
    related: ["response", "http"],
  },
  response: {
    name: "response",
    label: "response",
    short: "The answer a server sends back to a client's request.",
    body: (
      <>
        After receiving a <Term name="request">request</Term>, a{" "}
        <Term name="server">server</Term> sends a response — the actual content (a
        webpage, an image, some data) plus a small status like &quot;200 OK&quot;
        meaning success, or &quot;404 Not Found&quot; meaning the thing you asked
        for doesn&apos;t exist.
      </>
    ),
    related: ["request", "http"],
  },
  dns: {
    name: "dns",
    label: "DNS",
    short: "The internet's phonebook — turns 'google.com' into a numeric address.",
    body: (
      <>
        Computers don&apos;t really know names like &quot;google.com&quot; — they
        only know numbers called{" "}
        <Term name="ip-address">IP addresses</Term>. DNS (Domain Name System) is a
        giant phonebook: you ask &quot;where is google.com?&quot; and it answers
        with the IP. Your <Term name="browser">browser</Term> does this lookup
        automatically every time you visit a website.
      </>
    ),
    related: ["ip-address", "browser"],
  },
  "ip-address": {
    name: "ip-address",
    label: "IP address",
    short: "A computer's unique numeric address on the internet.",
    body: (
      <>
        An IP address is like a phone number for a computer on the internet — e.g.,{" "}
        <code className="font-mono text-xs">142.250.190.78</code>.{" "}
        <Term name="dns">DNS</Term> turns friendly names into these numbers so that{" "}
        <Term name="request">requests</Term> can actually be delivered to the right
        machine.
      </>
    ),
    related: ["dns"],
  },
  http: {
    name: "http",
    label: "HTTP",
    short: "The language clients and servers use to talk on the web.",
    body: (
      <>
        HTTP (HyperText Transfer Protocol) is the shared format for{" "}
        <Term name="request">requests</Term> and{" "}
        <Term name="response">responses</Term> on the web. It defines verbs like{" "}
        <code className="font-mono text-xs">GET</code> (read) and{" "}
        <code className="font-mono text-xs">POST</code> (send), and status codes
        like <code className="font-mono text-xs">200</code> (success) and{" "}
        <code className="font-mono text-xs">404</code> (not found). HTTPS is the
        same thing, encrypted.
      </>
    ),
    related: ["request", "response"],
  },
  latency: {
    name: "latency",
    label: "latency",
    short: "How long one request takes to finish — your personal wait.",
    body: (
      <>
        Latency is the wait — how many milliseconds pass between sending a{" "}
        <Term name="request">request</Term> and getting the{" "}
        <Term name="response">response</Term> back. It&apos;s a measure from{" "}
        <em>one</em> request&apos;s point of view. Distance, congestion, and how
        long the <Term name="server">server</Term> takes to do the work all add
        to it. Low latency means snappy; high latency means laggy. Latency is
        often confused with <Term name="throughput">throughput</Term>, but
        they&apos;re different numbers.
      </>
    ),
    related: ["throughput", "request", "response"],
  },
  throughput: {
    name: "throughput",
    label: "throughput",
    short: "How many requests a system finishes per second.",
    body: (
      <>
        Throughput is how much work a system gets through over time — drinks per
        minute, <Term name="request">requests</Term> per second, packages per
        hour. It&apos;s a measure of the system&apos;s output, not any single
        request. A system can have high throughput <em>and</em> high{" "}
        <Term name="latency">latency</Term> (a giant cargo ship), or low
        throughput and low latency (an artisan making one perfect coffee). When
        someone says &quot;fast,&quot; always ask which one they mean.
      </>
    ),
    related: ["latency", "parallel"],
  },
  parallel: {
    name: "parallel",
    label: "parallel",
    short: "Doing many things at the same time, instead of one after another.",
    body: (
      <>
        When work happens in parallel, several tasks run side by side. Four
        baristas in parallel finish four drinks in the time one barista
        finishes one. Parallelism is how systems get high{" "}
        <Term name="throughput">throughput</Term> without making each
        individual task any faster — each drink still takes the same time, but
        more drinks can be in progress at once.
      </>
    ),
    related: ["throughput", "server"],
  },
  queue: {
    name: "queue",
    label: "queue",
    short: "A line of waiting work, handled in the order it arrived.",
    body: (
      <>
        When more <Term name="request">requests</Term> show up than a{" "}
        <Term name="server">server</Term> can handle right now, the extras wait
        in line — a queue. The longer the queue, the longer each new request
        waits before it&apos;s even picked up. Queues are why a system&apos;s{" "}
        <Term name="latency">latency</Term> can get worse even when each
        request, on its own, would still be fast.
      </>
    ),
    related: ["latency", "throughput"],
  },
};

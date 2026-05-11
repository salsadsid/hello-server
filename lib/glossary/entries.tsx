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
    short: "How long it takes for a message to travel one way.",
    body: (
      <>
        Latency is the wait — how many milliseconds pass between sending a{" "}
        <Term name="request">request</Term> and the first byte of the{" "}
        <Term name="response">response</Term> coming back. Distance, congestion, and
        the speed of the <Term name="server">server</Term> all add to it. Low
        latency means snappy; high latency means laggy.
      </>
    ),
    related: ["request", "response"],
  },
};

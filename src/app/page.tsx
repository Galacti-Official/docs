import DocSidebar from "@/components/DocSidebar";
import TableOfContents from "@/components/TableOfContents";
import DocPagination from "@/components/DocPagination";
import Link from "next/link";
import type { Metadata } from "next";
import { FlaskConical, Map, Server, Zap } from "lucide-react";

export const metadata: Metadata = {
  title: "Introduction — Galacti Docs",
  description: "Welcome to the Galacti documentation.",
};

const components = [
  {
    name: "Galacti Labs",
    desc: "Experimental compute and research environment",
    href: "/platform/labs",
    icon: FlaskConical,
  },
  {
    name: "Galacti Atlas",
    desc: "Mapping and data exploration tools",
    href: "/platform/atlas",
    icon: Map,
  },
  {
    name: "Game Server Hosting",
    desc: "Affordable, managed game servers",
    href: "/platform/hosting",
    icon: Server,
  },
  {
    name: "Andromeda API",
    desc: "Unified programmatic access to Galacti services",
    href: "/api",
    icon: Zap,
  },
];

export default function HomePage() {
  return (
    <div className="flex min-h-screen">
      <DocSidebar />
      <div className="flex flex-1 min-w-0">
        <article className="flex-1 min-w-0 px-6 py-10 md:px-10">
          <div className="prose prose-invert docs-prose max-w-none xl:max-w-3xl">
            <h1>Introduction</h1>
            <p>
              Welcome to the <strong>Galacti documentation</strong>. Here you&apos;ll find guides,
              references, and resources for everything across the Galacti platform.
            </p>

            <h2 id="what-is-galacti">What is Galacti?</h2>
            <p>
              Galacti is open infrastructure for open experimentation — a platform built to give
              everyone access to computing, tooling, and community without gatekeeping.
            </p>

            <h2 id="where-to-start">Where to start</h2>
            <ul>
              <li>
                <Link href="/quick-start"><strong>Quick Start</strong></Link>
                {" "}— get up and running in minutes
              </li>
              <li>
                <Link href="/platform"><strong>Platform Overview</strong></Link>
                {" "}— understand the full platform
              </li>
              <li>
                <Link href="/api"><strong>Andromeda API</strong></Link>
                {" "}— integrate with our API
              </li>
            </ul>

            <h2 id="platform-components">Platform components</h2>
          </div>

          <div className="not-prose xl:max-w-3xl mt-4 grid grid-cols-1 sm:grid-cols-2 gap-3">
            {components.map(({ name, desc, href, icon: Icon }) => (
              <Link
                key={name}
                href={href}
                className="group flex items-start gap-4 rounded-lg border border-white/10 bg-white/[0.03] px-5 py-4 transition hover:border-white/20 hover:bg-white/[0.06]"
              >
                <span className="mt-0.5 rounded-md border border-white/10 bg-white/5 p-2 text-white/60 group-hover:text-white/90 transition">
                  <Icon className="h-4 w-4" />
                </span>
                <div>
                  <p className="text-sm font-medium text-white/90">{name}</p>
                  <p className="mt-0.5 text-sm text-white/45">{desc}</p>
                </div>
              </Link>
            ))}
          </div>

          <div className="prose prose-invert docs-prose max-w-none xl:max-w-3xl mt-8">
            <h2 id="need-help">Need help?</h2>
            <p>
              If something isn&apos;t covered here, check the{" "}
              <a href="https://support.galacti.org">Support Center</a> or join us on{" "}
              <a href="https://discord.gg/galacti">Discord</a>.
            </p>
          </div>
          <DocPagination />
        </article>
        <TableOfContents />
      </div>
    </div>
  );
}

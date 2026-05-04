import DocSidebar from "@/components/DocSidebar";
import TableOfContents from "@/components/TableOfContents";
import DocPagination from "@/components/DocPagination";
import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Introduction — Galacti Docs",
  description: "Welcome to the Galacti documentation.",
};

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
          </div>

          <div className="prose prose-invert docs-prose max-w-none xl:max-w-3xl mt-8">
            <h2 id="need-help">Need help?</h2>
            <p>
              If something isn&apos;t covered here, check the{" "}
              <a href="https://support.galacti.org">Support Center</a> or join us on{" "}
              <a href="https://discord.gg/QmB9agMj6t">Discord</a>.
            </p>
          </div>
          <DocPagination />
        </article>
        <TableOfContents />
      </div>
    </div>
  );
}

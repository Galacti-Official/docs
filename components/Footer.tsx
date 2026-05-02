import Link from "next/link";
import Image from "next/image";


export default function Footer() {
  return (
    <footer className="w-full border-t border-white/10 px-6 py-10 bg-black">
      <div className="mx-auto w-full max-w-7xl">
        {/* Columns */}
        <div className="grid grid-cols-2 gap-6 sm:grid-cols-3 lg:grid-cols-5">
          {/* Logo & Description */}
          <div className="col-span-2 lg:col-span-1 px-10">
            <Link href="/" className="flex items-center space-x-2">
              <Image
                src="/galaxy.svg"
                alt="Galacti Logo"
                width={512}
                height={512}
                className="w-80 h-auto"
              />
            </Link>
          </div>
        
          {/* Column 1 - Main*/}
          <div>
            <h3 className="font-subheading mb-3 text-xs font-normal uppercase tracking-wider text-white/50">
              Galacti
            </h3>
            <ul className="space-y-2">
              <li>
                <Link href="https://galacti.org/about/history" className="text-xs text-white/75 hover:text-white transition-colors">
                  About
                </Link>
              </li>
              <li>
                <Link href="https://galacti.org/about/mission" className="text-xs text-white/75 hover:text-white transition-colors">
                  Mission & Values
                </Link>
              </li>
              <li>
                <Link href="https://galacti.org/about/team" className="text-xs text-white/75 hover:text-white transition-colors">
                  Team
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 2 - Transparency*/}
          <div>
            <h3 className="font-subheading mb-3 text-xs font-normal uppercase tracking-wider text-white/50">
              Transparency
            </h3>
            <ul className="space-y-2">
              <li>
                <Link href="https://galacti.org/transparency" className="text-xs text-white/75 hover:text-white transition-colors">
                  Overview
                </Link>
              </li>
              <li>
                <Link href="https://galacti.org/transparency/structure" className="text-xs text-white/75 hover:text-white transition-colors">
                  Structure
                </Link>
              </li>
              <li>
                <Link href="https://galacti.org/transparency/roadmap" className="text-xs text-white/75 hover:text-white transition-colors">
                  Roadmap
                </Link>
              </li>
              <li>
                <Link href="https://galacti.org/transparency/reports" className="text-xs text-white/75 hover:text-white transition-colors">
                  Reports
                </Link>
              </li>
              <li>
                <Link href="https://galacti.org/transparency/policies" className="text-xs text-white/75 hover:text-white transition-colors">
                  Policies
                </Link>
              </li>
              <li>
                <Link href="https://galacti.org/transparency/funding" className="text-xs text-white/75 hover:text-white transition-colors">
                  Funding
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3 - Platform*/}
          <div>
            <h3 className="font-subheading mb-3 text-xs font-normal uppercase tracking-wider text-white/50">
              Platform
            </h3>
            <ul className="space-y-2">
              <li>
                <Link href="https://dashboard.galacti.org" className="text-xs text-white/75 hover:text-white transition-colors">
                  Dashboard
                </Link>
              </li>  
              <li>
                <Link href="https://labs.galacti.org" className="text-xs text-white/75 hover:text-white transition-colors">
                  Galacti Labs
                </Link>
              </li>
              <li>
                <Link href="https://atlas.galacti.org" className="text-xs text-white/75 hover:text-white transition-colors">
                  Galacti Atlas
                </Link>
              </li>
              <li>
                <Link href="https://hosting.galacti.org" className="text-xs text-white/75 hover:text-white transition-colors">
                  Game Server Hosting
                </Link>
              </li>
              <li>
                <Link href="https://galacti.org/components/api" className="text-xs text-white/75 hover:text-white transition-colors">
                  Andromeda API
                </Link>
              </li>
              <li>
                <Link href="https://galacti.org/projects" className="text-xs text-white/75 hover:text-white transition-colors">
                  Projects
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 4 - Support*/}
          <div>
            <h3 className="font-subheading mb-3 text-xs font-normal uppercase tracking-wider text-white/50">
              Support
            </h3>
            <ul className="space-y-2">
              <li>
                <Link href="https://support.galacti.org" className="text-xs text-white/75 hover:text-white transition-colors">
                  Support Center
                </Link>
              </li>
              <li>
                <Link href="https://support.galacti.org/faq" className="text-xs text-white/75 hover:text-white transition-colors">
                  FAQ
                </Link>
              </li>
              <li>
                <Link href="https://docs.galacti.org" className="text-xs text-white/75 hover:text-white transition-colors">
                  Docs
                </Link>
              </li>
              <li>
                <Link href="https://galacti.org/report-abuse" className="text-xs text-white/75 hover:text-white transition-colors">
                  Report Abuse
                </Link>
              </li>
              <li>
                <Link href="https://status.galacti.org" className="text-xs text-white/75 hover:text-white transition-colors">
                  System Status
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Lower Footer Section */}  
      <div className="mt-10 pt-6 mx-auto w-full max-w-7xl border-t border-white/10">
        <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
          <div className="flex flex-col max-w-xs items-center space-x-2">
            <p className="text-xs text-white/50"> 
              &copy; {new Date().getFullYear()} Galacti. Temporarily sponsored by {""}
            </p>
            <p className="text-xs text-white/50">
              <Link href="https://www.soulex-consult.com" className="underline hover:text-white transition-colors">Soulex-Consult s.r.o.</Link>
            </p>
          </div>
          <div className="flex space-x-4">
            <Link href="https://galacti.org/sitemap" className="text-xs text-white/50 hover:text-white transition-colors">
              Sitemap
            </Link>
            <Link href="/terms" className="text-xs text-white/50 hover:text-white transition-colors">
              Terms
            </Link>
            <Link href="/privacy" className="text-xs text-white/50 hover:text-white transition-colors">
              Privacy Policy
            </Link>
        </div>
      </div>

    </div>
  </footer>
);
}

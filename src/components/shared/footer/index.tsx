import React from "react";
import Link from "next/link";
import Logo from "../Logo";
import { platFormLinks, workspaceLinks, supportLinks } from "@/constant";

export default function Footer() {
  return (
    <footer className="w-full bg-white border-t border-slate-100 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-12">
        {/* Main Footer Content */}
        <div className="flex flex-col md:flex-row justify-between items-start gap-10">
          {/* Brand info */}
          <div className="space-y-4 max-w-sm">
            <Logo width={160} height={50} priority={false} />
            <p className="text-xs text-slate-500 leading-relaxed">
              AI-powered CIED interrogation summaries engineered for faster clinical decisions and streamlined point-of-care workflow.
            </p>
          </div>

          {/* Navigation link columns */}
          <div className="flex flex-wrap gap-16 sm:gap-24">
            {/* Column 1: Navigate */}
            <div>
              <h4 className="text-xs font-semibold text-slate-900 tracking-wider uppercase mb-4">
                Navigate
              </h4>
              <ul className="space-y-3">
                {platFormLinks.map((item) => (
                  <li key={item.label}>
                    <Link
                      href={item.href}
                      className="text-sm text-slate-600 hover:text-primary transition-colors"
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Column 2: Workspace */}
            <div>
              <h4 className="text-xs font-semibold text-slate-900 tracking-wider uppercase mb-4">
                Workspace
              </h4>
              <ul className="space-y-3">
                {workspaceLinks.map((item) => (
                  <li key={item.label}>
                    <Link
                      href={item.href}
                      className="text-sm text-slate-600 hover:text-primary transition-colors"
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-slate-100 my-10" />

        {/* Bottom copyright & legal */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p>© 2026 CorVera Pro, US Patent Pending Methodology.</p>

          <div className="flex items-center gap-3">
            <Link
              href="/privacy-policy"
              className="hover:text-primary transition-colors"
            >
              Privacy Policy
            </Link>
            <span className="text-slate-300">|</span>
            <Link
              href="/terms"
              className="hover:text-primary transition-colors"
            >
              Terms & Conditions
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}


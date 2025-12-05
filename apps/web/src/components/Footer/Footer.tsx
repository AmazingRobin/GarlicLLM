"use client";

import React from "react";
import Link from "next/link";
import { Sparkles, Github, Twitter, Mail, ExternalLink } from "lucide-react";

export function Footer() {
  return (
    <footer className="relative bg-[var(--bg-dark-secondary)] border-t border-[var(--glass-border)]">
      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-[var(--bg-dark)] to-transparent pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-[repeat(auto-fit,minmax(200px,1fr))] gap-8">
          {/* Brand */}
          <div>
            <Link href="/" className="flex items-center gap-2 mb-4 no-underline">
              <Sparkles className="w-6 h-6 text-[var(--accent-purple)]" />
              <span className="text-lg font-bold gradient-text">GarlicLLM</span>
            </Link>
            <p className="text-[var(--text-secondary)] text-sm leading-[1.6]">
              Independent AI model analysis and visualization platform exploring next-generation LLM capabilities.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-[var(--text-primary)] font-semibold mb-4">
              Quick Links
            </h3>
            <ul className="list-none p-0 m-0 flex flex-col gap-2">
              {[
                { href: "/visualizer", label: "Model Visualizer" },
                { href: "/compare", label: "Compare Models" },
                { href: "/demo", label: "Demo Hub" },
              ].map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-[var(--text-secondary)] text-sm no-underline transition-colors duration-200 hover:text-[var(--accent-cyan)]"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h3 className="text-[var(--text-primary)] font-semibold mb-4">
              Resources
            </h3>
            <ul className="list-none p-0 m-0 flex flex-col gap-2">
              {[
                { href: "#", label: "Documentation", external: true },
                { href: "#", label: "API Reference", external: true },
                { href: "#", label: "Research Papers", external: true },
              ].map((link, i) => (
                <li key={i}>
                  <a
                    href={link.href}
                    className="text-[var(--text-secondary)] text-sm no-underline flex items-center gap-1 transition-colors duration-200 hover:text-[var(--accent-cyan)]"
                    target={link.external ? "_blank" : undefined}
                    rel={link.external ? "noopener noreferrer" : undefined}
                  >
                    {link.label}
                    {link.external && (
                      <ExternalLink className="w-3 h-3" />
                    )}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-[var(--text-primary)] font-semibold mb-4">
              Connect
            </h3>
            <div className="flex gap-3 mb-4">
              <a
                href="https://github.com/AmazingRobin/GarlicLLM"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-lg bg-[var(--glass-highlight)] border border-[var(--glass-border)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:border-[var(--accent-purple)] transition-all duration-200"
              >
                <Github className="w-5 h-5" />
              </a>
              <a
                href="https://x.com/gigigi1966728"
                className="p-2 rounded-lg bg-[var(--glass-highlight)] border border-[var(--glass-border)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:border-[var(--accent-cyan)] transition-all duration-200"
              >
                <Twitter className="w-5 h-5" />
              </a>
              <a
                href="mailto:robinli0302@gmail.com"
                className="p-2 rounded-lg bg-[var(--glass-highlight)] border border-[var(--glass-border)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:border-[var(--accent-pink)] transition-all duration-200"
              >
                <Mail className="w-5 h-5" />
              </a>
            </div>
            <p className="text-[var(--text-muted)] text-xs">
              support@garlicllm.com
            </p>
          </div>
        </div>

        {/* Disclaimer */}
        <div className="mt-12 pt-8 border-t border-[var(--glass-border)]">
          {/* <div className="bg-[var(--bg-dark-tertiary)] rounded-lg p-4 mb-6">
            <p className="text-[var(--text-secondary)] text-xs leading-[1.6]">
              <strong className="text-[var(--accent-gold)]">⚠️ Disclaimer:</strong>{" "}
              This site is an independent, unaffiliated analysis & visualization
              hub. Any information about "Garlic" is based on public reporting,
              speculation, and third-party sources. This is NOT an OpenAI product
              or official announcement. All benchmark data sources and confidence
              levels are clearly marked. For corrections or takedown requests,
              please contact us.
            </p>
          </div> */}

          <div className="flex flex-col items-center gap-4">
            <p className="text-[var(--text-muted)] text-sm">
              © 2025 GarlicLLM. All rights reserved.
            </p>
            <div className="flex gap-6 flex-wrap justify-center">
              <Link
                href="#"
                className="text-[var(--text-muted)] text-sm no-underline transition-colors duration-200 hover:text-[var(--text-secondary)]"
              >
                Privacy Policy
              </Link>
              <Link
                href="#"
                className="text-[var(--text-muted)] text-sm no-underline transition-colors duration-200 hover:text-[var(--text-secondary)]"
              >
                Terms of Service
              </Link>
              <Link
                href="#"
                className="text-[var(--text-muted)] text-sm no-underline transition-colors duration-200 hover:text-[var(--text-secondary)]"
              >
                DMCA
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

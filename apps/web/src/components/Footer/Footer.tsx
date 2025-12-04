"use client";

import React from "react";
import Link from "next/link";
import { Sparkles, Github, Twitter, Mail, ExternalLink } from "lucide-react";

export function Footer() {
  return (
    <footer style={{
      position: 'relative',
      backgroundColor: 'var(--bg-dark-secondary)',
      borderTop: '1px solid var(--glass-border)'
    }}>
      {/* Gradient overlay */}
      <div style={{
        position: 'absolute',
        inset: 0,
        background: 'linear-gradient(to top, var(--bg-dark), transparent)',
        pointerEvents: 'none'
      }} />

      <div style={{
        position: 'relative',
        maxWidth: '1280px',
        margin: '0 auto',
        padding: '48px 16px'
      }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: '32px'
        }}>
          {/* Brand */}
          <div>
            <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '16px', textDecoration: 'none' }}>
              <Sparkles style={{ width: '24px', height: '24px', color: 'var(--accent-purple)' }} />
              <span className="text-lg font-bold gradient-text">GarlicLLM</span>
            </Link>
            <p style={{ color: 'var(--text-secondary)', fontSize: '14px', lineHeight: '1.6' }}>
              Independent AI model analysis and visualization platform exploring next-generation LLM capabilities.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 style={{ color: 'var(--text-primary)', fontWeight: 600, marginBottom: '16px' }}>
              Quick Links
            </h3>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '8px' }}>
              {[
                { href: "/visualizer", label: "Model Visualizer" },
                { href: "/compare", label: "Compare Models" },
                { href: "/demo", label: "Demo Hub" },
              ].map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    style={{
                      color: 'var(--text-secondary)',
                      fontSize: '14px',
                      textDecoration: 'none',
                      transition: 'color 0.2s'
                    }}
                    className="hover:text-[var(--accent-cyan)]"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h3 style={{ color: 'var(--text-primary)', fontWeight: 600, marginBottom: '16px' }}>
              Resources
            </h3>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '8px' }}>
              {[
                { href: "#", label: "Documentation", external: true },
                { href: "#", label: "API Reference", external: true },
                { href: "#", label: "Research Papers", external: true },
              ].map((link, i) => (
                <li key={i}>
                  <a
                    href={link.href}
                    style={{
                      color: 'var(--text-secondary)',
                      fontSize: '14px',
                      textDecoration: 'none',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '4px',
                      transition: 'color 0.2s'
                    }}
                    className="hover:text-[var(--accent-cyan)]"
                    target={link.external ? "_blank" : undefined}
                    rel={link.external ? "noopener noreferrer" : undefined}
                  >
                    {link.label}
                    {link.external && (
                      <ExternalLink style={{ width: '12px', height: '12px' }} />
                    )}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 style={{ color: 'var(--text-primary)', fontWeight: 600, marginBottom: '16px' }}>
              Connect
            </h3>
            <div style={{ display: 'flex', gap: '12px', marginBottom: '16px' }}>
              <a
                href="https://github.com/AmazingRobin/GarlicLLM"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-lg bg-[var(--glass-highlight)] border border-[var(--glass-border)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:border-[var(--accent-purple)]"
                style={{ transition: 'all 0.2s' }}
              >
                <Github style={{ width: '20px', height: '20px' }} />
              </a>
              <a
                href="#"
                className="p-2 rounded-lg bg-[var(--glass-highlight)] border border-[var(--glass-border)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:border-[var(--accent-cyan)]"
                style={{ transition: 'all 0.2s' }}
              >
                <Twitter style={{ width: '20px', height: '20px' }} />
              </a>
              <a
                href="mailto:support@garlicllm.com"
                className="p-2 rounded-lg bg-[var(--glass-highlight)] border border-[var(--glass-border)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:border-[var(--accent-pink)]"
                style={{ transition: 'all 0.2s' }}
              >
                <Mail style={{ width: '20px', height: '20px' }} />
              </a>
            </div>
            <p style={{ color: 'var(--text-muted)', fontSize: '12px' }}>
              support@garlicllm.com
            </p>
          </div>
        </div>

        {/* Disclaimer */}
        <div style={{ marginTop: '48px', paddingTop: '32px', borderTop: '1px solid var(--glass-border)' }}>
          <div style={{ backgroundColor: 'var(--bg-dark-tertiary)', borderRadius: '8px', padding: '16px', marginBottom: '24px' }}>
            <p style={{ color: 'var(--text-secondary)', fontSize: '12px', lineHeight: '1.6' }}>
              <strong style={{ color: 'var(--accent-gold)' }}>⚠️ Disclaimer:</strong>{" "}
              This site is an independent, unaffiliated analysis & visualization
              hub. Any information about "Garlic" is based on public reporting,
              speculation, and third-party sources. This is NOT an OpenAI product
              or official announcement. All benchmark data sources and confidence
              levels are clearly marked. For corrections or takedown requests,
              please contact us.
            </p>
          </div>

          <div style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '16px'
          }}>
            <p style={{ color: 'var(--text-muted)', fontSize: '14px' }}>
              © 2025 GarlicLLM. All rights reserved.
            </p>
            <div style={{ display: 'flex', gap: '24px', flexWrap: 'wrap', justifyContent: 'center' }}>
              <Link
                href="#"
                style={{ color: 'var(--text-muted)', fontSize: '14px', textDecoration: 'none', transition: 'color 0.2s' }}
                className="hover:text-[var(--text-secondary)]"
              >
                Privacy Policy
              </Link>
              <Link
                href="#"
                style={{ color: 'var(--text-muted)', fontSize: '14px', textDecoration: 'none', transition: 'color 0.2s' }}
                className="hover:text-[var(--text-secondary)]"
              >
                Terms of Service
              </Link>
              <Link
                href="#"
                style={{ color: 'var(--text-muted)', fontSize: '14px', textDecoration: 'none', transition: 'color 0.2s' }}
                className="hover:text-[var(--text-secondary)]"
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

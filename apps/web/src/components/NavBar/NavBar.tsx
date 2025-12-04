"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, Sun, Moon, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/visualizer", label: "Visualizer" },
  { href: "/compare", label: "Compare" },
  { href: "/demo", label: "Demo Hub" },
];

export function NavBar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [theme, setTheme] = useState<"dark" | "light">("dark");
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    // Load theme from localStorage
    const savedTheme = localStorage.getItem("theme") as "dark" | "light" | null;
    if (savedTheme) {
      setTheme(savedTheme);
      document.documentElement.setAttribute("data-theme", savedTheme);
    }
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === "dark" ? "light" : "dark";
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);
    document.documentElement.setAttribute("data-theme", newTheme);
  };

  return (
    <nav
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 50,
        transition: 'all 0.3s',
        backgroundColor: scrolled ? 'rgba(2, 7, 18, 0.9)' : 'transparent',
        backdropFilter: scrolled ? 'blur(12px)' : 'none',
        borderBottom: scrolled ? '1px solid rgba(255, 255, 255, 0.08)' : 'none',
      }}
    >
      <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 16px' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: '64px' }}>
          {/* Logo */}
          <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: '8px', textDecoration: 'none' }}>
            <div style={{ position: 'relative' }}>
              <Sparkles style={{ width: '32px', height: '32px', color: 'var(--accent-purple)' }} />
              <div style={{ position: 'absolute', inset: 0, background: 'var(--accent-purple)', filter: 'blur(8px)', opacity: 0.5, pointerEvents: 'none' }} />
            </div>
            <span className="text-xl font-bold gradient-text">GarlicLLM</span>
          </Link>

          {/* Desktop Navigation */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }} className="hidden md:flex">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                style={{
                  padding: '8px 16px',
                  borderRadius: '8px',
                  fontSize: '14px',
                  fontWeight: 500,
                  transition: 'all 0.2s',
                  textDecoration: 'none',
                  backgroundColor: pathname === link.href ? 'rgba(107, 78, 255, 0.2)' : 'transparent',
                  color: pathname === link.href ? 'var(--accent-purple)' : 'var(--text-secondary)',
                }}
                className={pathname !== link.href ? 'hover:text-[var(--text-primary)] hover:bg-[var(--glass-highlight)]' : ''}
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Right side actions */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            {/* Theme toggle */}
            <button
              onClick={toggleTheme}
              style={{
                padding: '8px',
                borderRadius: '8px',
                border: 'none',
                background: 'transparent',
                cursor: 'pointer',
                color: 'var(--text-secondary)',
                transition: 'all 0.2s',
              }}
              className="hover:text-[var(--text-primary)] hover:bg-[var(--glass-highlight)]"
              aria-label="Toggle theme"
            >
              {theme === "dark" ? (
                <Sun style={{ width: '20px', height: '20px' }} />
              ) : (
                <Moon style={{ width: '20px', height: '20px' }} />
              )}
            </button>

            {/* CTA Button */}
            <Link
              href="/demo"
              className="hidden sm:flex btn-primary"
              style={{
                fontSize: '14px',
                padding: '8px 16px',
                textDecoration: 'none',
              }}
            >
              Try Demo
            </Link>

            {/* Mobile menu button */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              style={{
                padding: '8px',
                borderRadius: '8px',
                border: 'none',
                background: 'transparent',
                cursor: 'pointer',
                color: 'var(--text-secondary)',
                display: 'flex',
              }}
              className="md:hidden hover:text-[var(--text-primary)] hover:bg-[var(--glass-highlight)]"
              aria-label="Toggle menu"
            >
              {isOpen ? (
                <X style={{ width: '24px', height: '24px' }} />
              ) : (
                <Menu style={{ width: '24px', height: '24px' }} />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      <div
        style={{
          position: 'absolute',
          top: '64px',
          left: 0,
          right: 0,
          backgroundColor: 'rgba(2, 7, 18, 0.95)',
          backdropFilter: 'blur(12px)',
          borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
          maxHeight: isOpen ? '256px' : '0',
          opacity: isOpen ? 1 : 0,
          overflow: 'hidden',
          transition: 'all 0.3s',
        }}
        className="md:hidden"
      >
        <div style={{ padding: '16px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setIsOpen(false)}
              style={{
                padding: '12px 16px',
                borderRadius: '8px',
                fontSize: '14px',
                fontWeight: 500,
                textDecoration: 'none',
                transition: 'all 0.2s',
                backgroundColor: pathname === link.href ? 'rgba(107, 78, 255, 0.2)' : 'var(--bg-dark)',
                color: pathname === link.href ? 'var(--accent-purple)' : 'var(--text-secondary)',
                border: pathname === link.href ? '1px solid var(--accent-purple)' : '1px solid var(--glass-border)',
              }}
              className={pathname !== link.href ? 'hover:text-[var(--text-primary)] hover:bg-[var(--glass-highlight)]' : ''}
            >
              {link.label}
            </Link>
          ))}
        </div>
      </div>
    </nav>
  );
}

"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useId, useState, useSyncExternalStore } from "react";
import { Menu, X } from "lucide-react";
import {
  AnimatePresence,
  motion,
  useMotionValueEvent,
  useScroll,
} from "framer-motion";
import Logo from "@/components/brand/Logo";
import styles from "./Header.module.css";

const NAV_LINKS = [
  { label: "Početna", href: "/" },
  { label: "Pozivnice", href: "/pozivnice" },
  { label: "Cenovnik", href: "/#cenovnik" },
  { label: "Kontakt", href: "/kontakt" },
] as const;

function subscribeHash(onStoreChange: () => void) {
  window.addEventListener("hashchange", onStoreChange);
  return () => window.removeEventListener("hashchange", onStoreChange);
}

function getHashSnapshot() {
  return window.location.hash;
}

function getServerHashSnapshot() {
  return "";
}

const Header = () => {
  const pathname = usePathname();
  const menuId = useId();
  const { scrollY } = useScroll();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [menuPathname, setMenuPathname] = useState(pathname);
  const hash = useSyncExternalStore(
    subscribeHash,
    getHashSnapshot,
    getServerHashSnapshot,
  );

  useMotionValueEvent(scrollY, "change", (value) => {
    setScrolled(value > 20);
  });

  // Close mobile menu when the route changes (adjust state during render).
  if (pathname !== menuPathname) {
    setMenuPathname(pathname);
    if (open) setOpen(false);
  }

  useEffect(() => {
    if (!open) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };

    document.addEventListener("keydown", onKeyDown);
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = previousOverflow;
    };
  }, [open]);

  const isActive = (href: string) => {
    if (href === "/#cenovnik") {
      return pathname === "/" && hash === "#cenovnik";
    }
    if (href === "/") {
      return pathname === "/" && hash !== "#cenovnik";
    }
    return pathname === href || pathname.startsWith(`${href}/`);
  };

  return (
    <header
      className={`${styles.header} ${scrolled || open ? styles.scrolled : ""}`}
    >
      <div className={styles.glass} aria-hidden />
      <div className={styles.inner}>
        <Logo className={styles.brand} size="md" />

        <nav className={styles.desktopNav} aria-label="Glavna navigacija">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`${styles.navLink} ${isActive(link.href) ? styles.active : ""}`}
            >
              {link.label}
            </Link>
          ))}
          <div className={styles.actions}>
            <Link
              href="/demo"
              className={`${styles.demoLink} ${isActive("/demo") ? styles.demoActive : ""}`}
            >
              Pogledaj demo nalog
            </Link>
            <Link href="/login" className={styles.loginLink}>
              Prijava
            </Link>
          </div>
        </nav>

        <div className={styles.mobileBar}>
          <Link
            href="/demo"
            className={`${styles.demoLinkCompact} ${isActive("/demo") ? styles.demoActive : ""}`}
            onClick={() => setOpen(false)}
          >
            Pogledaj demo nalog
          </Link>
          <button
            type="button"
            className={styles.menuButton}
            aria-label={open ? "Zatvori meni" : "Otvori meni"}
            aria-expanded={open}
            aria-controls={menuId}
            onClick={() => setOpen((prev) => !prev)}
          >
            {open ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {open ? (
          <>
            <motion.button
              type="button"
              className={styles.backdrop}
              aria-label="Zatvori meni"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={() => setOpen(false)}
            />
            <motion.nav
              id={menuId}
              className={styles.mobileNav}
              aria-label="Mobilna navigacija"
              initial={{ opacity: 0, y: -12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.22, ease: [0.25, 0.46, 0.45, 0.94] }}
            >
              {NAV_LINKS.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`${styles.mobileLink} ${isActive(link.href) ? styles.active : ""}`}
                  onClick={() => setOpen(false)}
                >
                  {link.label}
                </Link>
              ))}
              <div className={styles.mobileActions}>
                <Link
                  href="/demo"
                  className={styles.mobileDemo}
                  onClick={() => setOpen(false)}
                >
                  Pogledaj demo nalog
                </Link>
                <Link
                  href="/login"
                  className={styles.mobileLogin}
                  onClick={() => setOpen(false)}
                >
                  Prijava
                </Link>
              </div>
            </motion.nav>
          </>
        ) : null}
      </AnimatePresence>
    </header>
  );
};

export default Header;

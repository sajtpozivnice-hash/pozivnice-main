"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useId, useState } from "react";
import { Menu, X } from "lucide-react";
import {
  AnimatePresence,
  motion,
  useMotionValueEvent,
  useScroll,
} from "framer-motion";
import styles from "./Header.module.css";

const NAV_LINKS = [
  { label: "Početna", href: "/" },
  { label: "Pozivnice", href: "/pozivnice" },
  { label: "Cenovnik", href: "/#cenovnik" },
  { label: "Kontakt", href: "/kontakt" },
] as const;

const Header = () => {
  const pathname = usePathname();
  const menuId = useId();
  const { scrollY } = useScroll();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useMotionValueEvent(scrollY, "change", (value) => {
    setScrolled(value > 20);
  });

  useEffect(() => {
    setScrolled(window.scrollY > 20);
  }, []);

  const [hash, setHash] = useState("");

  useEffect(() => {
    const syncHash = () => setHash(window.location.hash);
    syncHash();
    window.addEventListener("hashchange", syncHash);
    return () => window.removeEventListener("hashchange", syncHash);
  }, [pathname]);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

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
        <Link href="/" className={styles.brand} onClick={() => setOpen(false)}>
          eVenčanje
        </Link>

        <nav className={styles.desktopNav} aria-label="Glavna navigacija">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`${styles.navLink} ${isActive(link.href) ? styles.active : ""}`}
              onClick={() => {
                if (link.href === "/#cenovnik") setHash("#cenovnik");
                if (link.href === "/") setHash("");
              }}
            >
              {link.label}
            </Link>
          ))}
          <Link href="/login" className={styles.loginLink}>
            Prijava
          </Link>
        </nav>

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
                  onClick={() => {
                    setOpen(false);
                    if (link.href === "/#cenovnik") setHash("#cenovnik");
                    if (link.href === "/") setHash("");
                  }}
                >
                  {link.label}
                </Link>
              ))}
              <Link
                href="/login"
                className={styles.mobileLogin}
                onClick={() => setOpen(false)}
              >
                Prijava
              </Link>
            </motion.nav>
          </>
        ) : null}
      </AnimatePresence>
    </header>
  );
};

export default Header;

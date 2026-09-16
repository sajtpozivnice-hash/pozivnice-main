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
  { label: "Pozivnice", href: "/pozivnice", primary: true },
  { label: "Cenovnik", href: "/#cenovnik" },
  { label: "Kontakt", href: "/kontakt" },
  { label: "Demo", href: "/demo" },
  { label: "Prijava", href: "/login" },
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
          {NAV_LINKS.map((link) => {
            const primary = "primary" in link && link.primary;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`${styles.navBtn} ${primary ? styles.navBtnPrimary : styles.navBtnOutline} ${isActive(link.href) ? styles.navBtnActive : ""}`}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        <div className={styles.mobileBar}>
          <Link
            href="/pozivnice"
            className={styles.demoLinkCompact}
            onClick={() => setOpen(false)}
          >
            Pozivnice
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
              {NAV_LINKS.map((link) => {
                const primary = "primary" in link && link.primary;
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={`${styles.mobileBtn} ${primary ? styles.mobileBtnPrimary : styles.mobileBtnOutline} ${isActive(link.href) ? styles.mobileBtnActive : ""}`}
                    onClick={() => setOpen(false)}
                  >
                    {link.label}
                  </Link>
                );
              })}
            </motion.nav>
          </>
        ) : null}
      </AnimatePresence>
    </header>
  );
};

export default Header;


import { useState } from "react";
import { NavLink } from "react-router-dom";
import {
  ShieldCheck,
  Menu,
  X,
  BookOpen,
  Video,
  FileText,
  Home,
  ArrowUpRight,
} from "lucide-react";

const links = [
  { to: "/", label: "Home", icon: Home, end: true },
  { to: "/books", label: "Books", icon: BookOpen },
  { to: "/videos", label: "Videos", icon: Video },
  { to: "/articles", label: "Articles", icon: FileText },
];

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="site-header">
      <nav className="site-navbar" aria-label="Main navigation">
        <NavLink
          to="/"
          className="site-logo"
          onClick={() => setMenuOpen(false)}
        >
          <span className="logo-mark">
            <ShieldCheck size={25} strokeWidth={2} />
          </span>
          <span className="logo-copy">
            <strong>SECURE<span>LEARN</span></strong>
            <small>CYBERSECURITY ACADEMY</small>
          </span>
        </NavLink>

        <button
          type="button"
          className="mobile-menu-button"
          onClick={() => setMenuOpen((open) => !open)}
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          aria-expanded={menuOpen}
          aria-controls="site-nav-links"
        >
          {menuOpen ? <X size={23} /> : <Menu size={23} />}
        </button>

        <div
          id="site-nav-links"
          className={`site-nav-links ${menuOpen ? "open" : ""}`}
        >
          {links.map(({ to, label, icon: Icon, end }) => (
            <NavLink
              key={to}
              to={to}
              end={end}
              onClick={() => setMenuOpen(false)}
              className={({ isActive }) =>
                `site-nav-link ${isActive ? "active" : ""}`
              }
            >
              <Icon size={17} />
              {label}
            </NavLink>
          ))}

          <NavLink
            to="/books"
            className="nav-cta"
            onClick={() => setMenuOpen(false)}
          >
            Start Learning
            <ArrowUpRight size={16} />
          </NavLink>
        </div>
      </nav>
    </header>
  );
}

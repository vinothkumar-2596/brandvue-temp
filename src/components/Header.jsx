import { useEffect, useRef, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import gsap from "gsap";
import {
  Menu,
  X,
  ChevronDown,
  ArrowRight,
  Users,
  Tag,
  HelpCircle,
  Newspaper,
  Sparkles,
  Moon,
  Sun,
} from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isBlogDropdownOpen, setIsBlogDropdownOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [theme, setTheme] = useState("dark");
  const isDarkTheme = theme === "dark";
  const dropdownCloseTimer = useRef(null);
  const blogCloseTimer = useRef(null);
  const thumbRef = useRef(null);
  const activeIconRef = useRef(null);
  const leftIconRef = useRef(null);
  const rightIconRef = useRef(null);
  const hasSetInitialToggleState = useRef(false);

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 80);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const storedTheme = window.localStorage.getItem("theme");
    const resolvedTheme = storedTheme || "dark";
    setTheme(resolvedTheme);
    document.documentElement.classList.toggle("theme-dark", resolvedTheme === "dark");
  }, []);

  useEffect(() => {
    if (!thumbRef.current || !activeIconRef.current || !leftIconRef.current || !rightIconRef.current) {
      return;
    }

    const thumbX = isDarkTheme ? 45 : 0;
    const thumbBackground = isDarkTheme
      ? "linear-gradient(145deg,#171A1F,#06080B)"
      : "linear-gradient(145deg,#E8DDC9,#D9C9AD)";
    const thumbBorder = isDarkTheme ? "rgba(255,255,255,0.10)" : "rgba(188,168,130,0.35)";
    const thumbShadow = "none";
    const trackIconColor = "#D8CCB5";
    const trackIconVisibleOpacity = 0.45;
    const trackIconHiddenOpacity = 0;

    if (!hasSetInitialToggleState.current) {
      hasSetInitialToggleState.current = true;
      gsap.set(thumbRef.current, { x: thumbX, background: thumbBackground, borderColor: thumbBorder, boxShadow: thumbShadow });
      gsap.set(leftIconRef.current, { opacity: isDarkTheme ? trackIconVisibleOpacity : trackIconHiddenOpacity, color: trackIconColor });
      gsap.set(rightIconRef.current, { opacity: isDarkTheme ? trackIconHiddenOpacity : trackIconVisibleOpacity, color: trackIconColor });
      return;
    }

    const timeline = gsap.timeline({ defaults: { duration: 0.42, ease: "power3.out" } });
    timeline
      .to(thumbRef.current, { x: thumbX, background: thumbBackground, borderColor: thumbBorder, boxShadow: thumbShadow }, 0)
      .to(leftIconRef.current, { opacity: isDarkTheme ? trackIconVisibleOpacity : trackIconHiddenOpacity, color: trackIconColor }, 0)
      .to(rightIconRef.current, { opacity: isDarkTheme ? trackIconHiddenOpacity : trackIconVisibleOpacity, color: trackIconColor }, 0)
      .fromTo(activeIconRef.current, { scale: 0.86, rotate: isDarkTheme ? 14 : -14 }, { scale: 1, rotate: 0, duration: 0.32, ease: "back.out(2)" }, 0.1);

    return () => {
      timeline.kill();
    };
  }, [isDarkTheme]);

  const setThemeMode = (mode) => {
    setTheme(mode);
    if (typeof window === "undefined") return;
    document.documentElement.classList.toggle("theme-dark", mode === "dark");
    window.localStorage.setItem("theme", mode);
  };

  const openDropdown = () => {
    if (dropdownCloseTimer.current) {
      clearTimeout(dropdownCloseTimer.current);
      dropdownCloseTimer.current = null;
    }
    setIsDropdownOpen(true);
  };

  const closeDropdown = () => {
    dropdownCloseTimer.current = setTimeout(() => {
      setIsDropdownOpen(false);
    }, 120);
  };

  const openBlogDropdown = () => {
    if (blogCloseTimer.current) {
      clearTimeout(blogCloseTimer.current);
      blogCloseTimer.current = null;
    }
    setIsBlogDropdownOpen(true);
  };

  const closeBlogDropdown = () => {
    blogCloseTimer.current = setTimeout(() => {
      setIsBlogDropdownOpen(false);
    }, 120);
  };

  const navLinks = [
    { href: "/", label: "Home" },
    { href: "/about", label: "About Us" },
    { href: "/services", label: "Services" },
  ];

  const dropdownLinks = [
    { href: "/team", label: "Team", icon: Users },
    { href: "/pricing", label: "Pricing", icon: Tag },
    { href: "/faq", label: "FAQ", icon: HelpCircle },
  ];

  const blogLinks = [
    { href: "/blog", label: "Latest Posts", icon: Newspaper },
    { href: "/blog", label: "Insights", icon: Sparkles },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-opacity duration-300 ${
        isScrolled ? "opacity-0 pointer-events-none" : "opacity-100"
      }`}
    >
      <div className="mx-auto flex h-28 max-w-[1200px] items-center px-4 sm:px-6 pt-5">
        <div className="header-bar flex w-full items-center justify-between rounded-2xl border border-white/10 bg-[#1D1D1D]/80 px-5 py-3 shadow-[0_12px_32px_rgba(0,0,0,0.35)] backdrop-blur-2xl">
          <Link to="/" className="flex items-center gap-3">
            <span className="header-logo flex h-9 w-9 items-center justify-center rounded-full border border-white/[0.15] bg-white/[0.08] shadow-inner">
              <span className="header-logo-dot h-3 w-3 rounded-full bg-[#F5EFE5]" />
            </span>
            <span className="header-title text-lg font-semibold text-[#F5EFE5]">BrandView India</span>
          </Link>

          <nav className="hidden lg:flex items-center space-x-7 text-sm font-medium">
          {navLinks.map((link) => (
            <NavLink
              key={link.href}
              to={link.href}
              className={({ isActive }) =>
                `header-link transition-colors duration-200 ${
                  isActive ? "text-[#B3A380]" : "text-[#D8CCB5]/70 hover:text-[#F5EFE5]"
                }`
              }
            >
              {link.label}
            </NavLink>
          ))}

          <div
            className="relative pt-2 -mt-2"
            onMouseEnter={openDropdown}
            onMouseLeave={closeDropdown}
          >
            <button
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              className={`header-link flex items-center transition-colors duration-200 ${
                isDropdownOpen ? "text-[#B3A380]" : "text-[#D8CCB5]/70 hover:text-[#F5EFE5]"
              }`}
            >
              Pages
              <ChevronDown
                className={`ml-1 h-4 w-4 transition-transform ${
                  isDropdownOpen ? "rotate-180" : ""
                }`}
              />
            </button>
            {isDropdownOpen && (
              <div
                className="dropdown-panel absolute top-full left-1/2 mt-4 w-[90vw] max-w-[1100px] -translate-x-1/2 rounded-[24px] border border-secondary/20 px-8 py-7 shadow-[0_30px_70px_rgba(15,23,42,0.18)]"
                onMouseEnter={openDropdown}
                onMouseLeave={closeDropdown}
              >
                <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr]">
                  <div>
                    <p className="dropdown-label text-xs uppercase tracking-[0.3em] text-[#D8CCB5]/70">
                      Pages
                    </p>
                    <h4 className="dropdown-title mt-3 text-xl font-semibold text-[#F5EFE5]">
                      Explore BrandView India
                    </h4>
                    <p className="dropdown-copy mt-2 text-sm text-[#D8CCB5]/70">
                      Quick links to core pages, pricing, and support.
                    </p>
                  </div>
                  <div className="grid gap-3 text-sm text-[#F5EFE5]">
                    {dropdownLinks.map((link) => {
                      const Icon = link.icon;
                      return (
                      <NavLink
                        key={link.href}
                        to={link.href}
                        className="dropdown-item flex items-center justify-between rounded-xl border border-[#2C2C2C] bg-[#232323] px-4 py-3 transition hover:border-[#3A3A3A] hover:bg-[#2A2A2A]"
                      >
                        <span className="flex items-center gap-3">
                          <Icon className="dropdown-icon h-4 w-4 text-[#B3A380]" />
                          {link.label}
                        </span>
                        <ArrowRight className="dropdown-arrow h-4 w-4 text-[#B3A380]" />
                      </NavLink>
                      );
                    })}
                  </div>
                </div>
              </div>
            )}
          </div>

          <div
            className="relative pt-2 -mt-2"
            onMouseEnter={openBlogDropdown}
            onMouseLeave={closeBlogDropdown}
          >
            <button
              onClick={() => setIsBlogDropdownOpen(!isBlogDropdownOpen)}
              className={`header-link flex items-center transition-colors duration-200 ${
                isBlogDropdownOpen ? "text-[#B3A380]" : "text-[#D8CCB5]/70 hover:text-[#F5EFE5]"
              }`}
            >
              Blog
              <ChevronDown
                className={`ml-1 h-4 w-4 transition-transform ${
                  isBlogDropdownOpen ? "rotate-180" : ""
                }`}
              />
            </button>
            {isBlogDropdownOpen && (
              <div
                className="dropdown-panel absolute top-full left-1/2 mt-4 w-[90vw] max-w-[1100px] -translate-x-1/2 rounded-[24px] border border-secondary/20 px-8 py-7 shadow-[0_30px_70px_rgba(15,23,42,0.18)]"
                onMouseEnter={openBlogDropdown}
                onMouseLeave={closeBlogDropdown}
              >
                <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr]">
                  <div>
                    <p className="dropdown-label text-xs uppercase tracking-[0.3em] text-[#D8CCB5]/70">
                      Blog
                    </p>
                    <h4 className="dropdown-title mt-3 text-xl font-semibold text-[#F5EFE5]">
                      Latest insights
                    </h4>
                    <p className="dropdown-copy mt-2 text-sm text-[#D8CCB5]/70">
                      Thought leadership, case studies, and design strategy.
                    </p>
                  </div>
                  <div className="grid gap-3 text-sm text-[#F5EFE5]">
                    {blogLinks.map((link) => {
                      const Icon = link.icon;
                      return (
                      <NavLink
                        key={link.href}
                        to={link.href}
                        className="dropdown-item flex items-center justify-between rounded-xl border border-[#2C2C2C] bg-[#232323] px-4 py-3 transition hover:border-[#3A3A3A] hover:bg-[#2A2A2A]"
                      >
                        <span className="flex items-center gap-3">
                          <Icon className="dropdown-icon h-4 w-4 text-[#B3A380]" />
                          {link.label}
                        </span>
                        <ArrowRight className="dropdown-arrow h-4 w-4 text-[#B3A380]" />
                      </NavLink>
                      );
                    })}
                  </div>
                </div>
              </div>
            )}
          </div>

          <NavLink
            to="/contact"
            className={({ isActive }) =>
              `header-link transition-colors duration-200 ${
                isActive ? "text-[#B3A380]" : "text-[#D8CCB5]/70 hover:text-[#F5EFE5]"
              }`
            }
          >
            Contact
          </NavLink>
        </nav>

          <div className="hidden lg:flex items-center gap-3">
            <div
              role="radiogroup"
              aria-label="Theme mode"
              className="relative h-11 w-[89px] overflow-hidden rounded-full border border-white/10 bg-[linear-gradient(145deg,#111418,#050608)] p-1"
              onKeyDown={(event) => {
                if (event.key === "ArrowLeft") {
                  event.preventDefault();
                  setThemeMode("light");
                }
                if (event.key === "ArrowRight") {
                  event.preventDefault();
                  setThemeMode("dark");
                }
              }}
            >
              <button
                type="button"
                onClick={() => setThemeMode("light")}
                role="radio"
                aria-checked={!isDarkTheme}
                tabIndex={!isDarkTheme ? 0 : -1}
                aria-label="Enable light mode"
                className="absolute inset-y-0 left-0 z-20 w-1/2 rounded-l-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#B3A380]"
              />
              <button
                type="button"
                onClick={() => setThemeMode("dark")}
                role="radio"
                aria-checked={isDarkTheme}
                tabIndex={isDarkTheme ? 0 : -1}
                aria-label="Enable dark mode"
                className="absolute inset-y-0 right-0 z-20 w-1/2 rounded-r-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#B3A380]"
              />
              <span
                ref={leftIconRef}
                aria-hidden="true"
                className="pointer-events-none absolute left-[14px] top-1/2 z-10 -translate-y-1/2 text-[#D8CCB5] opacity-[0.45]"
              >
                <Sun className="h-4 w-4" />
              </span>
              <span
                ref={rightIconRef}
                aria-hidden="true"
                className="pointer-events-none absolute right-[14px] top-1/2 z-10 -translate-y-1/2 text-[#D8CCB5] opacity-0"
              >
                <Moon className="h-4 w-4" />
              </span>
              <span
                ref={thumbRef}
                aria-hidden="true"
                className="pointer-events-none absolute left-1 top-1 z-30 flex h-[35px] w-[35px] items-center justify-center rounded-full border border-white/10 bg-[linear-gradient(145deg,#171A1F,#06080B)]"
              >
                <span
                  ref={activeIconRef}
                  className={isDarkTheme ? "text-[#D8CCB5]" : "text-[#6C5532]"}
                >
                  {isDarkTheme ? <Moon className="h-4 w-4" /> : <Sun className="h-4 w-4" />}
                </span>
              </span>
            </div>
            <Link to="/contact">
              <Button className="h-10 rounded-2xl border border-white/10 bg-[#1A1A1A] px-5 text-xs font-semibold text-[#F5EFE5] hover:bg-[#222222]">
                Start a project
                <ArrowRight className="ml-2 h-4 w-4 text-[#B3A380]" />
              </Button>
            </Link>
          </div>

          <button
            className="lg:hidden p-2 text-foreground"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {isMobileMenuOpen && (
        <div className="lg:hidden mx-auto max-w-[1200px] px-4 sm:px-6">
          <div className="mt-3 rounded-3xl border border-white/[0.15] bg-[#1D1D1D]/90 p-6 shadow-[0_18px_40px_rgba(0,0,0,0.3)] backdrop-blur-2xl">
            {navLinks.map((link) => (
              <NavLink
                key={link.href}
                to={link.href}
                className="block text-lg text-[#D8CCB5]/80 transition-colors hover:text-[#F5EFE5]"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {link.label}
              </NavLink>
            ))}
            {dropdownLinks.map((link) => (
              <NavLink
                key={link.href}
                to={link.href}
                className="block text-lg text-[#D8CCB5]/80 transition-colors hover:text-[#F5EFE5]"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {link.label}
              </NavLink>
            ))}
            {blogLinks.map((link) => (
              <NavLink
                key={link.href}
                to={link.href}
                className="block text-lg text-[#D8CCB5]/80 transition-colors hover:text-[#F5EFE5]"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {link.label}
              </NavLink>
            ))}
            <NavLink
              to="/contact"
              className="block text-lg text-[#D8CCB5]/80 transition-colors hover:text-[#F5EFE5]"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Contact
            </NavLink>
            <Link to="/contact" onClick={() => setIsMobileMenuOpen(false)}>
              <Button className="mt-4 w-full rounded-full border border-white/10 bg-[#1A1A1A] text-[#F5EFE5] hover:bg-[#222222]">
                Start a project
              </Button>
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}


"use client";
import { useState, useEffect, useRef, useCallback } from "react";

/* ─── placeholder data — swap with your own ─── */
const SITE_TITLE = "sadaf.dev";
const HERO_NAME = "Sadaf";
const HERO_TAGLINE = "Full Stack Software Engineer";
const ABOUT_TEXT =
  "Hey! I'm Sadaf — a Full Stack Software Engineer with a B.S. in Computer Science from NC State. I build across the stack with React, Node.js, Express, MySQL, and AWS, with a focus on clean architecture and real-world usability. Currently building ShotStop, a full stack web application. Open to full stack and software engineering roles — feel free to reach out!";

const PROJECTS = [
  {
    id: 1,
    title: "ShotStop",
    tags: ["React", "Node.js", "Express", "MySQL"],
    description:
      "A full stack web application for managing and showcasing photography portfolios. Features user authentication, image uploads with cloud storage, gallery management, and a responsive client-facing storefront.",
    liveUrl: "#",
    githubUrl: "#",
  },
  {
    id: 2,
    title: "Project Two",
    tags: ["Next.js", "Tailwind", "AWS"],
    description:
      "Placeholder for your next project. Replace this with a real description, links, and tags when ready.",
    liveUrl: "#",
    githubUrl: "#",
  },
  {
    id: 3,
    title: "Project Three",
    tags: ["Python", "Flask", "PostgreSQL"],
    description:
      "Another placeholder project. Swap in your own work — the carousel and description panel will adapt to however many projects you add.",
    liveUrl: "#",
    githubUrl: "#",
  },
];

const SOCIAL_LINKS = {
  email: "mailto:your@email.com",
  linkedin: "https://linkedin.com/in/yourprofile",
  github: "https://github.com/yourprofile",
};

const RESUME_CONTENT = {
  name: "Sadaf",
  title: "Full Stack Software Engineer",
  contact: "your@email.com · linkedin.com/in/yourprofile · github.com/yourprofile",
  summary:
    "Full Stack Software Engineer with a B.S. in Computer Science from NC State. Experienced building performant web applications with React, Node.js, Express, MySQL, and AWS.",
  experience: [
    {
      role: "Full Stack Developer",
      company: "ShotStop (Personal Project)",
      period: "2024 – Present",
      bullets: [
        "Architected and built a full stack photography portfolio platform using React, Node.js, Express, and MySQL.",
        "Implemented secure user authentication, cloud-based image storage, and responsive gallery management.",
        "Designed RESTful APIs with proper error handling, validation, and data modeling.",
      ],
    },
  ],
  education: {
    degree: "B.S. Computer Science",
    school: "North Carolina State University",
    year: "2024",
  },
  skills: ["React", "Node.js", "Express", "MySQL", "AWS", "JavaScript", "TypeScript", "Tailwind CSS", "Git", "REST APIs"],
};

/* ─── icons (inline SVG to avoid deps) ─── */
const Icons = {
  Sun: () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="5" /><line x1="12" y1="1" x2="12" y2="3" /><line x1="12" y1="21" x2="12" y2="23" /><line x1="4.22" y1="4.22" x2="5.64" y2="5.64" /><line x1="18.36" y1="18.36" x2="19.78" y2="19.78" /><line x1="1" y1="12" x2="3" y2="12" /><line x1="21" y1="12" x2="23" y2="12" /><line x1="4.22" y1="19.78" x2="5.64" y2="18.36" /><line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
    </svg>
  ),
  Moon: () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z" />
    </svg>
  ),
  ChevronLeft: () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="15 18 9 12 15 6" />
    </svg>
  ),
  ChevronRight: () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="9 18 15 12 9 6" />
    </svg>
  ),
  ExternalLink: () => (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6" /><polyline points="15 3 21 3 21 9" /><line x1="10" y1="14" x2="21" y2="3" />
    </svg>
  ),
  GitHub: () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
    </svg>
  ),
  LinkedIn: () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  ),
  Mail: () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="4" width="20" height="16" rx="2" /><path d="M22 7l-10 7L2 7" />
    </svg>
  ),
  Download: () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4" /><polyline points="7 10 12 15 17 10" /><line x1="12" y1="15" x2="12" y2="3" />
    </svg>
  ),
  Close: () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
    </svg>
  ),
  Menu: () => (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <line x1="3" y1="6" x2="21" y2="6" /><line x1="3" y1="12" x2="21" y2="12" /><line x1="3" y1="18" x2="21" y2="18" />
    </svg>
  ),
};

/* ─── theme hook ─── */
function useTheme() {
  const [theme, setTheme] = useState("light");

  useEffect(() => {
    const saved = localStorage.getItem("portfolio-theme");
    if (saved) {
      setTheme(saved);
    } else if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
      setTheme("dark");
    }
  }, []);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", theme === "dark");
    localStorage.setItem("portfolio-theme", theme);
  }, [theme]);

  const toggle = () => setTheme((t) => (t === "dark" ? "light" : "dark"));
  return { theme, toggle };
}

/* ─── reduce motion hook ─── */
function usePrefersReducedMotion() {
  const [reduced, setReduced] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduced(mq.matches);
    const handler = (e) => setReduced(e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);
  return reduced;
}

/* ─── fade-in hook ─── */
function useFadeIn(delay = 0) {
  const reduced = usePrefersReducedMotion();
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    if (reduced) {
      setVisible(true);
      return;
    }
    const t = setTimeout(() => setVisible(true), delay);
    return () => clearTimeout(t);
  }, [delay, reduced]);
  return visible;
}

/* ─── scroll-into-view utility ─── */
function scrollTo(id) {
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
}

/* ─── focus trap for modals ─── */
function useFocusTrap(ref, isOpen) {
  useEffect(() => {
    if (!isOpen || !ref.current) return;
    const modal = ref.current;
    const focusable = modal.querySelectorAll(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );
    const first = focusable[0];
    const last = focusable[focusable.length - 1];
    first?.focus();

    const handler = (e) => {
      if (e.key === "Tab") {
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last?.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first?.focus();
        }
      }
    };
    modal.addEventListener("keydown", handler);
    return () => modal.removeEventListener("keydown", handler);
  }, [isOpen, ref]);
}

/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
   NAVBAR
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
function Navbar({ theme, toggleTheme, onOpenResume }) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const mobileRef = useRef(null);

  /* close mobile menu on resize */
  useEffect(() => {
    const handler = () => { if (window.innerWidth >= 768) setMobileOpen(false); };
    window.addEventListener("resize", handler);
    return () => window.removeEventListener("resize", handler);
  }, []);

  /* lock body scroll when mobile menu open */
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [mobileOpen]);

  const navAction = (action) => {
    setMobileOpen(false);
    if (typeof action === "string") scrollTo(action);
    else action();
  };

  const linkClass =
    "text-sm font-medium transition-colors duration-200 hover:text-accent focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent rounded";

  return (
    <nav
      className="fixed top-0 left-0 right-0 z-50 border-b border-border bg-surface/80 backdrop-blur-md"
      role="navigation"
      aria-label="Main navigation"
    >
      {/* skip link */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:top-2 focus:left-2 focus:z-[999] focus:bg-accent focus:text-white focus:px-4 focus:py-2 focus:rounded"
      >
        Skip to content
      </a>

      <div className="mx-auto flex h-14 max-w-6xl items-center justify-between px-6">
        {/* site title */}
        <button onClick={() => scrollTo("hero")} className="text-base font-semibold tracking-tight text-primary font-heading">
          {SITE_TITLE}
        </button>

        {/* desktop nav */}
        <div className="hidden items-center gap-6 md:flex">
          {/* group 1: sections */}
          <button onClick={() => scrollTo("about")} className={linkClass}>About</button>
          <button onClick={() => scrollTo("projects")} className={linkClass}>Projects</button>
          <button onClick={() => scrollTo("contact")} className={linkClass}>Contact</button>

          <span className="h-4 w-px bg-border" aria-hidden="true" />

          {/* group 2: links */}
          <button onClick={onOpenResume} className={linkClass}>Resume</button>
          <a href={SOCIAL_LINKS.email} className={linkClass} aria-label="Email">Email</a>
          <a href={SOCIAL_LINKS.linkedin} className={linkClass} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">LinkedIn</a>
          <a href={SOCIAL_LINKS.github} className={linkClass} target="_blank" rel="noopener noreferrer" aria-label="GitHub">GitHub</a>

          <span className="h-4 w-px bg-border" aria-hidden="true" />

          {/* group 3: theme toggle */}
          <button
            onClick={toggleTheme}
            className="flex h-8 w-8 items-center justify-center rounded-md transition-colors duration-200 hover:bg-subtle focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
            aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
          >
            <span className="transition-opacity duration-300" key={theme}>
              {theme === "dark" ? <Icons.Sun /> : <Icons.Moon />}
            </span>
          </button>
        </div>

        {/* mobile hamburger */}
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="flex h-10 w-10 items-center justify-center rounded-md md:hidden hover:bg-subtle focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
          aria-label={mobileOpen ? "Close menu" : "Open menu"}
          aria-expanded={mobileOpen}
        >
          {mobileOpen ? <Icons.Close /> : <Icons.Menu />}
        </button>
      </div>

      {/* mobile overlay */}
      {mobileOpen && (
        <div
          className="fixed inset-0 top-14 z-40 bg-surface/95 backdrop-blur-sm md:hidden animate-fade-in"
          ref={mobileRef}
        >
          <div className="flex flex-col items-start gap-1 p-6">
            <p className="mb-2 text-xs font-medium uppercase tracking-widest text-muted">Sections</p>
            <button onClick={() => navAction("about")} className="w-full rounded-md px-3 py-2.5 text-left text-sm font-medium hover:bg-subtle">About</button>
            <button onClick={() => navAction("projects")} className="w-full rounded-md px-3 py-2.5 text-left text-sm font-medium hover:bg-subtle">Projects</button>
            <button onClick={() => navAction("contact")} className="w-full rounded-md px-3 py-2.5 text-left text-sm font-medium hover:bg-subtle">Contact</button>

            <hr className="my-3 w-full border-border" />
            <p className="mb-2 text-xs font-medium uppercase tracking-widest text-muted">Links</p>
            <button onClick={() => navAction(onOpenResume)} className="w-full rounded-md px-3 py-2.5 text-left text-sm font-medium hover:bg-subtle">Resume</button>
            <a href={SOCIAL_LINKS.email} className="w-full rounded-md px-3 py-2.5 text-left text-sm font-medium hover:bg-subtle">Email</a>
            <a href={SOCIAL_LINKS.linkedin} target="_blank" rel="noopener noreferrer" className="w-full rounded-md px-3 py-2.5 text-left text-sm font-medium hover:bg-subtle">LinkedIn</a>
            <a href={SOCIAL_LINKS.github} target="_blank" rel="noopener noreferrer" className="w-full rounded-md px-3 py-2.5 text-left text-sm font-medium hover:bg-subtle">GitHub</a>

            <hr className="my-3 w-full border-border" />
            <button
              onClick={toggleTheme}
              className="flex w-full items-center gap-2 rounded-md px-3 py-2.5 text-sm font-medium hover:bg-subtle"
            >
              {theme === "dark" ? <Icons.Sun /> : <Icons.Moon />}
              {theme === "dark" ? "Light mode" : "Dark mode"}
            </button>
          </div>
        </div>
      )}
    </nav>
  );
}

/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
   HERO + ABOUT
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
function HeroAbout() {
  const show1 = useFadeIn(100);
  const show2 = useFadeIn(300);
  const show3 = useFadeIn(500);

  return (
    <section id="hero" className="relative min-h-[calc(100vh-3.5rem)] flex items-center">
      <div className="mx-auto grid w-full max-w-6xl gap-12 px-6 py-24 md:grid-cols-2 md:items-center md:gap-16 lg:gap-24">
        {/* left: hero */}
        <div>
          <p
            className={`mb-3 text-sm font-medium uppercase tracking-widest text-accent transition-all duration-700 ${show1 ? "opacity-100 translate-y-0" : "opacity-0 translate-y-3"}`}
          >
            Hello, I&apos;m
          </p>
          <h1
            className={`text-5xl font-bold tracking-tight text-primary sm:text-6xl lg:text-7xl font-heading transition-all duration-700 ${show2 ? "opacity-100 translate-y-0" : "opacity-0 translate-y-3"}`}
          >
            {HERO_NAME}
          </h1>
          <p
            className={`mt-4 text-lg text-muted sm:text-xl transition-all duration-700 ${show3 ? "opacity-100 translate-y-0" : "opacity-0 translate-y-3"}`}
          >
            {HERO_TAGLINE}
          </p>
          <div className={`mt-8 flex gap-4 transition-all duration-700 delay-500 ${show3 ? "opacity-100 translate-y-0" : "opacity-0 translate-y-3"}`}>
            <button
              onClick={() => scrollTo("projects")}
              className="rounded-md bg-accent px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-accent-hover focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
            >
              View Projects
            </button>
            <button
              onClick={() => scrollTo("contact")}
              className="rounded-md border border-border px-5 py-2.5 text-sm font-medium text-primary transition-colors hover:bg-subtle focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
            >
              Get in Touch
            </button>
          </div>
        </div>

        {/* right: about */}
        <div
          id="about"
          className={`rounded-xl border border-border bg-card p-8 transition-all duration-700 ${show2 ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}
        >
          <h2 className="mb-4 text-xs font-semibold uppercase tracking-widest text-accent">About</h2>
          <p className="text-sm leading-relaxed text-secondary">{ABOUT_TEXT}</p>
          <div className="mt-6 flex flex-wrap gap-2">
            {["React", "Node.js", "Express", "MySQL", "AWS", "Tailwind CSS", "JavaScript", "Git"].map((t) => (
              <span key={t} className="rounded-full border border-border bg-subtle px-3 py-1 text-xs font-medium text-muted">
                {t}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
   PROJECTS
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
function Projects() {
  const [active, setActive] = useState(0);
  const project = PROJECTS[active];

  const prev = () => setActive((i) => (i === 0 ? PROJECTS.length - 1 : i - 1));
  const next = () => setActive((i) => (i === PROJECTS.length - 1 ? 0 : i + 1));

  /* keyboard nav */
  const handleKey = useCallback(
    (e) => {
      if (e.key === "ArrowLeft") prev();
      if (e.key === "ArrowRight") next();
    },
    // eslint-disable-next-line
    []
  );

  return (
    <section id="projects" className="border-t border-border bg-card">
      <div className="mx-auto max-w-6xl px-6 py-24">
        <h2 className="mb-12 text-xs font-semibold uppercase tracking-widest text-accent">Projects</h2>

        <div className="grid gap-10 md:grid-cols-2 md:items-start lg:gap-16" onKeyDown={handleKey}>
          {/* left: carousel */}
          <div className="flex flex-col items-center">
            {/* project cards */}
            <div
              className="relative w-full overflow-hidden rounded-xl border border-border bg-surface"
              role="region"
              aria-label="Project carousel"
              aria-roledescription="carousel"
            >
              <div
                className="aspect-[4/3] flex items-center justify-center p-8 transition-all duration-500"
                aria-live="polite"
                role="group"
                aria-roledescription="slide"
                aria-label={`Project ${active + 1} of ${PROJECTS.length}: ${project.title}`}
              >
                <div className="text-center">
                  <p className="text-3xl font-bold text-primary font-heading">{project.title}</p>
                  <div className="mt-4 flex flex-wrap justify-center gap-2">
                    {project.tags.map((t) => (
                      <span key={t} className="rounded-full bg-accent/10 px-3 py-1 text-xs font-medium text-accent">
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* controls */}
            <div className="mt-4 flex items-center gap-4">
              <button
                onClick={prev}
                className="flex h-10 w-10 items-center justify-center rounded-full border border-border transition-colors hover:bg-subtle focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
                aria-label="Previous project"
              >
                <Icons.ChevronLeft />
              </button>

              {/* dots */}
              <div className="flex gap-2" role="tablist" aria-label="Project navigation">
                {PROJECTS.map((p, i) => (
                  <button
                    key={p.id}
                    role="tab"
                    aria-selected={i === active}
                    aria-label={`Go to project ${i + 1}: ${p.title}`}
                    onClick={() => setActive(i)}
                    className={`h-2 rounded-full transition-all duration-300 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent ${
                      i === active ? "w-6 bg-accent" : "w-2 bg-border hover:bg-muted"
                    }`}
                  />
                ))}
              </div>

              <button
                onClick={next}
                className="flex h-10 w-10 items-center justify-center rounded-full border border-border transition-colors hover:bg-subtle focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
                aria-label="Next project"
              >
                <Icons.ChevronRight />
              </button>
            </div>

            <p className="mt-2 text-xs text-muted">{active + 1} of {PROJECTS.length}</p>
          </div>

          {/* right: description */}
          <div className="flex flex-col justify-center" aria-live="polite">
            <h3 className="text-2xl font-bold text-primary font-heading">{project.title}</h3>
            <p className="mt-4 text-sm leading-relaxed text-secondary">{project.description}</p>
            <div className="mt-6 flex gap-4">
              <a
                href={project.liveUrl}
                className="inline-flex items-center gap-1.5 rounded-md bg-accent px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-accent-hover focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
                target="_blank"
                rel="noopener noreferrer"
              >
                Live Demo <Icons.ExternalLink />
              </a>
              <a
                href={project.githubUrl}
                className="inline-flex items-center gap-1.5 rounded-md border border-border px-4 py-2 text-sm font-medium text-primary transition-colors hover:bg-subtle focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
                target="_blank"
                rel="noopener noreferrer"
              >
                GitHub <Icons.GitHub />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
   CONTACT
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
function Contact() {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    /* Replace with Formspree / Web3Forms endpoint */
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 4000);
  };

  return (
    <section id="contact" className="border-t border-border">
      <div className="mx-auto max-w-6xl px-6 py-24">
        <h2 className="text-xs font-semibold uppercase tracking-widest text-accent">Contact</h2>
        <p className="mt-2 text-sm text-muted">Have a question or want to work together? Reach out below.</p>

        {/* social links */}
        <div className="mt-8 flex gap-4">
          <a
            href={SOCIAL_LINKS.email}
            className="flex h-10 w-10 items-center justify-center rounded-full border border-border transition-colors hover:bg-subtle hover:text-accent focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
            aria-label="Email"
          >
            <Icons.Mail />
          </a>
          <a
            href={SOCIAL_LINKS.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="flex h-10 w-10 items-center justify-center rounded-full border border-border transition-colors hover:bg-subtle hover:text-accent focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
            aria-label="LinkedIn"
          >
            <Icons.LinkedIn />
          </a>
          <a
            href={SOCIAL_LINKS.github}
            target="_blank"
            rel="noopener noreferrer"
            className="flex h-10 w-10 items-center justify-center rounded-full border border-border transition-colors hover:bg-subtle hover:text-accent focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
            aria-label="GitHub"
          >
            <Icons.GitHub />
          </a>
        </div>

        {/* form */}
        <div className="mt-10 max-w-lg" onSubmit={handleSubmit}>
          <div className="flex flex-col gap-5">
            <div>
              <label htmlFor="name" className="mb-1.5 block text-xs font-medium uppercase tracking-widest text-muted">
                Name
              </label>
              <input
                id="name"
                name="name"
                type="text"
                autoComplete="name"
                required
                className="w-full rounded-md border border-border bg-surface px-4 py-2.5 text-sm text-primary placeholder-muted/50 transition-colors focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent"
                placeholder="Your name"
              />
            </div>
            <div>
              <label htmlFor="email" className="mb-1.5 block text-xs font-medium uppercase tracking-widest text-muted">
                Email
              </label>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                className="w-full rounded-md border border-border bg-surface px-4 py-2.5 text-sm text-primary placeholder-muted/50 transition-colors focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent"
                placeholder="your@email.com"
              />
            </div>
            <div>
              <label htmlFor="message" className="mb-1.5 block text-xs font-medium uppercase tracking-widest text-muted">
                Message
              </label>
              <textarea
                id="message"
                name="message"
                rows={4}
                required
                className="w-full resize-none rounded-md border border-border bg-surface px-4 py-2.5 text-sm text-primary placeholder-muted/50 transition-colors focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent"
                placeholder="What's on your mind?"
              />
            </div>
            <button
              type="button"
              onClick={handleSubmit}
              className="self-start rounded-md bg-accent px-6 py-2.5 text-sm font-medium text-white transition-colors hover:bg-accent-hover focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
            >
              {submitted ? "Sent!" : "Send Message"}
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
   RESUME MODAL
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
function ResumeModal({ isOpen, onClose }) {
  const modalRef = useRef(null);
  const triggerRef = useRef(null);
  useFocusTrap(modalRef, isOpen);

  /* lock body scroll */
  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [isOpen]);

  /* escape to close */
  useEffect(() => {
    if (!isOpen) return;
    const handler = (e) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const r = RESUME_CONTENT;

  return (
    <div
      className="fixed inset-0 z-[100] flex items-start justify-center overflow-y-auto bg-black/50 backdrop-blur-sm animate-fade-in"
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
      role="dialog"
      aria-modal="true"
      aria-label="Resume"
    >
      <div
        ref={modalRef}
        className="relative mx-4 my-8 w-full max-w-2xl rounded-xl border border-border bg-surface shadow-2xl animate-slide-down md:mx-auto md:my-12"
      >
        {/* header */}
        <div className="sticky top-0 z-10 flex items-center justify-between border-b border-border bg-surface/95 backdrop-blur-sm px-6 py-4 rounded-t-xl">
          <h2 className="text-sm font-semibold text-primary">Resume</h2>
          <div className="flex items-center gap-2">
            <button
              className="inline-flex items-center gap-1.5 rounded-md bg-accent px-3 py-1.5 text-xs font-medium text-white transition-colors hover:bg-accent-hover focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
              aria-label="Download resume as PDF"
            >
              <Icons.Download /> Download PDF
            </button>
            <button
              onClick={onClose}
              className="flex h-8 w-8 items-center justify-center rounded-md transition-colors hover:bg-subtle focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
              aria-label="Close resume"
            >
              <Icons.Close />
            </button>
          </div>
        </div>

        {/* resume body */}
        <div className="px-6 py-8 sm:px-10">
          {/* name & title */}
          <h3 className="text-2xl font-bold text-primary font-heading">{r.name}</h3>
          <p className="mt-1 text-sm font-medium text-accent">{r.title}</p>
          <p className="mt-2 text-xs text-muted">{r.contact}</p>

          {/* summary */}
          <div className="mt-8">
            <h4 className="text-xs font-semibold uppercase tracking-widest text-accent">Summary</h4>
            <p className="mt-2 text-sm leading-relaxed text-secondary">{r.summary}</p>
          </div>

          {/* experience */}
          <div className="mt-8">
            <h4 className="text-xs font-semibold uppercase tracking-widest text-accent">Experience</h4>
            {r.experience.map((exp, i) => (
              <div key={i} className="mt-4">
                <div className="flex flex-wrap items-baseline justify-between gap-2">
                  <p className="text-sm font-semibold text-primary">{exp.role}</p>
                  <p className="text-xs text-muted">{exp.period}</p>
                </div>
                <p className="text-xs text-muted">{exp.company}</p>
                <ul className="mt-2 space-y-1.5">
                  {exp.bullets.map((b, j) => (
                    <li key={j} className="text-sm leading-relaxed text-secondary pl-4 relative before:content-['–'] before:absolute before:left-0 before:text-muted">
                      {b}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* education */}
          <div className="mt-8">
            <h4 className="text-xs font-semibold uppercase tracking-widest text-accent">Education</h4>
            <div className="mt-2 flex flex-wrap items-baseline justify-between gap-2">
              <p className="text-sm font-semibold text-primary">{r.education.degree}</p>
              <p className="text-xs text-muted">{r.education.year}</p>
            </div>
            <p className="text-xs text-muted">{r.education.school}</p>
          </div>

          {/* skills */}
          <div className="mt-8">
            <h4 className="text-xs font-semibold uppercase tracking-widest text-accent">Skills</h4>
            <div className="mt-3 flex flex-wrap gap-2">
              {r.skills.map((s) => (
                <span key={s} className="rounded-full border border-border bg-subtle px-3 py-1 text-xs font-medium text-muted">
                  {s}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
   FOOTER
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
function Footer() {
  return (
    <footer className="border-t border-border">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-6">
        <p className="text-xs text-muted">&copy; {new Date().getFullYear()} {HERO_NAME}</p>
        <div className="flex gap-3">
          <a href={SOCIAL_LINKS.github} target="_blank" rel="noopener noreferrer" aria-label="GitHub" className="text-muted transition-colors hover:text-accent">
            <Icons.GitHub />
          </a>
          <a href={SOCIAL_LINKS.linkedin} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="text-muted transition-colors hover:text-accent">
            <Icons.LinkedIn />
          </a>
          <a href={SOCIAL_LINKS.email} aria-label="Email" className="text-muted transition-colors hover:text-accent">
            <Icons.Mail />
          </a>
        </div>
      </div>
    </footer>
  );
}

/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
   APP
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
export default function Portfolio() {
  const { theme, toggle } = useTheme();
  const [resumeOpen, setResumeOpen] = useState(false);

  return (
    <>
      <style>{`
        /* ─── Google Fonts ─── */
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;0,9..40,600;0,9..40,700;1,9..40,400&family=Outfit:wght@400;500;600;700&display=swap');

        /* ─── Design tokens ─── */
        :root {
          --font-body: 'DM Sans', system-ui, sans-serif;
          --font-heading: 'Outfit', system-ui, sans-serif;

          /* light theme */
          --color-bg: #f8fafc;
          --color-surface: #ffffff;
          --color-card: #f1f5f9;
          --color-subtle: #e2e8f0;
          --color-border: #cbd5e1;
          --color-primary: #0f172a;
          --color-secondary: #334155;
          --color-muted: #64748b;
          --color-accent: #2563eb;
          --color-accent-hover: #1d4ed8;
        }

        .dark {
          --color-bg: #0c0f1a;
          --color-surface: #131825;
          --color-card: #1a1f33;
          --color-subtle: #232942;
          --color-border: #2a3150;
          --color-primary: #e2e8f0;
          --color-secondary: #94a3b8;
          --color-muted: #64748b;
          --color-accent: #3b82f6;
          --color-accent-hover: #60a5fa;
        }

        /* ─── Base ─── */
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

        html {
          scroll-behavior: smooth;
          font-family: var(--font-body);
          background: var(--color-bg);
          color: var(--color-primary);
          transition: background-color 0.3s, color 0.3s;
        }

        body { min-height: 100vh; }

        /* ─── Utility classes ─── */
        .font-heading { font-family: var(--font-heading); }
        .bg-surface { background-color: var(--color-surface); }
        .bg-card { background-color: var(--color-card); }
        .bg-subtle { background-color: var(--color-subtle); }
        .bg-accent { background-color: var(--color-accent); }
        .bg-accent\\/10 { background-color: color-mix(in srgb, var(--color-accent) 10%, transparent); }
        .hover\\:bg-subtle:hover { background-color: var(--color-subtle); }
        .hover\\:bg-accent-hover:hover { background-color: var(--color-accent-hover); }
        .text-primary { color: var(--color-primary); }
        .text-secondary { color: var(--color-secondary); }
        .text-muted { color: var(--color-muted); }
        .text-accent { color: var(--color-accent); }
        .hover\\:text-accent:hover { color: var(--color-accent); }
        .border-border { border-color: var(--color-border); }
        .focus\\:border-accent:focus { border-color: var(--color-accent); }
        .focus\\:ring-accent:focus { --tw-ring-color: var(--color-accent); }
        .outline-accent { outline-color: var(--color-accent); }
        .placeholder-muted\\/50::placeholder { color: color-mix(in srgb, var(--color-muted) 50%, transparent); }

        /* ─── Animations ─── */
        @keyframes fade-in {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes slide-down {
          from { opacity: 0; transform: translateY(-16px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in { animation: fade-in 0.3s ease-out; }
        .animate-slide-down { animation: slide-down 0.4s ease-out; }

        @media (prefers-reduced-motion: reduce) {
          .animate-fade-in,
          .animate-slide-down { animation: none; }
          * { transition-duration: 0.01ms !important; }
        }

        /* ─── SR only ─── */
        .sr-only {
          position: absolute; width: 1px; height: 1px;
          padding: 0; margin: -1px; overflow: hidden;
          clip: rect(0, 0, 0, 0); white-space: nowrap; border-width: 0;
        }
        .focus\\:not-sr-only:focus {
          position: static; width: auto; height: auto;
          padding: 0; margin: 0; overflow: visible;
          clip: auto; white-space: normal;
        }
      `}</style>

      <div style={{ background: "var(--color-bg)", minHeight: "100vh", transition: "background-color 0.3s" }}>
        <Navbar theme={theme} toggleTheme={toggle} onOpenResume={() => setResumeOpen(true)} />

        <main id="main-content" style={{ paddingTop: "3.5rem" }}>
          <HeroAbout />
          <Projects />
          <Contact />
        </main>

        <Footer />

        <ResumeModal isOpen={resumeOpen} onClose={() => setResumeOpen(false)} />
      </div>
    </>
  );
}

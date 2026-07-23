import { useEffect, useRef, useState } from "react";

/* ------------------------------------------------------------------ data */

const LINKS = {
  github: "https://github.com/Camrahd",
  linkedin: "https://linkedin.com/in/dharmendra-reddy",
  leetcode: "https://leetcode.com/Camrahd12",
  email: "camrahd12@gmail.com",
};

const EXPERIENCE = [
  {
    company: "InfraTie Solutions",
    role: "AI Engineer",
    period: "2024 — Present",
    body: "Designing and shipping LLM-powered systems end to end: agentic workflows, retrieval pipelines, and the backend infrastructure that keeps them fast and observable in production.",
  },
  {
    company: "Oracle Financial Services",
    role: "Software Engineer",
    period: "2021 — 2023",
    body: "Built and maintained backend services for banking platforms serving millions of transactions, with a focus on reliability, data integrity, and performance under load.",
  },
  {
    company: "Cognizant",
    role: "Programmer Analyst",
    period: "2020 — 2021",
    body: "Started in enterprise software delivery — APIs, data pipelines, and the engineering fundamentals that still anchor how I build today.",
  },
];

const PROJECTS = [
  {
    name: "AgenticRAG",
    description:
      "An agentic multi-document RAG assistant that plans retrieval, routes queries across sources, and self-corrects grounding before answering.",
    tags: ["LangGraph", "LLMs", "Vector DBs", "Python"],
    href: `${LINKS.github}/Gen-AI-Projects/tree/main/agentic-rag`,
  },
  {
    name: "Autonomous Coding Assistant",
    description:
      "A tool-using coding agent that reads a repository, plans multi-step edits, runs tests, and iterates until the change actually works.",
    tags: ["Agents", "Tool Use", "FastAPI", "Python"],
    href: `${LINKS.github}/claud_code`,
  },
  {
    name: "Healthcare RAG Retrieval Optimization",
    description:
      "Retrieval tuning for clinical document QA — hybrid search, reranking, and evaluation harnesses that measurably cut hallucinated answers.",
    tags: ["RAG", "Hybrid Search", "Reranking", "Evals"],
    // href: `${LINKS.github}/healthcare-rag-optimization`,
  },
];

const PUBLICATIONS = [
  {
    title: "Domain-specific SQL generation with LLMs: A hybrid framework combining knowledge graphs and retrieval-augmentation",
    venue: "Elsevier",
    venueNote: "Elsevier",
    year: "2026",
    href: "https://www.sciencedirect.com/science/article/abs/pii/S1474034626002521",
  },
  {
    title: "Automated SQL Query Generation for an Intelligent Sewer Management System Using Large Language Models",
    venue: "IEEE CASE",
    venueNote: "IEEE International Conference on Automation Science and Engineering",
    year: "2025",
    href: "https://ieeexplore.ieee.org/abstract/document/11163844",
  },
  {
    title:
      "Human action recognition based on depth maps, skeleton and sensor images using deep learning",
    venue: "IEEE",
    venueNote: "IEEE",
    year: "2022",
    href: "https://ieeexplore.ieee.org/abstract/document/9971982",
  }
];

const SKILLS = [
  {
    group: "AI / LLM Systems",
    items: [
      "LLMs",
      "RAG Pipelines",
      "Agentic Systems",
      "LangChain / LangGraph",
      "Prompt Engineering",
      "Evals",
      "Vector Databases",
    ],
  },
  {
    group: "Languages & Frameworks",
    items: ["Python", "Java", "SQL", "JavaScript", "FastAPI", "PyTorch", "React"],
  },
  {
    group: "Infrastructure",
    items: ["AWS", "Docker", "Kubernetes", "PostgreSQL", "Redis", "CI/CD"],
  },
  {
    group: "Practices",
    items: [
      "System Design",
      "API Design",
      "Distributed Systems",
      "Observability",
      "Technical Writing",
    ],
  },
];

const NAV_SECTIONS = [
  ["about", "About"],
  ["experience", "Experience"],
  ["projects", "Projects"],
  ["publications", "Publications"],
  ["skills", "Skills"],
  ["contact", "Contact"],
];

/* ----------------------------------------------------------------- hooks */

function useReveal() {
  useEffect(() => {
    const els = document.querySelectorAll(".reveal");
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        }
      },
      { threshold: 0.12 }
    );
    els.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);
}

function useActiveSection() {
  const [active, setActive] = useState("");
  useEffect(() => {
    const sections = NAV_SECTIONS.map(([id]) => document.getElementById(id));
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setActive(entry.target.id);
        }
      },
      { rootMargin: "-40% 0px -55% 0px" }
    );
    sections.forEach((s) => s && observer.observe(s));
    return () => observer.disconnect();
  }, []);
  return active;
}

/* ------------------------------------------------------------------- nav */

function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const active = useActiveSection();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className={`nav${scrolled ? " is-scrolled" : ""}`}>
      <nav className="container nav-inner" aria-label="Primary">
        <a className="nav-mark" href="#top" aria-label="Back to top">
          DR<em>.</em>C
        </a>
        <ul className="nav-links">
          {NAV_SECTIONS.map(([id, label]) => (
            <li key={id}>
              <a
                href={`#${id}`}
                className={active === id ? "is-active" : undefined}
                aria-current={active === id ? "true" : undefined}
              >
                {label}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}

const SOCIALS = [
  ["GitHub", LINKS.github],
  ["LinkedIn", LINKS.linkedin],
  ["LeetCode", LINKS.leetcode],
];

function SocialLinks({ className, withEmail }) {
  return (
    <ul className={`social-row${className ? ` ${className}` : ""}`}>
      {SOCIALS.map(([label, href]) => (
        <li key={label}>
          <a href={href} target="_blank" rel="noreferrer">
            {label}
            <svg
              width="12"
              height="12"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <path d="M7 17L17 7M9 7h8v8" />
            </svg>
          </a>
        </li>
      ))}
      {withEmail && (
        <li>
          <a href={`mailto:${LINKS.email}`}>Email</a>
        </li>
      )}
    </ul>
  );
}

/* ------------------------------------------------------- hero + canvas */

function HeroCanvas() {
  const ref = useRef(null);

  useEffect(() => {
    const canvas = ref.current;
    if (
      !canvas ||
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      return;
    }
    const ctx = canvas.getContext("2d");
    let raf;
    let particles = [];

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = canvas.offsetWidth * dpr;
      canvas.height = canvas.offsetHeight * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      const count = Math.min(
        70,
        Math.floor((canvas.offsetWidth * canvas.offsetHeight) / 16000)
      );
      particles = Array.from({ length: count }, () => ({
        x: Math.random() * canvas.offsetWidth,
        y: Math.random() * canvas.offsetHeight,
        vx: (Math.random() - 0.5) * 0.22,
        vy: (Math.random() - 0.5) * 0.22,
        r: 1 + Math.random() * 1.4,
      }));
    };

    const tick = () => {
      const w = canvas.offsetWidth;
      const h = canvas.offsetHeight;
      ctx.clearRect(0, 0, w, h);

      for (const p of particles) {
        p.x = (p.x + p.vx + w) % w;
        p.y = (p.y + p.vy + h) % h;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = "rgba(28, 23, 18, 0.16)";
        ctx.fill();
      }
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const a = particles[i];
          const b = particles[j];
          const dx = a.x - b.x;
          const dy = a.y - b.y;
          const dist = Math.hypot(dx, dy);
          if (dist < 110) {
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.strokeStyle = `rgba(154, 52, 18, ${0.1 * (1 - dist / 110)})`;
            ctx.lineWidth = 1;
            ctx.stroke();
          }
        }
      }
      raf = requestAnimationFrame(tick);
    };

    resize();
    tick();
    window.addEventListener("resize", resize);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return <canvas ref={ref} className="hero-canvas" aria-hidden="true" />;
}

function Hero() {
  return (
    <section className="hero" id="top">
      <HeroCanvas />
      <div className="container hero-content">
        <p className="hero-kicker reveal">Dharmendra Reddy Chitte</p>
        <h1 className="reveal" style={{ "--reveal-delay": "80ms" }}>
          AI engineer building systems that <em>reason</em>.
        </h1>
        <p className="hero-sub reveal" style={{ "--reveal-delay": "160ms" }}>
          I design LLM applications, RAG pipelines, and agentic systems — and
          the backend infrastructure that makes them dependable in production.
        </p>
        <div className="hero-actions reveal" style={{ "--reveal-delay": "240ms" }}>
          <a className="btn btn-solid" href="/resume.pdf">
            View Resume
          </a>
          <a className="btn btn-ghost" href="#contact">
            Get in Touch
          </a>
        </div>
        <div className="reveal" style={{ "--reveal-delay": "320ms" }}>
          <SocialLinks className="hero-social" />
        </div>
      </div>
      <p className="hero-scroll" aria-hidden="true">
        Scroll
      </p>
    </section>
  );
}

/* -------------------------------------------------------------- sections */

function SectionHead({ index, title }) {
  return (
    <div className="section-head reveal">
      <span className="section-index" aria-hidden="true">
        {index}
      </span>
      <h2>{title}</h2>
    </div>
  );
}

function About() {
  return (
    <section className="section container" id="about" aria-label="About">
      <SectionHead index="01" title="About" />
      <p className="about-body reveal">
        I&rsquo;m an AI engineer at <strong>InfraTie Solutions</strong>, where I
        build the layer between large language models and real products —
        retrieval pipelines that surface the right context, agents that plan and
        use tools reliably, and the infrastructure underneath that keeps it all
        fast and observable.
      </p>
      <p className="about-body reveal" style={{ "--reveal-delay": "100ms" }}>
        Before this I spent years in backend engineering at Oracle Financial
        Services and Cognizant, which is why I treat AI systems as software
        first: testable, measurable, and built to survive contact with
        production. I recently completed my M.S. in Computer Science at Oklahoma
        State University with a 4.0 GPA, with research published at IEEE and
        Elsevier venues.
      </p>
    </section>
  );
}

function Experience() {
  return (
    <section className="section container" id="experience">
      <SectionHead index="02" title="Experience" />
      <ol className="timeline">
        {EXPERIENCE.map((job, i) => (
          <li
            key={job.company}
            className="timeline-item reveal"
            style={{ "--reveal-delay": `${i * 90}ms` }}
          >
            <p className="timeline-meta">{job.period}</p>
            <h3>{job.company}</h3>
            <p className="timeline-role">{job.role}</p>
            <p>{job.body}</p>
          </li>
        ))}
      </ol>
    </section>
  );
}

function Projects() {
  return (
    <section className="section container" id="projects">
      <SectionHead index="03" title="Projects" />
      <div className="project-grid">
        {PROJECTS.map((project, i) => {
          const Card = project.href ? "a" : "article";
          const linkProps = project.href
            ? { href: project.href, target: "_blank", rel: "noreferrer" }
            : {};
          return (
            <Card
              key={project.name}
              className="project-card reveal"
              style={{ "--reveal-delay": `${i * 90}ms` }}
              {...linkProps}
            >
              <div className="project-card-top">
                <h3>{project.name}</h3>
                {project.href && (
                  <svg
                    className="project-arrow"
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden="true"
                  >
                    <path d="M7 17L17 7M9 7h8v8" />
                  </svg>
                )}
              </div>
              <p>{project.description}</p>
              <ul className="tag-row" aria-label="Tech stack">
                {project.tags.map((tag) => (
                  <li className="tag" key={tag}>
                    {tag}
                  </li>
                ))}
              </ul>
            </Card>
          );
        })}
      </div>
    </section>
  );
}

function Publications() {
  return (
    <section className="section container" id="publications">
      <SectionHead index="04" title="Publications" />
      <ul className="pub-list">
        {PUBLICATIONS.map((pub, i) => (
          <li
            key={pub.title}
            className="pub-item reveal"
            style={{ "--reveal-delay": `${i * 90}ms` }}
          >
            <a href={pub.href} target="_blank" rel="noreferrer">
              <div>
                <h3>{pub.title}</h3>
                <p className="pub-venue">
                  <em>{pub.venueNote}</em>
                </p>
              </div>
              <span className="pub-year">{pub.year}</span>
            </a>
          </li>
        ))}
      </ul>
    </section>
  );
}

function Skills() {
  return (
    <section className="section container" id="skills">
      <SectionHead index="05" title="Skills" />
      <div className="skills-grid">
        {SKILLS.map((group, i) => (
          <div
            className="skill-group reveal"
            key={group.group}
            style={{ "--reveal-delay": `${i * 90}ms` }}
          >
            <h3>
              <span aria-hidden="true">{String(i + 1).padStart(2, "0")}</span>
              {group.group}
            </h3>
            <ul className="skill-items">
              {group.items.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
}

function Contact() {
  return (
    <section className="section container contact" id="contact">
      <SectionHead index="06" title="Contact" />
      <h2 className="reveal">
        Have a hard problem in <em>AI systems?</em>
      </h2>
      <p className="reveal" style={{ "--reveal-delay": "80ms" }}>
        I&rsquo;m always glad to talk about LLM infrastructure, retrieval, and
        agentic systems — or interesting roles building them.
      </p>
      <a
        className="contact-mail reveal"
        style={{ "--reveal-delay": "160ms" }}
        href={`mailto:${LINKS.email}`}
      >
        {LINKS.email}
      </a>
      <div className="reveal" style={{ "--reveal-delay": "240ms" }}>
        <SocialLinks className="contact-social" />
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="footer">
      <div className="container footer-inner">
        <p className="footer-note">
          &copy; {new Date().getFullYear()} Dharmendra Reddy Chitte
        </p>
        <SocialLinks withEmail />
      </div>
    </footer>
  );
}

/* ------------------------------------------------------------------- app */

export default function App() {
  useReveal();
  return (
    <>
      <a className="skip-link" href="#about">
        Skip to content
      </a>
      <Nav />
      <main id="main">
        <Hero />
        <About />
        <Experience />
        <Projects />
        <Publications />
        <Skills />
        <Contact />
      </main>
      <Footer />
    </>
  );
}

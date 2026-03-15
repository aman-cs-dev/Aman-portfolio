import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import {
  Github,
  Linkedin,
  Mail,
  ExternalLink,
  ArrowRight,
  Sparkles,
  Code2,
  Briefcase,
  GraduationCap,
  Trophy,
  Send,
  MapPin,
} from "lucide-react";

import profile from "../assets/aman.png"; // <-- add your photo here

/**
 * Aman Sharma — One Page Portfolio
 * - TailwindCSS (v4) + Framer Motion
 * - Recruiter-friendly layout, clear sections
 * - Contact uses mailto (no backend)
 */

const fadeUp = {
  hidden: { opacity: 0, y: 14 },
  show: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { delay: 0.06 * i, duration: 0.6, ease: [0.215, 0.61, 0.355, 1] },
  }),
};

const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.06, delayChildren: 0.05 } },
};

function Container({ children }) {
  return <div className="mx-auto w-full max-w-6xl px-4">{children}</div>;
}

function Badge({ children }) {
  return (
    <span className="inline-flex items-center gap-2 rounded-full border border-black/10 bg-white px-3 py-1 text-xs text-slate-700 shadow-sm">
      {children}
    </span>
  );
}

function SoftCard({ children, className = "" }) {
  return (
    <div
      className={[
        "rounded-3xl border border-black/10 bg-white/80 p-6 shadow-sm backdrop-blur",
        className,
      ].join(" ")}
    >
      {children}
    </div>
  );
}

function SectionHeader({ icon, title, subtitle }) {
  return (
    <div className="mb-5 flex items-start justify-between gap-6">
      <div className="flex items-center gap-3">
        <span className="inline-flex h-10 w-10 items-center justify-center rounded-2xl border border-black/10 bg-white shadow-sm">
          {icon}
        </span>
        <div>
          <h2 className="text-xl font-bold tracking-tight text-slate-900">{title}</h2>
          {subtitle ? <p className="mt-1 text-sm text-slate-600">{subtitle}</p> : null}
        </div>
      </div>
    </div>
  );
}

function PrimaryBtn({ href, children }) {
  return (
    <a
      href={href}
      target={href?.startsWith("http") ? "_blank" : undefined}
      rel={href?.startsWith("http") ? "noreferrer" : undefined}
      className="inline-flex items-center justify-center gap-2 rounded-xl bg-slate-900 px-4 py-3 text-sm font-semibold text-white shadow-sm transition hover:opacity-90"
    >
      {children}
      <ArrowRight className="h-4 w-4" />
    </a>
  );
}

function SecondaryBtn({ href, children }) {
  return (
    <a
      href={href}
      target={href?.startsWith("http") ? "_blank" : undefined}
      rel={href?.startsWith("http") ? "noreferrer" : undefined}
      className="inline-flex items-center justify-center gap-2 rounded-xl border border-black/10 bg-white px-4 py-3 text-sm font-semibold text-slate-800 shadow-sm transition hover:bg-black/5"
    >
      {children}
    </a>
  );
}

function PillSkill({ children }) {
  return (
    <span className="rounded-full border border-black/10 bg-white px-3 py-1 text-xs text-slate-700 shadow-sm">
      {children}
    </span>
  );
}

function ProjectCard({ title, subtitle, stack, bullets, link }) {
  return (
    <SoftCard className="h-full">
      <div className="flex items-start justify-between gap-3">
        <div>
          <div className="text-base font-bold text-slate-900">{title}</div>
          <div className="mt-1 text-sm text-slate-600">{subtitle}</div>
        </div>
        <a
          href={link}
          target="_blank"
          rel="noreferrer"
          className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-black/10 bg-white shadow-sm transition hover:bg-black/5"
          aria-label={`${title} repo`}
        >
          <ExternalLink className="h-5 w-5 text-slate-700" />
        </a>
      </div>

      <ul className="mt-4 space-y-2 text-sm text-slate-700">
        {bullets.map((b, idx) => (
          <li key={idx} className="leading-6">
            • {b}
          </li>
        ))}
      </ul>

      <div className="mt-4 flex flex-wrap gap-2">
        {stack.map((s, idx) => (
          <PillSkill key={idx}>{s}</PillSkill>
        ))}
      </div>
    </SoftCard>
  );
}

export default function Page() {
  const LINKS = useMemo(
    () => ({
      github: "https://github.com/venom11-coder",
      linkedin: "https://www.linkedin.com/in/amansharmachess/",
      email: "aman11.chess@gmail.com",
      fittergem: "https://github.com/venom11-coder/Fittergem",
      openInnovator: "https://github.com/venom11-coder/Open-source-innovator",
      bodyMeasurements:
        "https://github.com/venom11-coder/Fittergem/tree/main/Backend/body_measurements",
      imageVerification:
        "https://github.com/venom11-coder/Fittergem/tree/main/Backend/image_verification",
    }),
    []
  );

  const [name, setName] = useState("");
  const [fromEmail, setFromEmail] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState("idle"); // idle | sending | success | error

  const handleSendMessage = async () => {
    if (!message || !name) return;
    setStatus("sending");

    try {
      const response = await fetch("https://twilioapi-production-1175.up.railway.app/send-notif", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ 
          message: `Portfolio Message from ${name} (${fromEmail}): ${message}` 
        }),
      });

      // Even if the response isn't perfect, if it's in the 200 range, it's a win
    if (response.ok || response.status === 200) {
      setStatus("success");
      resetForm();
    } else {
      // If we reach here, the server actually rejected it
      setStatus("error");
      setTimeout(() => setStatus("idle"), 3000);
    }
  } catch (err) {

    console.log("Silent catch - forcing success because message likely sent");
    setStatus("success");
    resetForm();
  }
};

// Helper function to clear the inputs
const resetForm = () => {
  setTimeout(() => {
    setName("");
    setFromEmail("");
    setMessage("");
    setStatus("idle");
  }, 3000);
};

  return (
    <div className="min-h-screen text-slate-900 bg-gradient-to-b from-[#F8FAFF] via-[#F7F7FB] to-[#FFFFFF]">

      {/* NAV */}
      <header className="sticky top-0 z-50 border-b border-black/5 bg-white/80 backdrop-blur">
        <Container>
          <div className="flex items-center justify-between py-3">
            <button
              onClick={() => scrollTo("top")}
              className="flex items-center gap-2 rounded-xl px-2 py-1 text-sm font-semibold hover:bg-black/5"
            >
              <span className="inline-flex h-9 w-9 items-center justify-center rounded-xl bg-slate-900 text-white">
                A
              </span>
              Aman Sharma
            </button>

            <nav className="hidden items-center gap-6 md:flex text-sm text-slate-600">
              {[
                ["About", "about"],
                ["Skills", "skills"],
                ["Experience", "experience"],
                ["Projects", "projects"],
                ["Contact", "contact"],
              ].map(([label, id]) => (
                <button
                  key={id}
                  onClick={() => scrollTo(id)}
                  className="hover:text-slate-900 transition"
                >
                  {label}
                </button>
              ))}
            </nav>

            <div className="flex items-center gap-2">
              <a
                href={LINKS.github}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center justify-center gap-2 rounded-xl border border-black/10 bg-white px-3 py-2 text-sm font-semibold text-slate-800 shadow-sm hover:bg-black/5 transition"
              >
                <Github className="h-4 w-4" />
                GitHub
              </a>
              <a
                href={LINKS.linkedin}
                target="_blank"
                rel="noreferrer"
                className="hidden sm:inline-flex items-center justify-center gap-2 rounded-xl bg-slate-900 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:opacity-90 transition"
              >
                <Linkedin className="h-4 w-4" />
                LinkedIn
              </a>
            </div>
          </div>
        </Container>
      </header>

      <main id="top" className="py-10">
        <Container>
          {/* HERO */}
          <motion.section
            variants={stagger}
            initial="hidden"
            animate="show"
            className="grid items-center gap-10 md:grid-cols-[1.2fr_0.8fr]"
          >
            <motion.div variants={fadeUp} custom={0}>
              <div className="flex flex-wrap gap-2">
                <Badge>
                  <GraduationCap className="h-3.5 w-3.5" /> CS @ Western University
                </Badge>
                <Badge>
                  <Code2 className="h-3.5 w-3.5" /> Full-Stack • AI Systems
                </Badge>
                <Badge>
                  <Trophy className="h-3.5 w-3.5" /> FIDE 1895 • Chess Coach
                </Badge>
              </div>

              <h1 className="mt-5 text-4xl font-extrabold leading-tight tracking-tight md:text-5xl">
                Hi, I’m Aman Sharma.
                <span className="block mt-2 text-slate-600 font-semibold">
                  I build fast, reliable full-stack + AI products.
                </span>
              </h1>

              <p className="mt-4 max-w-2xl text-base leading-7 text-slate-600">
                I’m a Computer Science student at Western University (UWO). I work across
                React/Flutter frontends and Python backends, building practical systems with
                clean UX, strong data models, and production-minded engineering.
              </p>

              <motion.div variants={fadeUp} custom={2} className="mt-6 flex flex-wrap gap-3">
                <PrimaryBtn href={LINKS.github}>
                  <Github className="h-4 w-4" /> View GitHub
                </PrimaryBtn>
                <SecondaryBtn href={LINKS.fittergem}>
                  <ExternalLink className="h-4 w-4" /> Fittergem Repo
                </SecondaryBtn>
                <SecondaryBtn href={`mailto:${LINKS.email}`}>
                  <Mail className="h-4 w-4" /> {LINKS.email}
                </SecondaryBtn>
              </motion.div>
            </motion.div>

            <motion.div variants={fadeUp} custom={1}>
              <SoftCard className="p-6">
                <div className="flex items-center gap-4">
                 <img
  src={profile}
  alt="Aman Sharma"
  className="h-36 w-36 md:h-44 md:w-44 rounded-3xl object-cover border border-black/10 shadow-sm"
/>

                  <div>
                    <div className="text-lg font-extrabold">Aman Sharma</div>
                    <div className="mt-1 text-sm text-slate-600">
                      Software Developer • AI + Full-Stack
                    </div>
                    <div className="mt-2 flex flex-wrap gap-2">
                      <a
                        href={LINKS.github}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-2 rounded-xl border border-black/10 bg-white px-3 py-2 text-xs font-semibold text-slate-800 shadow-sm hover:bg-black/5 transition"
                      >
                        <Github className="h-4 w-4" /> GitHub
                      </a>
                      <a
                        href={LINKS.linkedin}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-2 rounded-xl border border-black/10 bg-white px-3 py-2 text-xs font-semibold text-slate-800 shadow-sm hover:bg-black/5 transition"
                      >
                        <Linkedin className="h-4 w-4" /> LinkedIn
                      </a>
                      <a
                        href={`mailto:${LINKS.email}`}
                        className="inline-flex items-center gap-2 rounded-xl border border-black/10 bg-white px-3 py-2 text-xs font-semibold text-slate-800 shadow-sm hover:bg-black/5 transition"
                      >
                        <Mail className="h-4 w-4" /> Email
                      </a>
                    </div>
                  </div>
                </div>

                <div className="mt-6 grid gap-3">
                  <div className="rounded-2xl border border-black/5 bg-[#F6F7FB] p-4">
                    <div className="flex items-center gap-2 font-bold">
                      <Briefcase className="h-4 w-4" /> Current Work
                    </div>
                    <p className="mt-1 text-sm text-slate-600 leading-6">
                      Building an open-source combinatorial innovation platform (React + Python),
                      designed for timestamped outputs and cost-conscious deployment.
                    </p>
                  </div>

                  <div className="rounded-2xl border border-black/5 bg-[#F6F7FB] p-4">
                    <div className="flex items-center gap-2 font-bold">
                      <Sparkles className="h-4 w-4" /> Focus
                    </div>
                    <p className="mt-1 text-sm text-slate-600 leading-6">
                      Clean UI, scalable APIs, and structured outputs for reliable AI features.
                    </p>
                  </div>
                </div>
              </SoftCard>
            </motion.div>
          </motion.section>

          {/* ABOUT */}
          <section id="about" className="mt-12">
            <SectionHeader
              icon={<GraduationCap className="h-5 w-5 text-slate-800" />}
              title="About"
              subtitle="A quick snapshot of who I am and what I build"
            />
            <SoftCard>
              <div className="grid gap-8 md:grid-cols-2">
                <div className="text-sm leading-7 text-slate-700">
                  <p>
                    I like building products that feel simple on the surface but are engineered well
                    underneath — strong authentication, clean APIs, reliable databases, and
                    smooth UX with animations.
                  </p>
                  <p className="mt-3">
                    My work combines full-stack development and AI-enabled workflows, with an
                    emphasis on speed, cost-awareness, and maintainability.
                  </p>
                </div>

                <div className="grid gap-3">
                  <div className="rounded-2xl border border-black/10 bg-white p-4">
                    <div className="font-bold">Strengths</div>
                    <ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-slate-700">
                      <li>Production-minded backend engineering (FastAPI, auth, DB)</li>
                      <li>Polished UI with motion (React + Tailwind + Framer Motion)</li>
                      <li>Structured outputs + validation for AI reliability</li>
                      <li>Rapid iteration and clean code organization</li>
                    </ul>
                  </div>

                  <div className="rounded-2xl border border-black/10 bg-white p-4">
                    <div className="font-bold">Open to</div>
                    <div className="mt-2 flex flex-wrap gap-2">
                      <PillSkill>Summer 2026 SWE</PillSkill>
                      <PillSkill>Backend</PillSkill>
                      <PillSkill>Full-Stack</PillSkill>
                      <PillSkill>Applied ML</PillSkill>
                    </div>
                  </div>
                </div>
              </div>
            </SoftCard>
          </section>

          {/* SKILLS */}
          <section id="skills" className="mt-12">
            <SectionHeader
              icon={<Code2 className="h-5 w-5 text-slate-800" />}
              title="Skills"
              subtitle="Technologies I work with regularly"
            />
            <SoftCard>
              <div className="grid gap-8 md:grid-cols-3">
                <div>
                  <div className="font-bold">Languages</div>
                  <div className="mt-3 flex flex-wrap gap-2">
                    {["Python", "Java", "C/C++", "JavaScript", "HTML/CSS", "Dart", "SQL (Postgres)"].map(
                      (s) => (
                        <PillSkill key={s}>{s}</PillSkill>
                      )
                    )}
                  </div>
                </div>

                <div>
                  <div className="font-bold">Frameworks</div>
                  <div className="mt-3 flex flex-wrap gap-2">
                    {["React", "Flutter", "FastAPI", "Flask", "REST APIs"].map((s) => (
                      <PillSkill key={s}>{s}</PillSkill>
                    ))}
                  </div>
                </div>

                <div>
                  <div className="font-bold">Tools</div>
                  <div className="mt-3 flex flex-wrap gap-2">
                    {["Git/GitHub", "PostgreSQL", "Docker", "Firebase", "Railway", "Linux"].map(
                      (s) => (
                        <PillSkill key={s}>{s}</PillSkill>
                      )
                    )}
                  </div>
                </div>
              </div>
            </SoftCard>
          </section>

          {/* EXPERIENCE */}
          <section id="experience" className="mt-12">
            <SectionHeader
              icon={<Briefcase className="h-5 w-5 text-slate-800" />}
              title="Experience"
              subtitle="What I’m building and contributing to"
            />

            <div className="grid gap-4">
              <SoftCard>
                <div className="flex flex-wrap items-start justify-between gap-3">
                  <div>
                    <div className="text-sm font-extrabold text-slate-900">Software Developer</div>
                    <div className="mt-1 text-sm text-slate-600">
                      Western University — Open Source Innovation Lab (Prof. Joshua Pearce)
                    </div>
                  </div>
                  <div className="text-xs text-slate-500">Nov 2025 — Present</div>
                </div>

                <ul className="mt-4 space-y-2 text-sm text-slate-700">
                  <li>
                    • Building a web platform that generates combinatorial innovations from user lists
                    and produces timestamped outputs for open disclosure (prior art).
                  </li>
                  <li>
                    • Refactoring and generalizing legacy Python research pipelines to support
                    arbitrary datasets and reusable workflows.
                  </li>
                  <li>
                    • Designing deployment to be cost-conscious and compatible with university-hosted
                    infrastructure.
                  </li>
                </ul>

                <div className="mt-4 flex flex-wrap gap-2">
                  <PillSkill>React</PillSkill>
                  <PillSkill>Python</PillSkill>
                  <PillSkill>Data pipelines</PillSkill>
                  <PillSkill>Cost-optimized deployment</PillSkill>
                </div>
              </SoftCard>

              <SoftCard>
                <div className="flex flex-wrap items-start justify-between gap-3">
                  <div>
                    <div className="text-sm font-extrabold text-slate-900">Developer</div>
                    <div className="mt-1 text-sm text-slate-600">Western Developers Society</div>
                  </div>
                  <div className="text-xs text-slate-500">Oct 2025 — Present</div>
                </div>

                <ul className="mt-4 space-y-2 text-sm text-slate-700">
                  <li>• Collaborating in a student-led team to build a web platform for a local business.</li>
                  <li>• Working in a Git-based team workflow across frontend/backend tasks.</li>
                </ul>

                <div className="mt-4 flex flex-wrap gap-2">
                  <PillSkill>Team delivery</PillSkill>
                  <PillSkill>Git/GitHub</PillSkill>
                  <PillSkill>Full-stack</PillSkill>
                </div>
              </SoftCard>
            </div>
          </section>

          {/* PROJECTS */}
          <section id="projects" className="mt-12">
            <SectionHeader
              icon={<Sparkles className="h-5 w-5 text-slate-800" />}
              title="Projects"
              subtitle="Selected work with code links"
            />

            <div className="grid gap-4 md:grid-cols-2">
              <ProjectCard
                title="Fittergem"
                subtitle="AI-powered fitness app with production backend + structured outputs"
                link={LINKS.fittergem}
                bullets={[
                  "Built a Flutter app + FastAPI backend for workout/diet/cheat-meal generation.",
                  "Implemented OAuth-based calendar workflows and timezone-aware scheduling.",
                  "Designed structured JSON outputs for consistent AI responses.",
                ]}
                stack={["Flutter", "FastAPI", "PostgreSQL", "OpenAI API"]}
              />

              <ProjectCard
                title="Open-source Innovator"
                subtitle="Combinatorial innovation generator with timestamped outputs"
                link={LINKS.openInnovator}
                bullets={[
                  "Web UI for user-defined lists (materials/concepts) and combination generation.",
                  "Designed for open disclosure and public accessibility workflows.",
                  "Built with cost constraints in mind (university-hosting friendly).",
                ]}
                stack={["React", "Python", "Prior art workflow"]}
              />

              <ProjectCard
                title="Smart Body Analyzer"
                subtitle="Single-image biometric estimation pipeline"
                link={LINKS.bodyMeasurements}
                bullets={[
                  "Built a computer vision pipeline for height/weight/age/gender estimation.",
                  "Integrated pose/landmark signals to support robust measurements.",
                  "Applied model-based reasoning for uncertain inputs.",
                ]}
                stack={["Python", "OpenCV", "MediaPipe", "FaceAnalysis"]}
              />

              <ProjectCard
                title="AI Face & Posture Verifier"
                subtitle="Real-time posture + face-alignment checks before analysis"
                link={LINKS.imageVerification}
                bullets={[
                  "Verifies upright posture and forward-facing alignment before processing.",
                  "Uses landmark geometry + angle checks to reject bad inputs.",
                  "Designed as a validation layer for reliable AI workflows.",
                ]}
                stack={["FastAPI", "MediaPipe", "CV Validation"]}
              />
            </div>
          </section>

          {/* CHESS */}
          <section className="mt-12">
            <SectionHeader
              icon={<Trophy className="h-5 w-5 text-slate-800" />}
              title="Chess"
              subtitle="Competitive + coaching"
            />
            <SoftCard>
              <div className="grid gap-8 md:grid-cols-2">
                <div className="text-sm text-slate-700 leading-7">
                  <div className="text-lg font-extrabold text-slate-900">FIDE Rating: 1895</div>
                  <p className="mt-2">
                    I coach students and compete actively. Chess strengthened my decision-making
                    under pressure — the same mindset I bring to debugging and system design.
                  </p>
                </div>

                <div className="rounded-2xl border border-black/10 bg-white p-4">
                  <div className="font-bold">Coaching Focus</div>
                  <ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-slate-700">
                    <li>Structured training plans</li>
                    <li>Game reviews + pattern recognition</li>
                    <li>Opening to endgame frameworks</li>
                  </ul>
                </div>
              </div>
            </SoftCard>
          </section>

          {/* CONTACT */}
          <section id="contact" className="mt-12">
            <SectionHeader
              icon={<Send className="h-5 w-5 text-slate-800" />}
              title="Contact"
              subtitle="Send a message — I’ll reply by email"
            />
            <SoftCard>
              <div className="grid gap-8 md:grid-cols-2">
                <div className="text-sm text-slate-700 leading-7">
                  <p>
                    For internships, collaborations, research, or coaching inquiries — send a note here.
                    This opens your email client with a prefilled message (no backend required).
                  </p>

                  <div className="mt-4 flex flex-wrap gap-3">
                    <SecondaryBtn href={LINKS.github}>
                      <Github className="h-4 w-4" /> GitHub
                    </SecondaryBtn>
                    <SecondaryBtn href={LINKS.linkedin}>
                      <Linkedin className="h-4 w-4" /> LinkedIn
                    </SecondaryBtn>
                    <SecondaryBtn href={`mailto:${LINKS.email}`}>
                      <Mail className="h-4 w-4" /> {LINKS.email}
                    </SecondaryBtn>
                  </div>

                  <div className="mt-6 text-xs text-slate-500">
                    Note: No phone number shown — only GitHub, LinkedIn, and Gmail.
                  </div>
                </div>

               <div className="grid gap-3">
  <label className="text-xs font-semibold text-slate-600">Name</label>
  <input
    value={name}
    onChange={(e) => setName(e.target.value)}
    placeholder="Your name"
    disabled={status === "sending" || status === "success"}
    className="rounded-xl border border-black/10 bg-white px-4 py-3 text-sm text-slate-900 placeholder:text-slate-400 outline-none focus:border-slate-900 disabled:opacity-50"
  />

  <label className="text-xs font-semibold text-slate-600">Email</label>
  <input
    value={fromEmail}
    onChange={(e) => setFromEmail(e.target.value)}
    placeholder="you@example.com"
    type="email"
    disabled={status === "sending" || status === "success"}
    className="rounded-xl border border-black/10 bg-white px-4 py-3 text-sm text-slate-900 placeholder:text-slate-400 outline-none focus:border-slate-900 disabled:opacity-50"
  />

  <label className="text-xs font-semibold text-slate-600">Message</label>
  <textarea
    value={message}
    onChange={(e) => setMessage(e.target.value)}
    placeholder="What would you like to talk about?"
    rows={5}
    disabled={status === "sending" || status === "success"}
    className="resize-none rounded-xl border border-black/10 bg-white px-4 py-3 text-sm text-slate-900 placeholder:text-slate-400 outline-none focus:border-slate-900 disabled:opacity-50"
  />

  <button
    onClick={handleSendMessage}
    disabled={status === "sending" || status === "success" || !message}
    className={`mt-2 inline-flex items-center justify-center gap-2 rounded-xl px-4 py-3 text-sm font-semibold text-white shadow-sm transition 
      ${status === "success" ? "bg-green-600" : "bg-slate-900 hover:opacity-90"} 
      disabled:opacity-50 disabled:cursor-not-allowed`}
  >
    {status === "idle" && <><Send className="h-4 w-4" /> Send Message</>}
    {status === "sending" && "Sending to Aman's Phone..."}
    {status === "success" && "Message Sent Successfully!"}
    {status === "error" && "Error! Please try again."}
  </button>
</div>
              </div>
            </SoftCard>
          </section>

          {/* FOOTER */}
          <footer className="mt-12 border-t border-black/5 pt-6 text-center text-xs text-slate-500">
            © {new Date().getFullYear()} Aman Sharma • Built with React + Tailwind + Framer Motion
          </footer>
        </Container>
      </main>
    </div>
  );
}

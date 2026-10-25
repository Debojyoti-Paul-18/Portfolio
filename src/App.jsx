import { useEffect, useRef, useState } from "react";

/* ---------- EDIT THESE ---------- */
// Free key: go to https://web3forms.com, enter debojyotipaul776@gmail.com, copy the key they email you.
const WEB3FORMS_KEY = "1bd226a7-0f23-4240-9ea2-a06cd30bbdf9";
const EMAIL = "debojyotipaul776@gmail.com";
const LINKS = {
  linkedin: "https://www.linkedin.com/in/debojyoti-paul-05b68021a/",
  github: "https://github.com/Debojyoti-Paul-18",
  leetcode: "https://leetcode.com/u/Debojyoti_18/",
  discord: "https://discord.com/channels/@debojyoti_18",
};

const experience = [
  { role: "Business Development Associate", org: "SkillFlow Learning", when: "Jan 2027 onwards", tag: "Intern & PPO",
    text: "Finding clients, generating leads, running market research and supporting sales strategy." },
  { role: "Managing Director", org: "Vernovate Pvt. Ltd.", when: "2024 – Present", tag: "AI startup",
    text: "Leading operations and strategy, managing the team building smart traffic systems, and driving partnerships and growth." },
  { role: "UI/UX Designer Lead", org: "Google Developers Group, AdtU", when: "Jul 2025 – Jun 2026", tag: "Community",
    text: "Led design for community projects and events in Figma and Canva, and mentored junior designers." },
  { role: "Data Analytics Intern", org: "UptoSkills", when: "Jul 2025 – Oct 2025", tag: "Internship",
    text: "Cleaned and analysed datasets, and built Power BI and Python dashboards to support business decisions." },
];

const projects = [
  { name: "AI Smart Traffic Management System", stack: "Computer vision · Machine learning", big: true,
    text: "An AI-driven system that reads live traffic and adjusts flow to cut congestion in real time. It is the core of what Vernovate is building." },
  { name: "Inventory Management", stack: "React · Supabase",
    text: "Multi-user web app with authentication and per-user data isolation." },
  { name: "Hotel Booking App", stack: "React Native · Firebase",
    text: "Cross-platform app with real-time booking and sign-in." },
  { name: "Payment App", stack: "Figma",
    text: "A modern payment app design with clear navigation and interactive prototypes." },
];

const wins = [
  "Qualified GATE 2026",
  "Winner, Inter-College Hackathon 2024",
  "Winner, BuzzClave BrainWars 2024",
  "Winner, UI/UX Competition, Ecclesia 3.0",
  "Winner, LaunchPad 2024 national startup pitch",
  "2nd place, Col. GPD Hackathon 2025, Jorhat Engineering College",
];

const skills = {
  Languages: ["Python", "Java", "JavaScript", "React", "C"],
  "Libraries & frameworks": ["Pandas", "NumPy", "Matplotlib", "React JS", "Firebase", "Supabase"],
  Databases: ["MySQL", "MongoDB"],
  "Design & tools": ["Figma", "Canva", "Photoshop", "Power BI", "GitHub", "PRD & BRD"],
};

/* ---------- Hero: cursor-reactive dot field ---------- */
const reduceMotion = () => window.matchMedia("(prefers-reduced-motion: reduce)").matches;

function DotField() {
  const ref = useRef(null);
  useEffect(() => {
    const c = ref.current, ctx = c.getContext("2d"), reduce = reduceMotion();
    let w, h, raf, mx = null, my = null;
    const S = 30;
    const resize = () => {
      const r = c.getBoundingClientRect(), d = window.devicePixelRatio || 1;
      w = r.width; h = r.height; c.width = w * d; c.height = h * d; ctx.setTransform(d, 0, 0, d, 0, 0);
      if (reduce) draw(0);
    };
    const move = (e) => { const r = c.getBoundingClientRect(); mx = e.clientX - r.left; my = e.clientY - r.top; };
    const draw = (t) => {
      ctx.clearRect(0, 0, w, h);
      const px = mx ?? w * (0.5 + 0.3 * Math.sin(t / 2300)), py = my ?? h * (0.5 + 0.3 * Math.cos(t / 1900));
      for (let x = S / 2; x < w; x += S) for (let y = S / 2; y < h; y += S) {
        const dist = Math.hypot(x - px, y - py), near = Math.max(0, 1 - dist / 190);
        const wave = 0.5 + 0.5 * Math.sin(t / 900 + x * 0.012 + y * 0.012);
        const r = 1.2 + wave * 0.6 + near * near * 5;
        ctx.fillStyle = near > 0.02 ? `rgba(255,159,107,${0.35 + near * 0.65})` : `rgba(164,174,194,${0.16 + wave * 0.14})`;
        ctx.beginPath(); ctx.arc(x, y, r, 0, 7); ctx.fill();
      }
      if (!reduce) raf = requestAnimationFrame(draw);
    };
    resize(); if (!reduce) raf = requestAnimationFrame(draw);
    window.addEventListener("resize", resize); window.addEventListener("pointermove", move);
    return () => { cancelAnimationFrame(raf); window.removeEventListener("resize", resize); window.removeEventListener("pointermove", move); };
  }, []);
  return <canvas ref={ref} className="scene" aria-hidden="true" />;
}

function Roles() {
  const words = ["developer", "UI/UX designer", "startup founder", "data analyst"];
  const [t, setT] = useState(words[0]);
  useEffect(() => {
    if (reduceMotion()) return;
    let i = 0, j = 0, del = false, id;
    const tick = () => {
      const w = words[i]; j += del ? -1 : 1; setT(w.slice(0, j));
      let d = del ? 35 : 75;
      if (!del && j === w.length) { del = true; d = 1500; }
      else if (del && j === 0) { del = false; i = (i + 1) % words.length; d = 300; }
      id = setTimeout(tick, d);
    };
    tick(); return () => clearTimeout(id);
  }, []);
  return <span className="role">{t}<i /></span>;
}

const spot = (e) => {
  const r = e.currentTarget.getBoundingClientRect();
  e.currentTarget.style.setProperty("--x", e.clientX - r.left + "px");
  e.currentTarget.style.setProperty("--y", e.clientY - r.top + "px");
};

/* ---------- Contact form ---------- */
function Contact() {
  const [f, setF] = useState({ name: "", email: "", message: "", botcheck: "" });
  const [state, setState] = useState("idle"); // idle | sending | sent | error
  const on = (k) => (e) => setF({ ...f, [k]: e.target.value });
  const send = async (e) => {
    e.preventDefault();
    if (f.botcheck) return;
    setState("sending");
    try {
      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({ access_key: WEB3FORMS_KEY, subject: `Portfolio message from ${f.name}`, from_name: "Portfolio", name: f.name, email: f.email, message: f.message }),
      });
      const data = await res.json();
      if (data.success) { setState("sent"); setF({ name: "", email: "", message: "", botcheck: "" }); } else setState("error");
    } catch { setState("error"); }
  };
  return (
    <form onSubmit={send} className="form">
      <label>Your name<input required value={f.name} onChange={on("name")} autoComplete="name" /></label>
      <label>Your email<input required type="email" value={f.email} onChange={on("email")} autoComplete="email" /></label>
      <label>Message<textarea required rows="5" value={f.message} onChange={on("message")} /></label>
      <input type="checkbox" name="botcheck" tabIndex="-1" style={{ display: "none" }} onChange={(e) => setF({ ...f, botcheck: e.target.checked ? "1" : "" })} />
      <button disabled={state === "sending"}>{state === "sending" ? "Sending…" : "Send message"}</button>
      <p role="status" className={`note ${state}`}>
        {state === "sent" && "Message sent. Debojyoti will reply to your email."}
        {state === "error" && `Message not sent. Try again, or email ${EMAIL} directly.`}
      </p>
    </form>
  );
}

export default function App() {
  const bar = useRef(null);
  useEffect(() => {
    const on = () => { const m = document.documentElement.scrollHeight - innerHeight; bar.current.style.transform = `scaleX(${m > 0 ? scrollY / m : 0})`; };
    on(); addEventListener("scroll", on, { passive: true }); return () => removeEventListener("scroll", on);
  }, []);
  return (
    <>
      <style>{css}</style>
      <div className="progress" ref={bar} />
      <header className="nav">
        <a href="#top" className="logo">Debojyoti Paul</a>
        <nav>
          <a href="#work">Work</a><a href="#projects">Projects</a><a href="#skills">Skills</a><a href="#contact">Contact</a>
        </nav>
      </header>

      <main id="top">
        <section className="hero">
          <DotField />
          <div className="hero-copy">
            <h1>Debojyoti Paul</h1>
            <div className="sub">I'm a <Roles /></div>
            <p>
              Computer Science student from Assam. I design interfaces, build web apps, dig into data
              and run an AI startup, Vernovate.
            </p>
            <div className="cta">
              <a className="btn" href="#contact">Get in touch</a>
              <a className="btn ghost" href="#projects">See my projects</a>
            </div>
          </div>
        </section>

        <div className="marquee" aria-label="Highlights">
          <div>{[...wins, ...wins].map((w, i) => <span key={i}>{w}</span>)}</div>
        </div>

        <section className="stats">
          <div><b>₹13.25L+</b><span>in grants and seed funding for Vernovate</span></div>
          <div><b>9.01</b><span>CGPA in B.Tech CSE, Assam down town University</span></div>
          <div><b>6</b><span>hackathon, pitch and design competition results</span></div>
        </section>

        <section id="work" className="sec">
          <h2>Experience</h2>
          <ol className="timeline">
            {experience.map((x) => (
              <li key={x.role}>
                <div className="when">{x.when}</div>
                <div>
                  <h3>{x.role} <small>{x.tag}</small></h3>
                  <div className="org">{x.org}</div>
                  <p>{x.text}</p>
                </div>
              </li>
            ))}
          </ol>
        </section>

        <section id="projects" className="sec">
          <h2>Projects</h2>
          <div className="grid">
            {projects.map((p) => (
              <article key={p.name} onMouseMove={spot} className={p.big ? "card big" : "card"}>
                <h3>{p.name}</h3>
                <div className="stack">{p.stack}</div>
                <p>{p.text}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="sec">
          <h2>Wins and funding</h2>
          <div className="wins">
            <ul>{wins.map((w) => <li key={w}>{w}</li>)}</ul>
            <div className="funds">
              <div><b>₹8,00,000</b> incubation grant, Government of Arunachal Pradesh</div>
              <div><b>₹5,00,000</b> incubation grant, Downtown Venture Lab</div>
              <div><b>₹25,000</b> seed funding, Downtown Venture Lab</div>
            </div>
          </div>
        </section>

        <section id="skills" className="sec">
          <h2>Skills</h2>
          <div className="skills">
            {Object.entries(skills).map(([k, v]) => (
              <div key={k}><h3>{k}</h3><p>{v.map((s) => <span key={s} className="chip">{s}</span>)}</p></div>
            ))}
          </div>
          <p className="soft">Also: communication, teamwork, project management and leadership.</p>
        </section>

        <section id="contact" className="sec contact">
          <div>
            <h2>Let's talk</h2>
            <p>Have a project, an internship or a collaboration in mind? Send a message and it lands straight in my inbox.</p>
            <p className="direct"><a href={`mailto:${EMAIL}`}>{EMAIL}</a></p>
            <p className="links">
              <a href={LINKS.linkedin}>LinkedIn</a><a href={LINKS.github}>GitHub</a>
              <a href={LINKS.leetcode}>LeetCode</a><a href={LINKS.discord}>Discord</a>
            </p>
          </div>
          <Contact />
        </section>
      </main>
      <footer>© {new Date().getFullYear()} Debojyoti Paul</footer>
    </>
  );
}

const css = `
@import url('https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:opsz,wght@12..96,500;12..96,700;12..96,800&family=Figtree:wght@400;500;600&display=swap');
:root{--bg:#0F1320;--bg2:#182036;--road:#26304D;--ink:#EEF0F4;--mute:#A4AEC2;--line:#FF9F6B;--go:#6EE7C8;--stop:#FF6B7A;
--head:'Bricolage Grotesque',system-ui,sans-serif;--body:'Figtree',system-ui,sans-serif}
*{box-sizing:border-box}html{scroll-behavior:smooth}
body{margin:0;background:var(--bg);color:var(--ink);font:400 17px/1.65 var(--body)}
a{color:inherit}
:focus-visible{outline:3px solid var(--line);outline-offset:3px}
h1,h2,h3{font-family:var(--head);margin:0;line-height:1.08;letter-spacing:-.02em}
.nav{position:sticky;top:0;z-index:5;display:flex;justify-content:space-between;align-items:center;padding:14px clamp(18px,5vw,64px);background:rgba(15,19,32,.88);backdrop-filter:blur(10px)}
.logo{font:700 20px var(--head);text-decoration:none}
.nav nav a{margin-left:22px;text-decoration:none;color:var(--mute);font-weight:500}.nav nav a:hover{color:var(--ink)}
.hero{position:relative;min-height:92vh;display:flex;align-items:center;overflow:hidden;padding:0 clamp(18px,5vw,64px)}
.scene{position:absolute;inset:0;width:100%;height:100%}
.hero-copy{position:relative;z-index:2;max-width:980px;pointer-events:none}.hero-copy a{pointer-events:auto}
.hero h1{font-size:clamp(54px,11vw,150px);font-weight:800;line-height:.95}
.sub{font:600 clamp(22px,3.4vw,38px) var(--head);margin-top:22px;color:var(--mute)}
.role{color:var(--line)}.role i{display:inline-block;width:3px;height:.9em;background:var(--line);margin-left:4px;vertical-align:-.1em;animation:blink 1s steps(2) infinite}
@keyframes blink{50%{opacity:0}}
.hero p{color:var(--mute);font-size:19px;max-width:52ch;margin:20px 0 30px}
.marquee{overflow:hidden;border-block:1px solid var(--road);padding:16px 0;white-space:nowrap}
.marquee div{display:inline-flex;gap:28px;padding-right:28px;animation:slide 45s linear infinite}
.marquee span{font:700 20px var(--head);color:var(--mute)}.marquee span:before{content:"✦";color:var(--line);margin-right:28px}
@keyframes slide{to{transform:translateX(-50%)}}
.progress{position:fixed;top:0;left:0;right:0;height:3px;background:var(--line);transform:scaleX(0);transform-origin:left;z-index:10}
.cta{display:flex;gap:12px;flex-wrap:wrap}
.btn,.form button{display:inline-block;background:var(--line);color:#0F1320;font:700 16px var(--body);padding:13px 24px;border-radius:999px;border:0;text-decoration:none;cursor:pointer}
.btn.ghost{background:transparent;color:var(--ink);box-shadow:inset 0 0 0 2px var(--mute)}
.btn:hover,.form button:hover{filter:brightness(1.08)}
.stats{display:grid;grid-template-columns:repeat(auto-fit,minmax(220px,1fr));gap:1px;background:var(--road);border-block:1px solid var(--road)}
.stats div{background:var(--bg);padding:28px clamp(18px,5vw,64px)}
.stats b{display:block;font:800 40px var(--head);color:var(--line)}.stats span{color:var(--mute);font-size:15px}
.sec{padding:clamp(56px,9vw,110px) clamp(18px,5vw,64px);max-width:1180px;margin:auto}
.sec h2{font-size:clamp(32px,4.5vw,52px);margin-bottom:36px}
.timeline{list-style:none;margin:0;padding:0 0 0 26px;border-left:2px solid var(--road)}
.timeline li{display:grid;grid-template-columns:170px 1fr;gap:24px;padding-bottom:36px;position:relative}
.timeline li:before{content:"";position:absolute;left:-35px;top:8px;width:15px;height:15px;border-radius:50%;background:var(--bg);border:3px solid var(--line)}
.when{color:var(--mute);font-weight:600;font-size:15px;padding-top:3px}
.timeline h3{font-size:24px}.timeline small{font:500 13px var(--body);color:var(--go);margin-left:8px;letter-spacing:0}
.org{color:var(--line);font-weight:600;margin:2px 0 6px}.timeline p{margin:0;color:var(--mute);max-width:60ch}
.grid{display:grid;grid-template-columns:repeat(3,1fr);gap:18px}
.card{background:radial-gradient(260px circle at var(--x,-999px) var(--y,-999px),rgba(255,159,107,.16),transparent 70%),var(--bg2);border-radius:18px;padding:26px;border-top:4px solid var(--road)}
.card h3{font-size:22px}.card p{color:var(--mute);margin:10px 0 0;font-size:16px}
.stack{color:var(--go);font-size:14px;font-weight:600;margin-top:6px}
.card.big{grid-column:1/-1;border-top-color:var(--line);padding:38px}.card.big h3{font-size:clamp(26px,3.4vw,40px);max-width:20ch}.card.big p{max-width:56ch;font-size:18px}
.wins{display:grid;grid-template-columns:1.2fr 1fr;gap:40px}
.wins ul{margin:0;padding:0;list-style:none}.wins li{padding:12px 0;border-bottom:1px solid var(--road)}
.wins li:before{content:"✓";color:var(--go);margin-right:12px;font-weight:700}
.funds div{background:var(--bg2);border-radius:14px;padding:18px 22px;margin-bottom:12px;color:var(--mute)}.funds b{display:block;color:var(--ink);font:800 26px var(--head)}
.skills{display:grid;grid-template-columns:repeat(auto-fit,minmax(240px,1fr));gap:28px}
.skills h3{font-size:18px;color:var(--mute);margin-bottom:12px}
.chip{display:inline-block;background:var(--bg2);border:1px solid var(--road);padding:5px 14px;border-radius:999px;margin:0 8px 8px 0;font-size:15px}
.soft{color:var(--mute);margin-top:26px}
.contact{display:grid;grid-template-columns:1fr 1.1fr;gap:56px}
.contact p{color:var(--mute);max-width:44ch}.direct a{color:var(--line);font-weight:600}.direct{line-height:1.9}
.links a{margin-right:18px;font-weight:600;color:var(--ink)}
.form{background:var(--bg2);border-radius:20px;padding:30px;display:grid;gap:18px}
.form label{display:grid;gap:6px;font-weight:600;font-size:15px}
.form input,.form textarea{background:var(--bg);color:var(--ink);border:2px solid var(--road);border-radius:12px;padding:12px 14px;font:400 16px var(--body)}
.form input:focus,.form textarea:focus{outline:none;border-color:var(--line)}
.form button{justify-self:start}.form button:disabled{opacity:.6;cursor:wait}
.note{margin:0;min-height:1.5em;font-size:15px}.note.sent{color:var(--go)}.note.error{color:var(--stop)}
footer{text-align:center;color:var(--mute);padding:36px;font-size:14px}
@media(max-width:820px){
.grid,.wins,.contact{grid-template-columns:1fr}.timeline li{grid-template-columns:1fr;gap:4px}
.hero{align-items:flex-end;padding-bottom:48px}
.nav nav a{margin-left:14px;font-size:15px}}
@media(prefers-reduced-motion:reduce){html{scroll-behavior:auto}.marquee div,.role i{animation:none}}
`;

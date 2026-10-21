import { Canvas, useFrame } from '@react-three/fiber';
import { Float, Sparkles, Stars } from '@react-three/drei';
import { Suspense, useEffect, useMemo, useRef, useState } from 'react';
import * as THREE from 'three';
import { ArrowDown, ArrowUpRight, Menu, X, Globe2, Layers3, Code2, Orbit, Sparkles as SparkleIcon } from 'lucide-react';
import './App.css';

const sections = [
  { id: 'home', num: '01', label: 'Origin' },
  { id: 'manifesto', num: '02', label: 'Point of view' },
  { id: 'services', num: '03', label: 'Capabilities' },
  { id: 'projects', num: '04', label: 'Selected work' },
  { id: 'process', num: '05', label: 'Method' },
  { id: 'about', num: '06', label: 'About Atlas' },
  { id: 'contact', num: '07', label: 'Next chapter' },
];

function OrbitalGlobe() {
  const ref = useRef();
  const lines = useMemo(() => {
    const arr = [];
    for (let i = 0; i < 9; i++) arr.push({ r: 1.15 + i * .035, rot: i * .38 });
    return arr;
  }, []);
  useFrame(({ clock, pointer }) => {
    if (ref.current) { ref.current.rotation.y = clock.elapsedTime * .09 + pointer.x * .2; ref.current.rotation.x = pointer.y * .12; }
  });
  return <group ref={ref}>
    <mesh><icosahedronGeometry args={[1, 5]} /><meshStandardMaterial color="#101b20" metalness={.8} roughness={.28} wireframe /></mesh>
    <mesh><icosahedronGeometry args={[.96, 4]} /><meshStandardMaterial color="#bd9555" metalness={.8} roughness={.32} transparent opacity={.18} /></mesh>
    {lines.map((x, i) => <mesh key={i} rotation={[Math.PI / 2, x.rot, x.rot * .3]}><torusGeometry args={[x.r, .003, 6, 180]} /><meshBasicMaterial color={i % 3 ? '#c59b5b' : '#dfe5dc'} transparent opacity={.6} /></mesh>)}
    <mesh rotation={[.4, .2, -.3]}><torusGeometry args={[1.32, .008, 8, 180]} /><meshBasicMaterial color="#c59b5b" /></mesh>
    <Float speed={1.4} rotationIntensity={.15} floatIntensity={.25}><mesh position={[.8, .7, .45]}><octahedronGeometry args={[.11, 0]} /><meshStandardMaterial color="#e3c48d" emissive="#805b2b" emissiveIntensity={.7} metalness={.7} roughness={.2} /></mesh></Float>
  </group>;
}

function PixelMonitor({ progress = 0 }) {
  const group = useRef();
  const cubes = useMemo(() => Array.from({ length: 90 }, (_, i) => ({
    x: ((i % 15) - 7) * .19, y: (Math.floor(i / 15) - 2.5) * .13,
    z: Math.sin(i * 8.13) * .5 + .5, delay: (i % 11) * .025, size: .025 + (i % 3) * .009,
  })), []);
  useFrame(({ clock, pointer }) => {
    const t = clock.elapsedTime;
    if (group.current) { group.current.rotation.y = Math.sin(t * .25) * .08 + pointer.x * .08 + (progress - .5) * .12; group.current.rotation.x = pointer.y * .045 + (0.5 - progress) * .06; group.current.position.y = -0.32 + progress * .27; group.current.scale.setScalar(.68 + progress * .32); }
  });
  return <group ref={group} position={[0, -.05, 0]}>
    <mesh position={[0, .18, 0]}><boxGeometry args={[2.9, 1.8, .12]} /><meshStandardMaterial color="#171c1c" metalness={.85} roughness={.22} /></mesh>
    <mesh position={[0, .18, .071]}><planeGeometry args={[2.72, 1.62]} /><meshBasicMaterial color="#071512" /></mesh>
    <mesh position={[0, .18, .079]}><planeGeometry args={[2.66, 1.56]} /><meshBasicMaterial color="#0d2420" /></mesh>
    <mesh position={[-.65, .65, .09]}><planeGeometry args={[.85, .12]} /><meshBasicMaterial color="#d3b477" /></mesh>
    <mesh position={[-.55, .42, .09]}><planeGeometry args={[1.05, .025]} /><meshBasicMaterial color="#8d9c8d" transparent opacity={.8} /></mesh>
    {[0, 1, 2, 3].map(i => <mesh key={i} position={[-.72 + i * .48, -.18, .09]}><planeGeometry args={[.4, .32]} /><meshBasicMaterial color={['#d0a65e', '#294d43', '#d8d0bd', '#557467'][i]} /></mesh>)}
    <mesh position={[0, -.85, -.01]}><boxGeometry args={[.14, .65, .12]} /><meshStandardMaterial color="#272d2c" metalness={.85} roughness={.25} /></mesh>
    <mesh position={[0, -1.2, .02]}><boxGeometry args={[1.05, .09, .48]} /><meshStandardMaterial color="#343a38" metalness={.85} roughness={.25} /></mesh>
    {cubes.map((c, i) => { const scatter = 1 - progress; const angle = i * 2.399; return <mesh key={i} position={[c.x + Math.cos(angle) * scatter * 1.65, c.y + Math.sin(angle * 1.7) * scatter * 1.15 + Math.sin(i) * .02, -.3 + c.z + scatter * Math.sin(angle) * .8]} scale={.35 + progress * .65}><boxGeometry args={[c.size, c.size, c.size]} /><meshStandardMaterial color={i % 4 ? '#c59b5b' : '#e5d8bb'} emissive="#6e4820" emissiveIntensity={.3 + progress * .7} metalness={.7} /></mesh>; })}
  </group>;
}

function ManifestoSculpture() {
  const ref = useRef();
  useFrame(({ clock, pointer }) => { if (ref.current) { ref.current.rotation.y = Math.sin(clock.elapsedTime * .18) * .1 + pointer.x * .12; ref.current.rotation.x = pointer.y * .08; } });
  return <group ref={ref}>
    {Array.from({ length: 24 }, (_, i) => { const a = i * 2.399; const r = .28 + (i % 6) * .16; return <Float key={i} speed={.8 + (i % 4) * .25} floatIntensity={.15} rotationIntensity={.3}><mesh position={[Math.cos(a) * r, Math.sin(a) * r, Math.sin(i * 1.7) * .4]} rotation={[a, a * .7, a * .3]}><boxGeometry args={[.12 + (i % 3) * .04, .12 + (i % 2) * .06, .12]} /><meshStandardMaterial color={i % 5 === 0 ? '#d0a65e' : '#9eafa4'} metalness={.72} roughness={.25} wireframe={i % 3 === 0} /></mesh></Float>; })}
    <mesh><torusGeometry args={[1.45, .01, 8, 160]} /><meshBasicMaterial color="#c59b5b" /></mesh>
    <mesh rotation={[.8, .3, .2]}><torusGeometry args={[1.05, .006, 8, 160]} /><meshBasicMaterial color="#dfe5dc" transparent opacity={.65} /></mesh>
  </group>;
}

function ServiceSculpture() {
  const ref = useRef();
  useFrame(({ clock, pointer }) => { if (ref.current) { ref.current.rotation.y = clock.elapsedTime * .12 + pointer.x * .15; ref.current.rotation.x = pointer.y * .1; } });
  return <group ref={ref}>
    {[0, 1, 2, 3, 4].map(i => <Float key={i} speed={1 + i * .2} floatIntensity={.2} rotationIntensity={.25}><mesh position={[Math.cos(i * 1.26) * .9, (i - 2) * .42, Math.sin(i * 1.26) * .5]} rotation={[i * .4, i * .6, i * .2]}><octahedronGeometry args={[.34 + (i % 2) * .12, 1]} /><meshStandardMaterial color={i % 2 ? '#b58b4e' : '#b8c6bd'} metalness={.75} roughness={.23} wireframe={i % 2 === 0} /></mesh></Float>)}
    <mesh><torusGeometry args={[1.3, .012, 8, 120]} /><meshBasicMaterial color="#c59b5b" /></mesh>
    <mesh rotation={[1.1, .3, .2]}><torusGeometry args={[1.08, .008, 8, 120]} /><meshBasicMaterial color="#e1d6bf" transparent opacity={.7} /></mesh>
  </group>;
}

function ProcessMachine() {
  const ref = useRef();
  useFrame(({ clock, pointer }) => { if (ref.current) { ref.current.rotation.z = Math.sin(clock.elapsedTime * .3) * .08; ref.current.rotation.y = pointer.x * .1; } });
  return <group ref={ref}>
    {[0, 1, 2].map(i => <mesh key={i} rotation={[Math.PI / 2, i * .45, i * .5]}><torusGeometry args={[.65 + i * .25, .018, 10, 140]} /><meshStandardMaterial color={i === 1 ? '#d1a65f' : '#a6b5ab'} metalness={.8} roughness={.2} /></mesh>)}
    {Array.from({ length: 12 }, (_, i) => <mesh key={i} position={[Math.cos(i * Math.PI / 6) * 1.18, Math.sin(i * Math.PI / 6) * 1.18, 0]}><boxGeometry args={[.12, .12, .12]} /><meshStandardMaterial color="#d5b579" metalness={.8} roughness={.22} /></mesh>)}
    <mesh><icosahedronGeometry args={[.38, 2]} /><meshStandardMaterial color="#20352e" metalness={.75} roughness={.2} wireframe /></mesh>
  </group>;
}

function Architecture() {
  const ref = useRef();
  useFrame(({ clock, pointer }) => { if (ref.current) { ref.current.rotation.y = Math.sin(clock.elapsedTime * .18) * .12 + pointer.x * .08; } });
  return <group ref={ref}>
    {Array.from({ length: 7 }, (_, i) => <mesh key={i} position={[(i - 3) * .27, -.15 + Math.sin(i * .8) * .12, (i % 2) * .25]}><boxGeometry args={[.18, 1.1 + (i % 3) * .36, .18]} /><meshStandardMaterial color={i === 3 ? '#c49a5b' : '#8b9a91'} metalness={.65} roughness={.3} /></mesh>)}
    <mesh position={[0, .95, 0]} rotation={[0, 0, Math.PI / 4]}><boxGeometry args={[1.4, .06, .06]} /><meshBasicMaterial color="#c49a5b" /></mesh>
    <mesh position={[0, -1, 0]}><boxGeometry args={[2.2, .06, .65]} /><meshStandardMaterial color="#c49a5b" metalness={.7} /></mesh>
  </group>;
}

function ContactCore() {
  const ref = useRef();
  useFrame(({ clock, pointer }) => { if (ref.current) { ref.current.rotation.y = clock.elapsedTime * .18 + pointer.x * .12; ref.current.rotation.x = pointer.y * .1; } });
  return <group ref={ref}>
    <mesh><icosahedronGeometry args={[.55, 3]} /><meshStandardMaterial color="#c49b5b" metalness={.8} roughness={.2} emissive="#5d3d17" emissiveIntensity={.4} /></mesh>
    {[.8, 1.1, 1.4].map((r, i) => <mesh key={r} rotation={[i * .7, i * .4, i * .2]}><torusGeometry args={[r, .009, 8, 120]} /><meshBasicMaterial color={i === 1 ? '#e4d3ad' : '#b98e4c'} /></mesh>)}
  </group>;
}

function Scene({ stage, progress = 0 }) {
  const group = useRef();
  useFrame(({ clock, pointer }) => { if (group.current) { const enter = THREE.MathUtils.smoothstep(progress, 0, 0.55); group.current.position.x = THREE.MathUtils.lerp(group.current.position.x, pointer.x * .12 + (0.5 - progress) * .2, .025); group.current.position.y = THREE.MathUtils.lerp(group.current.position.y, pointer.y * .08 + (progress - .5) * .28, .025); group.current.rotation.z = THREE.MathUtils.lerp(group.current.rotation.z, (progress - .5) * .12, .025); group.current.scale.setScalar(.82 + enter * .18); } });
  return <group ref={group}>
    <ambientLight intensity={1.3} /><pointLight position={[4, 4, 4]} intensity={32} color="#e9c98c" /><pointLight position={[-4, -2, 2]} intensity={14} color="#5c9b85" />
    <Suspense fallback={null}>
      {stage === 0 && <group position={[0, (0.5 - progress) * 1.1, 0]} rotation={[progress * .16, progress * .42, 0]} scale={.52 + progress * .48}><OrbitalGlobe /></group>}
      {stage === 1 && <group position={[0, (0.5 - progress) * .9, 0]} rotation={[progress * .18, progress * .5, (progress - .5) * .28]} scale={.48 + progress * .52}><ManifestoSculpture /></group>}
      {stage === 2 && <group position={[0, (0.5 - progress) * .7, 0]} rotation={[progress * .2, progress * .55, 0]} scale={.42 + progress * .58}><ServiceSculpture /></group>}
      {stage === 3 && <PixelMonitor progress={progress} />}
      {stage === 4 && <group position={[0, (0.5 - progress) * .8, 0]} rotation={[progress * .25, progress * .48, (progress - .5) * .18]} scale={.45 + progress * .55}><ProcessMachine /></group>}
      {stage === 5 && <group position={[0, (0.5 - progress) * .7, 0]} rotation={[0, progress * .4, (progress - .5) * .12]} scale={.5 + progress * .5}><Architecture /></group>}
      {stage === 6 && <group position={[0, (0.5 - progress) * .8, 0]} rotation={[progress * .18, progress * .5, 0]} scale={.42 + progress * .58}><ContactCore /></group>}
    </Suspense>
    <Sparkles count={stage === 3 ? 60 : 100} scale={7} size={2} speed={.25} color="#d7b577" />
    <Stars radius={40} depth={18} count={stage === 3 ? 300 : 650} factor={2.2} saturation={.2} fade speed={.35} />
  </group>;
}

function SceneCanvas({ stage, progress }) {
  return <div className="scene-canvas" aria-hidden="true"><Canvas camera={{ position: [0, 0, 5.2], fov: 42 }} dpr={[1, 1.5]} gl={{ alpha: true, antialias: true }}><Scene stage={stage} progress={progress} /></Canvas><div className="scene-vignette" /></div>;
}

function App() {
  const [stage, setStage] = useState(0);
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [sceneProgress, setSceneProgress] = useState(0);
  useEffect(() => {
    const update = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      setScrollProgress(max > 0 ? window.scrollY / max : 0);
      const midpoint = window.innerHeight * .53;
      let active = 0;
      let activeProgress = 0;
      sections.forEach((s, i) => { const el = document.getElementById(s.id); if (el) { const rect = el.getBoundingClientRect(); if (rect.top <= midpoint) { active = i; activeProgress = Math.max(0, Math.min(1, (midpoint - rect.top) / (window.innerHeight * .8))); } } });
      setStage(active);
      setSceneProgress(activeProgress);
    };
    window.addEventListener('scroll', update, { passive: true }); update(); return () => window.removeEventListener('scroll', update);
  }, []);
  return <div className="site-shell">
    <SceneCanvas stage={stage} progress={sceneProgress} />
    <div className="scroll-meter"><span style={{ transform: `scaleX(${scrollProgress})` }} /></div>
    <header className="topbar"><a className="brand" href="#home" aria-label="Atlas Technologies home"><span className="brand-mark"><span /><span /><span /></span><span>ATLAS <i>TECHNOLOGIES</i></span></a><div className="topbar-right"><span className="availability"><b /> INDEPENDENT DIGITAL STUDIO</span><button className="menu-toggle" onClick={() => setMenuOpen(v => !v)} aria-label="Toggle navigation">{menuOpen ? <X /> : <Menu />}</button></div></header>
    <nav className={`side-nav ${menuOpen ? 'is-open' : ''}`} aria-label="Main navigation">{sections.map((s, i) => <a key={s.id} href={`#${s.id}`} className={stage === i ? 'active' : ''} onClick={() => setMenuOpen(false)}><span>{s.num}</span><b>{s.label}</b></a>)}</nav>
    <main>
      <section className="panel hero-panel" id="home"><div className="hero-copy"><p className="eyebrow"><span className="eyebrow-line" /> DIGITAL WORLDS, BUILT WITH INTENT</p><h1>We turn bold<br />ideas into <em>living</em><br />digital worlds.</h1><p className="hero-description">Strategy, design and technology brought together to create experiences people remember.</p><div className="hero-actions"><a className="button button-gold" href="#projects">Explore our work <ArrowUpRight size={17} /></a><a className="text-link" href="#manifesto">Discover Atlas <ArrowDown size={15} /></a></div></div><div className="hero-aside"><span className="orbit-label">FIG. 001 — THE BIGGER PICTURE</span><div className="hero-coordinate">12° 58' N<br />77° 35' E</div><p>Ideas have gravity.<br />We give them form.</p></div><div className="hero-bottom"><span>CREATIVE TECHNOLOGY / 2026</span><span>SCROLL TO EXPLORE <ArrowDown size={13} /></span></div></section>
      <section className="panel manifesto-panel" id="manifesto"><div className="section-index">02 / OUR POINT OF VIEW</div><div className="manifesto-copy"><p className="eyebrow">NOT JUST ANOTHER DIGITAL AGENCY</p><h2>The future isn't<br />a template. It's<br /><em>something you make.</em></h2><p className="body-copy">We build distinct digital experiences at the intersection of imagination and engineering. Every interaction has a reason. Every detail moves the story forward.</p><a className="text-link" href="#services">What we believe <ArrowDown size={15} /></a></div><div className="manifesto-stamp">MADE<br />TO MOVE<br /><span>FORWARD</span></div></section>
      <section className="panel services-panel" id="services"><div className="section-index">03 / CAPABILITIES</div><div className="section-copy"><p className="eyebrow">ONE VISION. MANY DISCIPLINES.</p><h2>Built across<br /><em>boundaries.</em></h2><p className="body-copy">A connected team of thinkers, makers and technologists, shaping the full experience from first spark to final frame.</p></div><div className="service-list"><article><span>01</span><div><h3>Digital experiences</h3><p>Immersive websites, product experiences and interfaces with purpose.</p></div><Globe2 /></article><article><span>02</span><div><h3>Brand & identity</h3><p>Distinctive visual systems that turn a point of view into a presence.</p></div><Layers3 /></article><article><span>03</span><div><h3>Creative engineering</h3><p>Motion, 3D and code working together as one expressive medium.</p></div><Code2 /></article><article><span>04</span><div><h3>Strategy & direction</h3><p>Clear thinking to find the idea worth bringing to life.</p></div><Orbit /></article></div></section>
      <section className="panel projects-panel" id="projects"><div className="section-index">04 / SELECTED WORK</div><div className="projects-copy"><p className="eyebrow">MADE REAL, NOT JUST PRESENTED</p><h2>Ideas you can<br /><em>step inside.</em></h2><p className="body-copy">We treat every project as a world of its own—designed, engineered and brought to life with intent.</p><a className="button button-gold" href="https://framez-website-beta.vercel.app/" target="_blank" rel="noreferrer">Explore FRAMEZ <ArrowUpRight size={17} /></a><span className="project-meta">CASE 001 / FRAMEZ<br />DIGITAL EXPERIENCE · 2026</span></div><div className="monitor-caption"><span>FRAMEZ</span><span>LIVE PROJECT ↗</span></div></section>
      <section className="panel process-panel" id="process"><div className="section-index">05 / THE METHOD</div><div className="section-copy"><p className="eyebrow">THOUGHTFUL BY DESIGN</p><h2>From first spark<br />to <em>real impact.</em></h2><p className="body-copy">A considered process gives ambitious ideas the structure they need to become exceptional outcomes.</p></div><div className="process-steps">{[['01','Discover','Find the real opportunity.'],['02','Define','Shape the idea and direction.'],['03','Design','Build the world before the world.'],['04','Deliver','Launch, learn and evolve.']].map(([n,t,d])=><article key={n}><span>{n}</span><h3>{t}</h3><p>{d}</p></article>)}</div></section>
      <section className="panel about-panel" id="about"><div className="section-index">06 / ABOUT ATLAS</div><div className="about-copy"><p className="eyebrow">A SMALL STUDIO WITH A WIDE HORIZON</p><h2>Curious minds.<br /><em>Uncommon outcomes.</em></h2><p className="body-copy">Atlas Technologies is built on a simple belief: technology should make creativity more powerful, not less human. We bring craft, curiosity and technical precision to every challenge we take on.</p><div className="about-stats"><div><strong>01</strong><span>ONE CONNECTED TEAM</span></div><div><strong>∞</strong><span>ROOM TO EXPLORE</span></div><div><strong>100%</strong><span>INTENTIONAL CRAFT</span></div></div></div></section>
      <section className="panel contact-panel" id="contact"><div className="section-index">07 / NEXT CHAPTER</div><div className="contact-copy"><p className="eyebrow"><span className="eyebrow-line" /> HAVE A GOOD QUESTION?</p><h2>Let's make<br />something <em>matter.</em></h2><p className="body-copy">Have an ambitious idea, a difficult challenge or a world that needs building? We'd like to hear about it.</p><a className="button button-gold" href="mailto:hello@atlastechnologies.in?subject=Let's%20build%20something%20together">Start a conversation <ArrowUpRight size={17} /></a><div className="contact-note"><SparkleIcon size={16} /> GOOD THINGS START WITH A CONVERSATION.</div></div><div className="contact-orbit-label">YOUR NEXT IDEA<br />STARTS HERE</div></section>
    </main>
    <footer className="footer"><a className="brand" href="#home"><span className="brand-mark"><span /><span /><span /></span><span>ATLAS <i>TECHNOLOGIES</i></span></a><span>INDEPENDENT BY NATURE. LIMITLESS BY DESIGN.</span><a href="#home">BACK TO TOP ↑</a><small>© 2026 ATLAS TECHNOLOGIES</small></footer>
  </div>;
}
export default App;

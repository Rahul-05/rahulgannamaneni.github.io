import { useRef, useState, useCallback, useEffect } from 'react';
import gsap from 'gsap';
import { Observer } from 'gsap/Observer';
import { useGSAP } from '@gsap/react';
import Preloader from './components/Preloader.jsx';
import Nav from './components/Nav.jsx';
import ScrollCue from './components/ScrollCue.jsx';
import Hero from './components/sections/Hero.jsx';
import About from './components/sections/About.jsx';
import Lab from './components/sections/Lab.jsx';
import Testimonials from './components/sections/Testimonials.jsx';
import Projects from './components/sections/Projects.jsx';
import Contact from './components/sections/Contact.jsx';
import ProjectPage from './components/ProjectPage.jsx';
import { PROJECTS } from './data.js';
import { onOverlay } from './overlay.js';

gsap.registerPlugin(Observer);

const SECTION_COUNT = 6;
const WHEEL_THRESHOLD = 60; // accumulated delta before a section transition fires
// sections with a light ground, which need dark nav ink over them. Hero and
// Work are both black, so they keep the cream.
const DARK_NAV_SECTIONS = new Set([2, 3, 4, 5]);

// Virtual-scroll engine. The page never scrolls natively, a fixed stage
// holds all sections stacked on top of each other. Wheel/touch input is
// offered to the active section first (ring spin, card reveals); when the
// section is out of internal travel it "passes", and once enough delta
// accumulates the next panel slides in tilted over the current one.
// read once at module scope so the loader can be skipped on a deep link
function projectFromPathOnBoot() {
  const slug = window.location.pathname.replace(/^\/+|\/+$/g, '');
  return PROJECTS.some((p) => p.slug === slug);
}

export default function App() {
  const [loaded, setLoaded] = useState(() => !!projectFromPathOnBoot());
  const [navDark, setNavDark] = useState(false);
  // an overlay (a lab popup) needs ordinary scrolling, so the engine stands down
  const [overlay, setOverlay] = useState(false);
  // Whether the active section has run out of internal travel. Sections that
  // do not pan never report, and absence means "nothing to wait for" -- so
  // the cue shows immediately on those and only at the foot of the others.
  const [atEnd, setAtEnd] = useState(true);
  useEffect(() => onOverlay(setOverlay), []);
  const [navIndex, setNavIndex] = useState(0);
  // Each case study lives at /<slug>. Read it straight from the URL so a
  // deep link or a refresh lands on the right page.
  const projectFromPath = () => {
    const slug = window.location.pathname.replace(/^\/+|\/+$/g, '');
    return PROJECTS.find((p) => p.slug === slug) || null;
  };
  const [project, setProjectState] = useState(projectFromPath);
  const stageRef = useRef(null);
  const handles = useRef([]);
  const engine = useRef({ index: 0, animating: false, accum: 0, decayTimer: null });

  const setHandle = (i) => (h) => {
    handles.current[i] = h;
  };

  const goto = useCallback((next, dir) => {
    const s = engine.current;
    if (s.animating || next < 0 || next >= SECTION_COUNT || next === s.index) return;

    s.animating = true;
    // a fresh section starts at its top unless it has no travel at all
    setAtEnd(!handles.current[next]?.atEnd);
    const incoming = handles.current[next]?.el();
    const outgoing = handles.current[s.index]?.el();
    if (!incoming || !outgoing) {
      s.animating = false;
      return;
    }

    setNavDark(DARK_NAV_SECTIONS.has(next));
    setNavIndex(next);

    const tilt = (next % 2 ? -1 : 1) * 6.5;

    if (dir > 0) {
      // next panel slides up over the current one, tilted, then settles flat
      gsap.set(incoming, { zIndex: 3, visibility: 'visible' });
      gsap.set(outgoing, { zIndex: 1 });
      gsap
        .timeline({
          onComplete: () => {
            gsap.set(outgoing, { visibility: 'hidden' });
            gsap.set(incoming, { zIndex: 2 });
            s.index = next;
            s.animating = false;
          },
        })
        .fromTo(
          incoming,
          { yPercent: 105, rotation: tilt, transformOrigin: 'center 180%' },
          { yPercent: 0, rotation: 0, duration: 0.92, ease: 'power3.inOut' },
        )
        .to(outgoing, { yPercent: -7, duration: 0.92, ease: 'power3.inOut' }, 0)
        .set(outgoing, { yPercent: 0 });
    } else {
      // current panel peels down and away, revealing the previous one beneath
      gsap.set(incoming, { zIndex: 1, visibility: 'visible', yPercent: 0, rotation: 0 });
      gsap.set(outgoing, { zIndex: 3 });
      gsap
        .timeline({
          onComplete: () => {
            gsap.set(outgoing, { visibility: 'hidden', yPercent: 0, rotation: 0 });
            gsap.set(incoming, { zIndex: 2 });
            s.index = next;
            s.animating = false;
          },
        })
        .fromTo(
          incoming,
          { yPercent: -7 },
          { yPercent: 0, duration: 0.92, ease: 'power3.inOut' },
          0,
        )
        .to(
          outgoing,
          {
            yPercent: 105,
            rotation: (s.index % 2 ? -1 : 1) * 6.5,
            transformOrigin: 'center 180%',
            duration: 0.92,
            ease: 'power3.inOut',
          },
          0,
        );
    }

    handles.current[s.index]?.onLeave?.();
    handles.current[next]?.onEnter?.(dir);
  }, []);

  const handleDelta = useCallback(
    (dy) => {
      const s = engine.current;
      if (s.animating) return;

      const h = handles.current[s.index];
      const verdict = h?.onDelta?.(dy) ?? 'pass';
      setAtEnd(h?.atEnd ? h.atEnd() : true);
      if (verdict === 'consumed') {
        s.accum = 0;
        return;
      }

      s.accum += dy;
      clearTimeout(s.decayTimer);
      s.decayTimer = setTimeout(() => {
        s.accum = 0;
      }, 260);

      if (Math.abs(s.accum) > WHEEL_THRESHOLD) {
        const dir = s.accum > 0 ? 1 : -1;
        s.accum = 0;
        goto(s.index + dir, dir);
      }
    },
    [goto],
  );

  if (import.meta.env.DEV) {
    window.__engine = engine.current;
    window.__goto = goto;
    window.__delta = handleDelta;
  }

  // reveal the hero beneath the preloader on mount
  useGSAP(() => {
    const hero = handles.current[0]?.el();
    if (hero) gsap.set(hero, { visibility: 'visible', zIndex: 2 });
  }, []);

  // The wheel/touch observer lives in a plain effect, NOT in useGSAP.
  // useGSAP with a non-empty dependency array takes gsap's deferCleanup
  // path, which stops returning a cleanup once the component has mounted,
  // so the previous Observer was never killed when `project` changed. It
  // kept calling preventDefault on wheel events and the opened case study
  // could not be scrolled (reloading straight onto a case study worked,
  // because no Observer was ever created in that pass).
  useEffect(() => {
    // the project overlay owns the scroll while it is open
    if (!loaded || project || overlay) return undefined;
    const obs = Observer.create({
      target: window,
      type: 'wheel,touch',
      preventDefault: true,
      // anything marked as a native input keeps its own gestures: the lab
      // pieces need touch drags, and the lab popup scrolls natively.
      ignore: '[data-native-input]',
      tolerance: 4,
      onChangeY(self) {
        const isTouch =
          self.event.type.startsWith('touch') || self.event.type.startsWith('pointer');
        handleDelta(isTouch ? -self.deltaY : self.deltaY);
      },
    });
    return () => obs.kill();
  }, [loaded, project, overlay, handleDelta]);

  const navigate = useCallback(
    (target) => {
      const s = engine.current;
      if (s.animating || target === s.index) return;
      goto(target, target > s.index ? 1 : -1);
    },
    [goto],
  );

  const setProject = useCallback((p) => {
    setProjectState(p);
    const path = p ? `/${p.slug}` : '/';
    if (window.location.pathname !== path) window.history.pushState({}, '', path);
  }, []);

  // back/forward between case studies and the main page
  useEffect(() => {
    const onPop = () => setProjectState(projectFromPath());
    window.addEventListener('popstate', onPop);
    return () => window.removeEventListener('popstate', onPop);
  }, []);

  // keep the tab title in step with what is on screen
  useEffect(() => {
    document.title = project ? `${project.title} — Rahul Rao` : 'RAHUL RAO — Portfolio';
  }, [project]);

  const onPreloaderDone = useCallback(() => {
    setLoaded(true);
    handles.current[0]?.playIntro?.();
  }, []);

  return (
    <>
      <div className="stage" ref={stageRef}>
        <Hero ref={setHandle(0)} />
        <Projects ref={setHandle(1)} onOpen={setProject} />
        <Lab ref={setHandle(2)} />
        <About ref={setHandle(3)} />
        <Testimonials ref={setHandle(4)} />
        <Contact ref={setHandle(5)} />
      </div>

      <Nav onNavigate={navigate} dark={navDark} index={navIndex} total={SECTION_COUNT} />
      {navIndex !== 5 && !project && (
        <button className="cta-join" onClick={() => navigate(5)}>
          Contact
          <span className="cta-arrow">→</span>
        </button>
      )}

      {/* Lives here rather than inside each section: the page has no
          scrollbar, so something has to say the page continues, and the
          answer should be identical everywhere. Keyed on the index so it
          re-enters when the section changes. */}
      {!project && !overlay && atEnd && (
        <ScrollCue
          key={navIndex}
          index={navIndex}
          total={SECTION_COUNT}
          dark={navDark}
          onGo={() => navigate(navIndex + 1)}
        />
      )}

      {project && (
        <ProjectPage
          key={project.n}
          project={project}
          onOpen={setProject}
          onClose={() => setProject(null)}
        />
      )}

      {!loaded && <Preloader onDone={onPreloaderDone} />}
    </>
  );
}

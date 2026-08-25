import { forwardRef, useImperativeHandle, useRef } from 'react';
import gsap from 'gsap';
import { ABOUT, RESUME_URL } from '../../data.js';
import Wordmark from '../Wordmark.jsx';
import TechIcon from '../TechIcon.jsx';
import { Sparkle } from '../Scribbles.jsx';
import './about.css';

// About, the headline runs full width in two justified lines, with the
// written intro and the capability list sharing the space beneath it.
const About = forwardRef(function About(_, ref) {
  const rootRef = useRef(null);

  useImperativeHandle(ref, () => ({
    el: () => rootRef.current,
    onDelta: () => 'pass',
    onEnter() {
      const q = gsap.utils.selector(rootRef);
      gsap.fromTo(
        q('.about-word'),
        { y: 70, autoAlpha: 0 },
        { y: 0, autoAlpha: 1, duration: 0.95, stagger: 0.1, ease: 'power4.out', delay: 0.3 },
      );
      gsap.fromTo(
        q('.about-sparkle'),
        { scale: 0, rotation: -90 },
        { scale: 1, rotation: 0, duration: 0.7, ease: 'back.out(1.7)', delay: 0.85 },
      );
      gsap.fromTo(
        q('.about-lead, .about-body, .about-resume, .about-stat'),
        { y: 34, autoAlpha: 0 },
        { y: 0, autoAlpha: 1, duration: 0.7, stagger: 0.08, ease: 'power3.out', delay: 0.6 },
      );
      gsap.fromTo(
        q('.about-cap'),
        { y: 30, autoAlpha: 0 },
        { y: 0, autoAlpha: 1, duration: 0.6, stagger: 0.06, ease: 'power3.out', delay: 0.75 },
      );
    },
  }));

  return (
    <section className="section about" ref={rootRef}>
      <div className="about-headline">
        <Wordmark text="DESIGN, BUILD" className="about-word" vary={false} />
        <Wordmark text="AND SHIP" className="about-word" vary={false} />
        <Sparkle className="about-sparkle" color="#0ae448" />
      </div>

      <div className="about-grid">
        <div className="about-intro">
          <p className="about-lead">{ABOUT.lead}</p>
          <p className="about-body">{ABOUT.body}</p>

          <a className="about-resume" href={RESUME_URL} target="_blank" rel="noreferrer">
            <TechIcon name="resume" />
            Open my resume
            <span className="about-resume-arrow">↗</span>
          </a>

          <dl className="about-stats">
            {ABOUT.stats.map((s) => (
              <div className="about-stat" key={s.k}>
                <dt>{s.k}</dt>
                <dd>{s.v}</dd>
              </div>
            ))}
          </dl>
        </div>

        <ul className="about-caps">
          {ABOUT.capabilities.map((c) => (
            <li className="about-cap" key={c.n}>
              <span className="about-cap-n">{c.n}</span>
              <span className="about-cap-title">{c.title}</span>
              <span className="about-cap-note">{c.note}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
});

export default About;

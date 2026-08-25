import { forwardRef, useImperativeHandle, useRef } from 'react';
import gsap from 'gsap';
import { EMAIL, LINKEDIN, RESUME_URL } from '../../data.js';
import Wordmark from '../Wordmark.jsx';
import TechIcon from '../TechIcon.jsx';
import { ArrowCurl } from '../Scribbles.jsx';
import './contact.css';

// Contact, the closer. "HIRE" gets the same variable-height wordmark as
// the rest of the site, and the pitch, email and LinkedIn all sit in the
// same black as the headline.
const Contact = forwardRef(function Contact(_, ref) {
  const rootRef = useRef(null);

  useImperativeHandle(ref, () => ({
    el: () => rootRef.current,
    onDelta: () => 'pass',
    onEnter() {
      const q = gsap.utils.selector(rootRef);
      gsap.fromTo(
        q('.contact-word'),
        { y: 80, autoAlpha: 0 },
        { y: 0, autoAlpha: 1, duration: 1, ease: 'power4.out', delay: 0.3 },
      );
      gsap.fromTo(
        q('.contact-me'),
        { scale: 0, rotation: -30 },
        { scale: 1, rotation: -8, duration: 0.7, ease: 'back.out(1.8)', delay: 0.8 },
      );
      gsap.fromTo(
        q('.contact-lede, .contact-email, .contact-links, .contact-arrow'),
        { y: 36, autoAlpha: 0 },
        { y: 0, autoAlpha: 1, duration: 0.7, stagger: 0.1, ease: 'power3.out', delay: 0.55 },
      );
    },
  }));

  return (
    <section className="section contact" ref={rootRef}>
      <div className="contact-main">
        <div className="contact-headline">
          <Wordmark text="HIRE" className="contact-word" cursor />
          <span className="contact-me">me!</span>
        </div>

        <div className="contact-details">
          <p className="contact-lede">
            Let&rsquo;s build your next product wherever it needs to ship.
          </p>

          <a className="contact-email" href={`mailto:${EMAIL}`}>
            {EMAIL}
          </a>

          <div className="contact-links">
            <a className="contact-btn" href={LINKEDIN} target="_blank" rel="noreferrer">
              <svg viewBox="0 0 24 24" aria-hidden="true" fill="currentColor">
                <path d="M4.98 3.5A2.5 2.5 0 1 1 0 3.5a2.5 2.5 0 0 1 4.98 0ZM.24 8.02h4.5V24H.24V8.02Zm7.87 0h4.31v2.18h.06c.6-1.14 2.07-2.34 4.26-2.34 4.56 0 5.4 3 5.4 6.9V24h-4.5v-7.32c0-1.75-.03-4-2.44-4-2.44 0-2.81 1.9-2.81 3.87V24h-4.5V8.02Z" />
              </svg>
              LinkedIn
            </a>
            <a
              className="contact-btn contact-btn--ghost"
              href={RESUME_URL}
              target="_blank"
              rel="noreferrer"
            >
              <TechIcon name="resume" />
              Resume
            </a>
          </div>

          <ArrowCurl className="contact-arrow" />
        </div>
      </div>

      <footer className="footer">
        <div className="footer-col">
          <span>2026 © RAHUL RAO</span>
          <a href={`mailto:${EMAIL}`}>{EMAIL}</a>
        </div>
        <div className="footer-col footer-links">
          <a href={RESUME_URL} target="_blank" rel="noreferrer">
            Resume
          </a>
          <a href={LINKEDIN} target="_blank" rel="noreferrer">
            LinkedIn
          </a>
        </div>
        <div className="footer-col footer-credit">
          <span>Designed &amp; built by Rahul Rao</span>
        </div>
      </footer>
    </section>
  );
});

export default Contact;

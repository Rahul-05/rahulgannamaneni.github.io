import React from 'react';
import ReactDOM from 'react-dom/client';
import gsap from 'gsap';
import '@fontsource-variable/anybody/wdth.css';
import '@fontsource-variable/archivo/wdth.css';
import '@fontsource/permanent-marker';
import './styles/global.css';
import App from './App.jsx';

// Dev helper: lets tooling advance GSAP's clock manually when the tab is
// backgrounded (rAF paused). Harmless in production.
if (import.meta.env.DEV) {
  window.gsap = gsap;
  // monotonic manual clock, never rewinds the root timeline, so it stays
  // consistent across multiple calls even though gsap.ticker.time is frozen
  // while the tab is backgrounded
  window.__now = null;
  window.__tick = (seconds = 1, fps = 60) => {
    gsap.ticker.sleep(); // real rAF ticks would rewind the manual clock
    // Creating a tween wakes the ticker, and a wake resets the root clock --
    // so resync every call rather than trusting the accumulated value, or
    // the manual clock drifts past the root and nothing advances again.
    window.__now = gsap.globalTimeline.time();
    const frames = Math.round(seconds * fps);
    for (let i = 1; i <= frames; i++) {
      window.__now += seconds / frames;
      gsap.updateRoot(window.__now);
    }
  };
  window.__wake = () => gsap.ticker.wake(); // hand the clock back to rAF
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);

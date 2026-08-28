import { forwardRef, useImperativeHandle, useMemo, useRef, useState } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { LAB_FILTERS, LAB_ITEMS } from '../../data.js';
import Wordmark from '../Wordmark.jsx';
import { DEMOS } from '../lab/index.js';
import LabModal from '../lab/LabModal.jsx';
import './lab.css';

const DWELL_MS = 700;

// Interaction & Animation: a filterable grid of live pieces. Each card runs
// the real component as its hero, so the grid is the thing itself rather than
// a picture of it; View opens the same piece at full size with the writing.
// Every piece lives in its own file under components/lab/.
const Lab = forwardRef(function Lab(_, ref) {
  const rootRef = useRef(null);
  const trackRef = useRef(null);
  const pos = useRef({ y: 0, max: 0, hitAt: 0 });
  const slideTo = useRef(null);
  const [filter, setFilter] = useState('all');
  const [open, setOpen] = useState(null); // item shown in the popup

  const shown = useMemo(
    () => (filter === 'all' ? LAB_ITEMS : LAB_ITEMS.filter((i) => i.kinds.includes(filter))),
    [filter],
  );

  const measure = () => {
    const track = trackRef.current;
    const view = track?.parentElement;
    if (!track || !view) return;
    pos.current.max = Math.max(0, track.scrollHeight - view.clientHeight);
    pos.current.y = gsap.utils.clamp(-pos.current.max, 0, pos.current.y);
    slideTo.current?.(pos.current.y);
  };

  useGSAP(
    () => {
      slideTo.current = gsap.quickTo(trackRef.current, 'y', {
        duration: 0.5,
        ease: 'power3',
      });
      measure();
      window.addEventListener('resize', measure);
      return () => window.removeEventListener('resize', measure);
    },
    { scope: rootRef },
  );

  // re-measure and animate in whenever the filter changes the grid
  const applyFilter = (id) => {
    setFilter(id);
    pos.current.y = 0;
    pos.current.hitAt = 0;
    requestAnimationFrame(() => {
      measure();
      gsap.set(trackRef.current, { y: 0 });
      gsap.fromTo(
        rootRef.current.querySelectorAll('.lab-card'),
        { y: 26, autoAlpha: 0 },
        {
          y: 0,
          autoAlpha: 1,
          duration: 0.5,
          stagger: 0.04,
          ease: 'power3.out',
        },
      );
    });
  };

  useImperativeHandle(ref, () => ({
    el: () => rootRef.current,

    // the scroll cue only appears once there is nothing left to pan
    atEnd: () => pos.current.y <= -pos.current.max + 1,

    onDelta(dy) {
      // the popup scrolls itself, so the section stops taking input
      if (open) return 'consumed';
      const s = pos.current;
      const atEnd = (dy > 0 && s.y <= -s.max + 1) || (dy < 0 && s.y >= -1);
      if (atEnd) {
        if (!s.hitAt) {
          s.hitAt = performance.now();
          return 'consumed';
        }
        if (performance.now() - s.hitAt < DWELL_MS) return 'consumed';
        return 'pass';
      }
      s.hitAt = 0;
      s.y = gsap.utils.clamp(-s.max, 0, s.y - dy * 1.15);
      slideTo.current?.(s.y);
      return 'consumed';
    },

    onEnter(dir) {
      measure();
      pos.current.hitAt = 0;
      pos.current.y = dir < 0 ? -pos.current.max : 0;
      gsap.set(trackRef.current, { y: pos.current.y });

      const q = gsap.utils.selector(rootRef);
      gsap.fromTo(
        q('.lab-word'),
        { y: 56, autoAlpha: 0 },
        { y: 0, autoAlpha: 1, duration: 0.9, ease: 'power4.out', delay: 0.35 },
      );
      gsap.fromTo(
        q('.lab-filter'),
        { y: 18, autoAlpha: 0 },
        {
          y: 0,
          autoAlpha: 1,
          duration: 0.5,
          stagger: 0.04,
          ease: 'power3.out',
          delay: 0.5,
        },
      );
      gsap.fromTo(
        q('.lab-card'),
        { y: 34, autoAlpha: 0 },
        {
          y: 0,
          autoAlpha: 1,
          duration: 0.6,
          stagger: 0.05,
          ease: 'power3.out',
          delay: 0.55,
        },
      );
    },
  }));

  return (
    <section className="section lab" ref={rootRef}>
      <div className="lab-headline">
        <Wordmark text="INTERACTION" className="lab-word" vary={false} />
        <span className="lab-script">&amp; animation</span>
      </div>

      <div className="lab-filters" role="tablist" aria-label="Filter experiments">
        {LAB_FILTERS.map((f) => {
          const count =
            f.id === 'all'
              ? LAB_ITEMS.length
              : LAB_ITEMS.filter((i) => i.kinds.includes(f.id)).length;
          return (
            <button
              key={f.id}
              role="tab"
              aria-selected={filter === f.id}
              className={`lab-filter ${filter === f.id ? 'is-on' : ''}`}
              onClick={() => applyFilter(f.id)}
            >
              {f.label}
              <span className="lab-filter-n">{count}</span>
            </button>
          );
        })}
      </div>

      <div className="lab-viewport">
        <div className="lab-track" ref={trackRef}>
          <div className="lab-grid">
            {shown.map((item) => {
              const Demo = DEMOS[item.id];
              return (
                <article className="lab-card" key={item.id}>
                  {/* Every card is the same size now, so the piece is a preview
                    of itself and the popup is where you use one. The stage
                    is deliberately NOT data-native-input: on a phone a touch
                    here has to scroll the grid. Drag-driven pieces get their
                    gestures in the popup, which does carry the flag. */}
                  <div className="lab-stage">
                    {Demo ? <Demo /> : null}

                    {/* On a phone the mock fills the card, so there is
                        nowhere left to start a scroll from. Rather than fight
                        the page for the gesture, a touch anywhere on the
                        stage opens the popup -- which is where the piece is
                        properly operable at that width anyway. Display:none
                        on pointer devices, so it costs the desktop nothing. */}
                    <button
                      className="lab-stage-tap"
                      onClick={() => setOpen(item)}
                      tabIndex={-1}
                      aria-hidden="true"
                    />
                  </div>

                  <div className="lab-card-body">
                    <h3 className="lab-card-title">{item.title}</h3>
                    <p className="lab-card-note">{item.note}</p>
                    {/* Capped at two rows' worth. The card is an index entry
                        and every card has to be the same height; the full set
                        is in the popup. Kinds lead so the filter a visitor
                        just clicked is always the chip they can see. */}
                    <div className="lab-chips">
                      <div className="lab-chip-set">
                        {item.kinds.slice(0, 2).map((k) => (
                          <span className="lab-chip" key={k}>
                            {LAB_FILTERS.find((f) => f.id === k)?.label || k}
                          </span>
                        ))}
                        {item.tools.slice(0, 1).map((t) => (
                          <span className="lab-chip lab-chip--tool" key={t}>
                            {t}
                          </span>
                        ))}
                        {/* three chips and an overflow count: enough to fit on
                            one line beside the action at every card width, so
                            the button never drops to a second row */}
                        {item.kinds.length + item.tools.length > 3 && (
                          <span className="lab-chip lab-chip--more">
                            +{item.kinds.length + item.tools.length - 3}
                          </span>
                        )}
                      </div>

                      {/* on the chip row, not over the piece -- the stage is
                          running a live interface and a button parked in its
                          corner was covering part of it */}
                      <button
                        className="lab-view"
                        onClick={() => setOpen(item)}
                        aria-label={`Open ${item.title}`}
                      >
                        View
                        <svg viewBox="0 0 14 14" aria-hidden="true">
                          <path d="M4 10 10 4M4.6 4H10v5.4" />
                        </svg>
                      </button>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
          <div className="lab-tail" aria-hidden="true" />
        </div>
      </div>

      <LabModal item={open} onClose={() => setOpen(null)} />
    </section>
  );
});

export default Lab;

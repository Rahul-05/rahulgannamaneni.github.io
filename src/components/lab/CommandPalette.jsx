import { useEffect, useMemo, useRef, useState } from 'react';
import BrowserFrame from './frames/BrowserFrame.jsx';
import './CommandPalette.css';

// A command palette that is actually a search engine with a UI on top. The
// interesting problems are not the overlay -- they are ranking, mode, and
// what the keyboard is allowed to do.
//
//  · subsequence matching, not substring: "chpg" finds "Changelog page"
//  · the score prefers matches at word boundaries and penalises gaps, so the
//    thing you meant is first rather than the shortest thing that contains
//    the letters
//  · typing ">" switches the whole palette into command mode mid-keystroke
//  · arrow keys move a selection that survives the list re-ranking under it

const ITEMS = [
  { id: 1, group: 'Pages', icon: '◫', name: 'Product roadmap', hint: 'Workspace' },
  { id: 2, group: 'Pages', icon: '◫', name: 'Changelog page', hint: 'Public' },
  { id: 3, group: 'Pages', icon: '◫', name: 'Design system principles', hint: 'Workspace' },
  { id: 4, group: 'Pages', icon: '◫', name: 'Onboarding rewrite', hint: 'Draft' },
  { id: 5, group: 'People', icon: '◍', name: 'Amanda Le', hint: 'Design' },
  { id: 6, group: 'People', icon: '◍', name: 'Tony Muller', hint: 'Engineering' },
  { id: 7, group: 'People', icon: '◍', name: 'Jane Doe', hint: 'Research' },
  { id: 8, group: 'Recent', icon: '↩', name: 'North star deck', hint: '12m ago' },
  { id: 9, group: 'Recent', icon: '↩', name: 'Q2 retrospective', hint: 'Yesterday' },
];

const COMMANDS = [
  { id: 101, group: 'Commands', icon: '⌘', name: 'Create new page', hint: '⌘N' },
  { id: 102, group: 'Commands', icon: '⌘', name: 'Invite teammate', hint: '⌘I' },
  { id: 103, group: 'Commands', icon: '⌘', name: 'Toggle dark appearance', hint: '⌘D' },
  { id: 104, group: 'Commands', icon: '⌘', name: 'Export as PDF', hint: '⌘E' },
  { id: 105, group: 'Commands', icon: '⌘', name: 'Move to trash', hint: '⌫', danger: true },
];

// Returns null when the query is not a subsequence, otherwise { score, hits }.
// Lower score wins.
function match(query, text) {
  if (!query) return { score: 0, hits: [] };
  const q = query.toLowerCase();
  const t = text.toLowerCase();
  const hits = [];
  let score = 0;
  let ti = 0;
  let lastHit = -1;

  for (let qi = 0; qi < q.length; qi += 1) {
    const found = t.indexOf(q[qi], ti);
    if (found === -1) return null;
    // a gap costs, and a letter starting a word is close to free
    const startsWord = found === 0 || /[\s\-/]/.test(t[found - 1]);
    score += (found - lastHit - 1) * (startsWord ? 0.15 : 1);
    if (!startsWord && found !== lastHit + 1) score += 2;
    hits.push(found);
    lastHit = found;
    ti = found + 1;
  }
  return { score: score + text.length * 0.01, hits };
}

function Highlight({ text, hits }) {
  if (!hits.length) return text;
  const set = new Set(hits);
  return [...text].map((c, i) =>
    set.has(i) ? <mark key={i}>{c}</mark> : <span key={i}>{c}</span>,
  );
}

export default function CommandPalette() {
  const [open, setOpen] = useState(true);
  const [q, setQ] = useState('');
  const [cursor, setCursor] = useState(0);
  const [ran, setRan] = useState(null);
  const inputRef = useRef(null);
  const listRef = useRef(null);

  const commandMode = q.startsWith('>');
  const needle = commandMode ? q.slice(1).trim() : q.trim();

  const results = useMemo(() => {
    const pool = commandMode ? COMMANDS : ITEMS;
    return pool
      .map((it) => {
        const m = match(needle, it.name);
        return m && { ...it, ...m };
      })
      .filter(Boolean)
      .sort((a, b) => a.score - b.score)
      .slice(0, 7);
  }, [needle, commandMode]);

  // the selection is kept in range as the list re-ranks under it
  useEffect(() => {
    setCursor((c) => Math.min(c, Math.max(0, results.length - 1)));
  }, [results.length]);

  useEffect(() => {
    if (open) inputRef.current?.focus();
  }, [open]);

  const commit = (it) => {
    if (!it) return;
    setRan(it.name);
    setOpen(false);
    setQ('');
    setCursor(0);
  };

  const onKey = (e) => {
    if (e.key === 'ArrowDown' || (e.key === 'n' && e.ctrlKey)) {
      e.preventDefault();
      setCursor((c) => (c + 1) % Math.max(1, results.length));
    } else if (e.key === 'ArrowUp' || (e.key === 'p' && e.ctrlKey)) {
      e.preventDefault();
      setCursor((c) => (c - 1 + results.length) % Math.max(1, results.length));
    } else if (e.key === 'Enter') {
      e.preventDefault();
      commit(results[cursor]);
    } else if (e.key === 'Escape') {
      e.preventDefault();
      setOpen(false);
    }
  };

  // group headers are emitted inline so the list stays one flat keyboard target
  let lastGroup = null;

  return (
    <BrowserFrame url="workspace.app/roadmap" tab="Product roadmap">
      <div className="cmd">
        <div className="cmd-page" aria-hidden="true">
          <div className="cmd-side">
            {['Roadmap', 'Changelog', 'Principles', 'Onboarding', 'Archive'].map((s, i) => (
              <span key={s} className={i === 0 ? 'is-on' : ''}>
                {s}
              </span>
            ))}
          </div>
          <div className="cmd-doc">
            <h4>Product roadmap</h4>
            <p className="cmd-doc-meta">Updated 12 minutes ago · 4 collaborators</p>
            {[92, 78, 86, 61, 88, 70, 40].map((w, i) => (
              <span key={i} className="cmd-line" style={{ width: `${w}%` }} />
            ))}
          </div>
        </div>

        <button className="cmd-trigger" onClick={() => setOpen(true)}>
          Search <kbd>⌘</kbd>
          <kbd>K</kbd>
        </button>

        {ran && !open && <p className="cmd-toast">Ran “{ran}”</p>}

        {open && (
          <>
            <button className="cmd-scrim" onClick={() => setOpen(false)} aria-label="Close" />
            <div className="cmd-panel" role="dialog" aria-label="Command palette">
              <div className="cmd-field">
                <span className={`cmd-mode ${commandMode ? 'is-cmd' : ''}`}>
                  {commandMode ? 'Run' : 'Search'}
                </span>
                <input
                  ref={inputRef}
                  value={q}
                  placeholder="Type to search, or > to run a command"
                  onChange={(e) => {
                    setQ(e.target.value);
                    setCursor(0);
                  }}
                  onKeyDown={onKey}
                />
                <kbd className="cmd-esc">esc</kbd>
              </div>

              <div className="cmd-list" ref={listRef}>
                {results.length === 0 && <p className="cmd-empty">Nothing matches “{needle}”</p>}

                {results.map((it, i) => {
                  const header = it.group !== lastGroup ? it.group : null;
                  lastGroup = it.group;
                  return (
                    <div key={it.id}>
                      {header && <p className="cmd-group">{header}</p>}
                      <button
                        className={`cmd-row ${i === cursor ? 'is-on' : ''} ${it.danger ? 'is-danger' : ''}`}
                        onMouseEnter={() => setCursor(i)}
                        onClick={() => commit(it)}
                      >
                        <span className="cmd-ico">{it.icon}</span>
                        <span className="cmd-name">
                          <Highlight text={it.name} hits={it.hits} />
                        </span>
                        <span className="cmd-hint">{it.hint}</span>
                      </button>
                    </div>
                  );
                })}
              </div>

              <footer className="cmd-foot">
                <span>
                  <kbd>↑</kbd>
                  <kbd>↓</kbd> navigate
                </span>
                <span>
                  <kbd>↵</kbd> open
                </span>
                <span>
                  <kbd>&gt;</kbd> commands
                </span>
              </footer>
            </div>
          </>
        )}
      </div>
    </BrowserFrame>
  );
}

import { useCallback, useEffect, useRef, useState } from 'react';
import PhoneFrame from './frames/PhoneFrame.jsx';
import capture from './capture.js';
import { scaleOf } from './frames/scale.js';
import './SendMoney.css';

// Sending money, which is the clearest case there is for making an action
// harder rather than easier.
//
// Three decisions, all of them arguable and all of them deliberate:
//
//  · Hold, not tap. A tap can be a mis-tap; 900ms of continuous contact
//    cannot. The ring is the receipt for that time, so letting go early is
//    visibly a cancel rather than a failure.
//  · An undo window instead of a confirm dialog. "Are you sure?" is answered
//    reflexively and protects nobody. Ten seconds of a running countdown with
//    a real Undo protects the one case that matters -- realising immediately.
//  · The money is animated to the recipient. The transfer is the thing being
//    confirmed, so the transfer is what moves.

const HOLD_MS = 900;
const UNDO_S = 10;

export default function SendMoney() {
  const [amount, setAmount] = useState('48');
  const [stage, setStage] = useState('entry'); // entry | sending | sent | undone
  const [held, setHeld] = useState(0);
  const [left, setLeft] = useState(UNDO_S);
  const holdFrom = useRef(null);
  const raf = useRef(null);

  const tap = (k) => {
    if (stage !== 'entry') return;
    if (k === '<') setAmount((a) => a.slice(0, -1) || '0');
    else if (k === '.') setAmount((a) => (a.includes('.') ? a : `${a}.`));
    else setAmount((a) => (a === '0' ? k : a.length < 6 ? a + k : a));
  };

  const stopHold = useCallback(() => {
    cancelAnimationFrame(raf.current);
    holdFrom.current = null;
    setHeld(0);
  }, []);

  const startHold = (e) => {
    if (stage !== 'entry' || amount === '0' || amount === '') return;
    capture(e);
    holdFrom.current = performance.now();
    const step = () => {
      if (holdFrom.current === null) return;
      const p = Math.min(1, (performance.now() - holdFrom.current) / HOLD_MS);
      setHeld(p);
      if (p >= 1) {
        stopHold();
        setStage('sending');
        setTimeout(() => {
          setStage('sent');
          setLeft(UNDO_S);
        }, 780);
      } else raf.current = requestAnimationFrame(step);
    };
    step();
  };

  // the countdown is the whole safety net, so it is shown running
  useEffect(() => {
    if (stage !== 'sent') return undefined;
    const id = setInterval(() => setLeft((s) => Math.max(0, s - 1)), 1000);
    return () => clearInterval(id);
  }, [stage]);

  useEffect(() => () => cancelAnimationFrame(raf.current), []);

  const reset = () => {
    setStage('entry');
    setAmount('48');
    setLeft(UNDO_S);
  };

  return (
    <PhoneFrame screenTint="#0e100f">
      <div className={`pay pay--${stage}`}>
        <header className="pay-to">
          <span className="pay-avatar">AL</span>
          <div>
            <strong>Amanda Le</strong>
            <em>· 4471</em>
          </div>
        </header>

        {/* the amount is also the thing that flies to the recipient */}
        <div className="pay-amount">
          <span className="pay-cur">$</span>
          {amount}
        </div>

        <p className="pay-memo">{stage === 'undone' ? 'Cancelled' : 'Dinner, and the taxi'}</p>

        {stage === 'entry' && (
          <>
            <div className="pay-pad">
              {['1', '2', '3', '4', '5', '6', '7', '8', '9', '.', '0', '<'].map((k) => (
                <button key={k} onClick={() => tap(k)}>
                  {k === '<' ? '⌫' : k}
                </button>
              ))}
            </div>

            <button
              className="pay-hold"
              onPointerDown={startHold}
              onPointerUp={stopHold}
              onPointerLeave={stopHold}
              onPointerCancel={stopHold}
            >
              <span className="pay-hold-fill" style={{ transform: `scaleX(${held})` }} />
              <span className="pay-hold-label">
                {held > 0.04 ? 'Keep holding' : 'Hold to send'}
              </span>
            </button>
          </>
        )}

        {stage === 'sending' && <p className="pay-status">Sending…</p>}

        {stage === 'sent' && (
          <div className="pay-done">
            <span className="pay-check">
              <svg viewBox="0 0 40 40" aria-hidden="true">
                <path d="M11 21l6.4 6.4L29.6 14" />
              </svg>
            </span>
            <p>Sent to Amanda</p>

            {left > 0 ? (
              <button className="pay-undo" onClick={reset}>
                Undo
                <span className="pay-ring" style={{ '--p': left / UNDO_S }} />
                <em>{left}s</em>
              </button>
            ) : (
              <button className="pay-again" onClick={reset}>
                Send another
              </button>
            )}
          </div>
        )}

        {stage === 'undone' && (
          <button className="pay-again" onClick={reset}>
            Start again
          </button>
        )}
      </div>
    </PhoneFrame>
  );
}

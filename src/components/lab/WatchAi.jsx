import { useEffect, useRef, useState } from 'react';
import WatchFrame from './frames/WatchFrame.jsx';
import './WatchAi.css';

// An assistant on a 198pt screen, where the whole design problem is
// subtraction.
//
// On a phone a hedged four-paragraph answer is merely annoying. On a wrist
// held up mid-stride it is useless, because the arm drops after about two
// seconds. So this answers in one line, sets the single number that was
// actually asked for at display size, and makes the follow-ups actions
// rather than more reading -- on a watch the next thing you want is to do
// something, not to know more.
//
// The motion is watchOS motion, which is a specific thing: nothing fades in.
// Elements arrive on a spring with real overshoot and land, one after the
// other, because on a small screen a fade reads as a rendering delay while a
// spring reads as a response. The number in particular overshoots and settles
// -- it is the answer, so it gets the most physical arrival on the screen.

const WORDS = ['How', 'long', 'to', 'the', 'gate', 'if', 'I', 'leave', 'now?'];
const BARS = 15;

export default function WatchAi() {
  const [stage, setStage] = useState('idle'); // idle | listening | thinking | answer
  const [tick, setTick] = useState(0);
  const [heard, setHeard] = useState(0);
  const timers = useRef([]);

  const clear = () => {
    timers.current.forEach(clearTimeout);
    timers.current = [];
  };

  const run = () => {
    clear();
    setStage('listening');
    setHeard(0);
    WORDS.forEach((_, i) => timers.current.push(setTimeout(() => setHeard(i + 1), 170 + i * 155)));
    timers.current.push(setTimeout(() => setStage('thinking'), 170 + WORDS.length * 155 + 220));
    timers.current.push(setTimeout(() => setStage('answer'), 170 + WORDS.length * 155 + 1150));
  };

  useEffect(() => () => clear(), []);

  // the waveform only moves while it is actually listening -- an idle
  // animation that looks live teaches people to ignore it
  useEffect(() => {
    if (stage !== 'listening') return undefined;
    const id = setInterval(() => setTick((t) => t + 1), 80);
    return () => clearInterval(id);
  }, [stage]);

  return (
    <WatchFrame>
      <div className={`wai wai--${stage}`}>
        <span className="wai-field" aria-hidden="true" />

        {stage === 'idle' && (
          <button className="wai-raise" onClick={run}>
            <span className="wai-orb">
              <i />
              <i />
              <i />
            </span>
            <em>Tap to ask</em>
          </button>
        )}

        {stage !== 'idle' && (
          <>
            <div className="wai-wave" aria-hidden="true">
              {Array.from({ length: BARS }, (_, i) => (
                <i
                  key={i}
                  style={{
                    height:
                      stage === 'listening'
                        ? `${14 + 72 * Math.abs(Math.sin(tick * 0.55 + i * 0.72))}%`
                        : '14%',
                  }}
                />
              ))}
            </div>

            <p className="wai-heard">
              {WORDS.slice(0, heard).join(' ')}
              {stage === 'listening' && heard < WORDS.length && <span className="wai-dot" />}
            </p>
          </>
        )}

        {stage === 'thinking' && (
          <p className="wai-think">
            <span className="wai-tri" />
            Traffic and your gate
          </p>
        )}

        {stage === 'answer' && (
          <div className="wai-answer">
            {/* the answer, so it gets the most physical arrival on screen */}
            <strong>
              34<em>min</em>
            </strong>
            <p>Leave by 6:05 · Gate B14</p>

            <div className="wai-acts">
              <button onClick={run}>Directions</button>
              <button onClick={() => setStage('idle')}>Remind</button>
            </div>
          </div>
        )}
      </div>
    </WatchFrame>
  );
}

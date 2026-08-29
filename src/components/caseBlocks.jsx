import { IMAGE_SIZES } from '../imageSizes.js';
import TempImg from './TempImg.jsx';
import CaseIcon from './CaseIcon.jsx';

// A media slot. Real image when the block supplies one, otherwise the
// labelled placeholder.
//
// No forced aspect ratio: these assets range from tall phone screens to very
// wide flow boards, and boxing them to a fixed ratio letterboxed most of them
// into bands of dead space. The figure hugs the image instead, so the layout
// follows the artwork rather than the other way round.
export function Media({ src, label, ratio = '4 / 3', tone = '#1c1c1c', onOpen, chrome, url }) {
  if (!src) return <TempImg label={label} ratio={ratio} tone={tone} />;
  const [w, h] = IMAGE_SIZES[src] || [];
  return (
    <figure className={`cs-media ${chrome ? 'is-chrome' : ''}`}>
      {/* A window bar over screenshots of an actual interface. Without it a
          screen sitting flush in a dark page reads as a picture of a layout;
          with it, it reads as software that was running. Off by default, so
          photographs and diagrams are never framed as browser windows. */}
      {chrome && (
        <span className="cs-chrome" aria-hidden="true">
          <i />
          <i />
          <i />
          <em>{url || 'dataportal'}</em>
        </span>
      )}
      <img src={src} alt={label} loading="lazy" width={w} height={h} />
      <button className="cs-expand" onClick={() => onOpen({ src, label })}>
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          aria-hidden="true"
        >
          <path
            d="M9 3H3v6M15 21h6v-6M21 9V3h-6M3 15v6h6"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
        Expand
      </button>
      <figcaption className="cs-caption">{label}</figcaption>
    </figure>
  );
}

// Loose geometric marks for the highlight panels. Purely decorative, drawn
// in the page accent so each case study's asides feel like its own.
function Figure({ name = 'blob' }) {
  const shapes = {
    blob: <path d="M18 44c-8-14 2-32 18-34 14-2 26 8 28 22 2 16-10 28-24 28C28 60 22 54 18 44Z" />,
    arc: <path d="M8 60a36 36 0 0 1 72 0" />,
    steps: <path d="M8 62h20V42h20V22h20" />,
    orbit: (
      <>
        <circle cx="44" cy="40" r="24" />
        <circle cx="44" cy="40" r="9" />
      </>
    ),
    spark: <path d="M44 8l7 24 24 7-24 7-7 24-7-24-24-7 24-7z" />,
  };
  return (
    <svg
      className="cs-figure"
      viewBox="0 0 88 80"
      fill="none"
      stroke="currentColor"
      strokeWidth="4"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {shapes[name] || shapes.blob}
    </svg>
  );
}

// ── block renderers ──────────────────────────────────────────────────
export default function Block({ block, onOpen, onPeek }) {
  switch (block.type) {
    case 'prose':
      return (
        <div className="cs-prose">
          <p className="cs-lead">{block.lead}</p>
          {block.body?.map((t) => (
            <p className="cs-body" key={t}>
              {t}
            </p>
          ))}
        </div>
      );

    case 'split':
      return (
        <div className={`cs-split ${block.flip ? 'cs-split--flip' : ''}`}>
          <div className="cs-split-media">
            <Media
              src={block.src}
              label={block.media}
              ratio={block.ratio || '4 / 3'}
              chrome={block.chrome}
              url={block.url}
              onOpen={onOpen}
            />
          </div>
          <div className="cs-split-text">
            <h4 className="cs-h4">{block.title}</h4>
            <p className="cs-body">{block.body}</p>
          </div>
        </div>
      );

    case 'list':
      return (
        <div className="cs-list">
          <h4 className="cs-h4">{block.title}</h4>
          <ul>
            {block.items.map((t) => (
              <li key={t}>
                <span className="cs-bullet" aria-hidden="true" />
                {t}
              </li>
            ))}
          </ul>
        </div>
      );

    case 'stats':
      return (
        <dl className="cs-stats">
          {block.items.map((s) => (
            <div key={s.k}>
              <dt>{s.k}</dt>
              <dd>{s.v}</dd>
            </div>
          ))}
        </dl>
      );

    case 'quote':
      return (
        <figure className="cs-quote">
          <blockquote>{block.quote}</blockquote>
          <figcaption>{block.by}</figcaption>
        </figure>
      );

    case 'steps':
      return (
        <ol className="cs-steps">
          {block.items.map((s, i) => (
            <li key={s.k}>
              <span className="cs-step-n">{String(i + 1).padStart(2, '0')}</span>
              <span className="cs-step-k">{s.k}</span>
              <span className="cs-step-v">{s.v}</span>
            </li>
          ))}
        </ol>
      );

    // full-bleed image with the commentary held alongside it
    case 'feature':
      return (
        <div className="cs-feature">
          <div className="cs-feature-media">
            <Media
              src={block.src}
              label={block.media}
              chrome={block.chrome}
              url={block.url}
              onOpen={onOpen}
            />
          </div>
          <aside className="cs-feature-note">
            <h4 className="cs-h4">{block.title}</h4>
            <p className="cs-body">{block.body}</p>
            {block.points && (
              <ul className="cs-feature-points">
                {block.points.map((t) => (
                  <li key={t}>
                    <span className="cs-bullet" aria-hidden="true" />
                    {t}
                  </li>
                ))}
              </ul>
            )}
          </aside>
        </div>
      );

    // a tinted panel that breaks the reading rhythm on purpose
    case 'highlight':
      return (
        <aside className="cs-highlight">
          <Figure name={block.figure} />
          <div className="cs-highlight-body">
            <span className="cs-highlight-k">{block.k}</span>
            <p className="cs-highlight-text">{block.text}</p>
          </div>
        </aside>
      );

    case 'gallery':
      return (
        <div className={`cs-gallery cs-gallery--${block.items.length}`}>
          {block.items.map((it) => {
            const item = typeof it === 'string' ? { label: it } : it;
            return (
              <Media
                key={item.label}
                src={item.src}
                label={item.label}
                ratio={item.ratio || '4 / 3'}
                tone="#191919"
                chrome={item.chrome ?? block.chrome}
                url={item.url}
                onOpen={onOpen}
              />
            );
          })}
        </div>
      );

    // A short glossary, placed before the argument rather than after it.
    // These four studies sit inside one platform and share its vocabulary,
    // and a reader who does not already know what a data product is cannot
    // judge any of the decisions that follow.
    case 'context':
      return (
        <aside className="cs-context">
          <span className="cs-context-k">
            <CaseIcon name="book" />
            {block.title || 'Context'}
          </span>
          <dl className="cs-context-list">
            {block.items.map((it) => (
              <div className="cs-context-row" key={it.k}>
                <dt>
                  <span className="cs-context-icon" aria-hidden="true">
                    <CaseIcon name={it.icon || 'lightbulb'} />
                  </span>
                  {it.k}
                </dt>
                <dd>{it.v}</dd>
              </div>
            ))}
          </dl>
          {block.links?.length > 0 && (
            <div className="cs-context-links">
              {block.links.map((l) => (
                <CrossLink key={l.to + l.section} link={l} onPeek={onPeek} />
              ))}
            </div>
          )}
        </aside>
      );

    case 'crosslink':
      return (
        <div className="cs-crossblock">
          <CrossLink link={block} onPeek={onPeek} wide />
        </div>
      );

    default:
      return null;
  }
}

// The four CPP studies describe one platform, so each keeps running into a
// piece another one owns. Sending the reader off to a different page loses
// their place in this argument; the link opens that section over the top
// instead, and closing it puts them back exactly where they were.
export function CrossLink({ link, onPeek, wide = false }) {
  return (
    <button
      type="button"
      className={`cs-crosslink ${wide ? 'is-wide' : ''}`}
      onClick={() => onPeek?.(link)}
    >
      <span className="cs-crosslink-icon" aria-hidden="true">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9">
          <path
            d="M10 13a5 5 0 0 0 7.5.5l3-3a5 5 0 0 0-7-7l-1.7 1.7"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M14 11a5 5 0 0 0-7.5-.5l-3 3a5 5 0 0 0 7 7l1.7-1.7"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </span>
      <span className="cs-crosslink-body">
        <span className="cs-crosslink-k">{link.k || 'More context'}</span>
        <span className="cs-crosslink-title">{link.title}</span>
        {wide && link.text && <span className="cs-crosslink-text">{link.text}</span>}
      </span>
      <span className="cs-crosslink-go" aria-hidden="true">
        ↗
      </span>
    </button>
  );
}

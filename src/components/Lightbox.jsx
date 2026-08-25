import { useEffect } from 'react';

// Full-screen viewer for case study imagery. Flow diagrams and component
// sheets carry detail that is unreadable at column width, so every figure
// can be opened here and read at full size.
export default function Lightbox({ image, onClose }) {
  useEffect(() => {
    const onKey = (e) => e.key === 'Escape' && onClose();
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [onClose]);

  if (!image) return null;

  return (
    <div className="lb" onClick={onClose} role="dialog" aria-modal="true" aria-label={image.label}>
      <button className="lb-close" onClick={onClose} aria-label="Close image">
        ✕
      </button>
      <figure className="lb-figure" onClick={(e) => e.stopPropagation()}>
        <img src={image.src} alt={image.label} />
        <figcaption>{image.label}</figcaption>
      </figure>
    </div>
  );
}

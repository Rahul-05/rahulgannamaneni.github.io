import { useEffect, useRef, useState } from 'react';

// Measures the available box and returns the scale that fits `w x h` inside it.
// Never scales past 1: a phone mock blown up beyond life size looks like a
// mistake rather than a device.
export default function useFitScale(w, h, pad = 0) {
  const ref = useRef(null);
  const [scale, setScale] = useState(0.001); // avoid a full-size first paint

  useEffect(() => {
    const el = ref.current;
    if (!el) return undefined;
    const fit = () => {
      const r = el.getBoundingClientRect();
      if (!r.width || !r.height) return;
      setScale(Math.min(1, (r.width - pad * 2) / w, (r.height - pad * 2) / h));
    };
    fit();
    const ro = new ResizeObserver(fit);
    ro.observe(el);
    return () => ro.disconnect();
  }, [w, h, pad]);

  return [ref, scale];
}

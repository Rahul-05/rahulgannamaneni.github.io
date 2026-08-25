// Placeholder image block, swapped for real images during content transfer.
export default function TempImg({
  label = 'TEMP IMG',
  ratio = '4 / 5',
  className = '',
  tone = '#d8d3ca',
}) {
  return (
    <div
      className={`temp-img ${className}`}
      style={{ aspectRatio: ratio, background: tone }}
      aria-label={`Placeholder: ${label}`}
    >
      <svg viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
        <line x1="0" y1="0" x2="100" y2="100" stroke="rgba(0,0,0,.25)" strokeWidth="0.6" />
        <line x1="100" y1="0" x2="0" y2="100" stroke="rgba(0,0,0,.25)" strokeWidth="0.6" />
      </svg>
      <span>{label}</span>
    </div>
  );
}

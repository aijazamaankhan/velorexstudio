/**
 * Splits text into words that light up as they cross the viewport
 * (CSS view timelines — see `.sw` in globals.css). Browsers without scroll
 * timelines render the text fully lit; screen readers get the plain string.
 */
export function ScrollWords({ text, className = "" }: { text: string; className?: string }) {
  return (
    <span className={className}>
      <span className="sr-only">{text}</span>
      <span aria-hidden>
        {text.split(" ").map((w, i) => (
          <span key={i} className="sw inline-block">
            {w}
            {"\u00a0"}
          </span>
        ))}
      </span>
    </span>
  );
}

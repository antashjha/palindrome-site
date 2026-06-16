import styles from './FlipString.module.css';

/**
 * Renders a string as individual character tiles. Passing a new `tick`
 * value remounts every character span, which restarts the CSS
 * flip-reveal animation — this is the page's signature motif.
 */
export default function FlipString({ chars, tick = 0, size = 'md', tone = 'default' }) {
  const safeChars = chars && chars.length > 0 ? chars : '\u2013';

  return (
    <span className={`${styles.row} ${styles[size] || styles.md}`}>
      {safeChars.split('').map((ch, i) => (
        <span
          key={`${i}-${tick}`}
          className={`${styles.char} ${styles[tone] || styles.default}`}
          style={{ animationDelay: `${i * 45}ms` }}
        >
          {ch}
        </span>
      ))}
    </span>
  );
}

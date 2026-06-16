import styles from './FlipString.module.css';
export default function FlipString({
  chars,
  tick = 0,
  size = 'md',
  tone = 'default',
  tones = null,
  label,
}) {
  const safeChars = chars && chars.length > 0 ? chars : '\u2013';

  return (
    <span className={`${styles.row} ${styles[size] || styles.md}`}>
      <span className={styles.visual} aria-hidden="true">
        {safeChars.split('').map((ch, i) => {
          const charTone = (tones && tones[i]) || tone;
          return (
            <span
              key={`${i}-${tick}`}
              className={`${styles.char} ${styles[charTone] || styles.default}`}
              style={{ animationDelay: `${i * 45}ms` }}
            >
              {ch}
            </span>
          );
        })}
      </span>
      <span className={styles.srOnly}>{label || safeChars}</span>
    </span>
  );
}
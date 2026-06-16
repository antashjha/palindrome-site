import { useCallback, useMemo, useState } from 'react';
import FlipString from './FlipString';
import styles from './PalindromeVisualizer.module.css';

const EXAMPLES = ['121', '1331', '12321', '45654', '90809'];
const MAX_DIGITS = 9;

function sanitize(input) {
  return input.replace(/[^0-9]/g, '').slice(0, MAX_DIGITS);
}

export default function PalindromeVisualizer() {
  const [value, setValue] = useState('12321');
  const [tick, setTick] = useState(0);
  const [copyState, setCopyState] = useState('idle'); // idle | copied | error

  const reversed = useMemo(() => value.split('').reverse().join(''), [value]);
  const isPalindrome = value.length > 0 && value === reversed;

  // Per-character match/mismatch, derived from the same comparison that
  // decides the palindrome verdict — so the highlight is never out of sync.
  const charTones = useMemo(
    () => value.split('').map((ch, i) => (ch === reversed[i] ? 'match' : 'mismatch')),
    [value, reversed]
  );

  const verdictText =
    value.length === 0
      ? 'Start typing a number above.'
      : isPalindrome
        ? `Palindrome — ${value} reads identically in both directions.`
        : `Not a palindrome — ${value} reversed is ${reversed}.`;

  function bump(next) {
    setValue(next);
    setTick((t) => t + 1);
    setCopyState('idle');
  }

  function handleChange(e) {
    bump(sanitize(e.target.value));
  }

  const handleCopy = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(verdictText);
      setCopyState('copied');
    } catch {
      setCopyState('error');
    }
    setTimeout(() => setCopyState('idle'), 2000);
  }, [verdictText]);

  const handleShare = useCallback(async () => {
    if (navigator.share) {
      try {
        await navigator.share({ title: 'Palindrome Lab', text: verdictText });
      } catch {
        // user dismissed the native share sheet — nothing to do
      }
    } else {
      handleCopy();
    }
  }, [verdictText, handleCopy]);

  return (
    <div className={styles.wrap}>
      <label className={styles.label} htmlFor="pal-input">
        Type any number, watch it reverse live
      </label>
      <input
        id="pal-input"
        className={styles.input}
        type="text"
        inputMode="numeric"
        autoComplete="off"
        value={value}
        onChange={handleChange}
        placeholder="e.g. 1331"
        maxLength={MAX_DIGITS}
        aria-describedby="pal-verdict pal-counter"
      />

      <div className={styles.meta}>
        <span id="pal-counter" className={styles.counter}>
          {value.length}/{MAX_DIGITS} digits
        </span>
        <div className={styles.chips}>
          {EXAMPLES.map((ex) => (
            <button
              key={ex}
              type="button"
              className={styles.chip}
              onClick={() => bump(ex)}
            >
              {ex}
            </button>
          ))}
        </div>
      </div>

      <div className={styles.stage}>
        <div className={styles.row}>
          <span className={styles.rowLabel}>Original</span>
          <FlipString chars={value} tick={tick} size="lg" tone="tan" tones={charTones} />
        </div>
        <div className={styles.divider} aria-hidden="true" />
        <div className={styles.row}>
          <span className={styles.rowLabel}>Reversed</span>
          <FlipString chars={reversed} tick={tick} size="lg" tone="tan" tones={charTones} />
        </div>
      </div>

      <div className={styles.footer}>
        <p className={styles.verdict} id="pal-verdict" aria-live="polite">
          {verdictText}
        </p>
        <div className={styles.actions}>
          <button
            type="button"
            className={styles.actionButton}
            onClick={handleCopy}
            disabled={value.length === 0}
          >
            {copyState === 'copied' ? 'Copied!' : 'Copy result'}
          </button>
          <button
            type="button"
            className={styles.actionButton}
            onClick={handleShare}
            disabled={value.length === 0}
          >
            Share
          </button>
        </div>
      </div>
    </div>
  );
}
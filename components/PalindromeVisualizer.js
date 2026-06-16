import { useMemo, useState } from 'react';
import FlipString from './FlipString';
import styles from './PalindromeVisualizer.module.css';

function sanitize(input) {
  return input.replace(/[^0-9]/g, '').slice(0, 9);
}

export default function PalindromeVisualizer() {
  const [value, setValue] = useState('12321');
  const [tick, setTick] = useState(0);

  const reversed = useMemo(() => value.split('').reverse().join(''), [value]);
  const isPalindrome = value.length > 0 && value === reversed;

  function handleChange(e) {
    setValue(sanitize(e.target.value));
    setTick((t) => t + 1);
  }

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
      />

      <div className={styles.stage}>
        <div className={styles.row}>
          <span className={styles.rowLabel}>Original</span>
          <FlipString chars={value} tick={tick} size="lg" tone="tan" />
        </div>
        <div className={styles.divider} aria-hidden="true" />
        <div className={styles.row}>
          <span className={styles.rowLabel}>Reversed</span>
          <FlipString
            chars={reversed}
            tick={tick}
            size="lg"
            tone={isPalindrome ? 'match' : 'mismatch'}
          />
        </div>
      </div>

      <p className={styles.verdict} aria-live="polite">
        {value.length === 0
          ? 'Start typing a number above.'
          : isPalindrome
            ? `Palindrome — ${value} reads identically in both directions.`
            : `Not a palindrome — ${value} reversed is ${reversed}.`}
      </p>
    </div>
  );
}

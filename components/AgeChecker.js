import { useState } from 'react';
import FlipString from './FlipString';
import { computePalindromeAgeResult } from '../lib/palindromeAge';
import styles from './AgeChecker.module.css';

export default function AgeChecker() {
  const [parentInput, setParentInput] = useState('39');
  const [childInput, setChildInput] = useState('12');
  const [result, setResult] = useState(null);
  const [tick, setTick] = useState(0);

  function handleSubmit(e) {
    e.preventDefault();
    const parentAge = parseInt(parentInput, 10);
    const childAge = parseInt(childInput, 10);
    setResult(computePalindromeAgeResult(parentAge, childAge));
    setTick((t) => t + 1);
  }

  return (
    <div className={styles.wrap}>
      <form className={styles.form} onSubmit={handleSubmit}>
        <div className={styles.field}>
          <label htmlFor="parent-age">Parent&rsquo;s age</label>
          <input
            id="parent-age"
            type="number"
            min="0"
            max="130"
            inputMode="numeric"
            value={parentInput}
            onChange={(e) => setParentInput(e.target.value)}
            required
          />
        </div>
        <div className={styles.field}>
          <label htmlFor="child-age">Child&rsquo;s age</label>
          <input
            id="child-age"
            type="number"
            min="0"
            max="130"
            inputMode="numeric"
            value={childInput}
            onChange={(e) => setChildInput(e.target.value)}
            required
          />
        </div>
        <button type="submit" className={styles.button}>
          Check for a mirror
        </button>
      </form>

      <div className={styles.result} aria-live="polite">
        {result === null && (
          <p className={styles.hint}>
            Enter both ages and check — the gap between them decides
            everything.
          </p>
        )}

        {result?.status === 'invalid' && (
          <p className={styles.error}>{result.message}</p>
        )}

        {result?.status === 'no-pair' && (
          <div>
            <p className={styles.verdictNo}>
              No mirror moment for this pair. The age gap is{' '}
              <strong>{result.gap}</strong>, which isn&rsquo;t divisible by 9
              — and that divisibility is required for a digit-reversal match
              to exist at all.
            </p>
          </div>
        )}

        {result?.status === 'pair' && (
          <div>
            <p className={styles.verdictYes}>
              Mirror pair confirmed. Age gap: <strong>{result.gap}</strong> —
              divisible by 9, so a reversed-digit match exists.
            </p>

            <div className={styles.tableHead}>
              <span>Child</span>
              <span aria-hidden="true" />
              <span>Parent</span>
            </div>

            <div className={styles.pairs}>
              {result.pairs.map((pair, i) => (
                <div className={styles.pairRow} key={pair.child}>
                  <FlipString chars={pair.child} tick={tick + i} size="md" tone="tan" />
                  <span className={styles.arrow} aria-hidden="true">
                    ⇄
                  </span>
                  <FlipString chars={pair.parent} tick={tick + i} size="md" tone="match" />
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

import { useId, useState } from 'react';
import FlipString from './FlipString';
import { computePalindromeAgeResult } from '../lib/palindromeAge';
import styles from './AgeChecker.module.css';

function parseAgeInput(raw) {
  if (raw.trim() === '') return { value: null, error: 'Enter an age.' };
  const n = Number(raw);
  if (!Number.isInteger(n) || n < 0 || n > 130) {
    return { value: null, error: 'Whole number between 0 and 130.' };
  }
  return { value: n, error: null };
}

export default function AgeChecker() {
  const [parentInput, setParentInput] = useState('39');
  const [childInput, setChildInput] = useState('12');
  const [parentError, setParentError] = useState(null);
  const [childError, setChildError] = useState(null);
  const [result, setResult] = useState(null);
  const [tick, setTick] = useState(0);
  const [copyState, setCopyState] = useState('idle');
  const parentErrorId = useId();
  const childErrorId = useId();

  function handleSubmit(e) {
    e.preventDefault();
    const parent = parseAgeInput(parentInput);
    const child = parseAgeInput(childInput);
    setParentError(parent.error);
    setChildError(child.error);

    if (parent.error || child.error) {
      setResult(null);
      return;
    }

    setResult(computePalindromeAgeResult(parent.value, child.value));
    setTick((t) => t + 1);
    setCopyState('idle');
  }

  function handleReset() {
    setParentInput('39');
    setChildInput('12');
    setParentError(null);
    setChildError(null);
    setResult(null);
    setCopyState('idle');
  }

  function summarizeResult() {
    if (!result || result.status !== 'pair') return '';
    const lines = result.pairs.map((p) => `${p.child} <-> ${p.parent}`);
    return `Mirror pair confirmed (age gap ${result.gap}):\n${lines.join('\n')}`;
  }

  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(summarizeResult());
      setCopyState('copied');
    } catch {
      setCopyState('error');
    }
    setTimeout(() => setCopyState('idle'), 2000);
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
            aria-invalid={parentError ? 'true' : undefined}
            aria-describedby={parentError ? parentErrorId : undefined}
            required
          />
          {parentError && (
            <p className={styles.fieldError} id={parentErrorId}>
              {parentError}
            </p>
          )}
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
            aria-invalid={childError ? 'true' : undefined}
            aria-describedby={childError ? childErrorId : undefined}
            required
          />
          {childError && (
            <p className={styles.fieldError} id={childErrorId}>
              {childError}
            </p>
          )}
        </div>
        <div className={styles.buttonRow}>
          <button type="submit" className={styles.button}>
            Check for a mirror
          </button>
          <button type="button" className={styles.resetButton} onClick={handleReset}>
            Reset
          </button>
        </div>
      </form>

      <div className={styles.result} aria-live="polite">
        {result === null && !parentError && !childError && (
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

            <button type="button" className={styles.copyButton} onClick={handleCopy}>
              {copyState === 'copied' ? 'Copied!' : 'Copy results'}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
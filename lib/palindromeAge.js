/**
 * Ported from palindrome_age.cpp.
 * Same math, same loop structure — just expressed as pure JS functions
 * so both the UI and any future API route can reuse it.
 */

export function isPalindromePair(parentAge, childAge) {
  return (parentAge - childAge) % 9 === 0;
}

export function firstPalindromeAge(gap) {
  return Math.floor(gap / 9);
}

function pad2(n) {
  return n < 10 ? `0${n}` : `${n}`;
}

/**
 * Returns every (child, parent) age pair, within 0–99, where the
 * parent's age is the digit-reversal of the child's age, for a fixed
 * age gap. Mirrors printPalindromeAges() from the original C++.
 */
export function getPalindromeAgePairs(childStart, parentAge, childAge) {
  const diff = parentAge - childAge;
  const pairs = [];

  for (let age = childStart; age < 100; age += 11) {
    const pAge = age + diff;
    if (pAge >= 100) break;
    pairs.push({ child: pad2(age), parent: pad2(pAge) });
  }

  return pairs;
}

/**
 * High-level helper used by the UI: validates input, runs the same
 * checks as main() in the C++ file, and returns a structured result.
 */
export function computePalindromeAgeResult(parentAge, childAge) {
  if (
    !Number.isFinite(parentAge) ||
    !Number.isFinite(childAge) ||
    parentAge <= childAge
  ) {
    return {
      status: 'invalid',
      message: 'Parent age must be a real number, greater than the child\u2019s age.',
    };
  }

  const gap = parentAge - childAge;

  if (!isPalindromePair(parentAge, childAge)) {
    return { status: 'no-pair', gap };
  }

  const firstAge = firstPalindromeAge(gap);
  const pairs = getPalindromeAgePairs(firstAge, parentAge, childAge);

  return {
    status: 'pair',
    gap,
    firstAge,
    pairs,
  };
}

import Link from 'next/link';
import Nav from '../components/Nav';
import Footer from '../components/Footer';
import SEOHead from '../components/SEOHead';
import PalindromeVisualizer from '../components/PalindromeVisualizer';
import styles from '../styles/Home.module.css';

const FAQS = [
  {
    q: 'Is a single digit, like 7, a palindrome?',
    a: 'Yes. With only one digit there is nothing to reverse, so it trivially reads the same forwards and backwards.',
  },
  {
    q: 'Do leading zeros count?',
    a: 'No — 010 is not treated as a number with a leading zero in standard palindrome checks; it is read as 10, and 10 reversed is 01, which is not equal to 10. Most implementations work on the digit string of the number as written, without artificial padding.',
  },
  {
    q: 'What is the largest known palindrome rule in number theory?',
    a: 'There is no largest palindrome — for any number of digits, you can always construct one. What mathematicians study instead is how palindromes behave under operations like multiplication, and unsolved questions such as the Lychrel number conjecture.',
  },
];

const jsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'Article',
      headline: 'Palindrome Numbers: Definition, Examples, and the Algorithm',
      description:
        'Learn what makes a number a palindrome, see worked examples, and understand the two standard algorithms used to check one.',
      author: { '@type': 'Organization', name: 'Palindrome Lab' },
      mainEntityOfPage: 'https://palindromelab.example.com/',
    },
    {
      '@type': 'FAQPage',
      mainEntity: FAQS.map((f) => ({
        '@type': 'Question',
        name: f.q,
        acceptedAnswer: { '@type': 'Answer', text: f.a },
      })),
    },
  ],
};

export default function Home() {
  return (
    <>
      <SEOHead
        title="Palindrome Numbers: Definition, Examples & Algorithm"
        description="What is a palindrome number? See live examples, the reverse-and-compare and two-pointer algorithms, and try the interactive digit-reversal demo."
        path="/"
        jsonLd={jsonLd}
      />
      <Nav />

      <main>
        <section className={styles.hero}>
          <div className="container">
            <p className="eyebrow">Numbers that read themselves</p>
            <h1>Palindrome Numbers</h1>
            <p className={styles.heroSub}>
              A palindrome number stays identical when its digits are reversed —
              121, 1331, and 7 all qualify. Type one below and watch the
              reversal happen digit by digit.
            </p>

            <div className={styles.heroDemo}>
              <PalindromeVisualizer />
            </div>
          </div>
        </section>

        <section className={styles.section}>
          <div className="container">
            <h2>What makes a number a palindrome</h2>
            <p className={styles.lead}>
              Formally: a number N is a palindrome if writing its digits in
              reverse order produces the exact same sequence. The rule cares
              about the digit string, not the digit count — which means odd
              and even-length numbers both qualify, just by different
              symmetry.
            </p>

            <div className={styles.cards}>
              <div className={styles.card}>
                <span className={styles.cardTag}>1 digit</span>
                <p className={styles.cardNum}>7</p>
                <p className={styles.cardNote}>
                  Nothing to mirror against — every single-digit number is a
                  palindrome by default.
                </p>
              </div>
              <div className={styles.card}>
                <span className={styles.cardTag}>odd length</span>
                <p className={styles.cardNum}>121</p>
                <p className={styles.cardNote}>
                  The middle digit sits on the axis of symmetry; only the
                  digits on either side need to match.
                </p>
              </div>
              <div className={styles.card}>
                <span className={styles.cardTag}>even length</span>
                <p className={styles.cardNum}>1331</p>
                <p className={styles.cardNote}>
                  No single middle digit — the axis falls between the two
                  central digits instead.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className={styles.sectionAlt}>
          <div className="container">
            <h2>How a computer checks it</h2>
            <p className={styles.lead}>
              There are two common approaches. Both run in linear time
              relative to the number of digits — the difference is whether
              you build a new reversed copy or just compare in place.
            </p>

            <div className={styles.codeGrid}>
              <div className={styles.codeBlock}>
                <h3>1. Reverse and compare</h3>
                <pre className={styles.pre}>
{`function isPalindrome(n) {
  const s = String(n);
  const reversed = s.split('').reverse().join('');
  return s === reversed;
}`}
                </pre>
                <p className={styles.codeNote}>
                  Simple to read, costs one extra string allocation.
                </p>
              </div>

              <div className={styles.codeBlock}>
                <h3>2. Two-pointer, in place</h3>
                <pre className={styles.pre}>
{`function isPalindrome(n) {
  const s = String(n);
  let left = 0, right = s.length - 1;
  while (left < right) {
    if (s[left] !== s[right]) return false;
    left++;
    right--;
  }
  return true;
}`}
                </pre>
                <p className={styles.codeNote}>
                  No copy of the string is built — pointers close in from
                  both ends and exit the moment a mismatch is found.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className={styles.cta}>
          <div className="container">
            <h2>What if two different numbers mirror each other?</h2>
            <p className={styles.lead}>
              A single number can be a palindrome on its own — but two
              different numbers can also be mirror images of each other. A
              parent aged 31 and a child aged 13 are exactly that kind of
              pair. There&rsquo;s a neat bit of number theory behind when, and
              how often, that happens.
            </p>
            <Link href="/palindrome-age" className={styles.ctaButton}>
              Try the Palindrome Age Checker →
            </Link>
          </div>
        </section>

        <section className={styles.section}>
          <div className="container">
            <h2>Frequently asked</h2>
            <div className={styles.faqList}>
              {FAQS.map((f) => (
                <details key={f.q} className={styles.faqItem}>
                  <summary className={styles.faqQ}>{f.q}</summary>
                  <p className={styles.faqA}>{f.a}</p>
                </details>
              ))}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}

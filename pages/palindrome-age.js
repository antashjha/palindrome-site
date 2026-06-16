import Link from 'next/link';
import Nav from '../components/Nav';
import Footer from '../components/Footer';
import SEOHead from '../components/SEOHead';
import AgeChecker from '../components/AgeChecker';
import styles from '../styles/AgePage.module.css';

const jsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'WebApplication',
      name: 'Palindrome Age Checker',
      applicationCategory: 'EducationApplication',
      operatingSystem: 'Any',
      description:
        'Enter a parent and child age to find every future year their ages are digit-reversals of each other.',
      url: 'https://palindromelab.example.com/palindrome-age',
    },
    {
      '@type': 'BreadcrumbList',
      itemListElement: [
        {
          '@type': 'ListItem',
          position: 1,
          name: 'Palindrome Numbers',
          item: 'https://palindromelab.example.com/',
        },
        {
          '@type': 'ListItem',
          position: 2,
          name: 'Palindrome Age Checker',
          item: 'https://palindromelab.example.com/palindrome-age',
        },
      ],
    },
  ],
};

export default function PalindromeAgePage() {
  return (
    <>
      <SEOHead
        title="Palindrome Age Checker: Parent & Child Mirror Ages"
        description="Find out if your age and your parent's age are digit-reversals of each other, and see every year that pattern repeats."
        path="/palindrome-age"
        jsonLd={jsonLd}
      />
      <Nav />

      <main>
        <section className={styles.hero}>
          <div className="container">
            <p className="eyebrow">A real-world mirror</p>
            <h1>When your age is your parent&rsquo;s age, reversed</h1>
            <p className={styles.heroSub}>
              Right now, a parent might be 31 and a child 13 — same two
              digits, flipped. It isn&rsquo;t a coincidence that can happen
              indefinitely; it follows a fixed pattern tied to the age gap
              between them. Enter two ages below to see it.
            </p>
          </div>
        </section>

        <section className={styles.section}>
          <div className="container">
            <AgeChecker />
          </div>
        </section>

        <section className={styles.sectionAlt}>
          <div className="container">
            <h2>The math behind it</h2>
            <p className={styles.lead}>
              Write the child&rsquo;s age as a two-digit number with tens
              digit <em>a</em> and units digit <em>b</em> — that&rsquo;s{' '}
              <code>10a + b</code>. Its digit-reversal is{' '}
              <code>10b + a</code>. Subtract one from the other:
            </p>

            <pre className={styles.mathBlock}>
{`(10a + b) - (10b + a) = 9a - 9b = 9(a - b)`}
            </pre>

            <p className={styles.lead}>
              The difference is always a multiple of 9, no matter what{' '}
              <em>a</em> and <em>b</em> are. That&rsquo;s why the very first
              check is just <code>gap % 9 === 0</code> — if it fails, no
              digit-reversal pair can exist for that age gap, full stop.
            </p>

            <p className={styles.lead}>
              When it does divide evenly, <code>gap / 9</code> gives the
              value of <code>a - b</code>, which doubles as the youngest
              valid child age in the sequence. Every next match is exactly
              11 years later — because incrementing both <em>a</em> and{' '}
              <em>b</em> by 1 keeps their difference, and therefore the age
              gap, unchanged.
            </p>
          </div>
        </section>

        <section className={styles.section}>
          <div className="container">
            <h2>The original implementation</h2>
            <p className={styles.lead}>
              This page runs on the same logic as the C++ version it was
              built from — only the loop that walks through every matching
              year, one age gap at a time.
            </p>
            <pre className={styles.codeBlock}>
{`bool isPalindromePair(int parentAge, int childAge) {
    return (parentAge - childAge) % 9 == 0;
}

int firstPalindromeAge(int gap) {
    return gap / 9;
}

// age increases by 11 each time because incrementing both
// digits by 1 leaves their difference \u2014 and the gap \u2014 unchanged
for (int age = childStart; age < 100; age += 11) {
    int pAge = age + diff;
    if (pAge >= 100) break;
    // record (age, pAge) as a mirror pair
}`}
            </pre>
          </div>
        </section>

        <section className={styles.cta}>
          <div className="container">
            <h2>Want the full theory first?</h2>
            <p className={styles.lead}>
              This page is a special case of a broader idea — go back to see
              what makes any single number a palindrome, and try the live
              reversal demo.
            </p>
            <Link href="/" className={styles.ctaButton}>
              ← Back to Palindrome Theory
            </Link>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}

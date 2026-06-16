import Link from 'next/link';
import styles from './Footer.module.css';

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className={styles.footer}>
      <div className={`container ${styles.row}`}>
        <p className={styles.text}>
          © {year} Palindrome Lab — built to explain numbers that mirror
          themselves.
        </p>
        <nav className={styles.links} aria-label="Footer navigation">
          <Link href="/">Theory</Link>
          <Link href="/palindrome-age">Age Checker</Link>
        </nav>
      </div>
    </footer>
  );
}
import Link from 'next/link';
import styles from './Footer.module.css';

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={`container ${styles.row}`}>
        <p className={styles.text}>
          Palindrome Lab — built to explain numbers that mirror themselves.
        </p>
        <div className={styles.links}>
          <Link href="/">Theory</Link>
          <Link href="/palindrome-age">Age Checker</Link>
        </div>
      </div>
    </footer>
  );
}

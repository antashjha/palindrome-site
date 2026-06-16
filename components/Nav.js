import Link from 'next/link';
import { useRouter } from 'next/router';
import styles from './Nav.module.css';

const LINKS = [
  { href: '/', label: 'Theory' },
  { href: '/palindrome-age', label: 'Age Checker' },
];

export default function Nav() {
  const router = useRouter();

  return (
    <header className={styles.header}>
      <div className={`container ${styles.row}`}>
        <Link href="/" className={styles.brand}>
          <span className={styles.brandMark}>181</span>
          <span>Palindrome Lab</span>
        </Link>

        <nav className={styles.links}>
          {LINKS.map((link) => {
            const active = router.pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`${styles.link} ${active ? styles.active : ''}`}
                aria-current={active ? 'page' : undefined}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>
      </div>
    </header>
  );
}

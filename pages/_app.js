import '../styles/globals.css';
import { Playfair_Display, Inter } from 'next/font/google';

const playfair = Playfair_Display({
  subsets: ['latin'],
  weight: ['600', '700', '800'],
  variable: '--font-display',
  display: 'swap',
});

const inter = Inter({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-body',
  display: 'swap',
});

export default function App({ Component, pageProps }) {
  return (
    <div className={`${playfair.variable} ${inter.variable}`}>
      <Component {...pageProps} />
    </div>
  );
}

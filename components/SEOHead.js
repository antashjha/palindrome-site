import Head from 'next/head';

const SITE_NAME = 'Palindrome Lab';
const SITE_URL = 'https://palindrome-site.vercel.app';
const DEFAULT_IMAGE = `${SITE_URL}/og-default.png`;

export default function SEOHead({
  title,
  description,
  path = '/',
  image = DEFAULT_IMAGE,
  noindex = false,
  jsonLd,
}) {
  const fullTitle = `${title} | ${SITE_NAME}`;
  const url = `${SITE_URL}${path}`;

  return (
    <Head>
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={url} />
      <meta name="robots" content={noindex ? 'noindex, nofollow' : 'index, follow'} />
      {/* Replace with your real --near-black hex so the browser chrome matches the site. */}
      <meta name="theme-color" content="#171310" />

      <meta property="og:type" content="website" />
      <meta property="og:site_name" content={SITE_NAME} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={url} />
      <meta property="og:image" content={image} />
      <meta property="og:image:alt" content={fullTitle} />

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />

      {jsonLd && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      )}
    </Head>
  );
}
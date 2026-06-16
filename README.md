# Palindrome Lab

Two-page Next.js site (Pages Router) built around your `palindrome_age.cpp`
logic.

- `/` — Palindrome number theory: definition, worked examples, the two
  standard checking algorithms, an interactive live-reversal demo, and an
  FAQ block (with FAQPage JSON-LD).
- `/palindrome-age` — Palindrome age checker: a form wired to a JS port of
  your C++ logic (`lib/palindromeAge.js`), the 9(a−b) math explanation, and
  the original loop reproduced for reference. JSON-LD as `WebApplication` +
  `BreadcrumbList`.

## Run it

This was written without network access in the build sandbox, so it has
**not** been run through `npm install` / `next dev` yet — do that locally
before trusting it fully:

```bash
npm install
npm run dev
```

Then open `http://localhost:3000`.

```bash
npm run build && npm run start   # production build
```

## Structure

```
pages/
  _app.js          loads Playfair Display + Inter via next/font
  _document.js     base HTML shell
  index.js         Page 1 — theory
  palindrome-age.js Page 2 — age checker
components/
  Nav.js, Footer.js
  SEOHead.js        title/meta/OG/JSON-LD wrapper
  FlipString.js     signature flip-reveal animation (shared by both pages)
  PalindromeVisualizer.js   Page 1 live demo
  AgeChecker.js     Page 2 form + results
lib/
  palindromeAge.js  direct JS port of palindrome_age.cpp
styles/
  globals.css       design tokens (--tan, --dark-brown, --near-black,
                     --medium, --rich) + base resets
  Home.module.css, AgePage.module.css
```

## Design tokens

```css
--tan: #D19A71;        /* accents, highlights */
--dark-brown: #5F3712; /* headings, strong text */
--near-black: #11100F; /* body text, dark surfaces */
--medium: #A2734D;     /* secondary text, borders */
--rich: #714824;       /* buttons, active states */
```

Type: Playfair Display (display) + Inter (body) + monospace for digits/code,
loaded via `next/font/google` — no manual `<link>` tags needed.

## Things to sanity-check once you can run it

1. `npm install` will need internet — fine outside this sandbox.
2. Replace `https://palindromelab.example.com` in `SEOHead.js` and the two
   JSON-LD blocks with your real domain before deploying.
3. Add a proper `og:image` (1200×630) once you have brand artwork — currently
   omitted since none was provided.
4. `public/favicon.svg` is a placeholder mark, swap for real branding if
   you want.

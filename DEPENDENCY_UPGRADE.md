# Dependency upgrade — 2026-11-10

Requires Node.js 24.11+ (`nvm use`) and pnpm 11.28.11. Direct dependencies and the lockfile were refreshed against npm. Versions are pinned across the workspace.

## Main migrations

- Next.js 14 → 16.4.6, with Webpack retained for the existing HTML loader and bundle analysis.
- Prisma 5 → 7.10.1: PostgreSQL driver adapter and `prisma.config.ts`. Database models are unchanged; no production database migration was run.
- tRPC 10 → 11.26.0 and React Query 4 → 5: link transformers, cache lifetime and pending states.
- Tiptap 2 → 3, Radix Colors 1 → 3, and Next SEO 6 → 7: editor extensions/SSR, hex theme colors and Pages Router metadata.
- Storybook 6 → 10.6.6, MSW 1 → 3 and Jest 29 → 30. Jest runs with VM modules and explicit browser Web API support.
- Vite 4 → 8.3.7, Turborepo 1 → 2.11.10, TypeScript 5 → 6.0.3, Prettier 2 → 3, and ESLint flat configuration. Existing lint conventions are retained.
- Maizzle 4 → 5.5.0 and CLI 2: component layouts, stylesheet processing, output paths and CSS inlining. React Email rendering is now asynchronous.
- Replaced the Next.js-version-specific SuperJSON compiler plugin with explicit static-prop serialization and deserialization.

## Dependencies intentionally kept on compatible major versions

| Dependency                        | Kept version    | Reason                                                                                                                                                                                                                                                    |
| --------------------------------- | --------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| React / React DOM and their types | 18.3.x          | The latest Tremor release still declares React 18 support. Next.js 16 supports this Pages Router setup.                                                                                                                                                   |
| Tailwind CSS / scrollbar          | 3.4.19 / 3.1.0  | The email variants and MSO plugins require Tailwind 3.                                                                                                                                                                                                    |
| Maizzle framework                 | 5.5.0           | Version 6 requires Tailwind 4 and replaces HTML/PostHTML templates with Vue templates.                                                                                                                                                                    |
| TypeScript                        | 6.0.3           | The current TypeScript ESLint parser/plugin supports versions below 6.1, including 6.0; it does not support TypeScript 7.                                                                                                                                 |
| ESLint / Unicorn                  | 9.39.5 / 65.0.1 | Next.js's React, JSX accessibility and import plugins declare ESLint support through version 9. Newer Unicorn versions require ESLint 10.                                                                                                                 |
| Nodemailer                        | 7.0.13          | NextAuth 4 requires Nodemailer 7.                                                                                                                                                                                                                         |
| next-axiom                        | 0.18.1          | The package directs Pages Router apps to its 0.x line; version 1 targets App Router.                                                                                                                                                                      |
| type-fest                         | 4.41.0          | Storybook's React Refresh Webpack integration requires a version below 5.                                                                                                                                                                                 |
| Stripe server SDK                 | 12.18.0         | Preserves the existing 2022-11-15 API contract and webhook payload types. A newer server SDK requires a separate payment API migration and live billing verification. Stripe.js itself was upgraded; Checkout redirects now use the returned session URL. |
| TensorFlow.js family              | 3.21.0          | The toxicity model remains on its legacy API and declares TensorFlow 1 peer dependencies. The existing peer-version mismatch remains; TensorFlow 4 inference was not validated.                                                                           |
| Prisma CLI                        | 7.10.1          | Matches the latest stable Prisma Client. The CLI's latest tag currently points to an 8.0 release candidate.                                                                                                                                               |
| pnpm                              | 11.28.11        | pnpm 12.18.0's macOS standalone package was unavailable when tested.                                                                                                                                                                                      |

## Validation

- `pnpm install --frozen-lockfile`
- `pnpm test -- --runInBand`: 34 suites, 55 tests.
- `pnpm lint`: zero errors or warnings.
- `pnpm build`: full production build, including documentation and seeded project/comment pages against an isolated validation database.
- TypeScript checks for the main app, UI, bootstrapper, service worker and React Email; SDK compilation.
- Storybook production build, Maizzle production build and React Email export.
- Rendered all three Maizzle/Eta email templates, checking HTML, CSS inlining and parameter interpolation.

Live OAuth, payment processing, email delivery and toxicity model inference were not exercised.

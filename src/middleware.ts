import createMiddleware from 'next-intl/middleware';
import { Pathnames } from 'next-intl/navigation';

export const locales = ['en', 'fr'] as const;

export const pathnames = {
  '/': '/',
  '/pathnames': {
    en: '/pathnames',
    fr: '/pfadnamen',
  },
} satisfies Pathnames<typeof locales>;

export default createMiddleware({
  // A list of all locales that are supported
  locales,
  pathnames,
  localePrefix: undefined,
  // Used when no locale matches
  defaultLocale: 'fr',
});

export const config = {
  // Match only internationalized pathnames
  matcher: ['/', '/(fr|en)/:path*'],
};

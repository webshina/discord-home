// This file sets a custom webpack configuration to use your Next.js app
// with Sentry.
// https://nextjs.org/docs/api-reference/next.config.js/introduction
// https://docs.sentry.io/platforms/javascript/guides/nextjs/manual-setup/
const { withSentryConfig } = require('@sentry/nextjs');

/** @type {import('next').NextConfig} */

module.exports = {
  images: {
    domains: [
      'localhost',
      'cdn.discordapp.com',
      'discord-home.s3.ap-northeast-1.amazonaws.com',
    ],
  },
};

if (process.env.NODE_ENV === 'production') {
  module.exports = withSentryConfig(
    module.exports,
    { silent: true },
    { hideSourcemaps: true }
  );
}

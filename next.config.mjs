import withPWA from 'next-pwa';

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // Add any other Next.js configuration options here
};

export default withPWA({
  dest: 'public',
  // Add any other next-pwa specific options here
})(nextConfig);
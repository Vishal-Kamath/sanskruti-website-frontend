/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  redirects: async () => {
    return [
      {
        source: '/category',
        destination: '/',
        permanent: true,
      },
    ];
  },
};

module.exports = nextConfig;

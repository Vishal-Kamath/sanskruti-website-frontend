/** @type {import('next').NextConfig} */
const nextConfig = {
  redirects: async () => {
    return [
      {
        source: "/auth",
        destination: "/auth/login",
        permanent: true,
      },
    ];
  },
  env: {
    ENDPOINT: process.env.ENDPOINT,
  },
};

module.exports = nextConfig;

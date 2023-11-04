/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cdn.sanskrutinx.in",
      },
      {
        protocol: "https",
        hostname: "cdn.sanskrutinx.com",
      },
      {
        protocol: "https",
        hostname: "placehold.co",
      },
    ],
  },
  redirects: async () => {
    return [
      {
        source: "/auth",
        destination: "/auth/login",
        permanent: true,
      },
      {
        source: "/user",
        destination: "/user/account",
        permanent: true,
      },
    ];
  },
  env: {
    ENDPOINT: process.env.ENDPOINT,
  },
};

module.exports = nextConfig;

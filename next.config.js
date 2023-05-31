/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  redirects: async () => {
    return [
      {
        source: "/category",
        destination: "/",
        permanent: true,
      },
      {
        source: "/product",
        destination: "/",
        permanent: true,
      },
    ];
  },
  env: {
    ENDPOINT: "http://localhost:4000",
  },
};

module.exports = nextConfig;

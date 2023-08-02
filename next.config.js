/** @type {import('next').NextConfig} */
const nextConfig = {
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
    MERCHANT_ID: process.env.MERCHANT_ID,
    ACCESS_CODE: process.env.ACCESS_CODE,
    WORKING_KEY: process.env.WORKING_KEY,
  },
};

module.exports = nextConfig;

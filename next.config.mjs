/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "dev.csrvoice.com",
        port: "",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;

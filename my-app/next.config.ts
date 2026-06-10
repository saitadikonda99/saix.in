import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactCompiler: true,
  async redirects() {
    return [
      {
        source: "/resume.pdf",
        destination: "/resume",
        permanent: false,
      },
    ];
  },
};

export default nextConfig;

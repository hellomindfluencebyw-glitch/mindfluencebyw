/** @type {import('next').NextConfig} */

// If deploying to GitHub Pages at https://<user>.github.io/<repo>/,
// set NEXT_PUBLIC_BASE_PATH="/<repo>" as an env var before `npm run build`.
// If deploying to a custom domain or Vercel, leave it unset.
const basePath = process.env.NEXT_PUBLIC_BASE_PATH || "";

const nextConfig = {
  output: "export",
  basePath,
  images: {
    unoptimized: true,
  },
  trailingSlash: true,
};

export default nextConfig;

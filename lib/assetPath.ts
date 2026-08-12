// Plain <img src="/..."> strings are NOT automatically prefixed by Next.js's
// basePath (only next/image and Next's own internal asset handling get that).
// This mirrors the same NEXT_PUBLIC_BASE_PATH env var next.config.mjs reads,
// so hardcoded paths to files in /public resolve correctly under a GitHub
// Pages project subpath like /mindfluencebyw/.
export function assetPath(path: string): string {
  const base = process.env.NEXT_PUBLIC_BASE_PATH ?? "";
  return `${base}${path}`;
}

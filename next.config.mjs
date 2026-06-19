/** @type {import('next').NextConfig} */
const nextConfig = {
  async headers() {
    return [
      // Keep floviken.se out of search results without blocking access.
      // X-Robots-Tag: noindex tells crawlers not to index any page; nofollow
      // tells them not to follow links from it. The site stays fully live and
      // reachable via direct links (e.g. from LinkedIn) — only search-engine
      // indexing is suppressed. Applied to every route via '/:path*'.
      // NOTE: deliberately NOT paired with a robots.txt Disallow — crawlers
      // must be allowed to fetch the page to actually see this directive.
      {
        source: "/:path*",
        headers: [
          { key: "X-Robots-Tag", value: "noindex, nofollow" },
        ],
      },
    ];
  },
  async redirects() {
    return [
      // Experiment 01 was renamed Ghost Signout -> Wake. Keep the old writeup
      // URL (and the existing LinkedIn link to it) working. Permanent (308).
      // NOTE: this only reslugs the floviken.se writeup page. The external
      // standalone app at ghost-signout.vercel.app is a separate deployment and
      // is intentionally NOT redirected.
      {
        source: "/ghost-signout",
        destination: "/wake",
        permanent: true,
      },
      // Reserve was restructured: the single-cell simulator and the side-by-side
      // comparison now live on ONE toggled page at /reserve/run. The old
      // standalone comparison route is retired; keep its URL working. (308)
      {
        source: "/reserve/compare",
        destination: "/reserve/run",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;

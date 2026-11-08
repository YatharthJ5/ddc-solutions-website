const isGitHub = process.env.GITHUB_ACTIONS === "true";

export default {
  output: "export",

  basePath: isGitHub ? "/ddc-solutions-website" : "",

  trailingSlash: true,

  eslint: {
    ignoreDuringBuilds: true,
  },

  images: {
    unoptimized: true,
  },
};
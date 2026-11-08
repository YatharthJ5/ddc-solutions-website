
const BASE_PATH = process.env.NEXT_PUBLIC_BASE_PATH || "";

export function withBasePath(path?: string | null): string {
  if (!path) return "";

  if (
    /^(https?:)?\/\//i.test(path) ||
    /^(data:|blob:|mailto:|tel:|#)/i.test(path)
  ) {
    return path;
  }

  const normalized = path.startsWith("/") ? path : `/${path}`;

  if (
    !BASE_PATH ||
    normalized === BASE_PATH ||
    normalized.startsWith(`${BASE_PATH}/`)
  ) {
    return normalized;
  }

  return `${BASE_PATH}${normalized}`;
}

export function addBasePathToHtml(html: string): string {
  return html
    .replace(
      /\b(src|href|poster)\s*=\s*(["'])\/(?!\/)([^"']*)\2/gi,
      (_match, attribute, quote, path) =>
        `${attribute}=${quote}${withBasePath(`/${path}`)}${quote}`
    )
    .replace(
      /\bsrcset\s*=\s*(["'])(.*?)\1/gi,
      (_match, quote, srcset) =>
        `srcset=${quote}${srcset
          .split(",")
          .map((entry: string) => {
            const parts = entry.trim().split(/\s+/);
            const url = parts.shift() || "";
            return [withBasePath(url), ...parts].join(" ");
          })
          .join(", ")}${quote}`
    )
    .replace(
      /url\((["']?)\/(?!\/)([^)'"]+)\1\)/gi,
      (_match, quote, path) =>
        `url(${quote}${withBasePath(`/${path}`)}${quote})`
    );
}

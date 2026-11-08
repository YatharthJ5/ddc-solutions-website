// Original WordPress URL -> new route. Shared by next.config.mjs and scripts/migrate.mjs.
export const SERVICES = ["bim-information-management","clash-detection-services","revit-modeling-services","revit-4-project-delivery","training-service","ddc-subscription-service","scan-to-bim-services"];
export const PROJECT_MAP = { "david-kohn-architects": "david-kohn-architects", "stiff-trevillions": "stiff-trevillion", "ddc-higgins": "higgins" };
export const PAGE_MAP = { "": "/", "about-us-2026": "/about", "about-us": "/about", "our-team": "/team", "team": "/team", "contact-us": "/contact", "blog": "/blog", "projects": "/projects", "ddc-information-management": "/services/bim-information-management" };
export const staticRedirects = [
  ...Object.entries(PAGE_MAP).filter(([k, v]) => k && "/" + k !== v).map(([k, v]) => ({ from: "/" + k, to: v })),
  ...SERVICES.map(s => ({ from: "/" + s, to: "/services/" + s })),
  ...Object.entries(PROJECT_MAP).map(([k, v]) => ({ from: "/" + k, to: "/projects/" + v })),
];
export const mapPath = (p) => { // p = original pathname without slashes at ends
  if (p in PAGE_MAP) return PAGE_MAP[p];
  if (SERVICES.includes(p)) return "/services/" + p;
  if (p in PROJECT_MAP) return "/projects/" + PROJECT_MAP[p];
  return null;
};

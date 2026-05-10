const BRIDE_FIRST_SLUGS: string[] = [
  "rena-baskara",
];

export function isBrideFirst(slug: string): boolean {
  return BRIDE_FIRST_SLUGS.includes(slug);
}

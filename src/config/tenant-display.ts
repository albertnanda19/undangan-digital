const BRIDE_FIRST_SLUGS: string[] = [
  "baskara-rena",
];

export function isBrideFirst(slug: string): boolean {
  return BRIDE_FIRST_SLUGS.includes(slug);
}

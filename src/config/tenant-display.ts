const BRIDE_FIRST_SLUGS: string[] = [
  "rena-baskara",
];

const GUEST_SALUTATION_BELOW_DATE_SLUGS: string[] = [
  "rena-baskara",
];

export function isBrideFirst(slug: string): boolean {
  return BRIDE_FIRST_SLUGS.includes(slug);
}

export function isGuestSalutationBelowDate(slug: string): boolean {
  return GUEST_SALUTATION_BELOW_DATE_SLUGS.includes(slug);
}

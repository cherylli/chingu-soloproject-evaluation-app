// This parses urls, e.g. prepending protocol if missing
// Requirement: if no protocol is present, make it protocol-relative by prepending "//"

export const urlLinkParser = (url: string) => {
  if (!url) return '';
  const trimmed = url.trim();
  if (trimmed === '') return '';

  // If it starts with a scheme like http:, https:, mailto:, tel:, data:, etc., or already protocol-relative (//), return as-is
  if (
    /^[a-zA-Z][a-zA-Z\d+\-.]*:/.test(trimmed) ||
    trimmed.startsWith('//')
  ) {
    return trimmed;
  }

  // Otherwise, make it protocol-relative
  return `//${trimmed}`;
};

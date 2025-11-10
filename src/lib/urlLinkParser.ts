// This parses urls, e.g. prepending protocol if missing
// Requirement: if no protocol is present, make it protocol-relative by prepending "//"

export const urlLinkParser = (rawUrl: string) => {
  if (!rawUrl) return '#';
  const trimmed = rawUrl.trim();
  if (trimmed === '') return '';

  try {
    const parsed = URL.parse(trimmed);

    if (parsed) return parsed.href;

    // missing protocol, try https
    if (URL.parse(`https://${trimmed}`))
      return `https://${trimmed}`;
    // not a url at all
    return undefined;
  } catch (e) {
    console.log(e);
  }

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

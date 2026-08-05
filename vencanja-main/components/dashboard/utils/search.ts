export const normalizeSearch = (value: string): string =>
  value
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .trim();

export const compareNameSr = (a: string, b: string): number =>
  a.localeCompare(b, "sr", { sensitivity: "base", numeric: true });

export const matchesSearchQuery = (
  haystackParts: Array<string | null | undefined>,
  query: string,
): boolean => {
  const normalizedQuery = normalizeSearch(query);
  if (!normalizedQuery) return true;

  const haystack = haystackParts
    .map((part) => normalizeSearch(part ?? ""))
    .join(" ");

  return normalizedQuery.split(/\s+/).every((term) => haystack.includes(term));
};

export function filterByName<T extends { name: string }>(
  items: T[],
  keyword: string,
): T[] {
  const lowerKeyWord = keyword.trim().toLowerCase();
  if (!lowerKeyWord) return items;
  return items.filter((item) => item.name.toLowerCase().includes(keyword));
}

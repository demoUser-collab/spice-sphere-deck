/**
 * Lightweight fuzzy matching + typo tolerance used by the mock search layer.
 * Pure functions, no dependencies — safe to keep when a real backend arrives
 * (server-side search would simply replace the call site).
 */

export function normalize(s: string) {
  return s.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").trim();
}

/** Bounded Levenshtein distance (early-exits once max is exceeded). */
export function editDistance(a: string, b: string, max = 3): number {
  if (Math.abs(a.length - b.length) > max) return max + 1;
  let prev = Array.from({ length: b.length + 1 }, (_, i) => i);
  for (let i = 1; i <= a.length; i++) {
    const curr = [i];
    let rowMin = i;
    for (let j = 1; j <= b.length; j++) {
      const cost = a[i - 1] === b[j - 1] ? 0 : 1;
      curr[j] = Math.min(prev[j] + 1, curr[j - 1] + 1, prev[j - 1] + cost);
      rowMin = Math.min(rowMin, curr[j]);
    }
    if (rowMin > max) return max + 1;
    prev = curr;
  }
  return prev[b.length];
}

/** True when every character of the needle appears in order in the haystack. */
export function subsequence(needle: string, haystack: string) {
  let i = 0;
  for (const ch of haystack) if (ch === needle[i]) i++;
  return i === needle.length;
}

/**
 * Score a query term against a field. Higher is better, 0 means no match.
 */
export function scoreTerm(term: string, field: string, weight = 1): number {
  const t = normalize(term);
  const f = normalize(field);
  if (!t) return 0;
  if (f === t) return 100 * weight;
  if (f.startsWith(t)) return 70 * weight;
  if (f.includes(t)) return 50 * weight;

  // word-level typo tolerance
  const tolerance = t.length <= 4 ? 1 : t.length <= 7 ? 2 : 3;
  for (const word of f.split(/\s+/)) {
    if (editDistance(t, word, tolerance) <= tolerance) return 34 * weight;
  }
  if (t.length >= 4 && subsequence(t, f)) return 18 * weight;
  return 0;
}

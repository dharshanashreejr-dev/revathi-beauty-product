import type { Tr } from '../shared/i18n'

// One row = [English, தமிழ், हिन्दी, മലയാളം, తెలుగు]. The English text is the key
// (same convention as src/products/i18n-text.ts). Anything missing falls back to English.
export type Row = [string, string, string, string, string]

export function build(rows: Row[]): Record<string, Tr> {
  const o: Record<string, Tr> = {}
  for (const [en, ta, hi, ml, te] of rows) o[en] = { en, ta, hi, ml, te }
  return o
}

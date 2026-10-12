import type { Tr } from '../shared/i18n'

// One row = [English, தமிழ், हिन्दी, മലയാളം, తెలుగు, ಕನ್ನಡ, मराठी, বাংলা].
// The English text is the key. Anything missing falls back to English.
export type Row = [string, string, string, string, string, string?, string?, string?]

export function build(rows: Row[]): Record<string, Tr> {
  const o: Record<string, Tr> = {}
  for (const row of rows) {
    const [en, ta, hi, ml, te, kn, mr, bn] = row
    o[en] = { en, ta, hi, ml, te, kn: kn ?? en, mr: mr ?? hi ?? en, bn: bn ?? en }
  }
  return o
}

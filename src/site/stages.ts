import type { Lang } from '../shared/i18n'
import { ORDER_STAGES, APPT_STAGES, ORDER_STAGES_I18N, APPT_STAGES_I18N } from './account'

/** Order / appointment stage names in the chosen language (index = stage number). */
export const orderStages = (lang: Lang): string[] => ORDER_STAGES_I18N[lang] ?? ORDER_STAGES
export const apptStages = (lang: Lang): string[] => APPT_STAGES_I18N[lang] ?? APPT_STAGES

import type { Language, Translations } from '../types/i18n.types';
import { tr } from './tr';
import { en } from './en';

const translations: Record<Language, Translations> = {
  tr,
  en
};

export { translations };
export type { Language, Translations };
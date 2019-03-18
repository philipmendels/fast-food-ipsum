export type OrderComponent = string | PluralizableOrderComponent;

export type PluralizableOrderComponent = string | PluralMap;

interface PluralMap {
  singular: string;
  plural: string;
}

export interface TranslationMap<T> {
  nl: T;
  en: T;
}

export type Language = keyof TranslationMap<any>;

export type OrderWrapper = string | {
  start: string,
  end: string,
};

export type Omit<T, K> = Pick<T, Exclude<keyof T, K>>;

export type PartialOptions<T> = {
  [P in keyof T]?: P extends "content" ? Partial<T[P]> : T[P];
};

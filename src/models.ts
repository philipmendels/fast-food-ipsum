export type PluralizableOrderComponent = string | PluralMap;

export type OrderComponent = string | PluralizableOrderComponent;

type PluralMap = {
  singular: string;
  plural: string;
};

export type TranslationMap<T> = {
  nl: T;
  en: T;
};

export type Language = keyof TranslationMap<any>;

export type OrderWrapper = string | {
  start: string,
  end: string,
};

export type Sauce = string | {
  name: string,
  withoutProposition: boolean,
};
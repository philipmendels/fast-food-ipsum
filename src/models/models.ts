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

export type Sauce = string | {
  name: string,
  withoutProposition: boolean,
};

export type Omit<T, K> = Pick<T, Exclude<keyof T, K>>;

export interface OrderOptions {
  lang: Language;
  amountOfOrders: number;
}

import { Language, OrderWrapper, PluralizableOrderComponent, TranslationMap } from "./models/models";

export const translate = <T>(map: TranslationMap<T>, lang: Language): T => map[lang];

export const pluralize = (amount: number, component: PluralizableOrderComponent) => {
  if (amount === 1) {
    return typeof component === "string"
      ? component
      : component.singular;
  }
  return typeof component === "string"
    ? component + "s"
    : component.plural;
};

export const randomFromArray = <T>(arr: T[]): T => arr[Math.floor(Math.random() * arr.length)];

export const wrap = (orderString: string, wrapper: OrderWrapper): string =>
  typeof wrapper === "string"
    ? `${wrapper} ${orderString}.`
    : `${wrapper.start} ${orderString}${wrapper.end}`;

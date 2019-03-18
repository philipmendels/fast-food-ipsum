import {
  Language,
  OrderWrapper,
  PluralizableOrderComponent,
  TranslationMap
} from "./models/models";
import { getMultiple } from "./partial-orders";
import { MakeSentenceProps, OrderMultipleProps, OrderProps } from "./models/order-props";

export const translate = <T>(map: TranslationMap<T>, lang: Language): T =>
  map[lang];

export const pluralize = (
  amount: number,
  component: PluralizableOrderComponent
) => {
  if (amount === 1) {
    return typeof component === "string" ? component : component.singular;
  }
  return typeof component === "string" ? component + "s" : component.plural;
};

export const randomFromArray = <T>(arr: T[]): T =>
  arr[Math.floor(Math.random() * arr.length)];

export const sometimes = (threshold: number, orderFunction: () => string) =>
  Math.random() >= threshold ? orderFunction() : "";

export const getWrappedMultiple = <T extends OrderProps>(
  {
    lang,
    makeSentence,
    amountOfOrders,
    content: { concatenators, wrappers }
  }: T,
  orderFunction: () => string
) => {
  const multipleOrders = getMultiple({
    lang,
    amountOfOrders,
    orderFunction,
    content: {
      concatenators,
    }
  });
  return makeSentence 
   ? wrap(multipleOrders, translate(randomFromArray(wrappers), lang))
   : multipleOrders
};

export const wrap = (orderString: string, wrapper: OrderWrapper): string =>
  typeof wrapper === "string"
    ? `${wrapper} ${orderString}.`
    : `${wrapper.start} ${orderString}${wrapper.end}`;

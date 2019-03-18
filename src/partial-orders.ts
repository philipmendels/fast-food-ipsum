import { numbers } from "./content/numbers";
import { wrappers } from "./content/wrappers";
import { Language } from "./models/models";
import {
  AllOrderProps, FriesOrderProps, OrderAllMultipleProps,
  OrderMultipleProps, SauceOrderProps, SnackOrderProps, ToppingOrderProps,
} from "./models/order-props";
import { pluralize, randomFromArray, sometimes, translate, wrap } from "./util";

export const getRandomAmount = (lang: Language) => {
  const index = Math.floor(Math.random() * 10);
  const str = translate(numbers[index], lang);
  const nr = index + 1;
  return {
    nr,
    str,
  };
};

export const getFries = ({ lang, content: { sizes, fries } }: FriesOrderProps): string => {
  const amount = getRandomAmount(lang);
  return amount.str + " " +
    translate(randomFromArray(sizes), lang) + " " + translate(randomFromArray(fries), lang);
};

export const getSnack = ({ lang, content: { containers, adjectives, snacks } }: SnackOrderProps): string => {
  const amount = getRandomAmount(lang);
  return [
    amount.str,
    pluralize(amount.nr, translate(randomFromArray(containers), lang)),
    translate(randomFromArray(adjectives), lang),
    randomFromArray(snacks),
  ].join(" ");
};

export const getSauce = ({ content: { sauces } }: SauceOrderProps): string => {
  return randomFromArray(sauces);
};

export const getTopping = ({ lang, content: { prepositions, toppings } }: ToppingOrderProps): string => [
  translate(randomFromArray(prepositions), lang),
  translate(randomFromArray(toppings), lang),
].join(" ");

export const getAll = ({
  lang, content: { adjectives, containers, toppings, prepositions, fries, sauces, sizes, snacks },
}: AllOrderProps): string => {
  const orderToppingFn = () => getTopping({ lang, content: { prepositions, toppings } });
  const orderSauceFn = () => getSauce({ content: { sauces } });
  const orderList: string[] = [
    getFries({ lang, content: { sizes, fries } }),
    sometimes(0.1, orderSauceFn),
    sometimes(0.7, orderToppingFn),
    lang === "nl" ? "en" : "and",
    getSnack({ lang, content: { snacks, containers, adjectives } }),
    sometimes(0.8, orderSauceFn),
    sometimes(0.8, orderToppingFn),
  ];
  return orderList.join(" ").trim().replace(/[ ]{2,}/g, " ");
};

export const getMultiple = ({ lang, amountOfOrders, concatenators, orderFunction }: OrderMultipleProps): string =>
  new Array(amountOfOrders - 1).fill(0).reduce(
    (prev) => prev + " " + translate(randomFromArray(concatenators), lang) + " " + orderFunction(),
    orderFunction(),
  );

export const getAllMultiple = ({
  lang, amountOfOrders,
  content: {
    adjectives, concatenators, containers, fries,
    prepositions, sauces, sizes, snacks, toppings,
  },
}: OrderAllMultipleProps): string => {
  const orderFunction = () => getAll({
    lang, content: {
      sizes, fries, containers, adjectives,
      snacks, prepositions, sauces, toppings,
    },
  });
  const multipleOrders = getMultiple({
    lang,
    concatenators,
    amountOfOrders,
    orderFunction,
  });
  const wrapper = translate(randomFromArray(wrappers), lang);
  return wrap(multipleOrders, wrapper);
};

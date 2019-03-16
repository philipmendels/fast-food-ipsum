import { adjectives } from "./content/adjectives";
import { concatenators } from "./content/concatenators";
import { containers } from "./content/containers";
import { fries } from "./content/fries";
import { numbers } from "./content/numbers";
import { prepositions } from "./content/prepositions";
import { sauces } from "./content/sauces";
import { sizes } from "./content/sizes";
import { snacks } from "./content/snacks";
import { toppings } from "./content/toppings";
import { wrappers } from "./content/wrappers";
import { Language, OrderOptions } from "./models/models";
import {
  AllOrderProps, FriesOrderProps, OrderMultipleProps,
  SauceOrderProps, SnackOrderProps, ToppingOrderProps,
} from "./models/order-props";
import { pluralize, randomFromArray, translate, wrap } from "./util";

export const orderFries = (props: FriesOrderProps): string => {
  const amount = getAmount(props.lang);
  return amount.str + " " +
  translate(randomFromArray(props.sizes), props.lang) + " " + translate(randomFromArray(props.fries), props.lang);
};

export const orderSnack = (props: SnackOrderProps): string => {
  const amount = getAmount(props.lang);
  return [
    amount.str,
    pluralize(amount.nr, translate(randomFromArray(props.containers), props.lang)),
    translate(randomFromArray(props.adjectives), props.lang),
    randomFromArray(props.snacks),
  ].join(" ");
};

export const getAmount = (lang: Language) => {
  const index = Math.floor(Math.random() * 10);
  const str = translate(numbers[index], lang);
  const nr = index + 1;
  return {
    nr,
    str,
  };
};

export const orderSauce = (props: SauceOrderProps): string => {
  return randomFromArray(props.sauces);
};

export const orderTopping = (props: ToppingOrderProps): string => [
  translate(randomFromArray(props.prepositions), props.lang),
  translate(randomFromArray(props.toppings), props.lang),
].join(" ");

export const orderAll = (props: AllOrderProps): string => {
  const { lang } = props;
  const orderList: string[] = [
    orderFries({ lang, sizes: props.sizes, fries: props.fries }),
    orderSauce({ sauces: props.sauces }),
    lang === "nl" ? "en" : "and",
    orderSnack({lang, snacks: props.snacks, containers: props.containers, adjectives: props.adjectives }),
    orderTopping({ lang, prepositions: props.prepositions, toppings: props.toppings }),
  ];
  return orderList.join(" ");
};

export const orderMultiple = (props: OrderMultipleProps): string =>
  new Array(props.amountOfOrders - 1).fill(0).reduce(
    (prev) =>
      prev + " " +
      translate(randomFromArray(props.concatenators), props.lang) + " " +
      props.orderFunction()
    , props.orderFunction(),
  );

export const defaultOptions: OrderOptions = {
  lang: "nl",
  amountOfOrders: 1,
};

export const mergeOptions = (defaults: OrderOptions, options?: Partial<OrderOptions>) => ({
  ...defaults,
  ...options,
});

export const order = (options?: Partial<OrderOptions>): string => {
  const mergedOptions = mergeOptions(defaultOptions, options);
  const orderFunction = () => orderAll({
    lang: mergedOptions.lang,
    sizes,
    fries,
    containers,
    adjectives,
    snacks,
    prepositions,
    sauces,
    toppings,
  });
  const multipleOrders = orderMultiple({
    lang: mergedOptions.lang,
    concatenators,
    amountOfOrders: mergedOptions.amountOfOrders,
    orderFunction,
  });
  const wrapper = translate(randomFromArray(wrappers), mergedOptions.lang);
  return wrap(multipleOrders, wrapper);
};

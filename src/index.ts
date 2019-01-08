import { adjectives } from "./content/adjectives";
import { concatenators } from "./content/concatenators";
import { containers } from "./content/containers";
import { fries } from "./content/fries";
import { numbers } from "./content/numbers";
import { prepositions } from "./content/prepositions";
import { sauces } from "./content/sauces";
import { snacks } from "./content/snacks";
import { toppings } from "./content/toppings";
import { wrappers } from "./content/wrappers";
import { OrderOptions } from "./models/models";
import {
  AllOrderProps, FriesOrderProps, OrderMultipleProps,
  SauceOrderProps, SnackOrderProps, ToppingOrderProps,
} from "./models/order-props";
import { pluralize, randomFromArray, translate, wrap } from "./util";

export const orderFriesOrSnack = (props: SnackOrderProps & FriesOrderProps): string => {
  const whatToOrder = Math.random() > 0.7 ? "snack" : "fries";
  const { amount, lang } = props;
  return whatToOrder === "fries"
    ? orderFries({ lang, amount, fries: props.fries })
    : orderSnack({
      lang, amount, containers: props.containers, adjectives: props.adjectives, snacks: props.snacks,
    });
};

export const orderFries = (props: FriesOrderProps): string =>
  pluralize(props.amount, translate(randomFromArray(props.fries), props.lang));

export const orderSnack = (props: SnackOrderProps): string =>
  [
    pluralize(props.amount, translate(randomFromArray(props.containers), props.lang)),
    translate(randomFromArray(props.adjectives), props.lang),
    randomFromArray(props.snacks),
  ].join(" ");

export const orderSauce = (props: SauceOrderProps): string => {
  const sauce = randomFromArray(props.sauces);
  const saucePrepositionStr = translate(randomFromArray(props.prepositions), props.lang);
  return typeof sauce === "string"
    ? saucePrepositionStr + " " + sauce
    : sauce.withoutProposition
      ? sauce.name
      : saucePrepositionStr + " " + sauce.name;
};

export const orderTopping = (props: ToppingOrderProps): string => [
  translate(randomFromArray(props.prepositions), props.lang),
  translate(randomFromArray(props.toppings), props.lang),
].join(" ");

export const orderAll = (props: AllOrderProps): string => {
  const amount = Math.ceil(Math.random() * 10);
  const amountString = translate(numbers[amount - 1], props.lang);
  const { lang } = props;
  const orderList: string[] = [
    amountString,
    orderFriesOrSnack({
      lang, amount, fries: props.fries, snacks: props.snacks,
      adjectives: props.adjectives, containers: props.containers,
    }),
    orderSauce({ lang, prepositions: props.prepositions, sauces: props.sauces }),
    orderTopping({ lang, prepositions: props.prepositions, toppings: props.toppings }),
  ];
  return orderList.join(" ");
};

export const orderMultiple = (props: OrderMultipleProps): string =>
  new Array(props.amountOfOrders - 1).fill(0).reduce(
    (prev) =>
      prev + " " +
      translate(randomFromArray(props.concatenators), props.allOrderProps.lang) + " " +
      orderAll(props.allOrderProps)
    , orderAll(props.allOrderProps),
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
  const allOrderProps: AllOrderProps = {
    lang: mergedOptions.lang,
    fries,
    containers,
    adjectives,
    snacks,
    prepositions,
    sauces,
    toppings,
  };
  const multipleOrders = orderMultiple({
    allOrderProps,
    concatenators,
    amountOfOrders: mergedOptions.amountOfOrders,
  });
  const wrapper = translate(randomFromArray(wrappers), mergedOptions.lang);
  return wrap(multipleOrders, wrapper);
};

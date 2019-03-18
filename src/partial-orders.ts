import { numbers } from "./content/numbers";
import { Language } from "./models/models";
import {
  AllOrderProps,
  FriesOrderProps,
  OrderMultipleProps,
  SauceOrderProps,
  SnackOrderProps,
  ToppingOrderProps
} from "./models/order-props";
import {
  pluralize,
  randomFromArray,
  sometimes,
  translate,
  wrap,
  getWrappedMultiple
} from "./util";

export const getRandomAmount = (lang: Language) => {
  const index = Math.floor(Math.random() * 10);
  const str = translate(numbers[index], lang);
  const nr = index + 1;
  return {
    nr,
    str
  };
};

export const getFries = (props: FriesOrderProps): string => {
  const {
    lang,
    content: { sizes, fries }
  } = props;
  const amount = getRandomAmount(lang);
  const orderFunction = () =>
    [
      amount.str,
      translate(randomFromArray(sizes), lang),
      translate(randomFromArray(fries), lang)
    ].join(" ");
  return getWrappedMultiple(props, orderFunction);
};

export const getSnack = (props: SnackOrderProps): string => {
  const {
    lang,
    content: { containers, adjectives, snacks }
  } = props;
  const amount = getRandomAmount(lang);
  const orderFunction = () =>
    [
      amount.str,
      pluralize(amount.nr, translate(randomFromArray(containers), lang)),
      translate(randomFromArray(adjectives), lang),
      randomFromArray(snacks)
    ].join(" ");
  return getWrappedMultiple(props, orderFunction);
};

export const getSauce = (props: SauceOrderProps): string =>
  getWrappedMultiple(props, () => randomFromArray(props.content.sauces));

export const getTopping = ({
  lang,
  content: { prepositions, toppings }
}: ToppingOrderProps): string =>
  [
    translate(randomFromArray(prepositions), lang),
    translate(randomFromArray(toppings), lang)
  ].join(" ");

export const getAll = (props: AllOrderProps): string => {
  const {
    lang,
    content: {
      wrappers,
      concatenators,
      adjectives,
      containers,
      toppings,
      prepositions,
      fries,
      sauces,
      sizes,
      snacks
    }
  } = props;
  const orderToppingFn = () =>
    getTopping({
      lang,
      content: { prepositions, toppings }
    });
  const orderSauceFn = () =>
    getSauce({
      lang,
      amountOfOrders: 1,
      makeSentence: false,
      content: { wrappers, concatenators, sauces }
    });
  const orderFunction = () =>
    [
      getFries({
        lang,
        amountOfOrders: 1,
        makeSentence: false,
        content: { wrappers, concatenators, sizes, fries }
      }),
      sometimes(0.1, orderSauceFn),
      sometimes(0.7, orderToppingFn),
      lang === "nl" ? "en" : "and",
      getSnack({
        lang,
        amountOfOrders: 1,
        makeSentence: false,
        content: { wrappers, concatenators, snacks, containers, adjectives }
      }),
      sometimes(0.8, orderSauceFn),
      sometimes(0.8, orderToppingFn)
    ]
      .join(" ")
      .trim()
      .replace(/[ ]{2,}/g, " ");

  return getWrappedMultiple(props, orderFunction);
};

export const getMultiple = ({
  lang,
  amountOfOrders,
  orderFunction,
  content: { concatenators }
}: OrderMultipleProps): string =>
  new Array(amountOfOrders - 1)
    .fill(0)
    .reduce(
      prev =>
        prev +
        " " +
        translate(randomFromArray(concatenators), lang) +
        " " +
        orderFunction(),
      orderFunction()
    );

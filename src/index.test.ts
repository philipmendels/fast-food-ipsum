import {
  mergeOptions, order, orderAll, orderFries, orderFriesOrSnack,
  orderMultiple, orderSauce, orderSnack, orderTopping,
} from ".";
import { adjectives } from "./content/adjectives";
import { concatenators } from "./content/concatenators";
import { containers } from "./content/containers";
import { fries } from "./content/fries";
import { prepositions } from "./content/prepositions";
import { sauces } from "./content/sauces";
import { snacks } from "./content/snacks";
import { toppings } from "./content/toppings";
import { wrappers } from "./content/wrappers";
import { AllOrderProps, FriesOrderProps, SnackOrderProps, SnackOrFriesOrderProps } from "./models/order-props";
import { randomFromArray, translate, wrap } from "./util";

test("Order fries", () => {
  expect(orderFries({
    lang: "nl",
    fries: [{ nl: "patatje", en: "fries" }],
    amount: 2,
  })).toEqual("patatjes");
});

test("Order snack", () => {
  expect(orderSnack({
    lang: "nl",
    containers: [{ nl: "emmer", en: "bucket" }],
    adjectives: [{ nl: "rauwe", en: "raw" }],
    snacks: ["kroket"],
    amount: 2,
  })).toEqual("emmers rauwe kroket");
});

const snackAndFriesProps: SnackOrFriesOrderProps = {
  lang: "nl",
  fries: [{ nl: "patatje", en: "fries" }],
  containers: [{ nl: "emmer", en: "bucket" }],
  adjectives: [{ nl: "rauwe", en: "raw" }],
  snacks: ["kroket"],
};

test("Order fries or snack: snack", () => {
  Math.random = () => 0.8;
  expect(orderFriesOrSnack(snackAndFriesProps)).toEqual("acht emmers rauwe kroket");
});

test("Order fries or snack: fries", () => {
  Math.random = () => 0.6;
  expect(orderFriesOrSnack(snackAndFriesProps)).toEqual("zes patatjes");
});

test("Order sauce with preposition", () => {
  expect(orderSauce({
    lang: "en",
    prepositions: [{ nl: "met extra", en: "with extra" }],
    sauces: ["mayonaise"],
  })).toEqual("with extra mayonaise");
});

test("Order sauce as object with preposition", () => {
  expect(orderSauce({
    lang: "en",
    prepositions: [{ nl: "met extra", en: "with extra" }],
    sauces: [{ name: "mayonaise", withoutProposition: false }],
  })).toEqual("with extra mayonaise");
});

test("Order sauce without preposition", () => {
  expect(orderSauce({
    lang: "en",
    prepositions: [{ nl: "met extra", en: "with extra" }],
    sauces: [{ name: "mayonaise", withoutProposition: true }],
  })).toEqual("mayonaise");
});

test("Order topping", () => {
  expect(orderTopping({
    lang: "en",
    prepositions: [{ nl: "met extra", en: "with extra" }],
    toppings: [{ nl: "hagelslag", en: "chocolate sprinkles" }],
  })).toEqual("with extra chocolate sprinkles");
});

test("Order all", () => {
  Math.random = () => 0.8;
  expect(orderAll({
    lang: "en",
    containers: snackAndFriesProps.containers,
    adjectives: snackAndFriesProps.adjectives,
    snacks: snackAndFriesProps.snacks,
    fries: snackAndFriesProps.fries,
    sauces: [{ name: "mayonaise", withoutProposition: true }],
    prepositions: [{ nl: "met extra", en: "with extra" }],
    toppings: [{ nl: "hagelslag", en: "chocolate sprinkles" }],
  })).toEqual("eight buckets raw kroket mayonaise with extra chocolate sprinkles");
});

const allOrderProps: AllOrderProps = {
  lang: "en",
  containers: snackAndFriesProps.containers,
  adjectives: snackAndFriesProps.adjectives,
  snacks: snackAndFriesProps.snacks,
  fries: snackAndFriesProps.fries,
  sauces: [{ name: "mayonaise", withoutProposition: true }],
  prepositions: [{ nl: "met extra", en: "with extra" }],
  toppings: [{ nl: "hagelslag", en: "chocolate sprinkles" }],
};

const expected = "eight buckets raw kroket mayonaise with extra chocolate sprinkles";

test("Order all", () => {
  Math.random = () => 0.8;
  expect(orderAll(allOrderProps))
    .toEqual(expected);
});

test("Order multiple 1", () => {
  Math.random = () => 0.8;
  expect(orderMultiple({ allOrderProps, amountOfOrders: 1, concatenators: [{ nl: "en", en: "and" }] }))
    .toEqual(expected);
});

test("Order multiple 2", () => {
  Math.random = () => 0.8;
  expect(orderMultiple({ allOrderProps, amountOfOrders: 2, concatenators: [{ nl: "en", en: "and" }] }))
    .toEqual(`${expected} and ${expected}`);
});

test("Merge options without options", () => {
  expect(mergeOptions({ lang: "nl", amountOfOrders: 1 }))
    .toEqual({ lang: "nl", amountOfOrders: 1 });
});

test("Merge options with empty options", () => {
  expect(mergeOptions({ lang: "nl", amountOfOrders: 1 }, {}))
    .toEqual({ lang: "nl", amountOfOrders: 1 });
});

test("Merge options with override", () => {
  expect(mergeOptions({ lang: "nl", amountOfOrders: 1}, { lang: "en" }))
    .toEqual({ lang: "en", amountOfOrders: 1 });
});

test("order", () => {
  const aop: AllOrderProps = {
    lang: "nl",
    fries,
    containers,
    adjectives,
    snacks,
    prepositions,
    sauces,
    toppings,
  };
  const multipleOrders = orderMultiple({
    allOrderProps: aop,
    concatenators,
    amountOfOrders: 1,
  });
  const wrapper = translate(randomFromArray(wrappers), "nl");
  const wrapped = wrap(multipleOrders, wrapper);
  expect(order()).toEqual(wrapped);
});

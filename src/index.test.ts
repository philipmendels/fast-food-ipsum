// import {
//   getRandomAmount, mergeOptions, orderAllMultiple, orderAll,
//   orderFries, orderAllMultiple, orderSauce, orderSnack, orderTopping,
// } from ".";
// import { adjectives } from "./content/adjectives";
// import { concatenators } from "./content/concatenators";
// import { containers } from "./content/containers";
// import { fries } from "./content/fries";
// import { prepositions } from "./content/prepositions";
// import { sauces } from "./content/sauces";
// import { sizes } from "./content/sizes";
// import { snacks } from "./content/snacks";
// import { toppings } from "./content/toppings";
// import { wrappers } from "./content/wrappers";
// import { AllOrderProps } from "./models/order-props";
// import { randomFromArray, translate, wrap } from "./util";

// test("get amount 1", () => {
//   Math.random = () => 0;
//   expect(getRandomAmount("en")).toEqual({nr: 1, str: "one"});
// });

// test("get amount 10", () => {
//   Math.random = () => 0.999;
//   expect(getRandomAmount("en")).toEqual({nr: 10, str: "ten"});
// });

// test("Order fries", () => {
//   Math.random = () => 0;
//   expect(orderFries({
//     lang: "nl",
//     sizes: [{ nl: "grote", en: "large"}],
//     fries: [{ nl: "patat", en: "fries" }],
//   })).toEqual("één grote patat");
// });

// test("Order snack", () => {
//   Math.random = () => 0;
//   expect(orderSnack({
//     lang: "en",
//     containers: [{ nl: "emmer", en: "bucket" }],
//     adjectives: [{ nl: "rauwe", en: "raw" }],
//     snacks: ["kroket"],
//   })).toEqual("one bucket raw kroket");
// });

// test("Order sauce", () => {
//   expect(orderSauce({
//     sauces: ["mayonaise"],
//   })).toEqual("mayonaise");
// });

// test("Order topping", () => {
//   expect(orderTopping({
//     lang: "en",
//     prepositions: [{ nl: "met extra", en: "with extra" }],
//     toppings: [{ nl: "hagelslag", en: "chocolate sprinkles" }],
//   })).toEqual("with extra chocolate sprinkles");
// });

// const allOrderProps: AllOrderProps = {
//   lang: "en",
//   sizes: [{ nl: "grote", en: "large"}],
//   fries: [{ nl: "patatje", en: "fries" }],
//   containers: [{ nl: "emmer", en: "bucket" }],
//   adjectives: [{ nl: "rauwe", en: "raw" }],
//   snacks: ["kroket"],
//   sauces: ["mayonaise"],
//   prepositions: [{ nl: "met extra", en: "with extra" }],
//   toppings: [{ nl: "hagelslag", en: "chocolate sprinkles" }],
// };

// const expected = "nine large fries mayonaise and nine buckets raw kroket with extra chocolate sprinkles";

// test("Order all", () => {
//   Math.random = () => 0.8;
//   expect(orderAll(allOrderProps))
//     .toEqual(expected);
// });

// test("Order multiple 1", () => {
//   const orderFunction = () => orderAll(allOrderProps);
//   Math.random = () => 0.8;
//   expect(orderAllMultiple({ orderFunction, amountOfOrders: 1, concatenators: [{ nl: "en", en: "and" }], lang: "en" }))
//     .toEqual(expected);
// });

// test("Order multiple 2", () => {
//   const orderFunction = () => orderAll(allOrderProps);
//   Math.random = () => 0.8;
//   expect(orderAllMultiple({ orderFunction, amountOfOrders: 2, concatenators: [{ nl: "en", en: "and" }], lang: "en" }))
//     .toEqual(`${expected} and ${expected}`);
// });

// test("Merge options without options", () => {
//   expect(mergeOptions({ lang: "nl", amountOfOrders: 1 }))
//     .toEqual({ lang: "nl", amountOfOrders: 1 });
// });

// test("Merge options with empty options", () => {
//   expect(mergeOptions({ lang: "nl", amountOfOrders: 1 }, {}))
//     .toEqual({ lang: "nl", amountOfOrders: 1 });
// });

// test("Merge options with override", () => {
//   expect(mergeOptions({ lang: "nl", amountOfOrders: 1 }, { lang: "en" }))
//     .toEqual({ lang: "en", amountOfOrders: 1 });
// });

// test("order", () => {
//   const orderFunction = () => orderAll({
//     lang: "nl",
//     sizes,
//     fries,
//     containers,
//     adjectives,
//     snacks,
//     prepositions,
//     sauces,
//     toppings,
//   });
//   const multipleOrders = orderAllMultiple({
//     orderFunction,
//     concatenators,
//     amountOfOrders: 1,
//     lang: "nl",
//   });
//   const wrapper = translate(randomFromArray(wrappers), "nl");
//   const wrapped = wrap(multipleOrders, wrapper);
//   expect(orderAllMultiple()).toEqual(wrapped);
// });

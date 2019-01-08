import { OrderWrapper, PluralizableOrderComponent } from "./models/models";
import { pluralize, randomFromArray, translate, wrap } from "./util";

test("Translate", () => {
  expect(translate({
    en: "hallo",
    nl: "hi",
  }, "nl")).toEqual("hi");
});

test("Pluralize object", () => {
  const component: PluralizableOrderComponent = {
    singular: "puntzak",
    plural: "puntzakken",
  };
  expect(pluralize(0, component)).toEqual("puntzakken");
  expect(pluralize(1, component)).toEqual("puntzak");
  expect(pluralize(2, component)).toEqual("puntzakken");

  const component2: PluralizableOrderComponent = "appel";
  expect(pluralize(1, component2)).toEqual("appel");
  expect(pluralize(2, component2)).toEqual("appels");
});

test("Pluralize string with default + s", () => {
  const component: PluralizableOrderComponent = "appel";
  expect(pluralize(1, component)).toEqual("appel");
  expect(pluralize(2, component)).toEqual("appels");
});

test("Wrap with start and word at end.", () => {
  const wrapper: OrderWrapper = {
    start: "Can you hand me the",
    end: " please?",
  };
  expect(wrap("mayonaise", wrapper)).toEqual("Can you hand me the mayonaise please?");
});

test("Wrap with start and only punctuation at end.", () => {
  const wrapper: OrderWrapper = {
    start: "Can you hand me the",
    end: "?",
  };
  expect(wrap("mayonaise", wrapper)).toEqual("Can you hand me the mayonaise?");
});

test("Wrap with default '.' at the end", () => {
  const wrapper: OrderWrapper = "I would like to have the";
  expect(wrap("mayonaise", wrapper)).toEqual("I would like to have the mayonaise.");
});

test("Random from array", () => {
  Math.random = () => 0.5;
  expect(randomFromArray(["curry", "mayonaise", "mustard"])).toEqual("mayonaise");
});

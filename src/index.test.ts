import { pluralize, translate } from ".";
import { PluralizableOrderComponent } from "./models";

test("translate", () => {
  expect(translate({
    en: "hallo",
    nl: "hi",
  }, "nl")).toEqual("hi");
});

test("pluralize", () => {
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

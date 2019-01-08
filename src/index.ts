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
import { Language } from "./models";
import { pluralize, randomFromArray, translate, wrap } from "./util";

const orderPart = (lang: Language): string => {
  const amount = Math.ceil(Math.random() * 10);
  const amountString = translate(numbers[amount - 1], lang);

  const orderFries = Math.random() > 0.7 ? true : false;
  const adjective = translate(randomFromArray(adjectives), lang);
  const friesOrContainer = orderFries
    ? pluralize(amount, translate(randomFromArray(fries), lang))
    : [
      pluralize(amount, translate(randomFromArray(containers), lang)),
      adjective,
      randomFromArray(snacks),
    ].join(" ");

  const sauce = randomFromArray(sauces);
  const saucePrepositionStr = translate(randomFromArray(prepositions), lang);
  const sauceString = typeof sauce === "string"
    ? saucePrepositionStr + " " + sauce
    : sauce.withoutProposition
      ? sauce.name
      : saucePrepositionStr + " " + sauce.name;

  const orderList: string[] = [
    amountString,
    friesOrContainer,
    sauceString,
    translate(randomFromArray(prepositions), lang),
    translate(randomFromArray(toppings), lang),
  ];

  return orderList.join(" ");
};

export const order = (lang: Language = "nl"): string => {

  const orderLength = 5;
  const orderString = new Array<string>(orderLength - 1).fill("").reduce(
    (prev, curr, index) => prev + " " + translate(randomFromArray(concatenators), lang) + " " + orderPart(lang),
    orderPart(lang),
  );

  return wrap(orderString, translate(randomFromArray(wrappers), lang));
};

import { containers } from "./content/containers";
import { snacks } from "./content/snacks";
import { sauces } from "./content/sauces";
import { Language, TranslationMap, PluralizableOrderComponent, OrderComponent, OrderWrapper } from "./models";
import { numbers } from "./content/numbers";
import { adjectives } from "./content/adjectives";
import { wrappers } from "./content/wrappers";
import { concatenators } from "./content/concatenators";
import { fries } from "./content/fries";
import { prepositions } from "./content/prepositions";
import { toppings } from "./content/toppings";

const randomFromArray = <T>(arr: T[]): T => arr[Math.floor(Math.random() * arr.length)];

const translate = <T>(map: TranslationMap<T>, lang: Language): T => map[lang];

const pluralize = (amount: number, component: PluralizableOrderComponent) => {
  if (amount === 1) {
    return typeof component === 'string'
      ? component
      : component.singular;
  }
  return typeof component === 'string'
    ? component + 's'
    : component.plural;
};

const wrap = (order: string, wrapper: OrderWrapper): string =>
  typeof wrapper === 'string'
    ? `${wrapper} ${order}.`
    : `${wrapper.start} ${order}${wrapper.end}`;



const orderPart = (lang: Language = 'nl'): string => {
  const amount = Math.ceil(Math.random() * 10);
  const amountString = translate(numbers[amount - 1], lang);

  const orderFries = Math.random() > 0.7 ? true : false;
  const adjective = translate(randomFromArray(adjectives), lang);
  const friesOrContainer = orderFries
    ? pluralize(amount, translate(randomFromArray(fries), lang))
    : [
      pluralize(amount, translate(randomFromArray(containers), lang)),
      adjective,
      randomFromArray(snacks)
    ].join(' ');

  const sauce = randomFromArray(sauces);
  const saucePrepositionStr = translate(randomFromArray(prepositions), lang);
  const sauceString = typeof sauce === 'string'
    ? saucePrepositionStr + ' ' + sauce
    : sauce.withoutProposition
      ? sauce.name
      : saucePrepositionStr + ' ' + sauce.name;

  const orderList: string[] = [
    amountString,
    friesOrContainer,
    sauceString,
    translate(randomFromArray(prepositions), lang),
    translate(randomFromArray(toppings), lang)
  ];

  return orderList.join(' ');
};

export const order = (lang: Language = 'nl'): string => {

  const orderLength = 5;
  const order = new Array<string>(orderLength - 1).fill('').reduce((prev, curr, index) => prev + ' ' + translate(randomFromArray(concatenators), lang) + ' ' + orderPart(lang), orderPart(lang));

  return wrap(order, translate(randomFromArray(wrappers), lang));
}

new Array(1).fill(0).forEach(() => console.log(order()));

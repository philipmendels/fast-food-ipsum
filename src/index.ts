import { adjectives } from "./content/adjectives";
import { concatenators } from "./content/concatenators";
import { containers } from "./content/containers";
import { fries } from "./content/fries";
import { prepositions } from "./content/prepositions";
import { sauces } from "./content/sauces";
import { sizes } from "./content/sizes";
import { snacks } from "./content/snacks";
import { toppings } from "./content/toppings";
import { wrappers } from "./content/wrappers";
import { Language, PartialOptions } from "./models/models";
import {
  AllOrderProps, FriesOrderProps, SauceOrderProps, SnackOrderProps, ToppingOrderProps,
} from "./models/order-props";
import { getAll, getFries, getSauce, getSnack, getTopping } from "./partial-orders";

// defaults:
const lang: Language = "nl";
const makeSentence = true;
const amountOfOrders = 1;

export const orderFries = (options?: PartialOptions<FriesOrderProps>): string => getFries({
  lang,
  amountOfOrders,
  makeSentence,
  ...options,
  content: {
    wrappers,
    concatenators,
    fries,
    sizes,
    ...(options && options.content),
  },
});

export const orderSnack = (options?: PartialOptions<SnackOrderProps>): string => getSnack({
  lang,
  amountOfOrders,
  makeSentence,
  ...options,
  content: {
    wrappers,
    concatenators,
    adjectives,
    containers,
    snacks,
    ...(options && options.content),
  },
});

export const orderSauce = (options?: PartialOptions<SauceOrderProps>): string => getSauce({
  lang,
  amountOfOrders,
  makeSentence,
  ...options,
  content: {
    wrappers,
    concatenators,
    sauces,
    ...(options && options.content),
  },
});

export const orderTopping = (options?: PartialOptions<ToppingOrderProps>): string => getTopping({
  lang,
  ...options,
  content: {
    prepositions,
    toppings,
    ...(options && options.content),
  },
});

export const orderAll = (options?: PartialOptions<AllOrderProps>): string => getAll({
  lang,
  amountOfOrders,
  makeSentence,
  ...options,
  content: {
    wrappers,
    concatenators,
    adjectives,
    containers,
    fries,
    prepositions,
    sauces,
    sizes,
    snacks,
    toppings,
    ...(options && options.content),
  },
});

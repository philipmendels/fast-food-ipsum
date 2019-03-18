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
  AllOrderProps, FriesOrderProps,
  OrderAllMultipleProps, SauceOrderProps, SnackOrderProps, ToppingOrderProps,
} from "./models/order-props";
import { getAll, getAllMultiple, getFries, getSauce, getSnack, getTopping } from "./partial-orders";

// defaults:
const lang: Language = "nl";
const amountOfOrders = 1;

export const orderFries = (options?: PartialOptions<FriesOrderProps>): string => getFries({
  lang,
  ...options,
  content: {
    fries,
    sizes,
    ...(options && options.content),
  },
});

export const orderSnack = (options?: PartialOptions<SnackOrderProps>): string => getSnack({
  lang,
  ...options,
  content: {
    adjectives,
    containers,
    snacks,
    ...(options && options.content),
  },
});

export const orderSauce = (options?: PartialOptions<SauceOrderProps>): string => getSauce({
  ...options,
  content: {
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
  ...options,
  content: {
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

export const orderAllMultiple = (options?: PartialOptions<OrderAllMultipleProps>): string => getAllMultiple({
  lang,
  amountOfOrders,
  ...options,
  content: {
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

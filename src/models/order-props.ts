import { adjectives } from "../content/adjectives";
import { concatenators } from "../content/concatenators";
import { containers } from "../content/containers";
import { fries } from "../content/fries";
import { prepositions } from "../content/prepositions";
import { sauces } from "../content/sauces";
import { sizes } from "../content/sizes";
import { snacks } from "../content/snacks";
import { toppings } from "../content/toppings";
import { Language, Omit } from "./models";

export interface FriesOrderProps {
  lang: Language;
  content: {
    sizes: typeof sizes;
    fries: typeof fries;
  };
}

export interface SnackOrderProps {
  lang: Language;
  content: {
    containers: typeof containers;
    adjectives: typeof adjectives;
    snacks: typeof snacks;
  };
}

export interface SauceOrderProps {
  content: {
    sauces: typeof sauces;
  };
}

export interface ToppingOrderProps {
  lang: Language;
  content: {
    prepositions: typeof prepositions;
    toppings: typeof toppings;
  };
}

export interface AllOrderProps {
  lang: Language;
  content: FriesOrderProps["content"] & SnackOrderProps["content"] &
  SauceOrderProps["content"] & ToppingOrderProps["content"];
}

export interface OrderMultipleProps {
  lang: Language;
  amountOfOrders: number;
  concatenators: typeof concatenators;
  orderFunction: () => string;
}

export interface OrderAllMultipleProps {
  lang: Language;
  amountOfOrders: number;
  content: {
    concatenators: typeof concatenators;
  } & AllOrderProps["content"];
}

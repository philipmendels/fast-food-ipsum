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
  sizes: typeof sizes;
  fries: typeof fries;
}

export interface SnackOrderProps {
  lang: Language;
  containers: typeof containers;
  adjectives: typeof adjectives;
  snacks: typeof snacks;
}

export interface SauceOrderProps {
  sauces: typeof sauces;
}

export interface ToppingOrderProps {
  lang: Language;
  prepositions: typeof prepositions;
  toppings: typeof toppings;
}

export type AllOrderProps = Omit<
  FriesOrderProps & SnackOrderProps & SauceOrderProps & ToppingOrderProps,
  "amount"
>;

export interface OrderMultipleProps {
  lang: Language;
  amountOfOrders: number;
  concatenators: typeof concatenators;
  orderFunction: () => string;
}

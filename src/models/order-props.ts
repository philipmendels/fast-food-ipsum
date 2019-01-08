import { adjectives } from "../content/adjectives";
import { concatenators } from "../content/concatenators";
import { containers } from "../content/containers";
import { fries } from "../content/fries";
import { prepositions } from "../content/prepositions";
import { sauces } from "../content/sauces";
import { snacks } from "../content/snacks";
import { toppings } from "../content/toppings";
import { Language, Omit } from "./models";

export interface FriesOrderProps {
  lang: Language;
  fries: typeof fries;
  amount: number;
}

export interface SnackOrderProps {
  lang: Language;
  containers: typeof containers;
  adjectives: typeof adjectives;
  snacks: typeof snacks;
  amount: number;
}

export type SnackOrFriesOrderProps = Omit<SnackOrderProps & FriesOrderProps, "amount">;

export interface SauceOrderProps {
  lang: Language;
  prepositions: typeof prepositions;
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
  allOrderProps: AllOrderProps;
  amountOfOrders: number;
  concatenators: typeof concatenators;
}

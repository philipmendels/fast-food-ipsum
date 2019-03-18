import { adjectives } from "../content/adjectives";
import { concatenators } from "../content/concatenators";
import { containers } from "../content/containers";
import { fries } from "../content/fries";
import { prepositions } from "../content/prepositions";
import { sauces } from "../content/sauces";
import { sizes } from "../content/sizes";
import { snacks } from "../content/snacks";
import { toppings } from "../content/toppings";
import { Language } from "./models";
import { wrappers } from "../content/wrappers";

interface GenericProps {
  lang: Language;
};

export interface MakeSentenceProps extends GenericProps {
  order: string;
  content: {
    wrappers: typeof wrappers;
  }
}

export interface OrderMultipleProps extends GenericProps {
  amountOfOrders: number;
  orderFunction: () => string;
  content: {
    concatenators: typeof concatenators;
  }
}

type GenericContent = MakeSentenceProps["content"] & OrderMultipleProps["content"];

export type OrderProps = GenericProps & {
  amountOfOrders: number;
  makeSentence: boolean;
  content: GenericContent;
}

export interface FriesOrderProps extends OrderProps {
  content: {
    sizes: typeof sizes;
    fries: typeof fries;
  } & GenericContent;
}

export interface SnackOrderProps extends OrderProps {
  content: {
    containers: typeof containers;
    adjectives: typeof adjectives;
    snacks: typeof snacks;
  } & GenericContent;
}

export interface SauceOrderProps extends OrderProps {
  content: {
    sauces: typeof sauces;
  } & GenericContent;
}

export interface ToppingOrderProps extends GenericProps {
  content: {
    prepositions: typeof prepositions;
    toppings: typeof toppings;
  }
}

export interface AllOrderProps extends OrderProps {
  content: FriesOrderProps["content"] & SnackOrderProps["content"] &
  SauceOrderProps["content"] & ToppingOrderProps["content"] & GenericContent;
}


import { OrderWrapper, TranslationMap } from "../models";

export const wrappers: TranslationMap<OrderWrapper>[] = [
  {
    nl: {
      start: "Mag ik",
      end: "?",
    },
    en: {
      start: "Can I have",
      end: "?",
    },
  },
  {
    nl: "Voor mij graag",
    en: {
      start: "For me",
      end: " please.",
    },
  },
  {
    nl: {
      start: "Ik wil",
      end: "!",
    },
    en: {
      start: "I want",
      end: "!",
    },
  },
];

import { PluralizableOrderComponent, TranslationMap } from "../models/models";

/**
 * For plural +s is default, so in that case the singular string suffices (no object required).
 */
export const containers: TranslationMap<PluralizableOrderComponent>[] = [
  {
    nl: "broodje",
    en: "bun",
  },
  {
    nl: {
      singular: "puntzak",
      plural: "puntzakken",
    },
    en: "paper cone",
  },
  {
    nl: {
      singular: "familiezak",
      plural: "familiezakken",
    },
    en: "family bag",
  },
  {
    nl: "obesitasje",
    en: "obesibag",
  },
  {
    nl: "bakje",
    en: {
      singular: "box",
      plural: "boxes",
    },
  },
  {
    nl: "schotel",
    en: "platter",
  },
];

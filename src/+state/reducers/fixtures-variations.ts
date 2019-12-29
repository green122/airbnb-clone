import { IVariation, ICategory } from "types/models";

export const variations: IVariation[] = [
  {
    id: "",
    priceVary: true,
    name: "Color",
    defaultId: "opt_id1",
    options: [
      {
        id: "opt_id1",
        name: "Option1"
      },
      {
        id: "opt_id2",
        name: "Option2"
      },
      {
        id: "opt_id3",
        name: "Option3"
      }
    ]
  }
];

export const categories: ICategory[] = [
  {
    id: "sss888",
    name: "Happy New Year",
    variations: [{ variationId: "5de365d9e2942abc70c33be9" }]
  }
];

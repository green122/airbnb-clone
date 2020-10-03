import { IVariation, ICategory, IOption } from "types/models";

import { DropdownItemProps } from "semantic-ui-react";

export function convertToDropdownItem(
  options: Array<IVariation | ICategory | IOption>
): DropdownItemProps[] {
  const result: DropdownItemProps[] = [];
  if (!options) {
    return [];
  }
  options.forEach((option) => {
    const text = "variation" in option ? option.variation : option.name;
    const priceValue =
      ("price" in option && option.price) ? `$${option.price}` : '';
    if (option) {
      result.push({
        key: option.id,
        text: `${text} ${priceValue}`,
        value: option.id,
      });
    }
  });
  return result;
}

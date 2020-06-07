import { IVariation, ICategory } from "types/models";

import { DropdownItemProps } from "semantic-ui-react";

export function convertToDropdownItem(
  options: Array<IVariation | ICategory>
): DropdownItemProps[] {
  const result: DropdownItemProps[] = [];
  if (!options) {
    return []
  }
  options.forEach(option => {
  const text = 'variation' in option ? option.variation : option.name;
    if (option) {
      result.push({
        key: option.id,
        text,
        value: option.id
      });
    }
  });
  return result;
}

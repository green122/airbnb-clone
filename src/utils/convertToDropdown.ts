import { IVariation, ICategory } from "types/models";

import { DropdownItemProps } from "semantic-ui-react";

export function convertToDropdownItem(
  options: Array<IVariation | ICategory>
): DropdownItemProps[] {
  const result: DropdownItemProps[] = [];
  options.forEach(option => {
    if (option) {
      result.push({
        key: option.id,
        text: option.name,
        value: option.id
      });
    }
  });
  return result;
}

import React, { useState, Fragment } from "react";
import { connect } from "react-redux";
import {
  ICategory,
  IVariation,
  ICategoryVariaton,
  IOption
} from "types/models";
import { getVariations } from "+state/reducers/variations.reducer";
import { Dropdown, DropdownItemProps } from "semantic-ui-react";
import { clone } from "ramda";
import CategoryPrices from "components/CategoryPrices/CategoryPrices";
import { convertToDropdownItem } from "utils/convertToDropdown";

interface ICategoryProps {
  category: ICategory;
  expanded: boolean;
  options?: DropdownItemProps[];
  onClick: () => void;
  variations?: IVariation[];
  update: (category: ICategory) => void;
}

function getOptionsList(
  categoryVariations: ICategoryVariaton[],
  variations: IVariation[] = []
) {
  let variationWithPriceVary: Partial<IVariation> = {};
  let categoryVariationWithPriceVary: ICategoryVariaton = { variationId: "" };

  variations.forEach(variation => {
    const categoryVariation = categoryVariations.find(
      ({ variationId }) => variation.id === variationId
    );
    if (categoryVariation && variation.priceVary) {
      variationWithPriceVary = variation;
      categoryVariationWithPriceVary = categoryVariation;
      return;
    }
  });

  const optionsList =
    variationWithPriceVary && variationWithPriceVary.options
      ? variationWithPriceVary.options
      : [];

  const optionsListWithPrices: IOption[] = optionsList.map(option => {
    const categoryOptionWithPrice = (
      categoryVariationWithPriceVary.options || []
    ).find(categoryOption => categoryOption.id === option.id);
    return {
      ...option,
      price: categoryOptionWithPrice && categoryOptionWithPrice.price
    };
  });
  return { optionsListWithPrices, variationWithPriceVary };
}

function Category({ category, variations, options, update }: ICategoryProps) {
  const [categoryVariations, setCategoryVariations] = useState(
    clone(category.variations)
  );
  const selectedVariationsIds = category.variations.map(
    ({ variationId }) => variationId
  );

  const [selected, setSelected] = useState(selectedVariationsIds);

  const onSelectVariationsIds = (
    _: any,
    {
      value: variationsIds
    }: {
      value: string[];
    }
  ) => {
    const newVariations: ICategoryVariaton[] = [];
    variationsIds.forEach(variationId => {
      const existingEntity = category.variations.find(
        ({ variationId: id }) => id === variationId
      );
      if (existingEntity) {
        newVariations.push(clone(existingEntity));
      } else {
        const vatriationEntity = (variations || []).find(
          ({ id }) => id === variationId
        );
        if (vatriationEntity) {
          const newVariationOptions = vatriationEntity.priceVary
            ? (vatriationEntity.options || []).map(({ id, price }) => ({
                id,
                price
              }))
            : [];
          const newEntity: ICategoryVariaton = {
            variationId,
            options: newVariationOptions
          };
          newVariations.push(newEntity);
        }
      }
    });
    setCategoryVariations(newVariations);
    setSelected(variationsIds);
  };

  function submitVariationWithPrices(
    updatedOptions: IOption[],
    editedVariation: IVariation
  ) {
    const newCategoryVariations: ICategoryVariaton[] = [];
    category.variations.forEach(variation => {
      if (variation.variationId === editedVariation.id) {
        newCategoryVariations.push({
          ...variation,
          options: updatedOptions.map(({ id, price }) => ({ id, price }))
        });
      } else {
        newCategoryVariations.push(variation);
      }
    });
    update({ ...category, variations: newCategoryVariations });
  }

  const { optionsListWithPrices, variationWithPriceVary } = getOptionsList(
    categoryVariations,
    variations
  );
  console.log(options);

  return (
    <Fragment>
      <Dropdown
        onChange={onSelectVariationsIds}
        options={options}
        multiple={true}
        selection={true}
        fluid={true}
        value={selected}
      />
      <CategoryPrices
        options={optionsListWithPrices}
        handleSubmitOptions={optionsValues =>
          submitVariationWithPrices(
            optionsValues,
            variationWithPriceVary as IVariation
          )
        }
      />
    </Fragment>
  );
}

export function getCategoryDropDown(
  category: ICategory,
  variations: IVariation[]
) {
  const result: IVariation[] = [];
  category.variations.forEach(categoryVariation => {
    const variation = variations.find(
      ({ id }) => id === categoryVariation.variationId
    );
    if (variation) {
      result.push(variation);
    }
  });
  return convertToDropdownItem(result);
}

export default connect((state, ownProps: ICategoryProps) => {
  const variations = getVariations(state);
  return {
    variations,
    options: convertToDropdownItem(variations),
    selected: getCategoryDropDown(ownProps.category, variations)
  };
})(Category);

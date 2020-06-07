import React from 'react';
import {IOption, IVariation} from "../../types/models";
import {Checkbox, Grid, Segment} from "semantic-ui-react";
import CategoryPrices from "../CategoryPrices/CategoryPrices";

interface ICategoryVariationProps {
  variation: IVariation;
  onVaryPriceCheck: (check: boolean) => void;
  onUpdatePrices: (optionsWithPrices: IOption[]) => void;
}

function CategoryVariation({variation, onVaryPriceCheck, onUpdatePrices}: ICategoryVariationProps) {

  // function submitVariationWithPrices(
  //   updatedOptions: IOption[],
  //   editedVariation: IVariation
  // ) {
  //   const newCategoryVariations: IVariation[] = [];
  //   console.log(updatedOptions, editedVariation);
  //   categoryDetails?.variations.forEach(variation => {
  //     if (variation.id === editedVariation.id) {
  //       newCategoryVariations.push({
  //         ...variation,
  //         options: updatedOptions
  //       });
  //     } else {
  //       newCategoryVariations.push(variation);
  //     }
  //   });
  //   if (categoryDetails) {
  //     update({...categoryDetails, variations: newCategoryVariations});
  //   }
  // }


  return (
    <Grid divided={true} celled={true}>
      <Grid.Row>
        <Grid.Column width={5}>
          <div>{variation.variation}</div>
        </Grid.Column>
        <Grid.Column width={4}>
          <Checkbox
            label={<label> Price can vary </label>}
            checked={variation.varyPrice}
            onClick={(_, checkProps) => onVaryPriceCheck(checkProps.checked || false)}
          />
        </Grid.Column>
      </Grid.Row>
      {variation.varyPrice && <CategoryPrices
        options={variation.options}
        handleSubmitOptions={onUpdatePrices}
      />}
    </Grid>

  );
}

export default CategoryVariation;
import React, {useState, Fragment, useEffect, useCallback} from "react";
import {connect} from "react-redux";
import {
  ICategory,
  IVariation,
  IOption, ICategoryDetails
} from "types/models";

import {useHistory} from 'react-router-dom';
import {getVariations} from "+state/reducers/variations.reducer";
import {Button, Dropdown, DropdownItemProps, Input, LabelProps} from "semantic-ui-react";
import {convertToDropdownItem} from "utils/convertToDropdown";
import {
  fetchCategoryDetails,
  getCategoryDetails,
  updateCategoryAction
} from "../../+state/reducers/categories.reducer";
import CategoryVariation from "./CategoryVariation";

type updateFunction = (type: 'category' | 'variations' | 'prices' | 'varyPrice', payload: any) => void;

interface ICategoryProps {
  categoryId: string;
  categoryDetails?: ICategoryDetails;
  options?: DropdownItemProps[];
  variations?: IVariation[];
  update?: updateFunction;
  proceed: () => void;
  fetchDetails?: (categoryId: string) => void;
}


function Category({categoryId, categoryDetails, fetchDetails, variations, options, proceed, update = () => ({})}: ICategoryProps) {

  useEffect(() => {
    if (!categoryDetails && !String(categoryId).includes('temp') && fetchDetails) {
      fetchDetails(categoryId);
    }
  }, [categoryId, fetchDetails]);

  const [selected, setSelected] = useState(categoryDetails?.variations || []);
  const [categoryName, setCategoryName] = useState(categoryDetails?.name || '');

  useEffect(() => {
    if (categoryDetails) {
      setSelected(categoryDetails?.variations);
      setCategoryName(categoryDetails?.name)
    }
  }, [categoryDetails]);

  const onSelectVariationsIds = (_: any, {value: variationsIds}: { value: string[]; }) => {
    const selectedVariations: IVariation[] = [];
    variationsIds.forEach(variationId => {
      const existingEntity = selected?.find(
        ({id}) => id === Number(variationId)
      );
      if (existingEntity) {
        selectedVariations.push(existingEntity);
      } else {
        const variationEntity = (variations || []).find(
          ({id}) => id === Number(variationId)
        );
        if (variationEntity) {
          selectedVariations.push(variationEntity);
        }
      }
    });
    setSelected(selectedVariations);
  }

  const updateCategory = () => {
    const updatedCategory: ICategoryDetails = {
      id: categoryDetails?.id || '',
      name: categoryName,
      variations: selected
    }
    update('category', updatedCategory);
    proceed();
  }

  const history = useHistory();

  const onLabelClick = useCallback((_: any, value: LabelProps) => {
    history.push(`/listings/modify/variations/${value.value}`);
  }, []);


  if (!categoryDetails) {
    return null;
  }

  return (
    <Fragment>
      <Input value={categoryName} onChange={(_, {value}) => setCategoryName(value)}/>
      <Dropdown
        onChange={onSelectVariationsIds}
        options={options}
        onLabelClick={onLabelClick}
        closeOnChange={true}
        multiple={true}
        selection={true}
        fluid={true}
        value={(selected || []).map(({id}) => id)}
      />
      {(selected || []).map(selectedVariation =>
        <CategoryVariation
          key={selectedVariation.id}
          variation={selectedVariation}
          onVaryPriceCheck={checked => update('varyPrice', {
            categoryId: categoryDetails?.id,
            variationId: selectedVariation.id,
            varyPrice: checked
          })}
          onUpdatePrices={optionsWithPrices => update('prices', {
            categoryId: categoryDetails?.id,
            variationId: selectedVariation.id,
            options: optionsWithPrices
          })}
        />)
      }
      <Button onClick={updateCategory}>Update</Button>
      <Button onClick={proceed}>Cancel</Button>
    </Fragment>
  );
}

export function getCategoryDropDown(
  category: ICategoryDetails,
  variations: IVariation[]
) {
  if (!category) {
    return;
  }
  const result: IVariation[] = [];
  category.variations.forEach(categoryVariation => {
    const variation = variations.find(
      ({id}) => id === categoryVariation.id
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
    categoryDetails: getCategoryDetails(state, ownProps),
    variations,
    options: convertToDropdownItem(variations),
    selected: ownProps.categoryDetails ? getCategoryDropDown(ownProps.categoryDetails, variations) : []
  };
}, (dispatch) => {
  return {
    fetchDetails: (categoryId: string) => dispatch(fetchCategoryDetails(categoryId)),
    update: (type: string, payload: any) => dispatch(updateCategoryAction({type, payload}))
  }
})(Category);

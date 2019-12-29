import {
  fetchVariations,
  getVariations,
  updateVariationsAction
} from "+state/reducers/variations.reducer";
import React, { useEffect, Fragment } from "react";
import { useDispatch, connect } from "react-redux";
import VariationsList from "components/VariationsList/VariationsList";
import { IVariation, ICategory } from "types/models";
import CategoriesList from "containers/CategoriesList/CategoriesList";
import {
  fetchCategories,
  getCategories,
  updateCategoriesAction
} from "+state/reducers/categories.reducer";
import ListingForm from "containers/ListingForm/ListingForm";

interface IListingEditorProps {
  variations: IVariation[];
  categories: ICategory[];
  updateVariations: (variations: IVariation[]) => void;
  updateCategories: (categories: ICategory[]) => void;
  match: {
    params: {
      id: string;
    };
  };
}

export function ListingEditor({
  variations,
  categories,
  updateVariations,
  updateCategories,
  match
}: IListingEditorProps) {
  const { id } = match.params;
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchVariations());
    dispatch(fetchCategories());
  }, [id]);
  return (
    <Fragment>
      <ListingForm categories={categories} />
      <VariationsList variations={variations} update={updateVariations} />
      <CategoriesList categories={categories} update={updateCategories} />
    </Fragment>
  );
}

export default connect(
  store => ({
    variations: getVariations(store),
    categories: getCategories(store)
  }),
  dispatch => ({
    updateVariations: (variations: IVariation[]) =>
      dispatch(updateVariationsAction(variations)),
    updateCategories: (categories: ICategory[]) =>
      dispatch(updateCategoriesAction(categories))
  })
)(ListingEditor);

import {
  getVariations,
  updateVariationAction,
} from "+state/reducers/variations.reducer";
import React, { useEffect, Fragment } from "react";
import { useDispatch, connect, batch, useSelector } from "react-redux";
import VariationsList from "components/VariationsList/VariationsList";
import {
  IVariation,
  ICategory,
  IListing,
  IRawListing,
  IOption,
} from "types/models";
import CategoriesList from "containers/CategoriesList/CategoriesList";
import {
  fetchCategories,
  getCategories,
} from "+state/reducers/categories.reducer";
import ListingForm from "containers/ListingForm/ListingForm";
import {
  getOptions,
  updateOptionsAction,
} from "../../+state/reducers/options.reducer";
import { updateOptionsAndVariationAction } from "../../+state/reducers/common.actions";
import { fetchVariations } from "../../components/Variation/Variation.store";
import { fetchOptions } from "../../components/Variation/Option.store";
import { useAppDispatch } from "../../index";
import {
  createListing,
  fetchListing,
  getListing,
  getListingState,
  updateListing,
} from "./Listing.store";
import { useAuthCheck } from "../../hooks/useAuthCheck";

interface IListingEditorProps {
  variations: IVariation[];
  categories: ICategory[];
  options: IOption[];
  match: {
    params: {
      id?: string;
      entity?: string;
      entityId?: string;
    };
  };
}

export function ListingEditor({
  variations,
  categories,
  options,
  match,
}: IListingEditorProps) {
  const { id = "", entity, entityId } = match.params;
  const editMode = Boolean(id);
  const listingToEdit = useSelector((state) => getListing(state, id));
  const listingState = useSelector(getListingState);
  const dispatch = useAppDispatch();
  useEffect(() => {
    batch(() => {
      if (editMode) {
        dispatch(fetchListing(id));
      }
      dispatch(fetchVariations());
      dispatch(fetchCategories());
      dispatch(fetchOptions());
    });
  }, [id]);

  const updateVariationAndOptions = (
    variation: IVariation,
    updatedOptions: IOption[]
  ) => {
    dispatch(updateOptionsAndVariationAction(updatedOptions, variation));
  };

  const onSubmitListing = (listing: any) => {
    dispatch(editMode ? updateListing(listing) : createListing(listing));
  };

  return (
    <Fragment>
      {(!editMode || (editMode && listingToEdit)) && (
        <ListingForm
          editMode={editMode}
          listing={listingToEdit}
          categories={categories}
          submit={onSubmitListing}
        />
      )}
      {entity === "variations" && (
        <VariationsList
          variations={variations}
          selectedId={entityId}
          update={updateVariationAndOptions}
          options={options}
        />
      )}
      {entity === "categories" && (
        <CategoriesList categories={categories} id={entityId} />
      )}
    </Fragment>
  );
}

export default connect(
  (store) => ({
    variations: getVariations(store),
    categories: getCategories(store),
    options: getOptions(store),
    // listings: getL
  }),
  (dispatch) => ({
    updateVariation: (variations: IVariation) =>
      dispatch(updateVariationAction(variations)),
    updateOptions: (options: IOption[]) =>
      dispatch(updateOptionsAction(options)),
  })
)(ListingEditor);

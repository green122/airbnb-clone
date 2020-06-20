import {
  fetchVariations,
  getVariations,
  updateVariationAction
} from "+state/reducers/variations.reducer";
import React, {useEffect, Fragment} from "react";
import FaceBookLogin from 'react-facebook-login';
import {useDispatch, connect, batch} from "react-redux";
import VariationsList from "components/VariationsList/VariationsList";
import {IVariation, ICategory, IListing, IRawListing, IOption} from "types/models";
import CategoriesList from "containers/CategoriesList/CategoriesList";
import {
  fetchCategories,
  getCategories,
} from "+state/reducers/categories.reducer";
import ListingForm from "containers/ListingForm/ListingForm";
import {createListing} from "../../+state/reducers/listing.reducer";
import {fetchOptions, getOptions, updateOptionsAction} from "../../+state/reducers/options.reducer";
import {updateOptionsAndVariationAction} from "../../+state/reducers/common.actions";

interface IListingEditorProps {
  variations: IVariation[];
  categories: ICategory[];
  options: IOption[];
  updateListing: (listing: IRawListing) => void;
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
                                updateListing,
                                match
                              }: IListingEditorProps) {
  const {id, entity, entityId} = match.params;
  console.log(entity, entityId);
  const dispatch = useDispatch();
  useEffect(() => {
    batch(() => {
      dispatch(fetchVariations());
      dispatch(fetchCategories());
      dispatch(fetchOptions());
    })
  }, [id]);

  const updateVariationAndOptions = (variation: IVariation, updatedOptions: IOption[]) => {
    dispatch(updateOptionsAndVariationAction(updatedOptions, variation));
  }

  return (
    <Fragment>
      <FaceBookLogin
        appId="958642267618042"
        autoLoad={true}
        fields="name,email,picture"
        callback={console.log}
        icon="fa-facebook"
      />,
      <ListingForm categories={categories} submit={updateListing}/>
      {entity === 'variations' &&
        <VariationsList variations={variations} selectedId={entityId} update={updateVariationAndOptions} options={options}/>}
      {entity === 'categories' &&
        <CategoriesList categories={categories} id={entityId} />}
    </Fragment>
  );
}

export default connect(
  store => ({
    variations: getVariations(store),
    categories: getCategories(store),
    options: getOptions(store),
    // listings: getL
  }),
  dispatch => ({
    updateVariation: (variations: IVariation) =>
      dispatch(updateVariationAction(variations)),
    updateListing: (listing: IRawListing) =>
      dispatch(createListing(listing)),
    updateOptions: (options: IOption[]) =>
      dispatch(updateOptionsAction(options))
  })
)(ListingEditor);

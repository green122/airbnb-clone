import {AnyAction} from "redux";
import {handleActions} from "redux-actions";
import {createSelector} from "reselect";
import {IFetchAction} from "../../types/common";
import {IListingsState, IRawListing, IOptionsState} from "../../types/models";
import {categories as categoriesFixture} from "./fixtures-variations";
import {categoriesRoute, listingsRoute} from "../../constants/apiRoutes";

const FETCH_LISTING = "[Listings] Fetch";
const FETCH_LISTING_SUCCESS = "[Listings] Fetch Success";
const FETCH_LISTING_FAIL = "[Listings] Fetch Fail";

const CREATE_LISTING = "[Listings] Create Listing";
const CREATE_LISTING_SUCCESS = "[Listings] Create Listing Success";
const CREATE_LISTING_FAIL = "[Listings] Create Listing Fail";

export const getListingState = (state: any): IListingsState =>
  state.listings;
export const getListing = createSelector(
  getListingState,
  (_: any, id: string) => id,
  (optionsState, id) => {
    return optionsState.entities[id];
  }
);


export function fetchListing(id: string): IFetchAction {
  return {
    type: "FETCH",
    types: [FETCH_LISTING, FETCH_LISTING_SUCCESS, FETCH_LISTING_FAIL],
    fetchFunction: ({client}) =>
      client.get(`${listingsRoute}/${id}`)
  }
}

export function createListing(listing: IRawListing): IFetchAction {
  return {
    type: "FETCH",
    types: [CREATE_LISTING, CREATE_LISTING_SUCCESS, CREATE_LISTING_FAIL],
    fetchFunction: ({client}) => {

      const {rawImages, file, ...rest} = listing;
      const formData = new FormData();
      (listing.rawImages as any[]).forEach((elem: any, i) => {
        formData.append('file', elem.file, elem.file.name)
      })
      formData.append('listing', JSON.stringify(rest));
      return client.post(listingsRoute, formData, {headers: {'content-type': 'multipart/form-data'}});
    }
    // new Promise(resolve => {
    //   setTimeout(() => resolve({data: categoriesFixture}), 500);
    // })
  };
}

const initialState: IListingsState = {
  entities: {},
  loading: false,
  loaded: false
};

export const listingsReducer = handleActions<IListingsState, any>(
  {
    [FETCH_LISTING]: (state: IListingsState) => ({
      ...state,
      loading: true
    }),
    [FETCH_LISTING_SUCCESS]: (
      state: IListingsState,
      action: AnyAction
    ) => ({...state, loading: false, entities: {
      ...state.entities,
      [action.payload.id]: action.payload
    }}),
    [CREATE_LISTING]: (state: IListingsState) => ({
      ...state,
      loading: true
    }),
    [CREATE_LISTING_SUCCESS]: (
      state: IListingsState,
      action: AnyAction
    ) => ({...state, loading: false, entities: action.payload})
  },
  initialState
);

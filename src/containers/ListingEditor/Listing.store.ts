import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import axios from 'axios';
import {IImageRecord, IListingsState, IRawListing, IVariation, IVariationsState, RawImage} from "../../types/models";
import {deleteVariationRoute, listingsRoute, updateListingRoute, variationsRoute} from "../../constants/apiRoutes";
import {createSelector} from "reselect";

const initialState: IListingsState = {
  list: [],
  entitiesMap: {},
  loading: false,
  loaded: false
};

export const getListingState = (state: any): IListingsState =>
  state.listings;

export const getListings = createSelector(
  getListingState,
  listingState => listingState.list
);

export const getListingsEntities = createSelector(
  getListingState,
  listingState => listingState.entitiesMap
);

export const getListing = createSelector(
  getListingsEntities,
  (_: any, id: string) => id,
  (listings, id) => {
    return listings[id];
  }
);

export const fetchListing = createAsyncThunk(
  'listings/fetchDetails',
  async (id: string) => {
    const result = await axios.get(`${listingsRoute}/${id}`);
    return result.data;
  }
);

export const fetchListings = createAsyncThunk(
  'listings/fetch',
  async () => {
    const result = await axios.get(listingsRoute);
    return result.data;
  }
);

export function prepareFormData(listing: IRawListing) : FormData {
  const {rawImages, ...rest} = listing;
  const formData = new FormData();
  const otherImages: IImageRecord[] = [];
  (listing.rawImages).forEach((elem, i) => {
    if (!('url' in elem)){
      formData.append('file', elem.file, elem.file.name)
    } else {
      otherImages.push(elem)
    }
  });
  rest.images = otherImages;
  formData.append('listing', JSON.stringify(rest));
  return formData;
}

export const createListing = createAsyncThunk(
  'listing/create',
  async (listing: IRawListing) => {
    const result = await axios.post(listingsRoute, prepareFormData(listing), {headers: {'content-type': 'multipart/form-data'}});
    return result.data;
  }
);

export const updateListing = createAsyncThunk(
  'listing/update',
  async (listing: IRawListing) => {
    if (!listing.id) {
      return;
    }
    const result = await axios.put(updateListingRoute(listing.id), prepareFormData(listing), {headers: {'content-type': 'multipart/form-data'}});
    return result.data;
  }
);

const listingSlice = createSlice({
  name: 'listing',
  initialState,
  reducers: {},
  extraReducers: builder => builder
    .addCase(createListing.pending, (state) => {
      state.loading = true;
    })
    .addCase(createListing.fulfilled, (state, action) => {
      state.entitiesMap[action.payload.id] = action.payload;
      state.loading = false;
    })
    .addCase(fetchListing.pending, (state) => {
      state.loading = true;
    })
    .addCase(fetchListing.fulfilled, (state, action) => {
      state.entitiesMap[action.payload.id] = action.payload;
      state.loading = false;
    })
    .addCase(fetchListings.fulfilled, (state, action) => {
      state.list = action.payload;
      state.loading = false;
    })

});

export const listingsReducer = listingSlice.reducer;

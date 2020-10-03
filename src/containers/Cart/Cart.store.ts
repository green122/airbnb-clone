import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import axios from 'axios';
import {
  ICartState,
  IListing,
  IListingsState,
  IRawListing,
  ISubmittedListing,
  IVariation,
  IVariationsState
} from "../../types/models";
import {cartRoute, deleteVariationRoute, listingsRoute, variationsRoute} from "../../constants/apiRoutes";
import {createSelector} from "reselect";
import {RootState} from "../../index";

const initialState: ICartState = {
  content: [],
  total: 0,
  loading: false,
  loaded: false
};

export const getCartState = (state: RootState) =>
  state.cart;

export const getCart = (state: RootState) =>
  state.cart.content;

export const getCartTotal = (state: RootState) =>
  state.cart.total;

export const addToCart = createAsyncThunk(
  'cart/add',
  async (listing: ISubmittedListing) => {
    const result = await axios.post(cartRoute, listing, );
    return result.data;
  }
);


export const updateCart = createAsyncThunk(
  'cart/update',
  async (listing: ISubmittedListing) => {
    const result = await axios.put(cartRoute, listing);
    return result.data;
  }
);

export const fetchCart = createAsyncThunk(
  'cart/fetch',
  async () => {
    const result = await axios.get(cartRoute );
    return result.data;
  }
);

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {},
  extraReducers: builder => builder
    .addCase(addToCart.fulfilled, (state, action) => {
      document.cookie = `cartId=${action.payload.cartId}`;
    })
    .addCase(fetchCart.fulfilled, (state, action) => {
      state.content = action.payload.items;
      state.total = action.payload.total;
    })
    .addCase(updateCart.fulfilled, (state, action) => {
      state.content = action.payload.items;
      state.total = action.payload.total;
    })

});

export const cartReducer = cartSlice.reducer;

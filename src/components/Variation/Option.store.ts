import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import axios from 'axios';
import {IOption, IOptionsState, IVariation, IVariationsState} from "../../types/models";
import {optionsRoute, variationsRoute} from "../../constants/apiRoutes";
import {createSelector} from "reselect";
import {RootState} from "../../index";

const initialState: IOptionsState = {
  entities: [],
  loading: false,
  loaded: false
};

export const getVariationsState = (state: RootState) => state.variations;
export const getVariations = createSelector(
  getVariationsState,
  (variationsState: IVariationsState) => {
    return variationsState.entities;
  }
);

export const fetchOptions = createAsyncThunk(
  'options/fetch',
  async () => {
    const result = await axios.get<IOption[]>(optionsRoute);
    return result.data;
  }
);

export const updateOptions = createAsyncThunk(
  'variations/update',
  async (options: IOption[]) => {
    await axios.put<IVariation>(optionsRoute, options);
  }
);

const optionsSlice = createSlice({
  name: 'options',
  initialState,
  reducers: {},
  extraReducers: builder => builder
    .addCase(fetchOptions.fulfilled, (state, action) => {
      state.entities = action.payload;
    })
    .addCase(updateOptions.fulfilled, (state, action) => {
      state.loading = false;
    })
});

export const optionsReducer = optionsSlice.reducer;

import { combineReducers } from "redux";

import {
  ICategoriesState,
  IListingsState,
  IOptionsState,
  IPostsStoreState,
  IRentalState,
  IVariationsState
} from "../../types/models";
import { variationsReducer } from "./variations.reducer";
import { categoriesReducer } from "./categories.reducer";
import { listingsReducer } from "./listing.reducer";
import { optionsReducer } from "./options.reducer";


// type ReducerMaps = { [K in keyof IStoreState]: Reducer };

const allReducers = {
  variations: variationsReducer,
  categories: categoriesReducer,
  listings: listingsReducer,
  options: optionsReducer,
};

export interface IStore {
  variations: IVariationsState;
  categories: ICategoriesState;
  listings: IListingsState;
  options: IOptionsState
}

const rootReducer = combineReducers<IStore>({ ...allReducers });

export default rootReducer;

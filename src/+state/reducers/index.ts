import { combineReducers } from "redux";

import { IPostsStoreState, IRentalState } from "../../types/models";
import postsReducer from "./posts.reducer";
import { rentalReducer } from "./rental.reducer";
import { variationsReducer } from "./variations.reducer";
import { categoriesReducer } from "./categories.reducer";
import { listingsReducer } from "./listing.reducer";

export interface IStoreState {
  posts: IPostsStoreState;
  rentals: IRentalState;
}

// type ReducerMaps = { [K in keyof IStoreState]: Reducer };

const allReducers = {
  posts: postsReducer,
  rentals: rentalReducer,
  variations: variationsReducer,
  categories: categoriesReducer,
  listings: listingsReducer,
};

interface IStore {
  posts: IPostsStoreState;
  rentals: IRentalState;
}

const rootReducer = combineReducers<IStore>({ ...allReducers });

export default rootReducer;

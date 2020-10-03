import { combineReducers } from "redux";

import {
  IAuthState,
  ICartState,
  ICategoriesState,
  IListingsState,
  IOptionsState,
  IPostsStoreState,
  IRentalState,
  IVariationsState
} from "../../types/models";
// import { variationsReducer } from "./variations.reducer";
import { categoriesReducer } from "./categories.reducer";
import {variationsReducer} from "../../components/Variation/Variation.store";
import {optionsReducer} from "../../components/Variation/Option.store";
import {listingsReducer} from "../../containers/ListingEditor/Listing.store";
import {cartReducer} from "../../containers/Cart/Cart.store";
import {authReducer} from "../../containers/SignUp/Auth.store";


// type ReducerMaps = { [K in keyof IStoreState]: Reducer };

const allReducers = {
  variations: variationsReducer,
  categories: categoriesReducer,
  listings: listingsReducer,
  options: optionsReducer,
  cart: cartReducer,
  auth: authReducer
};

export interface IStore {
  variations: IVariationsState;
  categories: ICategoriesState;
  listings: IListingsState;
  options: IOptionsState,
  cart: ICartState,
  auth: IAuthState
}

const rootReducer = combineReducers<IStore>({ ...allReducers });

export default rootReducer;

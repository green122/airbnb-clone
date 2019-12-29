import { AnyAction } from "redux";
import { handleActions } from "redux-actions";
import { createSelector } from "reselect";
import { IFetchAction } from "../../types/common";
import { ICategoriesState, ICategory } from "../../types/models";
import { categories as categoriesFixture } from "./fixtures-variations";
import {categoriesRoute, variationsRoute} from "../../constants/apiRoutes";

const FETCH_CATEGORIES = "[Categories] Fetch";
const FETCH_CATEGORIES_SUCCESS = "[Categories] Fetch Success";
const FETCH_CATEGORIES_FAIL = "[Categories] Fetch Fail";

const UPDATE_CATEGORIES = "[Categories] Update Categories";
const UPDATE_CATEGORIES_SUCCESS = "[Categories] Update Categories Success";
const UPDATE_CATEGORIES_FAIL = "[Categories] Update Categories Fail";

export function fetchCategories(): IFetchAction {
  return {
    type: "FETCH",
    types: [FETCH_CATEGORIES, FETCH_CATEGORIES_SUCCESS, FETCH_CATEGORIES_FAIL],
    fetchFunction: ({ client }) => client.get(categoriesRoute)
  };
}

export function updateCategoriesAction(categories: ICategory[]): IFetchAction {
  return {
    type: "FETCH",
    types: [
      UPDATE_CATEGORIES,
      UPDATE_CATEGORIES_SUCCESS,
      UPDATE_CATEGORIES_FAIL
    ],
    fetchFunction: ({ client }) => client.put(categoriesRoute, categories)
  };
}

export const getCategoriesState = (state: any): ICategoriesState =>
  state.categories;
export const getCategories = createSelector(
  getCategoriesState,
  (categoriesState: ICategoriesState) => {
    return categoriesState.entities;
  }
);

const initialState: ICategoriesState = {
  entities: [],
  loading: false,
  loaded: false
};

export const categoriesReducer = handleActions<ICategoriesState, any>(
  {
    [FETCH_CATEGORIES]: (state: ICategoriesState) => ({
      ...state,
      loading: true
    }),
    [FETCH_CATEGORIES_SUCCESS]: (
      state: ICategoriesState,
      action: AnyAction
    ) => ({ ...state, loading: false, entities: action.payload }),
    [UPDATE_CATEGORIES]: (state: ICategoriesState) => ({
      ...state,
      loading: true
    }),
    [UPDATE_CATEGORIES_SUCCESS]: (
      state: ICategoriesState,
      action: AnyAction
    ) => ({ ...state, loading: false, entities: action.payload })
  },
  initialState
);

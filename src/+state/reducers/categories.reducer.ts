import { AnyAction } from "redux";
import { handleActions, createAction } from "redux-actions";
import { createSelector } from "reselect";
import { IFetchAction } from "../../types/common";
import {ICategoriesState, ICategory, ICategoryDetails, IOption} from "../../types/models";
import { categories as categoriesFixture } from "./fixtures-variations";
import {categoriesRoute, pricesRoute, variationsRoute} from "../../constants/apiRoutes";
import {IStore} from "./index";

const FETCH_CATEGORIES = "[Categories] Fetch";
const FETCH_CATEGORIES_SUCCESS = "[Categories] Fetch Success";
const FETCH_CATEGORIES_FAIL = "[Categories] Fetch Fail";

const CREATE_CATEGORY = "[Categories] Create";
export const CREATE_CATEGORY_SUCCESS = "[Categories] Create Success";
const CREATE_CATEGORY_FAIL = "[Categories] Create Fail";

const FETCH_CATEGORIES_DETAILS = "[Categories] Fetch Details";
const FETCH_CATEGORIES_DETAILS_SUCCESS = "[Categories] Fetch Details Success";
const FETCH_CATEGORIES_DETAILS_FAIL = "[Categories] Fetch Details Fail";

const UPDATE_CATEGORY_DETAILS = "[Categories] Update Categories";
export const UPDATE_CATEGORY_DETAILS_SUCCESS = "[Categories] Update Categories Success";
const UPDATE_CATEGORY_DETAILS_FAIL = "[Categories] Update Categories Fail";

const UPDATE_PRICES = "[Categories] Update Prices";
export const UPDATE_PRICES_SUCCESS = "[Categories] Update Prices Success";
const UPDATE_PRICES_FAIL = "[Categories] Update Prices Fail";

const UPDATE_VARY_PRICE = "[Categories] Update Price Variation";
export const UPDATE_VARY_PRICE_SUCCESS = "[Categories] Update Price Variation Success";
const UPDATE_VARY_PRICE_FAIL = "[Categories] Update Price Variation Fail";

export function fetchCategories(checkLoaded = true): IFetchAction {
  return {
    type: "FETCH",
    types: [FETCH_CATEGORIES, FETCH_CATEGORIES_SUCCESS, FETCH_CATEGORIES_FAIL],
    checkIsLoaded(state: IStore): boolean {
      return checkLoaded && Boolean(getCategories(state).length);
    },
    fetchFunction: ({ client }) => client.get(categoriesRoute)
  };
}

export const updateCategoryAction = createAction<{type: string, payload: any}>('UPDATE_CATEGORY_ACTION');

export function fetchCategoryDetails(id: string): IFetchAction {
  return {
    type: "FETCH",
    types: [FETCH_CATEGORIES_DETAILS, FETCH_CATEGORIES_DETAILS_SUCCESS, FETCH_CATEGORIES_DETAILS_FAIL],
    fetchFunction: ({ client }) => client.get(`${categoriesRoute}/${id}`)
  };
}

export function createCategory(category: Partial<ICategory>): IFetchAction {
  return {
    type: "FETCH",
    types: [CREATE_CATEGORY, CREATE_CATEGORY_SUCCESS, CREATE_CATEGORY_FAIL],
    fetchFunction: ({ client }) => client.post(`${categoriesRoute}`, category)
  };
}

export function updateCategoryDetails(category: ICategoryDetails): IFetchAction {
  return {
    type: "FETCH",
    types: [
      UPDATE_CATEGORY_DETAILS,
      UPDATE_CATEGORY_DETAILS_SUCCESS,
      UPDATE_CATEGORY_DETAILS_FAIL
    ],
    fetchFunction: ({ client }) => client.put(categoriesRoute, category)
  };
}

export function updatePricesAction(payload: any): IFetchAction {
  return {
    type: "FETCH",
    types: [
      UPDATE_PRICES,
      UPDATE_PRICES_SUCCESS,
      UPDATE_PRICES_FAIL
    ],
    fetchFunction: ({ client }) => client.put(pricesRoute, payload)
  };
}

export function updateVaryPrice(payload: any): IFetchAction {
  return {
    type: "FETCH",
    types: [
      UPDATE_VARY_PRICE,
      UPDATE_VARY_PRICE_SUCCESS,
      UPDATE_VARY_PRICE_FAIL
    ],
    fetchFunction: ({ client }) => client.put(`${categoriesRoute}/varyPrice/${payload.categoryId}`, payload)
  };
}



export const getCategoriesState = (state: any): ICategoriesState =>
  state.categories;

export const getCategories = createSelector(
  getCategoriesState,
  (categoriesState: ICategoriesState) => {
    return categoriesState.entitiesList;
  }
);

const getCategoryId = (_: any, props: any): string => props.categoryId;
export const getCategoryDetails = createSelector(
  getCategoriesState,
  getCategoryId,
  (categoriesState: ICategoriesState, categoryId) => {
    return categoriesState.entities[categoryId];
  }
);

const initialState: ICategoriesState = {
  entitiesList: [],
  entities: {},
  loading: false,
  loaded: false
};

export const categoriesReducer = handleActions<ICategoriesState, any>(
  {
    [FETCH_CATEGORIES]: (state: ICategoriesState) => ({
      ...state,
      loading: true
    }),
    [FETCH_CATEGORIES_DETAILS]: (state: ICategoriesState) => ({
      ...state,
      loading: true
    }),
    [FETCH_CATEGORIES_SUCCESS]: (
      state: ICategoriesState,
      action: AnyAction
    ) => ({ ...state, loading: false, entitiesList: action.payload }),
    [FETCH_CATEGORIES_DETAILS_SUCCESS]: (
      state: ICategoriesState,
      action: AnyAction
    ) => ({ ...state, loading: false, entities: {...state.entities, [action.payload.id]: action.payload} }),
    [updateCategoryAction.toString()]: (state: ICategoriesState) => ({
      ...state,
      loading: true
    })
  },
  initialState
);

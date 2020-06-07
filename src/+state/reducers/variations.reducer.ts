import {AnyAction} from "redux";
import {handleActions} from "redux-actions";
import {createSelector} from "reselect";
import {IFetchAction} from "../../types/common";
import {IVariationsState, IVariation} from "../../types/models";
import {variationsRoute} from "../../constants/apiRoutes";
import {IStore} from "./index";

const FETCH_VARIATIONS = "[Variations] Fetch";
const FETCH_VARIATIONS_SUCCESS = "[Variations] Fetch Success";
const FETCH_VARIATIONS_FAIL = "[Variations] Fetch Fail";

const CREATE_VARIATION = "[Variations] Create Variations";
export const CREATE_VARIATION_SUCCESS = "[Variations] Create Variations Success";
const CREATE_VARIATION_FAIL = "[Variations] Create Variations Fail";


const UPDATE_VARIATION = "[Variations] Update Variations";
export const UPDATE_VARIATION_SUCCESS = "[Variations] Update Variations Success";
const UPDATE_VARIATION_FAIL = "[Variations] Update Variations Fail";

export function fetchVariations(): IFetchAction {
  return {
    type: "FETCH",
    types: [FETCH_VARIATIONS, FETCH_VARIATIONS_SUCCESS, FETCH_VARIATIONS_FAIL],
    checkIsLoaded(state: IStore): boolean {
      return Boolean(state.variations.entities.length);
    },
    fetchFunction: ({client}) => client.get(variationsRoute)
  };
}

export function updateVariationAction(variation: IVariation): IFetchAction {
  return {
    type: "FETCH",
    types: [
      UPDATE_VARIATION,
      UPDATE_VARIATION_SUCCESS,
      UPDATE_VARIATION_FAIL
    ],
    fetchFunction: ({client}) => client.put(variationsRoute, variation)
  };
}

export function createVariationAction(variation: IVariation): IFetchAction {
  return {
    type: "FETCH",
    types: [
      CREATE_VARIATION,
      CREATE_VARIATION_SUCCESS,
      CREATE_VARIATION_FAIL
    ],
    fetchFunction: ({client}) => client.post(variationsRoute, variation)
  };
}

export const getVariationsState = (state: any): IVariationsState =>
  state.variations;
export const getVariations = createSelector(
  getVariationsState,
  (variationsState: IVariationsState) => {
    return variationsState.entities;
  }
);

const initialState: IVariationsState = {
  entities: [],
  loading: false,
  loaded: false
};

export const variationsReducer = handleActions<IVariationsState, any>(
  {
    [FETCH_VARIATIONS]: (state: IVariationsState) => ({
      ...state,
      loading: true
    }),
    [FETCH_VARIATIONS_SUCCESS]: (
      state: IVariationsState,
      action: AnyAction
    ) => ({...state, loading: false, entities: action.payload}),
    [UPDATE_VARIATION]: (state: IVariationsState) => ({
      ...state,
      loading: true
    }),
    [CREATE_VARIATION]: (state: IVariationsState) => ({
      ...state,
      loading: true
    }),
    [CREATE_VARIATION_SUCCESS]:
      (state: IVariationsState) => ({
        ...state,
        loading: false
      }),
    [UPDATE_VARIATION_SUCCESS]: (
      state: IVariationsState,
      action: AnyAction
    ) => {
      return {
        ...state,
        loading: false,
      }
    }
  },
  initialState
);

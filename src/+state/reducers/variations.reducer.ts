import { AnyAction } from "redux";
import { handleActions } from "redux-actions";
import { createSelector } from "reselect";
import { IFetchAction } from "../../types/common";
import { IVariationsState, IVariation } from "../../types/models";
import { variationsRoute } from "../../constants/apiRoutes";

const FETCH_VARIATIONS = "[Variations] Fetch";
const FETCH_VARIATIONS_SUCCESS = "[Variations] Fetch Success";
const FETCH_VARIATIONS_FAIL = "[Variations] Fetch Fail";

const UPDATE_VARIATIONS = "[Variations] Update Variations";
const UPDATE_VARIATIONS_SUCCESS = "[Variations] Update Variations Success";
const UPDATE_VARIATIONS_FAIL = "[Variations] Update Variations Fail";

export function fetchVariations(): IFetchAction {
  return {
    type: "FETCH",
    types: [FETCH_VARIATIONS, FETCH_VARIATIONS_SUCCESS, FETCH_VARIATIONS_FAIL],
    fetchFunction: ({ client }) => client.get(variationsRoute)
  };
}

export function updateVariationsAction(variations: IVariation[]): IFetchAction {
  return {
    type: "FETCH",
    types: [
      UPDATE_VARIATIONS,
      UPDATE_VARIATIONS_SUCCESS,
      UPDATE_VARIATIONS_FAIL
    ],
    fetchFunction: ({ client }) => client.put(variationsRoute, variations)
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
    ) => ({ ...state, loading: false, entities: action.payload }),
    [UPDATE_VARIATIONS]: (state: IVariationsState) => ({
      ...state,
      loading: true
    }),
    [UPDATE_VARIATIONS_SUCCESS]: (
      state: IVariationsState,
      action: AnyAction
    ) => ({ ...state, loading: false, entities: action.payload })
  },
  initialState
);

import { AnyAction } from "redux";
import { handleActions } from "redux-actions";
import { createSelector } from "reselect";
import { IFetchAction } from "../../types/common";
import {IVariationsState, IVariation, IOptionsState, IOption} from "../../types/models";
import {optionsRoute, variationsRoute} from "../../constants/apiRoutes";
import {IStore} from "./index";

const FETCH_OPTIONS = "[Options] Fetch";
const FETCH_OPTIONS_SUCCESS = "[Options] Fetch Success";
const FETCH_OPTIONS_FAIL = "[Options] Fetch Fail";

const UPDATE_OPTIONS = "[Options] Update Options";
export const UPDATE_OPTIONS_SUCCESS = "[Options] Update Options Success";
const UPDATE_OPTIONS_FAIL = "[Options] Update Options Fail";

export function fetchOptions(): IFetchAction {
  return {
    type: "FETCH",
    types: [FETCH_OPTIONS, FETCH_OPTIONS_SUCCESS, FETCH_OPTIONS_FAIL],
    checkIsLoaded(state: IStore): boolean {
      return Boolean(getOptions(state).length)
    },
    fetchFunction: ({ client }) => client.get(optionsRoute)
  };
}

export function updateOptionsAction(options: IOption[]): IFetchAction {
  return {
    type: "FETCH",
    types: [
      UPDATE_OPTIONS,
      UPDATE_OPTIONS_SUCCESS,
      UPDATE_OPTIONS_FAIL
    ],
    fetchFunction: ({ client }) => client.put(optionsRoute, options)
  };
}

export const getOptionsState = (state: any): IOptionsState =>
  state.options;
export const getOptions = createSelector(
  getOptionsState,
  (optionsState: IOptionsState) => {
    return optionsState.entities;
  }
);

const initialState: IOptionsState = {
  entities: [],
  loading: false,
  loaded: false
};

export const optionsReducer = handleActions<IOptionsState, any>(
  {
    [FETCH_OPTIONS]: (state: IOptionsState) => ({
      ...state,
      loading: true
    }),
    [FETCH_OPTIONS_SUCCESS]: (
      state: IOptionsState,
      action: AnyAction
    ) => ({ ...state, loading: false, entities: action.payload }),
    [UPDATE_OPTIONS]: (state: IOptionsState) => ({
      ...state,
      loading: true
    }),
    // [UPDATE_OPTIONS_SUCCESS]: (
    //   state: IOptionsState,
    //   action: AnyAction
    // ) => ({ ...state, loading: false, entities: action.payload })
  },
  initialState
);

import { AnyAction } from "redux";
import { handleActions } from "redux-actions";
import { IRentalState } from "../../types/models";
import rentals from "./fixtures";

const FETCH_RENTALS = "[Rentals] Fetch";
const FETCH_RENTALS_SUCCESS = "[Rentals] Fetch Success";
const FETCH_RENTALS_FAIL = "[Rentals] Fetch Fail";

export function fetchRentals(): AnyAction {
  return {
    type: "FETCH",
    types: [FETCH_RENTALS, FETCH_RENTALS_SUCCESS, FETCH_RENTALS_FAIL],
    fetchFunction: () =>
      new Promise(resolve => {
        setTimeout(() => resolve(rentals), 500);
      })
  };
}


const initialState: IRentalState = {
  entities: null,
  loading: false,
  loaded: false
};

export const rentalReducer = handleActions(
  {
    [FETCH_RENTALS]: (state: IRentalState) => ({ ...state, loading: true })
  },
  initialState
);

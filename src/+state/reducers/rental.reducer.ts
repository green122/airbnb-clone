import { produce } from 'immer';
import { AnyAction } from "redux";
import { handleActions } from "redux-actions";
import { createSelector } from 'reselect';
import { IFetchAction } from "../../types/common";
import { IRental, IRentalState } from "../../types/models";
import rentals from "./fixtures-big";

const FETCH_RENTALS = "[Rentals] Fetch";
const FETCH_RENTALS_SUCCESS = "[Rentals] Fetch Success";
const FETCH_RENTALS_FAIL = "[Rentals] Fetch Fail"

const FETCH_RENTAL = "[Rentals] Fetch Rental by Id";
const FETCH_RENTAL_SUCCESS = "[Rentals] Fetch Rental by Id Success";
const FETCH_RENTAL_FAIL = "[Rentals] Fetch Rental by Id Fail"

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

export function fetchRentalById(id: string): AnyAction {
  return {
    type: "FETCH",
    types: [FETCH_RENTAL, FETCH_RENTAL_SUCCESS, FETCH_RENTAL_FAIL],
    fetchFunction: () =>
      new Promise(resolve => {
        setTimeout(() => resolve(rentals.find(({ _id }) => _id === id)), 500);
      })
  };
}

export const getRentalsState = (state: any): IRentalState => state.rentals;
export const getRentals =  createSelector(getRentalsState, (rentalsState: IRentalState) => rentalsState.entities);
// export const getRentalById = createSelector(getRentalsState, id => (id), (rentalsState, id) => ((rentalsState || {}).detailedRentals || {})[id])
export const getRentalById = createSelector(getRentalsState, (_: any, id: string) => (id), (rentalsState, id) => {
  
  return ((rentalsState || {}).detailedRentals || {})[id]
});

const initialState: IRentalState = {
  entities: null,
  detailedRentals: null,
  loading: false,
  loaded: false
};

// export function setRentalById({ state, id, rental }: { state: IRentalState, id: string, rental: IRental }): IRentalState {
export function setRentalById({ state, id, rental }: { state: IRentalState, id: string, rental: IRental }): IRentalState {
  const nextState = produce(state, draftState => {
    (draftState.detailedRentals || {})[id] = rental;
  });
  return nextState;
}

export const rentalReducer = handleActions<IRentalState, any>(
  {
    [FETCH_RENTALS]: (state: IRentalState) => ({ ...state, loading: true }),
    [FETCH_RENTALS_SUCCESS]: (state: IRentalState, action: IFetchAction) => ({ ...state, loading: false, entities: action.payload }),
    [FETCH_RENTAL_SUCCESS]: (state: IRentalState, action: IFetchAction) => setRentalById({state, id: action.payload.id, rental: action.payload.rental })
  },
  initialState
);

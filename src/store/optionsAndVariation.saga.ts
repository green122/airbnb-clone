import {AnyAction} from "redux";
import {SagaIterator} from "redux-saga";
import {UPDATE_OPTIONS_SUCCESS, updateOptionsAction} from "../+state/reducers/options.reducer";
import {put, take} from "redux-saga/effects";
import {
  createVariationAction,
  fetchVariations,
  UPDATE_VARIATION_SUCCESS,
  updateVariationAction
} from "../+state/reducers/variations.reducer";

export function* optionsAndVariationSaga(action: AnyAction): SagaIterator {
  yield put(updateOptionsAction(action.payload.options));
  yield take(UPDATE_OPTIONS_SUCCESS);
  if (action.payload.variation.id === 'new') {
    yield put(createVariationAction(action.payload.variation));
  } else {
    yield put(updateVariationAction(action.payload.variation));
  }
  yield take(UPDATE_VARIATION_SUCCESS);
  yield put(fetchVariations());
}
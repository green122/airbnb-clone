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
import {
  CREATE_CATEGORY_SUCCESS,
  fetchCategoryDetails, UPDATE_CATEGORY_DETAILS_SUCCESS,
  UPDATE_VARY_PRICE_SUCCESS, updateCategoryDetails,
  updatePricesAction,
  updateVaryPrice
} from "../+state/reducers/categories.reducer";

export function* updateCategorySaga(action: AnyAction): SagaIterator {
  const {type, payload} = action.payload;
  if (type === 'category') {
    yield put(updateCategoryDetails(payload))
    yield take(UPDATE_CATEGORY_DETAILS_SUCCESS);
    yield put(fetchCategoryDetails(payload.id))
  }
  if (type === 'prices') {
    yield put(updatePricesAction(payload))
    yield put(fetchCategoryDetails(payload.categoryId))
  }
  if (type === 'varyPrice') {
    yield put(updateVaryPrice(payload));
    yield take(UPDATE_VARY_PRICE_SUCCESS)
    yield put(fetchCategoryDetails(payload.categoryId))
  }
}
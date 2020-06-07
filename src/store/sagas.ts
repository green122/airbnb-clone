import { takeEvery, put } from "redux-saga/effects";
import { navigateTo } from "../+state/actions/navigator.actions";
import { createFetchSaga } from "./fetch.saga";
import { createNavigationSaga } from "./navigator.saga";
import {UPDATE_OPTIONS_AND_VARIATION} from "../+state/reducers/common.actions";
import {optionsAndVariationSaga} from "./optionsAndVariation.saga";
import {
  CREATE_CATEGORY_SUCCESS,
  createCategory,
  fetchCategories,
  updateCategoryAction
} from "../+state/reducers/categories.reducer";
import {updateCategorySaga} from "./updateCategory.saga";

export function createRootSaga({ client, history }: { client: any, history: any }) {
  const worker = createFetchSaga(client);
  const navigatorSaga = createNavigationSaga(history);
  return function* rootSaga() {
    yield takeEvery("FETCH", worker);
    yield takeEvery(UPDATE_OPTIONS_AND_VARIATION, optionsAndVariationSaga);
    yield takeEvery(navigateTo.toString(), navigatorSaga);
    yield takeEvery(updateCategoryAction.toString(), updateCategorySaga);
    yield takeEvery(CREATE_CATEGORY_SUCCESS, function * () {
      yield put(fetchCategories(false))
    });
  };
}

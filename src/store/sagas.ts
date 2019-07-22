import { takeEvery } from "redux-saga/effects";
import { navigateTo } from "../+state/actions/navigator.actions";
import { createFetchSaga } from "./fetch.saga";
import { navigatorSaga } from "./navigator.saga";

export function createRootSaga({ client }: { client: any }) {
  const worker = createFetchSaga(client);
  return function* rootSaga() {
    yield takeEvery("FETCH", worker);
    yield takeEvery(navigateTo.toString(), navigatorSaga);
  };
}

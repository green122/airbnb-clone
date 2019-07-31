import { takeEvery } from "redux-saga/effects";
import { navigateTo } from "../+state/actions/navigator.actions";
import { createFetchSaga } from "./fetch.saga";
import { createNavigationSaga } from "./navigator.saga";

export function createRootSaga({ client, history }: { client: any, history: any }) {
  const worker = createFetchSaga(client);
  const navigatorSaga = createNavigationSaga(history);
  return function* rootSaga() {
    yield takeEvery("FETCH", worker);
    yield takeEvery(navigateTo.toString(), navigatorSaga);
  };
}

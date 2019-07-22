import { AnyAction } from "redux";
import { SagaIterator } from "redux-saga";
import { call, put } from "redux-saga/effects";
// import { IFetchAction } from "../types/common";

export function createFetchSaga(client: any) {
  return function* fetchSaga(action: AnyAction): SagaIterator {
    const { types = [], payload, fetchFunction } = action;
    const [START, SUCCESS, FAIL] = types;
    yield put({ type: START });

    let result;
    try {
      result = yield call(fetchFunction, { client, payload });
      yield put({ type: SUCCESS, result, payload });
    } catch (e) {
      yield put({ type: FAIL, error: e });
    }
  };
}

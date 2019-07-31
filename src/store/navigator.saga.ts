import { AnyAction } from "redux";
import { SagaIterator } from "redux-saga";
import { getNavigationService } from '../services/navigation.service'


export function createNavigationSaga(history: any) {
  const service = getNavigationService(history);
  return function* navigatorSaga(action: AnyAction): SagaIterator {
    service.goToRental(action.payload);
  };
}


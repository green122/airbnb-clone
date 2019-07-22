import { AnyAction } from "redux";
import { SagaIterator } from "redux-saga";
import { getNavigationService } from '../services/navigation.service'


export function* navigatorSaga(action: AnyAction): SagaIterator {
    getNavigationService().goToRental(action.payload);
  };


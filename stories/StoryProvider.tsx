import axios from 'axios';
import React from 'react';
import { Provider as ReduxProvider } from 'react-redux';
import { applyMiddleware, compose, createStore } from 'redux';
import createSagaMiddlware from 'redux-saga';

import rootReducers from '../src/+state/reducers';
import { createRootSaga } from '../src/store/sagas';

const sagaMiddleware = createSagaMiddlware();
const composeEnhancers = (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE || compose;

const store = createStore(
  rootReducers,
  composeEnhancers(
      applyMiddleware(sagaMiddleware),
  ),
);

sagaMiddleware.run(createRootSaga({ client: axios }));

export default function Provider({ story }: any) {
  return (
    <ReduxProvider store={store}>
      {story}
    </ReduxProvider>
  )
}
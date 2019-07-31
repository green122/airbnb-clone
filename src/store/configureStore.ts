
import axios from 'axios';
import { applyMiddleware, compose, createStore } from 'redux';
import { createLogger } from 'redux-logger';
import createSagaMiddlware from 'redux-saga';

import rootReducers from '../+state/reducers';
import { createRootSaga } from './sagas';

const sagaMiddleware = createSagaMiddlware();
const composeEnhancers = (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const getAppliedMiddleware = (routerhistory: any) => {
    if (process.env.NODE_ENV === 'development') {
        return applyMiddleware(
            sagaMiddleware,
            createLogger(),
        );
    } 
    return applyMiddleware(
      sagaMiddleware,
    )
}

const configureStore = (routerHistory: any, preloadedState?: any) => {
    const store = createStore(
        rootReducers,
        preloadedState,
        composeEnhancers(
            getAppliedMiddleware(routerHistory),
        ),
    );
    sagaMiddleware.run(createRootSaga({client: axios, history: routerHistory }));
    return store;
}

export default configureStore;
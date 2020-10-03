
import axios from 'axios';
import { createLogger } from 'redux-logger';
import createSagaMiddlware from 'redux-saga';

import rootReducers from '../+state/reducers';
import { createRootSaga } from './sagas';
import {configureStore} from "@reduxjs/toolkit";

const sagaMiddleware = createSagaMiddlware();

const configureStoreWithHistory = (routerHistory: any, preloadedState?: any) => {
    // const store = createStore(
    //     rootReducers,
    //     preloadedState,
    //     composeEnhancers(
    //         getAppliedMiddleware(routerHistory),
    //     ),
    // );
    const store = configureStore({
        devTools: process.env.NODE_ENV !== "production",
        reducer: rootReducers,
        middleware: getDefaultMiddleware => getDefaultMiddleware().concat([sagaMiddleware, createLogger()])
    });
    sagaMiddleware.run(createRootSaga({client: axios, history: routerHistory }));
    return store;
}

export default configureStoreWithHistory;


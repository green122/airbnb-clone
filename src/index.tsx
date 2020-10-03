import 'semantic-ui-css/semantic.min.css'
import './index.css';


import { createBrowserHistory } from 'history';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import {Provider, useDispatch} from 'react-redux';
import { BrowserRouter, Route, Router, Switch } from 'react-router-dom';
import rootReducers from './+state/reducers';
import registerServiceWorker from './registerServiceWorker';
import { AppRoutes } from './routes';
import configureStore from './store/configureStore';
import App from "./App";

const history = createBrowserHistory();
const store = configureStore(history);
export type AppDispatch = typeof store.dispatch;
export type RootStore = typeof store;
export type RootState = ReturnType<typeof rootReducers>
export const useAppDispatch = () => useDispatch<AppDispatch>()

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <Router history={history}>
       <App />
      </Router>
    </BrowserRouter>
  </Provider>,
  document.getElementById('root') as HTMLElement,
);
registerServiceWorker();

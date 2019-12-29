import 'semantic-ui-css/semantic.min.css'
import './index.css';


import { createBrowserHistory } from 'history';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter, Route, Router, Switch } from 'react-router-dom';

import registerServiceWorker from './registerServiceWorker';
import { AppRoutes } from './routes';
import configureStore from './store/configureStore';

const history = createBrowserHistory();
const store = configureStore(history);

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <Router history={history}>
        <Switch>
          {AppRoutes.map(route => <Route key={route.path as string} {...route} />)}
        </Switch>
      </Router>
    </BrowserRouter>
  </Provider>,
  document.getElementById('root') as HTMLElement,
);
registerServiceWorker();

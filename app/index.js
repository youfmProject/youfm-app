import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { Router, browserHistory, createRoutes } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux';
import rawRoutes from './routes';
import configureStore from './store/configureStore';
import './stylesheets/app.css';

const store = configureStore();
const history = syncHistoryWithStore(browserHistory,store);

function mixStoreToRoutes(routes) {
    return routes && routes.map(route => ({
        ...route,
        childRoutes: mixStoreToRoutes(route.childRoutes),
        onEnter: route.onEnter && function (props, replaceState, cb) {
            route.onEnter(store.dispatch, props)
                .then(() => cb(null))
                .catch(cb);
        }
    }));
}

const routes = mixStoreToRoutes(createRoutes(rawRoutes));

render(
  <Provider store={store}>
    <Router history={history} routes={routes} />
  </Provider>,
  document.getElementById('root')
);

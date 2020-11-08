import React from 'react';
import Router from './Router';

import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose } from 'redux';
import reduxThunk from 'redux-thunk';

import { composeWithDevTools } from 'remote-redux-devtools';

import rootReducer from './reducers';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(rootReducer, composeEnhancers(applyMiddleware(reduxThunk)));

/*const store = createStore(rootReducer, composeWithDevTools(
    applyMiddleware(reduxThunk)
));*/

const SeriesApp = prop => (
    <Provider store={store}>
        <Router />
    </Provider>
);

export default SeriesApp;
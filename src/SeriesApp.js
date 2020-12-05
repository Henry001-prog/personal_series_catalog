import React from 'react';
import Router from './Router';

import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose } from 'redux';
import reduxThunk from 'redux-thunk';

import FlashMessage from "react-native-flash-message";

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
        <FlashMessage position="top" style={{alignItems: 'center'}} />
    </Provider>
);

export default SeriesApp;
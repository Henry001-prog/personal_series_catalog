import React from "react";
import Router from "./Router";

import FlashMessage from "react-native-flash-message";

import { Provider as Store } from "jotai";

/*const store = createStore(rootReducer, composeWithDevTools(
    applyMiddleware(reduxThunk)
));*/

const SeriesApp = (prop) => (
  <Store>
    <Router />
    <FlashMessage position="top" style={{ alignItems: "center" }} />
  </Store>
);

export default SeriesApp;

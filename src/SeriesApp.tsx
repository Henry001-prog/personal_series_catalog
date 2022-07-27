import React from "react";
import Router from "./Router";

import { Provider as Store } from "jotai";

const SeriesApp = () => (
  <Store>
    <Router />
  </Store>
);

export default SeriesApp;

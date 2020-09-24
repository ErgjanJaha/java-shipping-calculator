import {Provider} from "react-redux";
import React from "react";
import ReactDOM from "react-dom";

import AppContainer from "./containers/AppContainer";
import DevTools from "./components/DevTools";
import configureStore from "./store";

const store = configureStore();
ReactDOM.render(
    <Provider store={store}>
        <AppContainer/>
        <DevTools/>
    </Provider>, document.getElementById("root"));

import { createStore, applyMiddleware, compose } from "redux"
import thunk from "redux-thunk";
import rootReducer from "./reducers";
import DevTools from "./components/DevTools";

export default function configureStore() {
    return createStore(
        rootReducer,
        compose(
            applyMiddleware(thunk), DevTools.instrument()
        )
    );
}
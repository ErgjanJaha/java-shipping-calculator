import { combineReducers } from "redux";
import create from "./create";
import {reducer as formReducer} from 'redux-form';

const reducer = combineReducers({
  form: formReducer,
  create: create,
});

export default reducer;
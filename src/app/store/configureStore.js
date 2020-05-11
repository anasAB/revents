import { createStore } from "redux";
import { devToolsEnhancer } from "redux-devtools-extension";
import RootReducer from "../reducers/rootReducer";

export const configureStore = () => {
  const store = createStore(RootReducer, devToolsEnhancer());

  return store;
};

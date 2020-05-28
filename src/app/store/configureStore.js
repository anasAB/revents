import { createStore, applyMiddleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import RootReducer from "../reducers/rootReducer";
import thunk from "redux-thunk";

export const configureStore = () => {
  //! Adding Thunk
  const middlewares = [thunk];
  const composedEnhancer = composeWithDevTools(applyMiddleware(...middlewares));
  const store = createStore(RootReducer, composedEnhancer); //!devToolsEnhancer is included in composedEnhancer

  return store;
};

import { createStore, applyMiddleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import RootReducer from "../reducers/rootReducer";
import thunk from "redux-thunk";

import { reactReduxFirebase, getFirebase } from "react-redux-firebase";
import { reduxFirestore, getFirestore } from "redux-firestore";

import firebase from "../Config/firebase";

const rrfConfig = {
  userProfile: "users",
  attachAuthIsReady: true,
  useFirestoreForProfile: true,
};
export const configureStore = () => {
  //! Adding Thunk
  const middlewares = [thunk.withExtraArgument({ getFirebase, getFirestore })];

  const composedEnhancer = composeWithDevTools(
    applyMiddleware(...middlewares),
    reactReduxFirebase(firebase, rrfConfig),
    reduxFirestore(firebase)
  );
  const store = createStore(RootReducer, composedEnhancer); //!devToolsEnhancer is included in composedEnhancer

  return store;
};

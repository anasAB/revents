import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./app/layout/App.jsx";
import registerServiceWorker from "./registerServiceWorker";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { configureStore } from "./app/store/configureStore";
import ScrollToTop from "./app/common/util/ScrollToTop";
import { loadEvents } from "./features/event/eventActions";
import ReduxToastr from "react-redux-toastr";
import "react-redux-toastr/lib/css/react-redux-toastr.min.css";

const rootEl = document.getElementById("root");

const store = configureStore();

store.dispatch(loadEvents()); //!Load all the events from the Store

let render = () => {
  ReactDOM.render(
    <Provider store={store}>
      <BrowserRouter>
        <ScrollToTop>
          <ReduxToastr
            timeOut={4000}
            newestOnTop={false}
            preventDuplicates
            position="bottom-right"
            getState={(state) => state.toastr}
            transitionIn="fadeIn"
            transitionOut="fadeOut"
            progressBar
            closeOnToastrClick
          />
          <App />
        </ScrollToTop>
      </BrowserRouter>
    </Provider>,
    rootEl
  );
};

if (module.hot) {
  module.hot.accept(App, () => {
    setTimeout(render);
  });
}

render();

registerServiceWorker();

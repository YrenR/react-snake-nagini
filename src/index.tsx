import React from "react";
import ReactDOM from "react-dom";
import TableBoard from "./pages/TableBoard";
import { Provider } from "react-redux";
import "./index.css";
import { persistor, store } from "./redux/store";
import { PersistGate } from "redux-persist/integration/react";

ReactDOM.render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <TableBoard />
    </PersistGate>
  </Provider>,
  document.getElementById("root"),
);

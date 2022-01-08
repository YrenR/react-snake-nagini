import React from "react";
import TableBoard from "./pages/TableBoard";
import { Provider } from "react-redux";
import { persistor, store } from "./redux/store";
import { PersistGate } from "redux-persist/integration/react";

export default function App(): JSX.Element {
  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <TableBoard />
      </PersistGate>
    </Provider>
  );
}

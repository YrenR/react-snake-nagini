import React from "react";
import TableBoard from "./pages/TableBoard";
import { Provider } from "react-redux";
import { persistor, store } from "./redux/store";
import { PersistGate } from "redux-persist/integration/react";
import NavBar from "./components/NavBar/NavBar";

export default function App(): JSX.Element {
  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <NavBar />
        <TableBoard />
      </PersistGate>
    </Provider>
  );
}

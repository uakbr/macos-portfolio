import React, { useState } from "react";
import ReactDOM from "react-dom";
import "./styles/index.css";
import "./styles/index.tailwind.css";
import { Provider } from "react-redux";
import store from "./redux/store";

import Desktop from "./pages/Desktop";
import Login from "./pages/Login";
import Boot from "./pages/Boot";
import { I18nextProvider } from "react-i18next";
import i18n from "./i18n";
import * as serviceWorkerRegistration from './serviceWorkerRegistration';

export default function App() {
  const [login, setLogin] = useState(false);
  const [booting, setBooting] = useState(false);
  const [restart, setRestart] = useState(false);
  const [sleep, setSleep] = useState(false);

  const shutMac = (e) => {
    e.stopPropagation();
    setRestart(false);
    setSleep(false);
    setLogin(false);
    setBooting(true);
  };

  const restartMac = (e) => {
    e.stopPropagation();
    setRestart(true);
    setSleep(false);
    setLogin(false);
    setBooting(true);
  };

  const sleepMac = (e) => {
    e.stopPropagation();
    setRestart(false);
    setSleep(true);
    setLogin(false);
    setBooting(true);
  };

  if (booting) {
    return <Boot restart={restart} sleep={sleep} setBooting={setBooting} />;
  } else if (login) {
    return (
      <Desktop
        setLogin={setLogin}
        shutMac={shutMac}
        sleepMac={sleepMac}
        restartMac={restartMac}
      />
    );
  } else {
    return (
      <Login
        setLogin={setLogin}
        shutMac={shutMac}
        sleepMac={sleepMac}
        restartMac={restartMac}
      />
    );
  }
}

ReactDOM.render(
  <Provider store={store}>
    <I18nextProvider i18n={i18n}>
      <React.StrictMode>
        <App />
      </React.StrictMode>
    </I18nextProvider>
  </Provider>,
  document.getElementById("root")
);

// Register the service worker
serviceWorkerRegistration.register();

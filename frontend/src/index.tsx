import React from "react";
import ReactDOM from "react-dom";
import CssBaseline from "@material-ui/core/CssBaseline";
import { ThemeProvider } from "@material-ui/core/styles";
import { observerBatching, Provider } from "mobx-react";
import Router from "./Router";
import theme from "./theme";
import localStorage from "./localStorage";

observerBatching();

ReactDOM.render(
  <React.StrictMode>
    <Provider {...localStorage}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Router />
      </ThemeProvider>
    </Provider>
  </React.StrictMode>,

  document.getElementById("root")
);

import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { SnackbarProvider } from "notistack";
import { createTheme, ThemeProvider } from "@material-ui/core/styles";
import "./index.css";
import store from "./store";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import App from "./App";
import Page404Screen from "./screens/Page404Screen";
import SobreScreen from "./screens/SobreScreen";
import { blue, red } from "@material-ui/core/colors";

const theme = createTheme({
  palette: {
    primary: {
      main: blue[800],
    },
    secondary: {
      main: red[700],
    },
  },
});

ReactDOM.render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <Provider store={store} id="main">
        <SnackbarProvider maxSnack={3}>
          <BrowserRouter>
            <Switch>
              <Route path="/" exact={true} component={App} />
              <Route path="/sobre" component={SobreScreen} />
              <Route path="*" component={Page404Screen} />
            </Switch>
          </BrowserRouter>
        </SnackbarProvider>
      </Provider>
    </ThemeProvider>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

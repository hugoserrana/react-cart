import React from "react";
import CssBaseline from "@material-ui/core/CssBaseline";
import logo from "./logo.webp";
import CartComponent from "./components/CartComponent";
import FilterComponent from "./components/FilterComponent";
import ProductListContainer from "./components/ProductListContainer";
import NotifierComponent from "./components/NotifierComponent";
import "./App.css";

export default function App() {
  return (
    <React.Fragment>
      <CssBaseline />
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <CartComponent />
        </header>
        <main id="main">
          <NotifierComponent />
          <FilterComponent></FilterComponent>
          <ProductListContainer></ProductListContainer>
        </main>
        <footer></footer>
      </div>
    </React.Fragment>
  );
}

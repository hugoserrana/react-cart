import React from "react";
import { Provider } from "react-redux";
import { render } from "@testing-library/react";
import { SnackbarProvider } from "notistack";

import App from "./App";
import store from "./store";

describe("When APP initialize", () => {
  it("Should render container", () => {
    const { container } = render(
      <Provider store={store}>
        <SnackbarProvider>
          <App />
        </SnackbarProvider>
      </Provider>
    );

    // Verifica se o logo foi exibido na tela
    expect(container.getElementsByClassName("App-logo").length).toBe(1);

    // Verifica se o carrinho de compras foi exibido na tela
    expect(container.getElementsByClassName("cart cart-header").length).toBe(1);

    // Verifica se a lista de produtos foi renderizada na tela.
    // OBS: ela não deve existir antes do carregamento dos dados
    expect(container.getElementsByClassName("product-list").length).toBe(0);
  });
});

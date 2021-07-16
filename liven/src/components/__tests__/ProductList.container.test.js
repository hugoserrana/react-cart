import React from "react";
import { Provider } from "react-redux";
import { fireEvent, render, screen } from "@testing-library/react";
import ProductList from "../ProductList";
import store from "../../store";

const mockData = [
  {
    id: "1",
    createdAt: "2019-09-02T12:58:54.103Z",
    name: "Produto 1",
    price: "100.00",
    image: "http://lorempixel.com/640/480/food",
    stock: 1,
  },
  {
    id: "2",
    createdAt: "2021-09-02T12:58:54.103Z",
    name: "Produto 2",
    price: "222.00",
    image: "http://lorempixel.com/640/480/food",
    stock: 5,
  },
];

describe("When product list has items", () => {
  it("Should buy items work", () => {
    render(
      <Provider store={store}>
        <ProductList
          filteredItems={mockData}
          loadItems={jest.fn()}
        ></ProductList>
      </Provider>
    );

    // Verifica se os cards de itens são exibidos na tela
    expect(screen.getByText("Produto 1")).toBeInTheDocument();

    // Verifica ação de clicar no produto>>
    fireEvent.click(screen.getAllByText("Comprar")[0]);

    // Verifica se o item foi adicionado ao carrinho
    const state = store.getState();
    expect(state.cart.cartItems.length).toEqual(1);
  });
});

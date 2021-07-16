import React from "react";
import { render, screen } from "@testing-library/react";
import ProductList from "../ProductList";

describe("When product list render an api error", () => {
  it("Should render product list with error", () => {
    render(
      <ProductList error="Erro teste API" loadItems={jest.fn()}></ProductList>
    );
    expect(screen.getByText("Erro teste API")).toBeInTheDocument();
  });
});

describe("When product list is empty", () => {
  it("Should render product list with error", () => {
    render(
      <ProductList filteredItems={[]} loadItems={jest.fn()}></ProductList>
    );
    expect(
      screen.getByText("Nenhum item encontrado com os termos buscados...")
    ).toBeInTheDocument();
  });
});

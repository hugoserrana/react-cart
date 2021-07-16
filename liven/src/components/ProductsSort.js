import React, { Component } from "react";
import { connect } from "react-redux";
import { filterProducts, sortProducts } from "../actions/productActions";
import "./FilterComponent.css";

class FilterComponent extends Component {
  render() {
    return (
      <div className="filter">
        <div className="filter-result">
          {this.props.filteredProducts.length} Produtos
        </div>
        <div className="filter-sort">
          Ordenar por{" "}
          <select
            value={this.props.sort}
            onChange={(e) =>
              this.props.sortProducts(
                this.props.filteredProducts,
                e.target.value
              )
            }
          >
            <option value="created_at_asc">Data criação crescente</option>
            <option value="created_at_desc">Data criação descrescente</option>
            <option value="price_asc">Valor crescente</option>
            <option value="price_desc">Valor descrescente</option>
          </select>
        </div>
        <div className="filter-size">
          Filter{" "}
          <select
            value={this.props.size}
            onChange={(e) =>
              this.props.filterProducts(this.props.products, e.target.value)
            }
          >
            <option value="">ALL</option>
            <option value="XS">XS</option>
            <option value="S">S</option>
            <option value="M">M</option>
            <option value="L">L</option>
            <option value="XL">XL</option>
            <option value="XXL">XXL</option>
          </select>
        </div>
      </div>
    );
  }
}
export default connect(
  (state) => ({
    size: state.products.size,
    sort: state.products.sort,
    products: state.products.items,
    filteredProducts: state.products.filteredItems,
  }),
  {
    filterProducts,
    sortProducts,
  }
)(FilterComponent);

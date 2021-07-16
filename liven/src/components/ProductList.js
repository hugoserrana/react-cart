import React from "react";
import ProductItemContainer from "./ProductItemContainer";
import CircularProgress from "@material-ui/core/CircularProgress";
import "./ProductList.css";

export default class Product extends React.Component {
  componentDidMount() {
    const { loadItems } = this.props;
    loadItems();
  }

  render() {
    const { error, filteredItems, isLoading } = this.props;

    let component;

    if (isLoading) {
      component = (
        <div className="spinner">
          <CircularProgress />
        </div>
      );
    } else if (error) {
      component = <div className="error">{error}</div>;
    } else {
      component =
        filteredItems && filteredItems.length > 0 ? (
          <div>
            <div className="product-list">
              {filteredItems.map((item) => (
                <ProductItemContainer key={item.id} item={item} />
              ))}
            </div>
          </div>
        ) : (
          <div>Nenhum item encontrado com os termos buscados...</div>
        );
    }

    return <div className="product-list-container">{component}</div>;
  }
}

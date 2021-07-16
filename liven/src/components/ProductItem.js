import React from "react";
import { displayCurrency, displayDate } from "../utils";
import "./ProductItem.css";

const ProductItem = (props) => {
  const { addToCart, item } = props;
  const { id, name, price, createdAt, image, stock } = item;

  return (
    <div className="product-item">
      <div className="product-img-container">
        <img className="product-img" src={image} alt={image} />
      </div>
      <div className="product-container">
        <div className="product-title">
          #<span>{id}</span>
          {"  "}
          <span>{name}</span>
        </div>
        <div className="product-price">{displayCurrency(price)}</div>
        <div className="product-small-desc">
          <div>Em estoque: {stock}</div>
          <div>Adicionado em: {displayDate(createdAt)}</div>
        </div>
        <button onClick={() => addToCart(item)} className="product-btn-buy">
          Comprar
        </button>
      </div>
    </div>
  );
};

export default ProductItem;

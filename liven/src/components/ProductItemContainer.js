import { connect } from "react-redux";
import { addToCart } from "../actions/cartActions";
import ProductItem from "./ProductItem";

const mapStateToProps = (state) => ({
  isLoading: state.products.isLoading,
  error: state.products.error,
});

const mapDispatchToProps = (dispatch) => ({
  addToCart: (item) => dispatch(addToCart(item)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ProductItem);

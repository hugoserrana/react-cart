import { connect } from "react-redux";
import { fetchProducts } from "../actions/productActions";
import ProductList from "./ProductList";

const mapStateToProps = (state) => ({
  filteredItems: state.products.filteredItems,
  isLoading: state.products.isLoading,
  error: state.products.error,
});

const mapDispatchToProps = (dispatch) => ({
  loadItems: () => dispatch(fetchProducts()),
});

export default connect(mapStateToProps, mapDispatchToProps)(ProductList);

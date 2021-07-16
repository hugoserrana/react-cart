import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import TextField from "@material-ui/core/TextField";
import {
  filterProducts,
  sortProducts,
  sortProductsEnum,
} from "../actions/productActions";
import "./FilterComponent.css";

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 250,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));

const FilterComponent = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  let filteredProducts = useSelector((state) => state.products.filteredItems);
  let products = useSelector((state) => state.products.items);
  let sort = useSelector(
    (state) => state.products.sort || sortProductsEnum.ID_ASC
  );

  return !filteredProducts ? null : (
    <div className="filter">
      <div className="filter-sort">
        <FormControl variant="outlined" className={classes.formControl}>
          <InputLabel>Ordenar por</InputLabel>
          <Select
            value={sort}
            onChange={(e) =>
              dispatch(sortProducts(filteredProducts, e.target.value))
            }
          >
            <MenuItem value={sortProductsEnum.ID_ASC}>
              Referência crescente
            </MenuItem>
            <MenuItem value={sortProductsEnum.ID_DESC}>
              Referência descrescente
            </MenuItem>
            <MenuItem value={sortProductsEnum.CREATED_AT_ASC}>
              Data criação crescente
            </MenuItem>
            <MenuItem value={sortProductsEnum.CREATED_AT_DESC}>
              Data criação descrescente
            </MenuItem>
            <MenuItem value={sortProductsEnum.NAME_ASC}>
              Nome crescente
            </MenuItem>
            <MenuItem value={sortProductsEnum.NAME_DESC}>
              Nome descrescente
            </MenuItem>
            <MenuItem value={sortProductsEnum.PRICE_ASC}>
              Valor crescente
            </MenuItem>
            <MenuItem value={sortProductsEnum.PRICE_DESC}>
              Valor descrescente
            </MenuItem>
          </Select>
        </FormControl>
      </div>
      <div className="filter-search">
        <TextField
          label="Buscar"
          variant="outlined"
          onChange={(e) => dispatch(filterProducts(products, e.target.value))}
        />
      </div>
      <div className="filter-result">
        {filteredProducts.length}
        {filteredProducts.length === 1
          ? " produto encontrado"
          : " produtos encontrados"}
      </div>
    </div>
  );
};

export default FilterComponent;

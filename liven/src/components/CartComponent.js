import React, { useState } from "react";
import { displayCurrency } from "../utils";
import { useDispatch, useSelector } from "react-redux";
import { removeFromCart, changeCountToCart } from "../actions/cartActions";
import { createOrder, clearOrder } from "../actions/orderActions";
import { makeStyles } from "@material-ui/core/styles";
import Badge from "@material-ui/core/Badge";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import Button from "@material-ui/core/Button";
import DeleteIcon from "@material-ui/icons/Delete";
import Dialog from "@material-ui/core/Dialog";
import Fab from "@material-ui/core/Fab";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import List from "@material-ui/core/List";
import Divider from "@material-ui/core/Divider";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import CloseIcon from "@material-ui/icons/Close";
import Slide from "@material-ui/core/Slide";
import TextField from "@material-ui/core/TextField";
import Tooltip from "@material-ui/core/Tooltip";
import "./CartComponent.css";
import { CLEAR_CART } from "../types";

const useStyles = makeStyles((theme) => ({
  appBar: {
    position: "relative",
  },
  badge: {
    fontSize: 15,
  },
  listItem: {
    display: "flex",
    flexGrow: 1,
    justifyContent: "space-between",
  },
  listItemImg: {
    borderRadius: "5px",
    width: "90px",
  },
  title: {
    color: "white",
    marginLeft: theme.spacing(2),
    flex: 1,
  },
}));

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const CartComponent = () => {
  const dispatch = useDispatch();
  const classes = useStyles();
  const [showModal, setShowModal] = useState(false);
  const cartItems = useSelector((state) => state.cart.cartItems);
  const totalItems = cartItems.reduce((prev, cur) => prev + cur.count, 0);

  function handleQuantityInput(e, item) {
    dispatch(changeCountToCart(item, e.target.value));
  }

  function createOrderFn(e) {
    e.preventDefault();

    const order = {
      cartItems: cartItems,
      total: cartItems.reduce((a, c) => a + c.price * c.count, 0),
    };

    dispatch(createOrder(order));
    setShowModal(false);
  }

  function clearCart(e) {
    e.preventDefault();

    dispatch({
      type: CLEAR_CART,
      payload: { cartItems },
    });
  }

  function closeModal() {
    dispatch(clearOrder());
    setShowModal(false);
  }

  return (
    <div>
      <div
        className="cart cart-header"
        onClick={() => setShowModal(!showModal)}
      >
        <Badge
          badgeContent={totalItems}
          color="secondary"
          max={99999}
          classes={{ badge: classes.badge }}
        >
          <ShoppingCartIcon style={{ fontSize: 40 }} />
        </Badge>
      </div>
      <Dialog
        fullScreen
        open={showModal}
        onClose={closeModal}
        TransitionComponent={Transition}
      >
        <AppBar className={classes.appBar}>
          <Toolbar>
            <IconButton
              edge="start"
              color="inherit"
              onClick={closeModal}
              aria-label="close"
            >
              <CloseIcon />
            </IconButton>
            <Typography variant="h2" className={classes.title}>
              <ListItem>
                <ListItemText
                  primary={
                    <Badge
                      badgeContent={totalItems}
                      color="secondary"
                      max={99999}
                      classes={{ badge: classes.badge }}
                    >
                      Carrinho de compras
                    </Badge>
                  }
                  secondary={
                    <span className="title-total">
                      Total:{" "}
                      {displayCurrency(
                        cartItems.reduce((a, c) => a + c.price * c.count, 0)
                      )}
                    </span>
                  }
                />
                <Button autoFocus color="inherit" onClick={clearCart}>
                  Limpar carrinho
                </Button>
              </ListItem>
            </Typography>
            <Button autoFocus color="inherit" onClick={createOrderFn}>
              Efetuar compra
            </Button>
          </Toolbar>
        </AppBar>
        <List>
          {cartItems.map((item) => (
            <React.Fragment key={item.id}>
              <ListItem className={classes.listItem}>
                <ListItemText
                  primary={
                    <img
                      src={item.image}
                      alt={item.title}
                      className={classes.listItemImg}
                    ></img>
                  }
                />
                <ListItemText
                  primary={item.name}
                  secondary={
                    <div>Valor unitário: {displayCurrency(item.price)}</div>
                  }
                />
                <ListItemText
                  primary={
                    <TextField
                      name="count"
                      type="number"
                      variant="outlined"
                      label="Quantidade"
                      helperText={"Estoque: " + item.stock}
                      required
                      value={item.count}
                      onChange={(e) => handleQuantityInput(e, item)}
                    />
                  }
                />
                <ListItemText
                  primary="Valor"
                  secondary={displayCurrency(item.price * item.count)}
                />
                <Tooltip title="Remover" aria-label="remove">
                  <Fab
                    color="secondary"
                    size="small"
                    onClick={() => dispatch(removeFromCart(item))}
                  >
                    <DeleteIcon size="small" />
                  </Fab>
                </Tooltip>
              </ListItem>
              <Divider></Divider>
            </React.Fragment>
          ))}
        </List>
      </Dialog>
    </div>
  );
};

export default CartComponent;

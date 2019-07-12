import React, { Component } from "react";
import { IProduct } from "../common/interface/products";
import util from "../common/util";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { removeFromCart } from "../common/actions/cartActions";

interface props {
  cartItems: IProduct[];
  removeFromCart(payload: any): any;
}

class Basket extends Component<props, any> {
  handleRemoveFromCart = (e: any, product: IProduct) => {
    const existsCartItems = [...this.props.cartItems];
    const filteredCartItems = existsCartItems.filter(
      item => item.id !== product.id
    );
    util.setLocalStorage("cartItems", filteredCartItems);
    this.props.removeFromCart(filteredCartItems);
  };

  render() {
    const { cartItems } = this.props;
    return (
      <div className="alert alert-info">
        {cartItems.length === 0 ? (
          "Basket is Empty"
        ) : (
          <div>You have {cartItems.length} products in Basket.</div>
        )}
        {cartItems.length > 0 && (
          <div>
            <ul>
              {cartItems.map(item => (
                <li>
                  <b>
                    {item.title} X {item.count} ={" "}
                    {item.price &&
                      item.count &&
                      util.formatCurrency(item.price * item.count)}
                  </b>
                  <button
                    className="btn btn-danger"
                    onClick={e => this.handleRemoveFromCart(e, item)}
                  >
                    X
                  </button>
                </li>
              ))}
            </ul>
            Total:{" "}
            {util.formatCurrency(
              cartItems.reduce((a: any, item) => {
                if (item.price && item.count) {
                  return a + item.price * item.count;
                }
              }, 0)
            )}
            <div>
              <button
                className="btn btn-primary"
                onClick={e => alert("checkout need to implement....")}
              >
                Checkout
              </button>
            </div>
          </div>
        )}
      </div>
    );
  }
}

const mapStateToProps = (state: any) => {
  return {
    cartItems: state.cart.cartItems
  };
};

const mapDispatchToProps = (dispatch: any) => {
  return bindActionCreators(
    {
      removeFromCart: removeFromCart
    },
    dispatch
  );
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Basket);

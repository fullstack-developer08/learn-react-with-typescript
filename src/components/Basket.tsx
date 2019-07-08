import React, { Component } from "react";
import { IProduct } from "../common/interface/products";

interface props {
  cartItems: IProduct[];
  handleRemoveFromCart: (e: any, item: IProduct) => void;
}

export default class Basket extends Component<props, any> {
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
                    {item.price && item.count && item.price * item.count}
                  </b>
                  <button
                    className="btn btn-danger"
                    onClick={e => this.props.handleRemoveFromCart(e, item)}
                  >
                    X
                  </button>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    );
  }
}

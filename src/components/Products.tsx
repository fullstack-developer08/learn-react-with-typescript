import React, { Component, Fragment } from "react";
import { IProduct } from "../common/interface/products";
import util from "../common/util";

interface props {
  products: IProduct[];
  handleAddToCart(e: any, product: IProduct): any;
}

export default class Products extends Component<props, any> {
  handleAddToCart = () => {};

  render() {
    const productItems =
      this.props.products &&
      this.props.products.map(product => {
        return (
          <div className="col-md-4">
            <div className="thumbnail text-center">
              <a href="#" onClick={this.handleAddToCart}>
                <img src={`/products/${product.sku}_2.jpg`} />
                <p>{product.title}</p>
              </a>
              <div>
                {product.price && <b>{util.formatCurrency(product.price)}</b>}
                <button className="btn btn-primary" onClick={(e) => this.props.handleAddToCart(e, product)}>Add To Cart</button>
              </div>
            </div>
          </div>
        );
      });
    return <div className="row">{productItems}</div>;
  }
}

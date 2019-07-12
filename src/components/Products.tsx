import React, { Component, Fragment } from "react";
import { IProduct } from "../common/interface/products";
import util from "../common/util";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { fetchProducts } from "../common/actions/productActions";
import { fetchProductService } from "../common/services/product.service";
import { addToCart } from "../common/actions/cartActions";

interface props {
  products: IProduct[];
  cartItems: IProduct[];
  fetchProducts(payload: any): any;
  addToCart(payload: any): any;
}

class Products extends Component<props, any> {
  componentDidMount() {
    const cartItems = util.getLocalStorage("cartItems");
    this.props.addToCart(cartItems);
    const res = fetchProductService();
    res.then(data => {
      this.props.fetchProducts(data);
    });
  }

  handleAddToCart = (e: any, product: IProduct) => {
    const cartItems = [...this.props.cartItems];
    let isProductInCart = false;
    cartItems.map(cartItem => {
      if (cartItem.id === product.id) {
        isProductInCart = true;
        if (cartItem.count) {
          cartItem.count++;
        }
      }
    });
    if (!isProductInCart) {
      cartItems.push({ ...product, count: 1 });
    }
    util.setLocalStorage("cartItems", cartItems);
    this.props.addToCart(cartItems);
  };

  render() {
    const productItems =
      this.props.products &&
      this.props.products.map(product => {
        return (
          <div className="col-md-4" key={product.id}>
            <div className="thumbnail text-center">
              <a href="#" onClick={e => this.handleAddToCart(e, product)}>
                <img src={`/products/${product.sku}_2.jpg`} />
                <p>{product.title}</p>
              </a>
              <div>
                {product.price && <b>{util.formatCurrency(product.price)}</b>}
                <button
                  className="btn btn-primary"
                  onClick={e => this.handleAddToCart(e, product)}
                >
                  Add To Cart
                </button>
              </div>
            </div>
          </div>
        );
      });
    return <div className="row">{productItems}</div>;
  }
}

const mapStateToProps = (state: any) => {
  return {
    products: state.products.filteredProducts,
    cartItems: state.cart.cartItems
  };
};

const mapDispatchToProps = (dispatch: any) => {
  return bindActionCreators(
    {
      fetchProducts: fetchProducts,
      addToCart: addToCart
    },
    dispatch
  );
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Products);

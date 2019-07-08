import React, { Fragment, Component } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Products from "./components/Products";
import { IProduct } from "./common/interface/products";
import FilterProducts from "./components/FilterProducts";
import Basket from "./components/Basket";
import util from "./common/util";

interface state {
  products: IProduct[];
  filteredProducts: IProduct[];
  sort: string;
  size: string;
  cartItems: IProduct[];
}

class App extends Component<any, state> {
  constructor(props: any) {
    super(props);
    this.state = {
      products: [],
      filteredProducts: [],
      size: "",
      sort: "",
      cartItems: []
    };
  }

  componentDidMount() {
    fetch("http://localhost:8000/products")
      .then(res => res.json())
      .then(res => {
        this.setState({
          products: res,
          filteredProducts: res
        });
      });

    const cartItems = util.getLocalStorage("cartItems");
    if(cartItems) {
      this.setState({
        cartItems: cartItems
      });
    }
  }

  handleChangeSort = (e: React.FormEvent<HTMLSelectElement>) => {
    this.setState({ sort: e.currentTarget.value });
    this.listProduct();
  };

  handleChangeSize = (e: React.FormEvent<HTMLSelectElement>) => {
    this.setState({ size: e.currentTarget.value });
    this.listProduct();
  };

  listProduct = () => {
    this.setState(state => {
      if (state.sort !== "") {
        state.products.sort((a, b) =>
          state.sort === "lowest"
            ? a && b && a.price && b.price && a.price > b.price
              ? 1
              : -1
            : a && b && a.price && b.price && a.price < b.price
            ? 1
            : -1
        );
      } else {
        state.products.sort((a, b) => (a.id && b.id && a.id < b.id ? 1 : -1));
      }

      if (state.size !== "") {
        return {
          filteredProducts: state.products.filter(product => {
            if (product && product.availableSizes) {
              return (
                product.availableSizes.indexOf(state.size.toUpperCase()) > -1
              );
            }
          })
        };
      }

      return {
        filteredProducts: state.products
      };
    });
  };

  handleRemoveFromCart = (e: any, product: IProduct) => {
    this.setState(state => {
      const cartItems = state.cartItems.filter(item => item.id !== product.id);
      util.setLocalStorage("cartItems", cartItems);
      return {cartItems};
    })
  };

  handleAddToCart = (e: any, product: IProduct) => {
    this.setState(state => {
      const cartItems = state.cartItems;
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
      return { cartItems: cartItems };
    });
  };

  render() {
    return (
      <Fragment>
        <h1>Ecommerce Shopping Cart Application</h1>
        <hr />
        <div className="row">
          <div className="col-md-8">
            <FilterProducts
              size={this.state.size}
              sort={this.state.sort}
              handleChangeSize={this.handleChangeSize}
              handleChangeSort={this.handleChangeSort}
              count={this.state.filteredProducts.length}
            />
            <Products
              products={this.state.filteredProducts}
              handleAddToCart={this.handleAddToCart}
            />
          </div>
          <div className="col-md-4">
            <Basket
              cartItems={this.state.cartItems}
              handleRemoveFromCart={this.handleRemoveFromCart}
            />
          </div>
        </div>
      </Fragment>
    );
  }
}

export default App;

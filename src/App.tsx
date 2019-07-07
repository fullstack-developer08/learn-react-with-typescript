import React, { Fragment, Component } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Products from "./components/Products";
import { IProduct } from "./common/interface/products";
import FilterProducts from "./components/FilterProducts";

interface state {
  products: IProduct[];
  filteredProducts: IProduct[];
  sort: string;
  size: string;
}

class App extends Component<any, state> {
  constructor(props: any) {
    super(props);
    this.state = {
      products: [],
      filteredProducts: [],
      size: "",
      sort: ""
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
  }

  handleAddToCart = (e: any, product: IProduct) => {};

  handleChangeSort = (e: any) => {
    this.setState({ sort: e.target.value });
    this.listProduct();
  };

  handleChangeSize = (e: any) => {
    this.setState({ size: e.target.value });
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

  render() {
    return (
      <Fragment>
        <h1>Ecommerce Shopping Cart Application</h1>
        <hr />
        <div className="row">
          <div className="col-md-10">
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
          <div className="col-md-2" />
        </div>
      </Fragment>
    );
  }
}

export default App;

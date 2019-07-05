import React, { Fragment, Component } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Products from "./components/Products";

class App extends Component<any, any> {
  constructor(props: any) {
    super(props);
    this.state = {
      products: [],
      filteredProducts: []
    };
  }

  componentDidMount() {
    fetch("http://localhost:3000/products")
      .then(res => res.json())
      .then(res => {
        this.setState({
          products: res,
          filteredProducts: res
        });
      });
  }

  handleAddToCart = () => {};

  render() {
    return (
      <div className="container">
        <h1>Ecommerce Shopping Cart Application</h1>
        <hr />
        <div className="row">
          <div className="col-md-8">
            <Products
              products={{ products: this.state.products }}
              handleAddToCart={this.handleAddToCart}
            />
          </div>
          <div className="col-md-4" />
        </div>
      </div>
    );
  }
}

export default App;

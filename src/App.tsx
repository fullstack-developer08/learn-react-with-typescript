import React, { Fragment, Component } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Products from "./components/Products";
import { IProduct } from "./common/interface/products";
import FilterProducts from "./components/FilterProducts";
import Basket from "./components/Basket";
import util from "./common/util";
import { Provider } from "react-redux";
import store from "./common/store";

class App extends Component<any, any> {
  constructor(props: any) {
    super(props);
  }

  render() {
    return (
      <Provider store={store}>
        <Fragment>
          <h1>Ecommerce Shopping Cart Application</h1>
          <hr />
          <div className="row">
            <div className="col-md-8">
              <FilterProducts />
              <Products />
            </div>
            <div className="col-md-4">
              <Basket />
            </div>
          </div>
        </Fragment>
      </Provider>
    );
  }
}

export default App;

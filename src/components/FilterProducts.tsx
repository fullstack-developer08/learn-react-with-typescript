import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import {
  filterProductBySort,
  filterProductBySize
} from "../common/actions/productActions";
import { IProduct } from "../common/interface/products";

interface props {
  products: IProduct[];
  count: number;
  filterProductBySort(payload: any): any;
  filterProductBySize(payload: any): any;
}

class FilterProducts extends Component<props, any> {
  constructor(props: props) {
    super(props);
    this.state = {
      sort: "",
      size: ""
    };
  }

  handleChangeSort = (e: React.FormEvent<HTMLSelectElement>) => {
    const sortType = e.currentTarget.value;
    const products = [...this.props.products];
    this.setState({
      sort: sortType
    });
    if (sortType !== "") {
      products.sort((a, b) =>
        sortType === "lowest"
          ? a && b && a.price && b.price && a.price > b.price
            ? 1
            : -1
          : a && b && a.price && b.price && a.price < b.price
          ? 1
          : -1
      );
    } else {
      products.sort((a, b) => (a.id && b.id && a.id < b.id ? -1 : 1));
    }
    this.props.filterProductBySort(products);
  };

  handleChangeSize = (e: React.FormEvent<HTMLSelectElement>) => {
    const size = e.currentTarget.value;
    const products = [...this.props.products];
    this.setState({
      size: size
    });
    if (size !== "") {
      const filteredProduct = products.filter(product => {
        if (product && product.availableSizes) {
          return product.availableSizes.indexOf(size.toUpperCase()) > -1;
        }
      });
      this.props.filterProductBySize(filteredProduct);
    }
  };

  render() {
    return (
      <div className="row">
        <div className="col-md-4">{this.props.count} products found.</div>
        <div className="col-md-4">
          <label>
            Order by
            <select
              className="form-control"
              value={this.state.sort}
              onChange={e => this.handleChangeSort(e)}
            >
              <option value="">Select</option>
              <option value="lowest">lowest to highest</option>
              <option value="highest">highest to lowest</option>
            </select>
          </label>
        </div>
        <div className="col-md-4">
          <label>
            Filter By
            <select
              className="form-control"
              value={this.state.size}
              onChange={e => this.handleChangeSize(e)}
            >
              <option value="">ALL</option>
              <option value="xs">XS</option>
              <option value="s">S</option>
              <option value="m">M</option>
              <option value="l">L</option>
              <option value="xl">XL</option>
              <option value="xxl">XXL</option>
            </select>
          </label>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state: any) => {
  return {
    products: state.products.products,
    count: state.products.count
  };
};

const mapDispatchToProps = (dispatch: any) => {
  return bindActionCreators(
    {
      filterProductBySort: filterProductBySort,
      filterProductBySize: filterProductBySize
    },
    dispatch
  );
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(FilterProducts);

import React, { Component } from "react";

interface props {
  size: string;
  count: number;
  sort: string;
  handleChangeSort(e: React.FormEvent<HTMLSelectElement>): any;
  handleChangeSize(e: React.FormEvent<HTMLSelectElement>): any;
}

export default class FilterProducts extends Component<props, any> {
  constructor(props: props) {
    super(props);
  }

  render() {
    return (
      <div className="row">
        <div className="col-md-4">{this.props.count} products found.</div>
        <div className="col-md-4">
          <label>
            Order by
            <select
              className="form-control"
              value={this.props.sort}
              onChange={e => this.props.handleChangeSort(e)}
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
              value={this.props.size}
              onChange={e => this.props.handleChangeSize(e)}
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

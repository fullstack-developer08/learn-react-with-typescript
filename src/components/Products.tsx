import React, { Component } from 'react';
import {IProducts} from '../common/interface/products';

interface props {
    products: IProducts,
    handleAddToCart(): any 
}

export default class Products extends Component<props, any> {
    render() {
        const productItems = this.props.products.products.map(a => console.log(a));
        console.log(productItems);
        return (
            <div>
                
            </div>
        )
    }
}

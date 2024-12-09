import { useContext } from 'react';
import React from 'react';
import { observer } from 'mobx-react-lite';
import { Context } from '..';
import Row from 'react-bootstrap/Row';
import ProductItem from './ProductItem';


const ProductList = observer( ({limit}) => {
    const {product} = useContext(Context)
    console.log(product.SelectedCategory.ID_Category)
    // console.log(product)
    const filteredProducts = product.products.filter((item) => item.ID_Category === product.SelectedCategory.ID_Category);

    const productsToShow = product.SelectedCategory.ID_Category
        ? filteredProducts.slice(0, limit)
        : product.products.slice(0, limit);
    return(
        <>
        {!product.SelectedCategory.ID_Category ? 
        <Row className = 'd-flex'>
            {productsToShow.map(product =>
                <ProductItem key={product.ID_Product} product={product}/>
            )}

        </Row>
        :
        <Row className = 'd-flex'>
            {filteredProducts.map(product =>
                <ProductItem key={product.ID_Product} product={product}/>
            )}

        </Row>
}
        </>
    )
});

export default ProductList
//этот файл нигде не закинут!!! нет в путях и во всем осталльном. Эта страница больше для примера
import React, { useContext, useEffect } from 'react';
import { Container } from 'react-bootstrap';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import CategoryBar from '../components/CategoryBar';
import ProductList from '../components/ProductList';
import { Context } from '..';
import { ApiService } from '../services/api.service';
//import { useParams } from 'react-router-dom';
// import {fetchProducts} from '../http/productAPI'
const apiService = new ApiService();

function Catalog() {
	const {product} =useContext(Context)

	useEffect(() => {
        apiService.get('/category').then(data => product.setCategories(data))
		
		apiService.get('/product').then(data => product.setProducts(data))
    }, [product])


	return (
		<>
        <Container style={{marginTop:-70}}>
			<Row>
				<Col md={4}>
					<CategoryBar/>
				</Col>
				<Col md={8}>
					<ProductList/>
				</Col>
			</Row>
		</Container>
		</>
	)

	
}

export default Catalog


// const categories = product.categories;
    // const products = product.products;

	// console.log(categories, products)


	//console.log(product.products)

	// let params = useParams()
	// console.log(params)
	// const ID_Category = params.id;
	
	// useEffect(() => {
    //     apiService.get('/product/' + ID_Category).then(data => product.setProducts(data))
    // }, [ID_Category, product])

	// useEffect(() => {
    //     fetchProducts(product.selectedCategory.ID_Category).then(data => {
    //         product.setProducts(data)
    //     })
    // }, [product])
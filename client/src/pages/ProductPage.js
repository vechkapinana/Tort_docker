import React, {useEffect, useState, useContext}  from 'react';
import { Button, Container } from 'react-bootstrap';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Image from 'react-bootstrap/Image';
import Tab from '../components/Tabs';
import { ApiService } from '../services/api.service';
import { useParams } from 'react-router-dom';
import { Context } from '..';
import { message, useMessage  } from 'antd';
import { Alert } from 'antd';
import { LOGIN_ROUTE } from '../utils/consts';
import {useNavigate} from 'react-router-dom';
import Nav from 'react-bootstrap/Nav';
// import { BasketContext } from '../BasketContext';

const apiService = new ApiService();

function ProductPage() {
	const {client} =useContext(Context)
	const navigate = useNavigate()
    //const product = {ID_Product: 1, ID_Category: 1, Name: "Медовый", Photo: "https://media.ovkuse.ru/images/recipes/b870bea9-35e9-4060-92ba-2305e6670a62/b870bea9-35e9-4060-92ba-2305e6670a62.jpg", Grade: 4.9, Compound: "Сливки, сахар...", Exp: "Заказ за 2-3 дня", Weight: 2500, Price:2790}
	const [product, setProduct] = useState({})
	const [basket, setBasket] = useState([])
	// const [baskets, setBaskets] = useState([]) //массив айтем который мы вводим - items
	const [basketRecord, setBasketRecord] = useState({})//то что выводится (запись)
	const [messageApi, contextHolder] = message.useMessage();

	let params = useParams()
	console.log(params)
	const ID_Product = params.id;
    
	useEffect(() => {
		apiService.get('/product/' + ID_Product).then(data => setProduct(data))
		console.log(client.isAuth)
		if(client.isAuth){
		apiService.get('/basket/' + client.client.ID_Client + '/'+  params.id).then(data => {
			setBasket(data)
			// window.location.reload();
		})
		}
	
		//apiService.get('/basket/' + client.client.ID_Client + '/'+  params.id).then(data => setBasket(data))
		
    }, [ID_Product, client.client.ID_Client, params.id, client.isAuth])

	console.log('This ' + basket.ID_Product + product.ID_Product)

	function saveTort() {
		// messageApi.open({
		// 	type: 'success',
		// 	content: 'Добавлено в корзину',
		//   });
		setBasketRecord({...basketRecord,
			ID_Product: ID_Product,
			ID_Client:client.client.ID_Client,
			Kvo:1
		})
		console.log(basketRecord,ID_Product,client.client.ID_Client)
		let a=1;
		apiService.post('/basket/'+ client.client.ID_Client, {ID_Product:ID_Product, ID_Client:client.client.ID_Client, Kvo:a}).then(() => {
			close()
			// fetchData()
		})
	}

	function updTort(Kvo) {
		apiService.post('/basket/' + client.client.ID_Client + '/' + ID_Product, {ID_Product:ID_Product, ID_Client:client.client.ID_Client, Kvo:Kvo}).then(() => {
			close()
			// fetchData()
		})
		// window.location.reload();
	}

	function close() {
		setBasketRecord({})
	}

	function Dob(){
		// console.log('da1',basket[0][0]);
		console.log('da2',basket[0]);
		// console.log('da3',basket[0][0]);
		if(basket[0][0] === undefined){
			saveTort()
			// window.location.reload();
		}else {
			updTort(basket[0][0].Kvo)
		}

		messageApi.open({
			type: 'success',
			content: 'Добавлено в корзину',
		  });

		//   window.location.reload();
	}

	// function Dob(){
	// 	// console.log('da1',basket[0][0]);
	// 	console.log('da2',basket[0]);
	// 	// console.log('da3',basket[0][0]);
	// 	if(Array.isArray(basket[0])){
	// 		updTort(basket[0][0].Kvo)
	// 	}else {
	// 		saveTort()
	// 	}

	// 	messageApi.open({
	// 		type: 'success',
	// 		content: 'Добавлено в корзину',
	// 	  });
	// }


	return (
		<>
        <Container className='mt-5' style={{}}>
			<Row d-flex='true' flex-column='true' align-items-center='true' justify-content-around='true'>
				<Col md={6}>
					<Image width={580} height={500} src={process.env.REACT_APP_API_URL + product.Photo}/>
				</Col>
				<Col md={6} style={{fontFamily: 'Montserrat'}}>
                    
                        <h2 style={{fontWeight: 600}}> {product.Name}</h2>
                        <h2>{product.Price} руб.</h2>
                        <h2>Изготовление {product.Exp}</h2>
                        <h2>Вес: {product.Weight} г.</h2>
					{contextHolder}
					{client.isAuth ? 
					(<Button variant='outline-dark' onClick={() => Dob()}>Добавить в корзину</Button>)
					:(
            			<div>
							<Alert className='text'
      						message="Для добавления в корзину - авторизуйтесь"
      						// description="Info Description Info Description Info Description Info Description"
     						type="info"
    						/>
							<Nav className="ms-auto">
                    			<Button className='head' variant="outline-dark" onClick = {() => navigate(LOGIN_ROUTE)}>Авторизация</Button> 
                			</Nav>
						</div>
          			)}
					{/* <Button variant='outline-dark' onClick={() => Dob()}>Добавить в корзину</Button> */}
				</Col>
			</Row>
			<Row style={{paddingTop:30, fontFamily:'Montserrat'}}>
			<h3 style={{fontWeight: 600}}> Состав </h3>
			<p>{product.Compound}</p>
			</Row>
		</Container>
		</>
	)
}

export default ProductPage;


// const { addToBasket } = useContext(BasketContext);
// const { basket } = useContext(BasketContext);

// const handleAddToBasket = () => {
// 	if (product) {
// 		// setBasket((prevBasket) => [...prevBasket, product]);
// 		addToBasket(product);
// 		console.log(product)
// 		console.log(basket)
// 	}
// 	//console.log(product)
// 	// console.log(addToBasket)
// };
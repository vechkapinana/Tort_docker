import React, {useEffect, useContext} from 'react';
// import CListGroup from 'react-bootstrap/ListGroup';
// import CListGroupItem from 'react-bootstrap/ListGroup';
// import { SHOP_ROUTE } from '../utils/consts';
//import cake1 from 'C:/tort/client/src/Photo/piece-of-cake.png'
// import pease from 'C:/tort/client/src/Photo/pease.png'
// import t1 from 'C:/tort/client/src/Photo/birthday_cake.jpeg'
import { Container } from 'react-bootstrap';
// import tortik1 from 'C:/tort/client/src/Photo/космос.jpg'
import Carousel from 'react-bootstrap/Carousel';
import Image from 'react-bootstrap/Image';
import { Button } from 'antd';
import {useNavigate} from 'react-router-dom';
import { SHOP_ROUTE } from '../utils/consts';
import ProductList from '../components/ProductList';
import { Context } from '..';
import { ApiService } from '../services/api.service';
// import { Footer} from 'antd/es/layout/layout';
const apiService = new ApiService();

function Shop() {
	const navigate = useNavigate()

	const {product} =useContext(Context)

	useEffect(() => {
		apiService.get('/product').then(data => product.setProducts(data))
    }, [product])

	// const alertClicked = () => {
	// 	alert('You clicked the third ListGroupItem');
	// };
	return (
		<>
		<Carousel fade style={{marginLeft: "auto", marginRight: "auto", display: "flex", justifyContent: 'center', alignItems: 'center', marginTop:-60}}>
      <Carousel.Item>
	  <Image className='d-block w-50 ' style={{marginLeft: "auto", marginRight: "auto", display: "flex", justifyContent: 'center', alignItems: 'center', borderRadius:5}} src={'https://imgproxy.bushe.ru/OpPC6gfJMzO0NryMfHNGdDehoR9rmEhc5I2lBwOjlG4/q:85/w:1256/h:920/rt:fit/el:1/czM6Ly9idXNoZS9tZWRpYS9Qcm9kdWN0L2ltYWdlcy8yNzg0Mjc2OS1kZjgyLTRhMGQtOTFhMy02YTc1ZDk0ZTQxN2Qv0KLQvtGA0YIt0KfQtdGA0L3QuNC60LAt0LzQsNGA0YbQuNC_0LDQvTIuanBn.webp'} text="First slide"/>
        {/* <ExampleCarouselImage text="First slide" /> */}
        <Carousel.Caption>
          <h3>Прекрасный вкус</h3>
          {/* <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p> */}
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
	  <Image className='d-block w-50' style={{marginLeft: "auto", marginRight: "auto", display: "flex", justifyContent: 'center', alignItems: 'center', borderRadius:5}} src={'https://imgproxy.bushe.ru/NBJ5p3skJdCPZNFIwWjQNBq87kd1IULO_UKI69fiPZs/q:95/w:1256/h:920/rt:fit/el:1/czM6Ly9idXNoZS9tZWRpYS9Qcm9kdWN0L2ltYWdlcy9jMTAyOTVkMC1mOTM5LTQ2ZWUtYTE5Yi1jNmQzYTIzOWQ1Y2Yv0L_QuNGA0L7QttC90L7QtS3QvNC40LvRjNGE0LXQuS5qcGc.jpg'} text="First slide"/>
        {/* <ExampleCarouselImage text="Second slide" /> */}
        <Carousel.Caption>
          <h3>Прекрасный вкус</h3>
          {/* <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p> */}
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
	  <Image className='d-block w-50' style={{marginLeft: "auto", marginRight: "auto", display: "flex", justifyContent: 'center', alignItems: 'center', borderRadius:5}} src={'https://imgproxy.bushe.ru/lhiatJFDeC9vsIk41VlsWEH405ZQdMUoncn4dvoFoXc/q:95/w:1256/h:920/rt:fit/el:1/czM6Ly9idXNoZS9tZWRpYS9Qcm9kdWN0L2ltYWdlcy84MjZjMzE0YS03ZmY2LTQ4N2UtYjI0Yy0xNDU2NzY4ZTM0Njcv0Y_Qs9C-0LTQvdGL0Lkt0Y3QutC70LXRgDEuanBn.jpg'} text="First slide"/>
        {/* <ExampleCarouselImage text="Third slide" /> */}
        <Carousel.Caption>
          <h3>Прекрасный вкус</h3>
          {/* <p>
            Praesent commodo cursus magna, vel scelerisque nisl consectetur.
          </p> */}
        </Carousel.Caption>
      </Carousel.Item>
    </Carousel>
		<Container>
	<div>
	<Button type="link" className='text' style={{marginLeft: "auto", marginRight: "auto", display: "flex", justifyContent: 'center', alignItems: 'center', fontSize:30, marginTop:60}} onClick={()=> navigate(SHOP_ROUTE)}>Перейти в каталог</Button>
	</div>				
				
	<div className='text1'>
		<div className='textin'>
			<p>У нас вы найдете великолепные десерты, торты, пирожные и другие изысканные сладости,</p> 
			<p>которые отражают наше мастерство и любовь к деталям. Каждый наш продукт - это </p> 
			<p>неповторимое сочетание качественных ингредиентов, творческого подхода и прекрасного</p>
			<p>вкуса.</p>
		</div>
	</div>
	<div style={{marginLeft:100}}>
	<ProductList limit={3}/>
	</div>

		
		</Container>
		
		</>
	)
}

export default Shop


// {/* <div>
// 		<CListGroup className='shop_menu'>
// 			<div className='shop_menu1'></div>
//         <CListGroupItem as="a" action = "true" href={SHOP_ROUTE} className='menu_y'>
//         	<p className='menu'><img className='menu_img' src={cake1} alt="menu_img"/> Главная</p>
// 			<div style={{ borderTop: "2px solid #A3E3E5 ", width: 230 }}></div>
//         </CListGroupItem>
//         <CListGroupItem as="a" href={SHOP_ROUTE} className='menu_y'>
// 			<p className='menu'><img className='menu_img' src={cake1} alt="menu_img"/>Торты</p>
// 			<div style={{ borderTop: "2px solid #A3E3E5 ", width: 230 }}></div>
//         </CListGroupItem>
//         <CListGroupItem as="a" href={SHOP_ROUTE} className='menu_y'>
// 			<p className='menu'><img className='menu_img' src={cake1} alt="menu_img"/>Пирожные</p>
// 			<div style={{ borderTop: "2px solid #A3E3E5 ", width: 230 }}></div>
//         </CListGroupItem>
// 		<CListGroupItem as="a" href={SHOP_ROUTE} className='menu_y'>
// 			<p className='menu'><img className='menu_img' src={cake1} alt="menu_img"/>Десерты</p>
// 			<div style={{ borderTop: "2px solid #A3E3E5 ", width: 230 }}></div>
//         </CListGroupItem>
// 		<CListGroupItem as="a" href={SHOP_ROUTE} className='menu_y'>
// 			<p className='menu'><img className='menu_img' src={cake1} alt="menu_img"/>Меренговые рулеты</p>
// 			<div style={{ borderTop: "2px solid #A3E3E5 ", width: 230 }}></div>
//         </CListGroupItem>
//     	</CListGroup>
// 		</div> */}
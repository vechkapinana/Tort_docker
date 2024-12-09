import React from 'react';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import Image from 'react-bootstrap/Image';
//import t1 from 'C:/tort/client/src/Photo/birthday_cake.jpeg'
import {useNavigate} from 'react-router-dom';
//import { NavigationContainer } from '@react-navigation/native';
import {PRODUCT_ROUTE} from '../utils/consts'
//import {useLocation} from 'react-router-dom';

const ProductItem = ({product}) => {
    const navigate = useNavigate()
    //console.log(Navigation)
    return(
        <>
        <Col md={4} className={'mt-3'} onClick={()=> navigate(PRODUCT_ROUTE + '/' + product.ID_Product)}>
            <Card style={{width: 280, cursor: 'pointer', marginTop: 18}} border='light'>
            <Image className='block' src={process.env.REACT_APP_API_URL + product.Photo} />
            {/* {product.Photo && <Image className='block' src={product.Photo} alt={product.Name} />} */}
                {/* <div className='d-flex justify-content-between align-items-center'> */}
                <div>
                    <div>
                    <p className= 'top_img'>{product.Name}</p>
		            <p className= 'top_img1'>{product.Price} руб.</p>
                    </div>
                    <div>
                        <div style={{textAlign: 'center'}}></div>
                    </div>
                </div>
            </Card>
        </Col>
        </>
    )
}

export default ProductItem

//к этому файлу есть хороший сайт: https://reactrouter.com/en/main/start/concepts
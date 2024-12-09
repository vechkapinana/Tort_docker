import { useContext } from 'react';
import React from 'react';
import { observer } from 'mobx-react-lite';
import { Context } from '..';
import CListGroup from 'react-bootstrap/ListGroup';
import CListGroupItem from 'react-bootstrap/ListGroup';
//import { SHOP_ROUTE } from '../utils/consts';
import cake1 from '../Photo/piece-of-cake.png' 
// import {useNavigate} from 'react-router-dom';
// import { GLAV_ROUTE } from '../utils/consts';

const CategoryBar = observer( () => {
    const {product} = useContext(Context)
	
	// const navigate = useNavigate()
	return (
		<>
		<CListGroup className='shop_menu_catalog'>
			{product.categories.map(category => 
				<CListGroupItem className='menu_y'
					style={{cursor: 'pointer'}}
					active={(category.ID_Category === product.SelectedCategory.ID_Category).toString()}
					onClick={() => product.setSelectedCategory(category)} 
					key={category.ID_Category}
				>
					{/* <div className='shop_menu1'> */}
					<p className='menu'><img className='menu_img'   src={cake1}    alt="menu_img"/>{category.Name}</p>
					<div style={{ borderTop: "2px solid #A3E3E5 ", width: 230 }}></div>
					{/* </div> */}
				</CListGroupItem>
				)}
    	</CListGroup>
		</>
	)
});

export default CategoryBar






// import React from 'react';
// import Col from 'react-bootstrap/Col';
// import Card from 'react-bootstrap/Card';
// import Image from 'react-bootstrap/Image';
// //import t1 from 'C:/tort/client/src/Photo/birthday_cake.jpeg'
// import {useNavigate} from 'react-router-dom';
// //import { NavigationContainer } from '@react-navigation/native';
// import {PRODUCT_ROUTE} from '../utils/consts'
// //import {useLocation} from 'react-router-dom';

// const ProductItem = ({product}) => {
//     const navigate = useNavigate()
//     //console.log(Navigation)
//     return(
//         <>
//         <Col md={4} className={'mt-3'} onClick={()=> navigate(PRODUCT_ROUTE + '/' + product.ID_Product)}>
//             <Card style={{width: 220, cursor: 'pointer'}} border='light'>
//             <Image className='block' src={product.Photo} />
//                 {/* <div className='d-flex justify-content-between align-items-center'> */}
//                 <div>
//                     <div>
//                     <p className= 'top_img'>{product.Name}</p>
// 		            <p className= 'top_img1'>{product.Price} руб.</p>
//                     </div>
//                     <div>
//                         <div style={{textAlign: 'center'}}> Оценка: {product.Grade}</div>
//                     </div>
//                 </div>
//             </Card>
//         </Col>
//         </>
//     )
// }

// export default ProductItem
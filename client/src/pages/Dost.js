import React  from 'react';
import { Container } from 'react-bootstrap';
import Row from 'react-bootstrap/Row';


function Dost() {


	return (
		<>
        <Container className='mt-5' style={{paddingTop:30, fontFamily:'Montserrat'}}>
			<Row d-flex='true' flex-column='true' align-items-center='true' justify-content-around='true'>
                <h2>Доставка</h2>
				<p>Наша компания состоит исключительно из профессионалов, относящихся к своему делу со всей душой и огромной ответственностью. 
                    Наши специалисты полностью соблюдают все необходимые стандарты качества обслуживания и
                     производят доставку вовремя. Кондитерская «Sweet» предлагает доставку тортов, 
                     десертов и кондитерских изделий собственного производства по городу Самара.</p>
			</Row>
			<Row style={{paddingTop:30, fontFamily:'Montserrat'}}>
                <h3>Необходимо делать заказ изделия за то время, которое указано на карточке товара</h3>

			</Row>
		</Container>
		</>
	)
}

export default Dost;

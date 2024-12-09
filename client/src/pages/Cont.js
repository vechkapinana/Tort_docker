import React  from 'react';
import { Container } from 'react-bootstrap';
import Row from 'react-bootstrap/Row';

// import { BasketContext } from '../BasketContext';

function Cont() {


	return (
		<>
        <Container className='mt-5' style={{paddingTop:30, fontFamily:'Montserrat'}}>
			<Row d-flex='true' flex-column='true' align-items-center='true' justify-content-around='true'>
                <h2>Контакты</h2>
				<p>Кондитерская «Sweet» производит самые вкусные и самые креативные кондитерские изделия. 
                    Если возникают такие вопросы по поводу того, где купить, где заказать десерт в Самаре, то можете не сомневаться – обращайтесь к нам</p>
			</Row>
			<Row style={{paddingTop:30, fontFamily:'Montserrat'}}>
                    <p className='footer_onas'>КОНТАКТЫ</p>
                    <p className='footer_glav'>Адрес: Город Самара, 6 просека 140</p>
                    <p className='footer_tel'>тел.: +7 929 704 33 41 WhatsApp / Telegram</p>
                    <p className='footer_tel'>E-mail natusja_ve@mail.ru</p>
                <p className='thank_footer'>Спасибо, что выбираете нас!</p>

			</Row>
		</Container>
		</>
	)
}

export default Cont;

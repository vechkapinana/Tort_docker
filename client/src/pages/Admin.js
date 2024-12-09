import React from 'react';
import { Container } from 'react-bootstrap';
import DobCat from '../components/DobCat';
import DobProd from '../components/DobProd';
import DobOrder from '../components/DobOrder';

function Admin() {
	return (
		<>
			<Container className='d-flex flex-column'>
                {/* <Button variant='outline-dark' className='mt-5 p-3'>
					Добавить категорию
				</Button>
				<Button variant='outline-dark' className='mt-5 p-3'>Добавить товар</Button> */}

				<div style={{marginTop: -40}}>
				<DobCat/>
				</div>
				<div style={{paddingTop: 40}}>
				<DobProd/>
				</div>
				<div style={{paddingTop: 40}}>
				<DobOrder/>
				</div>
				
			</Container>
		</>
	)
}

export default Admin
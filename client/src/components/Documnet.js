import React, { useContext, useEffect, useState } from 'react';
import { ApiService } from '../services/api.service';
import { Context } from '../index';
import { Button, Col, InputGroup, Row } from 'react-bootstrap';
import { Input} from 'antd';
const apiService = new ApiService ();

export const Documnet = (props) => {
    const [clientID, setClientID] = useState('');
    const createAndDownloadPdf = () => {
      let all;
        apiService.get('/generate-pdf/' + clientID).then(
          (response) =>  {
            all = response[0];
            console.log(all);
            apiService.post('/generate-pdf', {ID_Client:clientID,all:all})
              .then(
                props.getDocument('/generate-pdf')
              )
            })
    }
    
    return(
      <div>
        <h3 className='d-flex justify-content-center align-items-center' style={{color:'#FFFFF'}}>Отчёт о продажах</h3>
        {/* <p>Введите ID Клиента</p> */}
         <Row style={{marginLeft:'37%'}}>
         <p>Введите ID Клиента</p>
            <Col md={3}>
            <Input
				onChange={v =>
          {
            console.log(v.target.value);
            setClientID(v.target.value);
            }}
					value={clientID}
			/>
            </Col>
            <Col md={6}>
              <Button id='salesButton' className='greenButton' onClick={createAndDownloadPdf}>Получить отчёт</Button>
            </Col>
         </Row>
      </div>
    );
}
 
// export default Documnet;
import React from 'react';
import {Button, Card, DatePicker, Form, Input, Select} from 'antd';
import { useContext, useEffect, useState} from 'react';
import { Context } from '..';
import Alert from 'react-bootstrap/Alert';
import Row from 'react-bootstrap/Row';
import {useNavigate} from 'react-router-dom';
  
import { ApiService } from '../services/api.service';
import { GLAV_ROUTE } from '../utils/consts';
import { Container } from 'react-bootstrap';
const apiService = new ApiService();

function Order() {
  const {client} = useContext(Context)
  const navigate = useNavigate()
  const [order, setOrder]=useState({})
  const [info, setInfo]=useState({})
  const [DataD, setDataD]=useState(new Date())
  const [Coment, setComent]=useState('')
  const [House, setHouse]=useState('')
  const [Apartment, setApartment]=useState('')
  const [Floor, setFloor]=useState('')
  const [streets, setStreets] = useState([]);
  const [selectedStreet, setSelectedStreet] = useState('');
  const [showAlert, setShowAlert] = useState(false); // Состояние для хранения выбранной улицы
  const { Option } = Select;

  useEffect(() => {
    apiService.get('/client/'+ client.client.ID_Client).then(data => setInfo(data))
    apiService.get('/order/'+ client.client.ID_Client).then(data => {console.log("Order Data:", data[0][0]); setOrder(data[0][0])})
    apiService.post('/order/'+ client.client.ID_Client, {DataD:DataD, Coment:Coment})
    apiService.get('/street').then(data => setStreets(data))
    //apiService.post('/address', {Name: selectedStreet, House:House, Apartment:Apartment, Floor:Floor})
  }, [client.client.ID_Client, DataD, Coment])

  console.log(order.ID_Order)

  const handleStreetChange = (value) => {
    // Обработчик изменений в <Select> для улицы
    setSelectedStreet(value); // Сохранение выбранной улицы в состоянии
  };

  function Zac(){
    apiService.post('/address', {ID_Order:order.ID_Order, NameS: selectedStreet, House:House, Apartment:Apartment || null, Floor:Floor || null})
    apiService.delete('/basket/'+ client.client.ID_Client)
    setShowAlert(true)
    // apiService.post('/address/' + order.ID_Order)
  }



  const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 6 },
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 14 },
  },
  };
	return (
		<>
    {showAlert && (
        <Alert message="Success" type="success">
          {/* <Alert.Heading>My Alert</Alert.Heading> */}
            <p>
              Заказ можно отследить в личном кабинете
            </p>
            <div className="d-flex justify-content-end">
              <Button onClick={() => navigate(GLAV_ROUTE)} variant="outline-success">
                Перейти на главную страницу
              </Button>
            </div>
            </Alert>
    //     <Space direction="vertical" style={{ width: '100%' }}>
    // <Alert
    //   message="Success Tips"
    //   type="success"
    //   showIcon
    //   action={
    //     <Button size="small" type="text" onClick={() => navigate(GLAV_ROUTE)} variant="outline-success">
    //       UNDO
    //     </Button>
    //   }
    //   closable
    //   />
    //   </Space>
      )}
      <Container className='d-flex align-items-center justify-content-center'>
    <div>
    <Card style={{marginRight:20, height:500}} >
    <p> Фамилия: {info.Surname}</p>
    <p> Имя: {info.Name}</p>
    <p> Отчество: {info.Patronymic}</p>
    <p> Телефон: {info.Phone_number}</p>
    <p> Сумма: {order.Cost}</p>
    </Card>
    </div>
    <div>
    <Card style={{width: 600, height:500}} className='p-5' >
	<Form {...formItemLayout} variant="filled" style={{ maxWidth: 600, marginTop:-10}}>
    <Form.Item label="Улица" name="street" rules={[{ required: true, message: 'Please input!' }]}>
        <Select onChange={handleStreetChange} value={selectedStreet}>
          {streets.map(street => (
            <Option key={street.ID_Street} value={street.ID_Street}>
              {street.NameS}
            </Option>
          ))}
        </Select>
    </Form.Item>

    <Form.Item label="Дом" name="House" rules={[{ required: true, message: 'Please input!' }]}>
      <Input 
      onChange={e => setHouse(e.target.value) }
      value={House}/>
    </Form.Item>

    <Form.Item label="Квартира" name="Apartment">
      <Input 
      onChange={e => setApartment(e.target.value) }
      value={Apartment}/>
    </Form.Item>

    <Form.Item label="Этаж" name="Floor">
      <Input 
      onChange={e => setFloor(e.target.value) }
      value={Floor}/>
    </Form.Item>

    <Form.Item
      label="Дата доставки"
      name="DatePicker"
      type="date"
      format='DD-MM-YYYY'
      rules={[{ required: true, message: 'Please input!' }]}
    >
      <DatePicker selected={DataD}
      onChange={(date) => setDataD(date)}
      />
    </Form.Item>

    <Form.Item label="Комментарий" name="Coment" rules={[{ required: false }]}>
      <Input 
      onChange={e => setComent(e.target.value) }
      value={Coment}/>
    </Form.Item>

    {/* <Form.Item
      label="Комментарий"
      name="TextArea"
      rules={[{ required: false }]}
    >
      <Input.TextArea 
      onChange={e => setComent(e.target.value) }
      value={Coment}/>
    </Form.Item> */}

    <Form.Item wrapperCol={{ offset: 6, span: 16 }}>
      <Button type="primary" htmlType="submit" onClick={()=>Zac()}>
        Сделать заказ
      </Button>
    </Form.Item>
    </Form>
    </Card>
    </div>
    </Container>
		</>
	)
}

export default Order

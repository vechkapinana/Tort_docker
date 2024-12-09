import { Form, Button, Input, Table, Modal } from 'antd'
import { ApiService } from '../services/api.service'
import { useEffect, useState } from 'react'

const apiService = new ApiService()

const columns = [
	{
		title: 'ID Заказа',
		dataIndex: 'ID_Order',
		key: 'ID_Order'
	},
	{
		title: 'ID Клиента',
		dataIndex: 'ID_Client',
		key: 'ID_Client'
	},
    {
		title: 'Фамилия',
		dataIndex: 'Surname',
		key: 'Surname'
	},
	{
		title: 'Имя',
		dataIndex: 'Name',
		key: 'Name'
	},
    {
		title: 'ID Статуса',
		dataIndex: 'ID_Status',
		key: 'ID_Status'
	},
    {
		title: 'Дата доставки',
		dataIndex: 'DataD',
		key: 'DataD'
	},
    {
		title: 'Сумма',
		dataIndex: 'Cost',
		key: 'Cost'
	},
    {
		title: 'Дата создания',
		dataIndex: 'DataS',
		key: 'DataS'
	},
	{
		title: 'Комментарий',
		dataIndex: 'Coment',
		key: 'Coment'
	},
	{
		title: 'Улица',
		dataIndex: 'NameS',
		key: 'NameS'
	},
    {
		title: 'Дом',
		dataIndex: 'House',
		key: 'House'
	},
	{
		title: 'Квартира',
		dataIndex: 'Apartment',
		key: 'Apartment'
	},
	{
		title: 'Этаж',
		dataIndex: 'Floor',
		key: 'Floor'
	}
]

function DobOrder() {
	const [orders, setOrders] = useState([]) //массив айтем который мы вводим - items
	const [modalVisible, setModalVisible] = useState(false)
	const [orderRecord, setOrderRecord] = useState({})//то что выводится (запись)
	// const [statuses, setStatuses] = useState([]);
	// const [selectedStatus, setSelectedStatus] = useState('');
	// const { Option } = Select;


	// useEffect(() => {
	// 	apiService.get('/status').then(data => setStatuses(data))
	//   }, [])

	// const handleStatusChange = (value) => {
	// 	// Обработчик изменений в <Select> для улицы
	// 	setSelectedStatus(value); // Сохранение выбранной улицы в состоянии
	// 	setOrderRecord(prevState => ({ ...prevState, ID_Status: value }));
	//   };

	function showTort(recId, ID_Client) {//когда нажимаем добавить
		console.log(recId, ID_Client)
		// apiService.get('/status').then(data => setStatuses(data))
		recId
			? apiService.get('/order/' + recId + '/' + ID_Client).then(res => {
				console.log(res[0][0])
                    setOrderRecord(res[0][0])
					setModalVisible(true)
			  })
			: setModalVisible(true)
	}

	console.log(orderRecord);


	function saveTort(ID_Order, ID_Client) {
		apiService.post('/order/'+ ID_Order + '/' + ID_Client, orderRecord).then(() => {
			close()
			fetchData()
		})
	}

	function removeTort(recId) {
		apiService.delete('/order/' + recId).then(() => {
			close()
			fetchData()
		})
	}

	// function UpdStatus(ID_Order, ID_Status, ){
	// 	apiService.post('/order/'+ ID_Order, {ID_Status:ID_Status}).then(() => {
	// 		close()
	// 		fetchData()
	// 	})
	// }

	function close() {
		setOrderRecord({})
		setModalVisible(false)
	}

	function fetchData() {
		apiService.get('/order').then(data => setOrders(data[0]))
	}

	useEffect(() => {
		fetchData()
	}, [])
	return (
		<>
		{/* {orders.map(item => (
          <li key={item.ID_Order}>
            <div key={item.ID_Order}>
          <div>
			<p>{item.ID_Order}</p>
            <p>{item.Price}</p>
            <p>Итог: {item.Cost}</p>  
          </div>
          </div>
          </li>
        ))} */}
			<Table
				// style={{paddingBottom:200}}
				pagination={{ position: ['topRight'], pageSize: 4  }}
				dataSource={orders}
				columns={columns}
				rowKey='ID_Order'
				onRow={rec => {
					return {
						onClick: () => showTort(rec.ID_Order, rec.ID_Client) //при нажатиии
					}
				}}
			></Table>
			<Modal
				title={'Изменение заказа ' + orderRecord.ID_Order}
				open={modalVisible}
				okText='Сохранить'
				cancelText='Отмена'
				onCancel={() => close()}
				centered
				width={700}
				footer={[
					<Button type='primary' onClick={() => saveTort(orderRecord.ID_Order, orderRecord.ID_Client)} disabled={ !orderRecord.ID_Client && !orderRecord.ID_Status && !orderRecord.DataD && !orderRecord.Cost && !orderRecord.DataS}>
						Сохранить
					</Button>,
					orderRecord.ID_Order ? (
						<Button danger onClick={() => removeTort(orderRecord.ID_Order)}>
							Удалить
						</Button>
					) : null,
					<Button onClick={() => close()}>Отмена</Button>
				]}
			>
				<Form labelAlign='left' labelCol={{ span: 4 }} wrapperCol={{ span: 18 }}>
					<Form.Item label='ID Заказа'>
						{orderRecord.ID_Order}
					</Form.Item>
					<Form.Item label='ID Клиента'>
						
						{orderRecord.ID_Client}
						
					</Form.Item>

					<Form.Item label='Фамилия'>
						
						{orderRecord.Surname}
						
					</Form.Item>
					<Form.Item label='Имя'>
						
						{orderRecord.Name}
						
					</Form.Item>
					<Form.Item>
						
					1-Создан, 2-В обработке, 3-В пути, 4-Получен, 5-Отменен
						
					</Form.Item>
					<Form.Item 
                    label='Статус' 
                    // rules={[
                    //     {
                    //         validator() {//кастомная функция
                    //             return UpdStatus(orderRecord.ID_Order, orderRecord.ID_Status)}}]}
                >
					<Input
						onChange={v =>
							setOrderRecord(prevState => {
								return { ...prevState, ID_Status: v.target.value }//что бы можно было поменять только поле нейм
							})
						}
						value={orderRecord.ID_Status}
					/>
                </Form.Item> 
				{/* <Form.Item label="Статус" name="status">
        		<Select onChange={handleStatusChange} value={selectedStatus}>
         		 {statuses.map(status => (
          		  <Option key={status.ID_Status} value={status.ID_Status}>
          		    {status.NameSt}
          		  </Option>
          		))}
       			</Select>
   				</Form.Item> */}
					<Form.Item label='Дата доставки'>
						<Input
							onChange={v =>
								setOrderRecord(prevState => {
									return { ...prevState, DataD: v.target.value }//что бы можно было поменять только поле нейм
								})
							}
							value={orderRecord.DataD}
						/>
					</Form.Item>
					<Form.Item label='Сумма'>
						{orderRecord.Cost}

					</Form.Item>
					<Form.Item label='Дата создания'>
						{orderRecord.DataS}
					</Form.Item>
					<Form.Item label='Комментарий'>
						<Input
							onChange={v =>
								setOrderRecord(prevState => {
									return { ...prevState, Coment: v.target.value }//что бы можно было поменять только поле нейм
								})
							}
							value={orderRecord.Coment}
						/>
					</Form.Item>
					<Form.Item label='Улица'>
						{orderRecord.NameS}

					</Form.Item>
					<Form.Item label='Дом'>
						{/* <Input
							onChange={v =>
								setOrderRecord(prevState => {
									return { ...prevState, House: v.target.value }//что бы можно было поменять только поле нейм
								})
							}
							value={orderRecord.House}
						/> */}
						{orderRecord.House}
					</Form.Item>

					<Form.Item label='Квартира'>
						{/* <Input
							onChange={v =>
								setOrderRecord(prevState => {
									return { ...prevState, Apartment: v.target.value }//что бы можно было поменять только поле нейм
								})
							}
							value={orderRecord.Apartment}
						/> */}
						{orderRecord.Apartment}
					</Form.Item>

					<Form.Item label='Этаж'>
						{/* <Input
							onChange={v =>
								setOrderRecord(prevState => {
									return { ...prevState, Floor: v.target.value }//что бы можно было поменять только поле нейм
								})
							}
							value={orderRecord.Floor}
						/> */}
						{orderRecord.Floor}
					</Form.Item>
					
				</Form>
			</Modal>
		</>
	)
}

export default DobOrder
import { Form, Button, Input, Table, Modal } from 'antd'
import { ApiService } from '../services/api.service'
import { useEffect, useState } from 'react'
import {Form as ReactForm} from 'react-bootstrap';

const apiService = new ApiService()

// const Product = sequelize.define('product', {
//     ID_Product: {type: DataTypes.INTEGER, primaryKey: true},
//     ID_Category: {type: DataTypes.INTEGER},
//     Name: {type: DataTypes.STRING, allowNull: false},
//     Photo: {type: DataTypes.STRING},
//     Grade: {type: DataTypes.FLOAT, defaultValue: 0},
//     Compound: {type: DataTypes.STRING, allowNull: false},
//     Exp: {type: DataTypes.STRING, allowNull: false},
//     Weight: {type: DataTypes.FLOAT, allowNull: false},
//     Price: {type: DataTypes.FLOAT, allowNull: false}
// },{ timestamps: false })

const columns = [
	{
		title: 'ID Изделия',
		dataIndex: 'ID_Product',
		key: 'ID_Product'
	},
    {
		title: 'ID Категории',
		dataIndex: 'ID_Category',
		key: 'ID_Category'
	},
    {
		title: 'Название',
		dataIndex: 'Name',
		key: 'Name'
	},
    {
		title: 'Фото',
		dataIndex: 'Photo',
		key: 'Photo'
	},
    // {
	// 	title: 'Состав',
	// 	dataIndex: 'Compound',
	// 	key: 'Compound'
	// },
    {
		title: 'Срок изготовления',
		dataIndex: 'Exp',
		key: 'Exp'
	},
	{
		title: 'Вес',
		dataIndex: 'Weight',
		key: 'Weight'
	},
    {
		title: 'Цена',
		dataIndex: 'Price',
		key: 'Price'
	}
]

function DobProd() {
	const [products, setProducts] = useState([]) //массив айтем который мы вводим - items
	const [modalVisible, setModalVisible] = useState(false)
	const [productRecord, setProductRecord] = useState({})//то что выводится (запись)
	const [file, setFile] = useState(null)

	function showTort(recId) {//когда нажимаем добавить
		recId
			? apiService.get('/product/' + recId).then(res => {
                    setProductRecord(res)
					setModalVisible(true)
			  })
			: setModalVisible(true)
	}

	function saveTort() {
		const formData = new FormData();
		// formData.append('ID_Product', productRecord.ID_Product);
		formData.append('ID_Category', productRecord.ID_Category);
		formData.append('Name', productRecord.Name ); 
		formData.append('Photo', file);
		formData.append('Compound', productRecord.Compound);
		formData.append('Exp', productRecord.Exp);
		formData.append('Weight', productRecord.Weight);
		formData.append('Price', productRecord.Price);

		formData.forEach((value, key) => {
			    console.log(key, value);
			});
		console.log(formData)
		console.log(productRecord)
		console.log(file)

		apiService.postformData('/product', formData).then(() => {
			close();
			fetchData();
		});
	}

	// const selectFile = e => {
    //     const selectedFile = e.target.files[0];
    // setFile(selectedFile);
	// 	setProductRecord(prevState => {
	// 		return { ...prevState, Photo: selectedFile }; // Обновляем поле Photo
	// 	});

	// 	console.log(selectedFile)
	// 	console.log(selectedFile.name)
    // }

	function removeTort(recId) {
		apiService.delete('/product/' + recId).then(() => {
			close()
			fetchData()
		})
	}

	function close() {
		setProductRecord({})
		setModalVisible(false)
	}

	function fetchData() {
		apiService.get('/product').then(res => {
			setProducts(res)
		})
	}

	useEffect(() => {
		fetchData()
	}, [])
	return (
		<>
			<Button variant="outline-dark" onClick={() => showTort()}>
				Добавить
			</Button>
			<Table
				pagination={{ position: ['topRight'], pageSize: 5 }}
				dataSource={products}
				columns={columns}
				rowKey='ID_Product'
				onRow={rec => {
					return {
						onClick: () => showTort(rec.ID_Product) //при нажатиии
					}
				}}
			></Table>
			<Modal
				title={productRecord.ID_Product ? 'Изменение изделия ' + productRecord.ID_Product : 'Добавление нового изделия'}
				open={modalVisible}
				okText='Сохранить'
				cancelText='Отмена'
				onCancel={() => close()}
				centered
				footer={[
					<Button type='primary' onClick={() => saveTort()} disabled={ !productRecord.Name && !productRecord.Compound && !productRecord.Exp && !productRecord.Weight && !productRecord.Price}>
						Сохранить
					</Button>,
					productRecord.ID_Product ? (
						<Button danger onClick={() => removeTort(productRecord.ID_Product)}>
							Удалить
						</Button>
					) : null,
					<Button onClick={() => close()}>Отмена</Button>
				]}
			>
				<Form labelAlign='left' labelCol={{ span: 4 }} wrapperCol={{ span: 18 }}>
					<Form.Item label='ID Категории'>
						<Input
							onChange={v =>
								setProductRecord(prevState => {
									return { ...prevState, ID_Category: v.target.value }//что бы можно было поменять только поле нейм
								})
							}
							value={productRecord.ID_Category}
						/>
					</Form.Item>
					<Form.Item label='Название'>
						<Input
							onChange={v =>
								setProductRecord(prevState => {
									return { ...prevState, Name: v.target.value }//что бы можно было поменять только поле нейм
								})
							}
							value={productRecord.Name}
						/>
					</Form.Item>
					{/* <Form.Item label='Фото'>
						<Input
							onChange={v =>
								setProductRecord(prevState => {
									return { ...prevState, Photo: v.target.value }//что бы можно было поменять только поле нейм
								})
							}
							value={productRecord.Photo}
						/>
					</Form.Item> */}
					<ReactForm.Group controlId="formFile" className="mb-3">
					<ReactForm.Control type="file" 
								onChange={v =>
								{
									console.log(v.target.files[0]);
									setFile(v.target.files[0]);
								}
							}/>
					</ReactForm.Group>
					<Form.Item label='Состав'>
						<Input
							onChange={v =>
								setProductRecord(prevState => {
									return { ...prevState, Compound: v.target.value }//что бы можно было поменять только поле нейм
								})
							}
							value={productRecord.Compound}
						/>
					</Form.Item>
					<Form.Item label='Срок изготовления'>
						<Input
							onChange={v =>
								setProductRecord(prevState => {
									return { ...prevState, Exp: v.target.value }//что бы можно было поменять только поле нейм
								})
							}
							value={productRecord.Exp}
						/>
					</Form.Item>
					<Form.Item label='Вес'>
						<Input
							onChange={v =>
								setProductRecord(prevState => {
									return { ...prevState, Weight: v.target.value }//что бы можно было поменять только поле нейм
								})
							}
							value={productRecord.Weight}
						/>
					</Form.Item>
					<Form.Item label='Цена'>
						<Input
							onChange={v =>
								setProductRecord(prevState => {
									return { ...prevState, Price: v.target.value }//что бы можно было поменять только поле нейм
								})
							}
							value={productRecord.Price}
						/>
					</Form.Item>
					
				</Form>
			</Modal>
		</>
	)
}

export default DobProd




// apiService.post('/product', productRecord).then(() => {
		// 	close()
		// 	fetchData()
		// })

		// const formData = new FormData();
		// for (const key in productRecord) {
		// 	if (key === 'Photo' && file) {
		// 		formData.append(key, `"C:/tort/server/static/${file.name}`); // Добавляем путь к файлу
		// 	} else {
		// 		formData.append(key, productRecord[key]);
		// 	}
		// }
		// for (const key in productRecord) {
		// 	formData.append(key, productRecord[key]);
		// }
		// if (file) {
		// 	formData.append('Photo', file);
		// 	console.log(file)
		// }

		// formData.forEach((value, key) => {
        //     console.log(key, value);
        // });
		// console.log(formData)
		// console.log(productRecord)
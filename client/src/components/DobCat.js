import { Form, Button, Input, Table, Modal } from 'antd'
import { ApiService } from '../services/api.service'
import { useEffect, useState } from 'react'

const apiService = new ApiService()

const columns = [
	{
		title: 'ID Категории',
		dataIndex: 'ID_Category',
		key: 'ID_Category'
	},
	{
		title: 'Название',
		dataIndex: 'Name',
		key: 'Name'
	}
]

function DobCat() {
	const [categories, setCategories] = useState([]) //массив айтем который мы вводим - items
	const [modalVisible, setModalVisible] = useState(false)
	const [categoryRecord, setCategoryRecord] = useState({})//то что выводится (запись)

	function showTort(recId) {//когда нажимаем добавить
		recId
			?  apiService.get('/category/' + recId).then(res => {
                    setCategoryRecord(res)
					setModalVisible(true)
			  })
			: setModalVisible(true)
	}

	function saveTort() {
		apiService.post('/category', categoryRecord).then(() => {
			close()
			fetchData()
		})
	}

	function removeTort(recId) {
		apiService.delete('/category/' + recId).then(() => {
			close()
			fetchData()
		})
	}

	function close() {
		setCategoryRecord({})
		setModalVisible(false)
	}

	function fetchData() {
		apiService.get('/category').then(res => {
			setCategories(res)
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
				pagination={{ position: ['topRight'] }}
				dataSource={categories}
				columns={columns}
				rowKey='ID_Category'
				onRow={rec => {
					return {
						onClick: () => showTort(rec.ID_Category) //при нажатиии
					}
				}}
			></Table>
			<Modal
				title={categoryRecord.ID_Category ? 'Изменение категории ' + categoryRecord.ID_Category : 'Добавление новой категории'}
				open={modalVisible}
				okText='Сохранить'
				cancelText='Отмена'
				onCancel={() => close()}
				centered
				footer={[
					<Button type='primary' onClick={() => saveTort()} disabled={!categoryRecord.Name}>
						Сохранить
					</Button>,
					categoryRecord.ID_Category ? (
						<Button danger onClick={() => removeTort(categoryRecord.ID_Category)}>
							Удалить
						</Button>
					) : null,
					<Button onClick={() => close()}>Отмена</Button>
				]}
			>
				<Form labelAlign='left' labelCol={{ span: 4 }} wrapperCol={{ span: 18 }}>
					<Form.Item label='Название'>
						<Input
							onChange={v =>
								setCategoryRecord(prevState => {
									return { ...prevState, Name: v.target.value }//что бы можно было поменять только поле нейм
								})
							}
							value={categoryRecord.Name}
						/>
					</Form.Item>
					
				</Form>
			</Modal>
		</>
	)
}

export default DobCat
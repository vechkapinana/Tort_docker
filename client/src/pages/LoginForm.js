import { Button, Form, Input } from 'antd'
import { useState } from 'react'
import validator from 'validator'
//сайт antd дизайн
//при каждом изменении запускается валидация, которая валидирует все поля. Если видно, что логин пустой то сразу ошибка!
//валидация идет на ончейдж события
const validateMessages = {
	required: 'Обязательное поле!'
}

function LoginForm(props) {
	const [isLogin, setIsLogin] = useState(true)
	const [authErrorMessage, setAuthErrorMessage] = useState('')
	const [form] = Form.useForm()
	//const [authMessage, setAuthMessage] = useState('')

	async function auth() {//по сути все библиотечные методы// отправка данных
		form
			.validateFields()
			.then(() => {
				// if (validator.isStrongPassword(form.getFieldsValue().password, { 
				// 	minLength: 8, minLowercase: 1, 
				// 	minUppercase: 1, minNumbers: 1
				// })) { 
				// 	setAuthErrorMessage('Надежный пароль') 
				// } else { 
				// 	setAuthErrorMessage('Не надежный пароль') 
				// }  
			
				if (form.getFieldsValue().passwordRepeat) {
                    // мы валидируем форму. промисы возвращают результат через какое-то время 
					//если у нас поле пустое или не сходятся пароли, то вызывается ошибка
                    // тк компонент один, то кнопка одна всегда, но на бек будем отправлять разные вещи
                    //если акк нет то предложен повтор пароля

					console.log('Регистрация с данными:', form.getFieldsValue())
					setAuthErrorMessage('Такой логин уже есть!')
				} else {
					console.log('Авторизация с данными:', form.getFieldsValue())
					// временный костыль, демонстрирующий работу логина
					if (form.getFieldsValue().login === 'admin' && form.getFieldsValue().password === 'Wujoh=1!') {
						props.setIsLoggedIn()
					} else {
						setAuthErrorMessage('Не верные логин или пароль!')
					}
				}
			})
			.catch(err => {
				console.log('error', err)
			})
	}
//смена типа формы
	function changeAuthType() {
		setAuthErrorMessage('')//Очищает сообщения ошибок аутентификации
		setIsLogin(!isLogin)//Инвертирует переменную isLogin
		form.resetFields()//Сбрасывает значения всех полей формы
	}

	async function repeatPasswordFieldValidation(formRecord) {//выполняет как раз действия с паролем при регистрации
		const passwordField = formRecord.getFieldValue('password')
		const passwordRepeatField = formRecord.getFieldValue('passwordRepeat')
		if (passwordRepeatField && passwordField !== passwordRepeatField) {
			throw Error('Пароли не совпадают!')
		}
	}

	async function StrongPass(formRecord) {//выполняет как раз действия с паролем при регистрации
		const passwordField = formRecord.getFieldValue('password')
		if (validator.isStrongPassword(passwordField, { 
			minLength: 8, minLowercase: 1, 
			minUppercase: 1, minNumbers: 1
		})) {<></>} else { 
			throw Error('Не надежный пароль') 
		}  
	
	}

	return (
		<>
			<div className='login-page'>
				<div className='login-form-wrapper'>
					<h1>{isLogin ? 'Авторизация' : 'Регистрация'}</h1>
					<Form
						labelAlign='left'
						labelCol={{ span: 7 }}
						wrapperCol={{ span: 18 }}
						form={form}//передаем форму
						validateMessages={validateMessages}
					>
						<Form.Item
							label='Логин'
							name='login'
							rules={[
								{
									required: true//всплывает сообщение (вверху прописано)// и возможно т проверку на заполненность поля, но это не точно
								}
							]}
						>
							<Input allowClear />
						</Form.Item>
						<Form.Item
							label='Пароль'
							name='password'
							rules={[
								{
									required: true
								},
								form => ({
									validator() {//кастомная функция
										return StrongPass(form)
									}
								})
							]}
						>
							<Input.Password allowClear />
						</Form.Item>
						{!isLogin ? (
							<Form.Item
								label='Повтор'
								name='passwordRepeat'
								rules={[
									{
										required: true
									},
									form => ({
										validator() {//кастомная функция
											return repeatPasswordFieldValidation(form)
										}
									})
								]}
							>
								<Input.Password allowClear />
							</Form.Item>
						) : (
							<></>
						)}
					</Form>
					{authErrorMessage ? <div className='auth-error-message'>{authErrorMessage}</div> : <></>}
					<Button type='primary' onClick={auth} style={{ width: 200 }}>
						{isLogin ? 'Войти' : 'Зарегистрироваться'}
					</Button>
					<p>
						{isLogin ? 'Еще не зарегистрированы?🤨' : 'Если есть аккаунт, можете в него войти🤓👉'}
						<Button type='link' onClick={changeAuthType}>  
                        {/* смена типов форм. Нужно сначала очиститььб форму а потом заполнять заново. работаем с одним обьектом формой*/}
							{isLogin ? 'Зарегистрироваться' : 'Авторизоваться'}
						</Button>
					</p>
				</div>
			</div>
		</>
	)
}

export default LoginForm
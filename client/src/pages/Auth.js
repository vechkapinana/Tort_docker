import { Card, Form } from 'antd';
import React, { useContext } from 'react';
import { Container } from 'react-bootstrap';
import { Input } from 'antd';
import { Button } from 'react-bootstrap';
import Row from 'react-bootstrap/Row';
import { LOGIN_ROUTE, REGISTRATION_ROUTE, SHOP_ROUTE  } from '../utils/consts';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import { registration, login } from '../http/userAPI';
import {observer} from "mobx-react-lite";
import { useState } from 'react'
import validator from 'validator'
import {Context} from "../index";
//import Col from 'react-bootstrap/Col';
const validateMessages = {
	required: 'Обязательное поле!'
}

const Auth = observer(() => {
    const {client} = useContext(Context)
    const location = useLocation()
    const navigate = useNavigate()
    //console.log(location)
    const isLogin = location.pathname === LOGIN_ROUTE
    const [Login, setLogin] = useState('')
    const [Password, setPassword] = useState('')
    const [PasswordRepeat, setPasswordRepeat] = useState('')
    const [Surname, setSurname] = useState('')
    const [Name, setName] = useState('')
    const [Patronymic, setPatronymic] = useState('')
    const [Phone_number, setPhone_number] = useState('')

    const click = async () => {
    try {
        let data;
        if(isLogin) {
            data = await login(Login, Password);
        //console.log(response)
        } else {
            data = await registration(Login, Password, Surname, Name, Patronymic, Phone_number);
            console.log(data)
        }
        client.setClient(client)
        // client.setRole('CLIENT'); // устанавливаем роль клиента
        client.setIsAuth(true)
        navigate(SHOP_ROUTE)
        window.location.reload();
    } catch (e) {
        alert(e.response.data.message)
    }
    }

    	async function repeatPasswordFieldValidation(PasswordRepeat) {//выполняет как раз действия с паролем при регистрации
		if (PasswordRepeat !== Password) {
			throw Error('Пароли не совпадают!')
		}
	}

	async function StrongPass(Password) {//выполняет как раз действия с паролем при регистрации
		//const passwordField = formRecord.getFieldValue('Password')
		if (validator.isStrongPassword(Password, { 
			minLength: 8, minLowercase: 1, 
			minUppercase: 1, minNumbers: 1
		})) {<></>} else { 
			throw Error('Не надежный пароль') 
		}  
	
	}

	return (
		<>
        <Container 
            className='d-flex align-items-center justify-content-center'
            style={{height: window.innerHeight - 54}}
        >
            <Card style={{width: 600}} className='p-5'>
                <h2 className='m-auto'>{ isLogin ? 'Авторизация' : 'Регистрация'}</h2>
                <Form className='d-flex flex-column' validateMessages={validateMessages}>
                <Form.Item className='mt-2' label='Логин' name='login' 
                rules={[{
                            required: true
                        }]}>
                    <Input allowClear
						onChange={e => setLogin(e.target.value) }//сразу идет перезапись
						value={Login}
				    />
                </Form.Item>   

                <Form.Item 
                    className='mt-2' 
                    label='Пароль' 
                    name='password'
                    rules={[
                        {
                            required: true
                        },
                        {
                            validator() {//кастомная функция
                                return StrongPass(Password)
                            }
                        }
                    ]}
                >
                    <Input.Password allowClear
						onChange={e => setPassword(e.target.value) }//сразу идет перезапись
						value={Password}
					/>
                    
                </Form.Item> 
                {!isLogin ? (
                    <>
						<Form.Item
                            className='mt-2' 
							label='Повтор'
							name='passwordRepeat'
							rules={[
								{
									required: true
								},
                                {
									validator() {//кастомная функция
										return repeatPasswordFieldValidation(PasswordRepeat)
									}
                                }
								]}
							>
								<Input.Password allowClear
						            onChange={e => setPasswordRepeat(e.target.value) }//сразу идет перезапись
						            value={PasswordRepeat}
					            />
							</Form.Item>
                            
                            <Form.Item label='Фамилия' name='surname'
                            rules={[{
									required: true
								}]}>
                            <Input 
                                onChange={e => setSurname(e.target.value) }//сразу идет перезапись
						        value={Surname}/>
                            </Form.Item>

                            <Form.Item label='Имя' name='name'
                            rules={[{
                                required: true
                            }]}>
                            <Input 
                                onChange={e => setName(e.target.value) }//сразу идет перезапись
						        value={Name}/>
                            </Form.Item>

                            <Form.Item label='Отчество' name='patronymic'>
                            <Input 
                                onChange={e => setPatronymic(e.target.value) }//сразу идет перезапись
						        value={Patronymic}/>
                            </Form.Item>

                            <Form.Item label='Телефон' name='phone_number'
                            rules={[{
                                required: true
                            }]}>
                            <Input 
                                onChange={e => setPhone_number(e.target.value) }//сразу идет перезапись
						        value={Phone_number}/>
                            </Form.Item>
                            </>
						) : (
							<></>
						)}

                <Row className='d-flex justify-content-beween mt-3 pl-3 pr-3' >
                    {isLogin ?
                    <div>
                        Нет аккаунта? <NavLink to={REGISTRATION_ROUTE}> Зарегистрируйся! </NavLink>
                    </div>
                    :
                    <div>
                        Есть аккаунт? <NavLink to={LOGIN_ROUTE}> Войдите! </NavLink>
                    </div>
                    }
                    <Button variant='outline-dark' onClick={click}>
                        {isLogin ? 'Войти' : 'Регистрация'}
                    </Button> 

                </Row>

                </Form>
            </Card>
			
		</Container>
		</>
	)
});

export default Auth
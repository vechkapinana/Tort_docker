//здесь мы реализуем функции регистр, авториз и проверка токена на валидность. та самая функция check

import {$authHost, $host} from "./index";
//import jwt_decode from 'jwt_decode'
import { jwtDecode } from 'jwt-decode'

//var jwtDecode = require('jwt-decode');
export const registration = async (Login, Password, Surname, Name, Patronymic, Phone_number) => {
    const {data} = await $host.post('api/client/registration', {Login, Password, Surname, Name, Patronymic, Phone_number, Role: 'CLIENT'})
    localStorage.setItem('token', data.token)
    return jwtDecode(data.token)
}

export const login = async (Login, Password) => {
    const {data} = await $host.post('api/client/login', {Login, Password})
    localStorage.setItem('token', data.token)
    return jwtDecode(data.token)
}

export const check = async () => {//проверка авторизован пользователь или нет
    // const {data} = await $authHost.get('api/client/auth' )
    // localStorage.setItem('token', data.token)
    // return jwtDecode(data.token)
    try {
        const {data} = await $authHost.get('api/client/auth');
        localStorage.setItem('token', data.token);
        return jwtDecode(data.token);
    } catch (error) {
        if (error.response && error.response.status === 401) {
            // Обработка ошибки 401
            localStorage.removeItem('token'); // Удаляем токен из localStorage
            return null; // Возвращаем null или другую подходящую обработку
        }
        // Обработка других ошибок
        console.error(error);
        return null;
    }
}
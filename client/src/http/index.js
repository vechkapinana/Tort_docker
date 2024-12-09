import axios from "axios"

const $host = axios.create({
    baseURL: 'http://localhost:5000/' //url на который будут отправляться запросы
})

const $authHost = axios.create({
    baseURL: 'http://localhost:5000/'
})

//при авторизации добавляем токен в локальное хранилище
const authInterceptor = config => {
    config.headers.authorization = `Bearer ${localStorage.getItem('token')}`
    return config
}

$authHost.interceptors.request.use(authInterceptor)
//отрабатывает перед каждым запросом
//подставляет токен в хэдер.авториз

export {
    $host,
    $authHost
}
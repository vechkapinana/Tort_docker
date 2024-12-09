//через этот файлик иет запуск
require('dotenv').config()
const express = require('express')
const fileUpload = require('express-fileupload');
// const bodyParser = require('body-parser');
const sequelize = require('./bd')
const models = require('./models/models')
const cors = require('cors') //для того, чтобы могли отправлять запросы с браузера
const router = require('./routes/index')//основной роутер, который связывает все остальные
const errorHandler = require('./middleware/ErrorHandlingMiddleware')
const path = require('path')

const PORT = process.env.PORT || 5000 //по умолчанию стоит 5000 (создали переменную окружения, чтобы там были порты)

const app = express()
app.use(cors())
app.use(express.json())//чтобы приложение могло парсить json формат
app.use(express.static(path.resolve(__dirname, 'static')))
app.use(fileUpload({}))
app.use('/api', router) //url, по которому роутер должен обрабатываться и сам роутер
//app.get('/', (req, res) => {
//   res.status(200).json({message: 'WORK!!!'})
//})

//Обработка ошибок, последний middleware так как
//мы внутри него не вызываем функцию некст тк на нем работа прекращается и мы возвращаем клиенту ответ
app.use(errorHandler)

const start = async () => {
    try{ //await тк функция асинхронная
        await sequelize.authenticate()//с помощью этого происходит подключение к бд
        await sequelize.sync() //сверяет состояние бд со схемой данных
        app.listen(PORT, () => console.log('Server started on port '+ PORT))
    } catch (e) {
        console.log(e)
    }
}

start()
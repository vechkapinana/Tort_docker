const Router = require('express')
const router = new Router()
const clientController = require('../controllers/clientController')
const authMiddleware = require('../middleware/authMiddleware')
const checkRoleMiddleware = require('../middleware/checkRoleMiddleware')

router.post('/registration', clientController.registration)//регистрация
router.post('/login', clientController.login)//авторизация
router.get('/auth', authMiddleware, clientController.check)//будем проверять авторизован пользователь или нет
router.get('/:ID_Client', clientController.getOne)
//router.get('/auth',(req, res) => {// все маршруты указанные от роутера к роутеру плюсуются и мы можем с ними работать
//    res.json({message: 'WORK!!!'})// в роутере писать не надо функции, надо разделять логику
//})


module.exports = router//этот роутер из этого файла мы экспортируем
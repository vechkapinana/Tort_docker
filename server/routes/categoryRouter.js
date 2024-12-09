const Router = require('express')
const router = new Router()
const categoryController = require('../controllers/categoryController')
//const checkRole = require('../middleware/checkRoleMiddleware')

router.post('/', categoryController.create)//для того чтобы создавать категории
router.get('/', categoryController.getAll)////для того чтобы получать категории
router.get('/:ID_Category', categoryController.getOne)////для того чтобы получать категории
router.delete('/:ID_Category', categoryController.delete)////для того чтобы удалять категории

module.exports = router//этот роутер из этого файла мы экспортируем
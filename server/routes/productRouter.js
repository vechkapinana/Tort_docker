const Router = require('express')
const router = new Router()
const productController = require('../controllers/productController')

router.post('/', productController.create)//создание
router.get('/', productController.getAll)//получение
router.get('/:ID_Product', productController.getOne)//получить отдельный конкретный взятый товар, после того как мы перешли подробная инфа
router.delete('/:ID_Product', productController.delete)
module.exports = router//этот роутер из этого файла мы экспортируем
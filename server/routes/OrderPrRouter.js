const Router = require('express')
const router = new Router()
const orderprController = require('../controllers/orderprController')

router.post('/', orderprController.create)//для того чтобы создавать
// router.post('/:ID_Client/:ID_Product', orderController.upd)//для того чтобы 
router.get('/:ID_Order', orderprController.getAll)////для того чтобы получать 
// router.get('/:ID_Client/:ID_Product', orderController.getOne)////для того чтобы получать 
// router.delete('/:ID_Client/:ID_Product', orderController.delete)////для того чтобы удалять 
// router.delete('/:ID_Client', orderController.deleteAll)////для того чтобы удалять all

module.exports = router//этот роутер из этого файла мы экспортируем
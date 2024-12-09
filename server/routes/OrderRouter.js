const Router = require('express')
const router = new Router()
const orderController = require('../controllers/orderController')

router.post('/', orderController.create)//для того чтобы создавать
router.post('/:ID_Client', orderController.upd)
router.post('/:ID_Order/:ID_Client', orderController.izm)
router.get('/:ID_Client', orderController.get)////для того чтобы получать 
router.get('/', orderController.getAll)////для того чтобы получать 
router.get('/:ID_Order/:ID_Client', orderController.getOne)////для того чтобы получать 
router.delete('/:ID_Order', orderController.deleteOne)////для того чтобы удалять 
// router.delete('/:ID_Client', orderController.deleteAll)////для того чтобы удалять all

module.exports = router//этот роутер из этого файла мы экспортируем
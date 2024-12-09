const Router = require('express')
const router = new Router()
const addressController = require('../controllers/addressController')

router.post('/', addressController.create)//для того чтобы создавать
//router.post('/:ID_Order', addressController.upd)
//router.get('/:ID_Client', addressController.get)////для того чтобы получать 
// router.get('/:ID_Client/:ID_Product', orderController.getOne)////для того чтобы получать 
// router.delete('/:ID_Client/:ID_Product', orderController.delete)////для того чтобы удалять 
// router.delete('/:ID_Client', orderController.deleteAll)////для того чтобы удалять all

module.exports = router//этот роутер из этого файла мы экспортируем
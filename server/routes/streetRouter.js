const Router = require('express')
const router = new Router()
const streetController = require('../controllers/streetController')

//router.post('/', addressController.create)//для того чтобы создавать
//router.post('/:ID_Client', addressController.upd)
router.get('/', streetController.getAll)////для того чтобы получать 
router.get('/:ID_Client', streetController.get)////для того чтобы получать 
// router.delete('/:ID_Client/:ID_Product', orderController.delete)////для того чтобы удалять 
// router.delete('/:ID_Client', orderController.deleteAll)////для того чтобы удалять all

module.exports = router//этот роутер из этого файла мы экспортируем
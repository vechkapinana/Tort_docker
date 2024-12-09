const Router = require('express')
const router = new Router()
const basketController = require('../controllers/basketController')

router.post('/:ID_Client', basketController.create)//для того чтобы создавать
router.post('/:ID_Client/:ID_Product', basketController.upd)//для того чтобы 
router.get('/:ID_Client', basketController.getAll)////для того чтобы получать 
router.get('/:ID_Client/:ID_Product', basketController.getOne)////для того чтобы получать 
router.delete('/:ID_Client/:ID_Product', basketController.delete)////для того чтобы удалять 
router.delete('/:ID_Client', basketController.deleteAll)////для того чтобы удалять all

module.exports = router//этот роутер из этого файла мы экспортируем
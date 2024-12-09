const Router = require('express')
const router = new Router()
const categoryRouter = require('./categoryRouter')
const clientRouter = require('./clientRouter')
const productRouter = require('./productRouter')
const basketRouter = require('./BasketRouter')
const orderprRouter = require('./OrderPrRouter')
const orderRouter = require('./OrderRouter')
const addressRouter = require('./addressRouter')
const streetRouter = require('./streetRouter')
const statusRouter = require('./statusRouter')
const pdfRouter = require('./pdfRouter')

router.use('/category', categoryRouter)//подроутеры (указваем url)
router.use('/client', clientRouter)
router.use('/product', productRouter)
router.use('/basket', basketRouter)
router.use('/orderpr', orderprRouter)
router.use('/order', orderRouter)
router.use('/address', addressRouter)
router.use('/street', streetRouter)
router.use('/status', statusRouter)
router.use('/generate-pdf', pdfRouter)
module.exports = router//этот роутер из этого файла мы экспортируем
const {Status}= require('../models/models')
// const {Address}= require('../models/models')
const ApiError = require('../error/ApiError')
const db = require('../bd')
class StatusController {
    // async create(req, res) {
    //     const {ID_Order, ID_Client, ID_Status, DataD, Cost, DataS, Coment, ID_Address} = req.body
    //     // console.log(req.body,ID_Client,ID_Product)
    //     // const order = await Order.create({ID_Order, ID_Client, ID_Status, DataD, Cost, DataS, Coment})
    //     // return res.json(order)
    //         const order = await Order.create({ID_Order, ID_Client, ID_Status, DataD, Cost, DataS, Coment})
    //         return res.json(order)
    // }

    // async upd(req, res) {
    //     const ID_Client = req.params.ID_Client
    //     const{DataD, Coment}=req.body
    //     const order = await db.query(`UPDATE public.orders
    //     SET "DataS" = CURRENT_DATE, "DataD" = '${DataD}', "Coment" = '${Coment}'
    //     WHERE orders."ID_Client" = ${ID_Client} AND orders."ID_Status" = 1 AND orders."ID_Order" = (
    //         SELECT MAX("ID_Order") 
    //         FROM public.orders 
    //         WHERE "ID_Client" = ${ID_Client});`)
    //     return res.json(order)
    // }

    // async izm(req, res) {
    //     const {ID_Order, ID_Client, ID_Status, DataD, Cost, DataS, Coment, ID_Address} = req.body
    //     const order = await db.query(`UPDATE public.orders
    //     SET "DataD" = '${DataD}', "Coment" = '${Coment}', "ID_Status" ='${ID_Status}', "ID_Address"='${ID_Address}'
    //     WHERE orders."ID_Order" = ${ID_Order}`)
    //     return res.json(order)
    // }

    // async get(req, res) {
    //     const ID_Client = req.params.ID_Client
    //     const order = await db.query(`SELECT orders."ID_Order", orders."Cost" 
    //     FROM public.orders
    //     WHERE orders."ID_Client" = ${ID_Client}
	// 	AND orders."ID_Status" = 1 
	// 	AND orders."ID_Order" = (
    // SELECT MAX("ID_Order") 
    // FROM public.orders 
    // WHERE "ID_Client" = ${ID_Client})`)
    //     return res.json(order)
    // }

    async getAll(req, res) {
        const ID_Client = req.params.ID_Client
        const order = await db.query(`SELECT orders."ID_Order", TO_CHAR(orders."DataD", 'DD-MM-YYYY') AS "DataD", orders."Cost", orders."Coment", statuses."NameSt" FROM public.orders JOIN public.statuses ON orders."ID_Status"=statuses."ID_Status" WHERE orders."ID_Client" = ${ID_Client} AND orders."ID_Status" < 4`)
        return res.json(order)
    }

    async get(req, res) {
        const status = await db.query(`SELECT * FROM public.statuses`)
        return res.json(status)
    }

    // async getOne(req, res) {
    //     const ID_Order = req.params.ID_Order
    //     const order = await db.query(`SELECT * FROM public.orders WHERE orders."ID_Order" = ${ID_Order}`)
    //     return res.json(order)
    // }

    // async deleteOne(req, res) {
    //     const ID_Order = req.params.ID_Order
	// 	const basket = await db.query(`DELETE FROM public.orders WHERE orders."ID_Order" = ${ID_Order}; 
    //     DELETE FROM public.product_orders WHERE product_orders."ID_Order" = ${ID_Order};`)
	// 	res.json({ success: true })
    // }

    
}

module.exports = new StatusController()

const {Product_Order}= require('../models/models')
const ApiError = require('../error/ApiError')
const db = require('../bd')
class OrderPrController {
    async create(req, res) {
        // const {ID_Order, ID_Product, Kvo} = req.body
        // const orderpr = await Product_Order.create({ID_Order, ID_Product, Kvo})
        // console.log(req.body,ID_Client,ID_Product)
        const{ID_Client}=req.body
        const orderpr = await db.query(`INSERT INTO public."product_orders" ("ID_Order", "ID_Product", "Kvo") 
        SELECT subquery_orders."ID_Order", subquery_baskets."ID_Product",subquery_kvo."Kvo"
        FROM 
            (SELECT orders."ID_Order" FROM public."orders" WHERE orders."ID_Client"=${ID_Client} AND orders."ID_Order" = (
                SELECT MAX("ID_Order") 
                FROM public.orders 
                WHERE "ID_Client" = ${ID_Client})) AS subquery_orders,
            (SELECT baskets."ID_Product" FROM public."baskets" WHERE baskets."ID_Client"=${ID_Client}) AS subquery_baskets,
            (SELECT baskets."ID_Product", baskets."Kvo" FROM public."baskets" WHERE baskets."ID_Client"=${ID_Client}) AS subquery_kvo
        WHERE subquery_baskets."ID_Product" = subquery_kvo."ID_Product";`)
        return res.json(orderpr)
    }

    async getAll(req, res) {
        const ID_Order = req.params.ID_Order
        const order = await db.query(`SELECT product_orders."ID_Product", product_orders."Kvo", products."Name" FROM public.product_orders 
        JOIN public.products ON products."ID_Product" = product_orders."ID_Product"
        WHERE product_orders."ID_Order" = ${ID_Order}`)
        return res.json(order)
    }

    // async getAll(req, res) {
    //     const ID_Client = req.params.ID_Client
    //     const baskets = await db.query(`SELECT products.*, baskets."Kvo"
    //     FROM public.products
    //     JOIN public.baskets ON products."ID_Product" = baskets."ID_Product"
    //     WHERE baskets."ID_Client" = ${ID_Client}`)
    //     return res.json(baskets)
    // }

    
}

module.exports = new OrderPrController()

// INSERT INTO public.streets
// VALUES 
// (1,'Ново-Садовая'),
// (2,'Куйбышева'),
// (3,'Ленинградская'),
// (4,'Революционная'),
// (5,'Чапаевская'),
// (6,'Никитинская'),
// (7,'Советской Армии')

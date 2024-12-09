const {Basket}= require('../models/models')
const ApiError = require('../error/ApiError')
const db = require('../bd')
class BasketController {
    async create(req, res) {
        //поскольку это пост запрос у него есть тело
        const {ID_Client, ID_Product, Kvo} = req.body
        console.log(req.body,ID_Client,ID_Product)
        //const category = await Category.create({ID_Category, Name})
        // let basket;
        // if (ID_Product) {
        //     basket = await db.query(`UPDATE public.baskets set "Kvo" = '${Kvo+1}' where "ID_Product" = ${ID_Product} RETURNING *`, [ID_Product, Kvo])
        // } else {
        const basket = await db.query(`INSERT INTO public.baskets ("ID_Client", "ID_Product", "Kvo") VALUES (${ID_Client}, ${ID_Product}, ${Kvo})`)
        return res.json(basket)
    }//достаю из контекста клиента с которым работаю и продукт, который я добавляю. и количество записываю ноль. 
    //Если человек опять нажимает, то по продукту проверяется и увеличивается количество

    async getAll(req, res) {//по всем айдишникам продуктов показываются сами продукты из сущности продукт
        //const baskets = await db.query(`SELECT * FROM public.products JOIN public.baskets ON products."ID_Product" = baskets."ID_Product" WHERE products."ID_Product" = baskets."ID_Product"`)
        const ID_Client = req.params.ID_Client
        // const baskets = await db.query(`SELECT *
        // FROM public.products
        // WHERE "ID_Product" IN (
        // SELECT baskets."ID_Product"
        // FROM public.baskets
        // JOIN products ON products."ID_Product" = baskets."ID_Product"
        // WHERE baskets."ID_Client" = ${ID_Client})`)
        const baskets = await db.query(`SELECT products.*, baskets."Kvo"
        FROM public.products
        JOIN public.baskets ON products."ID_Product" = baskets."ID_Product"
        WHERE baskets."ID_Client" = ${ID_Client}`)
        return res.json(baskets)
    }

    async getOne(req, res) {
        const ID_Product = req.params.ID_Product
        const ID_Client = req.params.ID_Client
        console.log(req.params)
        const basket = await db.query(`SELECT baskets."Kvo" FROM public.baskets where baskets."ID_Product" = ${ID_Product} AND baskets."ID_Client" = ${ID_Client}`)
        return res.json(basket)
        // const {ID_Product} = req.params
        // const basket = await Basket.findOne(
        //     {where: {ID_Product}}
        // )
        // return res.json(basket)
    }

    async upd(req, res) {
        const ID_Product = req.params.ID_Product
        const ID_Client = req.params.ID_Client
        const{Kvo}=req.body
        console.log(Kvo)
        const basket = await db.query(`UPDATE public.baskets set "Kvo" = ${Kvo}+1 where "ID_Product" = ${ID_Product} AND baskets."ID_Client" = ${ID_Client} RETURNING *`, [Kvo])
        return res.json(basket)
    }

    async delete(req, res) {
        const ID_Product = req.params.ID_Product
        const ID_Client = req.params.ID_Client
		const basket = await db.query(`DELETE FROM public.baskets WHERE baskets."ID_Product" = ${ID_Product} AND baskets."ID_Client" = ${ID_Client};`)
		res.json({ success: true })
    }

    async deleteAll(req, res) {
        const ID_Client = req.params.ID_Client
		const basket = await db.query(`DELETE FROM public.baskets WHERE baskets."ID_Client" = ${ID_Client};`)
		res.json({ success: true })
    }
}

//на выходе из этого файла у нас будет новый объект, созданный из этого класса
module.exports = new BasketController()


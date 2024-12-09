const {Address}= require('../models/models')
const ApiError = require('../error/ApiError')
const db = require('../bd')
class AddressController {
    async create(req, res) {
        const {ID_Address, ID_Street, House, Apartment, Floor} = req.body
        const{NameS, ID_Order}=req.body
            const address = await db.query(`
           WITH address_insert AS(
                INSERT INTO public.addresses ("ID_Street", "House", "Apartment", "Floor")
                VALUES( ${NameS}, ${House}, ${Apartment}, ${Floor})
                RETURNING "ID_Address"
                )
                UPDATE public.orders
                    SET "ID_Address" = (SELECT "ID_Address" FROM address_insert)
                    WHERE orders."ID_Order"=${ID_Order}`)
            return res.json(address)
    }

    // async get(req, res) {
    //     const ID_Client = req.params.ID_Client
    //     const order = await db.query(`SELECT orders."ID_Order", orders."Cost" 
    //     FROM public.orders
    //     WHERE orders."ID_Client" = ${ID_Client} AND orders."ID_Status" = 1`)
    //     return res.json(order)
    // }

    // async upd(req, res) {
    //     const ID_Order = req.params.ID_Order
    //     console.log(Kvo)
    //     const basket = await db.query(`UPDATE public.baskets set "Kvo" = "Kvo"+1 where "ID_Product" = ${ID_Product} AND baskets."ID_Client" = ${ID_Client} RETURNING *`, [Kvo])
    //     return res.json(basket)
    // }

    
}

module.exports = new AddressController()



// WITH street_cte AS (
//     SELECT "ID_Street" 
//     FROM public.streets 
//     WHERE streets."Name" = ${Name}), address_insert AS (
// INSERT INTO public.addresses ("ID_Street", "House", "Apartment", "Floor")
// SELECT "ID_Street", ${House}, ${Apartment}, ${Floor}
// FROM street_cte;
// RETURNING "ID_Address"
// )
// UPDATE public.orders
//     SET "ID_Address" = (SELECT "ID_Address" FROM address_insert)
//     WHERE orders."ID_Order"=${ID_Order}`)
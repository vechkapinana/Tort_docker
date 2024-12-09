const {Street}= require('../models/models')
const ApiError = require('../error/ApiError')
const db = require('../bd')
class StreetController {

    async getAll(req, res) {
        const streets = await Street.findAll()
        return res.json(streets)
    }


async get(req, res) {
    const ID_Client = req.params.ID_Client
    const order = await db.query(`SELECT orders."ID_Order", TO_CHAR(orders."DataD", 'DD-MM-YYYY') AS "DataD", orders."Cost", orders."Coment", statuses."NameSt" FROM public.orders JOIN public.statuses ON orders."ID_Status"=statuses."ID_Status" WHERE orders."ID_Client" = ${ID_Client} AND orders."ID_Status" = 4 OR orders."ID_Status" = 5 `)
    return res.json(order)
}
}

//на выходе из этого файла у нас будет новый объект, созданный из этого класса
module.exports = new StreetController()




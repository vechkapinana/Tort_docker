const {Category}= require('../models/models')
const ApiError = require('../error/ApiError')
const db = require('../bd')
class CategoryController {
    async create(req, res) {
        //поскольку это пост запрос у него есть тело
        const {ID_Category, Name} = req.body
        //const category = await Category.create({ID_Category, Name})
        let category
        if (ID_Category) {
            category = await db.query(`UPDATE public.categories set "Name" = '${Name}' where "ID_Category" = ${ID_Category} RETURNING *`, [ID_Category, Name])
        } else {
            category = await Category.create({ID_Category, Name})
        }
        return res.json(category)
    }

    async getAll(req, res) {
        const categories = await Category.findAll()
        return res.json(categories)
    }

    async getOne(req, res) {
        const category = await Category.findOne()
        return res.json(category)
    }

    async delete(req, res) {
        const ID_Category = req.params.ID_Category
		const tort = await db.query(`DELETE FROM public.categories WHERE categories."ID_Category" = ${ID_Category}; `)
		res.json({ success: true })
    }
}

//на выходе из этого файла у нас будет новый объект, созданный из этого класса
module.exports = new CategoryController()




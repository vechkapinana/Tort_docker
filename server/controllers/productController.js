const {Product} = require('../models/models')
const uuid = require('uuid')
const path = require('path');
const fs = require('fs');
const ApiError = require('../error/ApiError')
const db = require('../bd')

class ProductController {
    async create(req, res) {
        
        // const Photo = req.files
        // let fileName = uuid.v4() + ".jpg"
        // Photo.mv(path.resolve(__dirname, '..', 'static', fileName))

        const {ID_Product, ID_Category, Name, Grade, Compound, Exp, Weight, Price} = req.body
        console.log('body',req.body)
            //const product = await Product.create({ID_Product, ID_Category, Name, Photo, Grade, Compound, Exp, Weight, Price})
            let product
        if (ID_Product != undefined) {
            if (req.files && req.files != null){  
            let { Photo } = req.files;
            console.log(Photo)
            let fileName = uuid.v4() + ".jpg"; 
            Photo.mv(path.resolve(__dirname,'..','static',fileName));
            product = await db.query(`UPDATE public.products set "ID_Category" = '${ID_Category}', "Name" = '${Name}', "Photo" = '${fileName}', "Grade" = '${Grade}', "Compound" = '${Compound}', "Exp" = '${Exp}', "Weight" = '${Weight}', "Price" = '${Price}' where "ID_Product" = ${ID_Product} RETURNING *`, [ID_Category, Name])
            }
        } else {
            if (req.files && req.files != null){
            const { Photo } = req.files;
            console.log(Photo)
            const fileName = uuid.v4() + ".jpg";
            Photo.mv(path.resolve(__dirname,'..','static',fileName));
            product = await Product.create({ID_Category, Name, Photo: fileName, Grade, Compound, Exp, Weight, Price})
            }}
            return res.json(product)
        // try{
        //     const {ID_Product, ID_Category, Name, Compound, Exp} = req.body
        //     const product = await Product.create({ID_Product, ID_Category, Name, Compound, Exp})
        //     return res.json(product)
        // } catch(e){
        //     next(ApiError.badRequest(e.message))
        // }
    }

    //можно сделать постраничное разбиение для большого голичества товаров
    async getAll(req, res) {
        const {ID_Category} = req.body
        let products
        if (!ID_Category){//если не указан, то выводим все товары, иначе те которые указаны
            products = await Product.findAll()
        }
        else {
            products = await Product.findAll({where:{ID_Category}})
        }
        return res.json(products)
    }

    async getOne(req, res) {
        const {ID_Product} = req.params
        const product = await Product.findOne(
            {where: {ID_Product}}
        )
        return res.json(product)
    }

    async delete(req, res) {
        const ID_Product = req.params.ID_Product
		const tort = await db.query(`DELETE FROM public.products WHERE products."ID_Product" = ${ID_Product}; `)
		res.json({ success: true })
    }
}

//на выходе из этого файла у нас будет новый объект, созданный из этого класса
module.exports = new ProductController()
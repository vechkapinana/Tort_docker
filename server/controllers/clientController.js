//добавила роль, но не проверяла
const ApiError = require('../error/ApiError')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const {Client}=require('../models/models')

const generateJwt = (ID_Client, Login, Role) => {
    return jwt.sign(
        {ID_Client, Login, Role},
        process.env.SECRET_KEY,
        {expiresIn: '24h'}
    )
}
class ClientController {
    async registration(req, res, next) {
        const {Login, Password, Surname, Name, Patronymic, Phone_number, Role} = req.body
        if(!Login || !Password){
            return next(ApiError.badRequest('Некорректный логин или пароль'))
        }
        const candidate = await Client.findOne({where: {Login}})
        if(candidate){
            return next(ApiError.badRequest('Пользователь с данным логином уже существует'))
        } 
        const hashPassword = await bcrypt.hash(Password, 5)//сколько раз будем хэшировать пароль
        //?надо ли роль?
        const client = await Client.create({Login, Password: hashPassword, Surname, Name, Patronymic, Phone_number, Role})
        //const order = await Order.create({ID_Client: client.ID_Client}) 
        const token = generateJwt(client.ID_Client, client.Login, client.Role)
        return res.json({token})
    }

    async login(req, res, next) {
        const {Login, Password} = req.body
        const client = await Client.findOne({where: {Login}})
        if(!client){
            return next(ApiError.iternal('Пользователь не найден'))
        } 
        let comparePassword = bcrypt.compareSync(Password, client.Password)
        if(!comparePassword){
            return next(ApiError.iternal('Указан неверный пароль'))
        }
        const token = generateJwt(client.ID_Client, client.Login, client.Role)
        return res.json({token})
    }

    async check(req, res, next) {//сгенерировать новый токен и отправить его обратно на клиент
        //res.json({message: "ALL RIGHT"})
        const token = generateJwt(req.client.ID_Client, req.client.Login, req.client.Role)
        return res.json({token})
    }

    // async get(req, res) {
    //     const {Login} = req.body
    //     const client = await Client.findOne({where: {Login}})
    //     return res.json(client)
    // }

    async getOne(req, res) {
        const ID_Client = req.params.ID_Client
        const client = await Client.findOne(
            {where: {ID_Client}}
        )
        return res.json(client)
    }
}

//на выходе из этого файла у нас будет новый объект, созданный из этого класса
module.exports = new ClientController()
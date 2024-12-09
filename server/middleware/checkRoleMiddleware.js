const jwt = require('jsonwebtoken')
module.exports = function (Role) {
    return function (req, res, next){
        if (req.method === "OPTIONS") {
            next()
        }
        try {
            const token = req.headers.authorization.split(' ')[1] // Bearer hbfdvubjbfuv
            // по первому индексу получаем сам токен
            if (!token) {
                return res.status(401).json({message: "Не авторизован"})
            }
            const decoded = jwt.verify(token, process.env.SECRET_KEY)
            if (decoded.Role !== Role){
                return res.status(403).json({message: "Нет доступа"})
            }
            req.client = decoded
            next()//вызываем след в цепочке middleware
        } catch(e){
            res.status(401).json({message: "Не авторизован"})
        }
    };
}    
    

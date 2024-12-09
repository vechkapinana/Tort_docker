const {Sequelize} = require ('sequelize') 
//Sequelize - это ORM-библиотека для приложений на Node. js, которая осуществляет сопоставление таблиц в бд и отношений между ними с классами.
module.exports = new Sequelize (
    process.env.DB_NAME,
    process.env.DB_USER,
    process.env.DB_PASSWORD,
    {
        dialect: 'postgres',
        host: process.env.DB_HOST,
        port: process.env.DB_PORT
    }
)
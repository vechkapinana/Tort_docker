const sequelize = require('../bd')
//Oписание типов
const {DataTypes}=require('sequelize')

const Client = sequelize.define('client', {//
    ID_Client: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    Login: {type: DataTypes.STRING, unique: true, allowNull: false},
    Password: {type: DataTypes.STRING},
    Surname: {type: DataTypes.STRING},
    Name: {type: DataTypes.STRING},
    Patronymic: {type: DataTypes.STRING},
    Phone_number: {type: DataTypes.BIGINT},
    Role:{type: DataTypes.STRING, defaultValue: "CLIENT"}
},{ timestamps: false })

const Order = sequelize.define('order', {//
    ID_Order: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    ID_Client: {type: DataTypes.INTEGER},
    ID_Status: {type: DataTypes.INTEGER},
    DataD: {type: DataTypes.DATE},
    Cost: {type: DataTypes.FLOAT},
    DataS: {type: DataTypes.DATE},
    Coment:{type: DataTypes.STRING},
    ID_Address: {type: DataTypes.INTEGER}
},{ timestamps: false })

const Product_Order = sequelize.define('product_order', {
    ID_Order: {type: DataTypes.INTEGER, primaryKey: true},
    ID_Product: {type: DataTypes.INTEGER, primaryKey: true},
    Kvo: {type: DataTypes.INTEGER}
},
{
    // Добавляем опцию composite key для указания, что это составной ключ
    compositeKey: ['ID_Order', 'ID_Product'],
    timestamps: false 
})

const Product = sequelize.define('product', {
    ID_Product: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    ID_Category: {type: DataTypes.INTEGER},
    Name: {type: DataTypes.STRING, allowNull: false},
    Photo: {type: DataTypes.STRING},
    //Grade: {type: DataTypes.FLOAT, defaultValue: 0},
    Compound: {type: DataTypes.STRING, allowNull: false},
    Exp: {type: DataTypes.STRING, allowNull: false},
    Weight: {type: DataTypes.FLOAT, allowNull: false},
    Price: {type: DataTypes.FLOAT, allowNull: false}
},{ timestamps: false })

// const Cost_Product = sequelize.define('Cost_Product', {
//     ID_Product: {type: DataTypes.INTEGER, primaryKey: true},
//     Weight: {type: DataTypes.FLOAT, allowNull: false},
//     Price: {type: DataTypes.FLOAT, allowNull: false}
// })

const Category = sequelize.define('category', {
    ID_Category: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    Name: {type: DataTypes.STRING, allowNull: false}
},{ timestamps: false })

const Basket = sequelize.define('basket', {
    ID_Client: {type: DataTypes.INTEGER, primaryKey: true},
    ID_Product: {type: DataTypes.INTEGER, primaryKey: true},
    Kvo: {type: DataTypes.INTEGER}
},
{
    // Добавляем опцию composite key для указания, что это составной ключ
    compositeKey: ['ID_Client', 'ID_Product'],
    timestamps: false 
})

// const Review = sequelize.define('review', {
//     ID_Review: {type: DataTypes.INTEGER, primaryKey: true},
//     ID_Client: {type: DataTypes.INTEGER},
//     ID_Product: {type: DataTypes.INTEGER},
//     Text: {type: DataTypes.STRING},
//     Photo: {type: DataTypes.BLOB},
//     DateS: {type: DataTypes.DATE},
//     Grade: {type: DataTypes.FLOAT}
// },{ timestamps: false })

const Status = sequelize.define('status', {
    ID_Status: {type: DataTypes.INTEGER, primaryKey: true},
    NameSt: {type: DataTypes.STRING}
},{ timestamps: false })

const Address = sequelize.define('address', {//
    ID_Address: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    ID_Street: {type: DataTypes.INTEGER, allowNull: false},
    House: {type: DataTypes.INTEGER, allowNull: false},
    Apartment: {type: DataTypes.INTEGER},
    Floor: {type: DataTypes.INTEGER}
},{ timestamps: false })

const Street = sequelize.define('street', {//
    ID_Street: {type: DataTypes.INTEGER, primaryKey: true},
    NameS: {type: DataTypes.STRING}
},{ timestamps: false })

Order.hasMany(Status)
Status.belongsTo(Order)

// Address.hasMany(Order)
// Order.belongsTo(Address)

Client.hasMany(Order)
Order.belongsTo(Client)

Address.hasMany(Order)
Order.belongsTo(Address)

Street.hasMany(Address)
Address.belongsTo(Street)

// Client.hasMany(Review)
// Review.belongsTo(Client)

Order.hasMany(Product_Order)
Product_Order.belongsTo(Order)

// Product.hasMany(Review)
// Review.belongsTo(Product)

Product.hasMany(Product_Order)
Product_Order.belongsTo(Product)

Product.hasMany(Basket)
Basket.belongsTo(Product)

Client.hasMany(Basket)
Basket.belongsTo(Client)

// Product.hasMany(Cost_Product)
// Cost_Product.belongsTo(Product)

Category.hasMany(Product)
Product.belongsTo(Category)

module.exports = {
    Order,
    Client,
    Status,
    Address,
    // Review,
    Product_Order,
    Product,
    Category,
    Street              
    // Cost_Product
}

// module.exports = {
//     up: (queryInterface, Sequelize) =>
//       queryInterface.changeColumn('Product', 'Name', {
//         type: Sequelize.STRING,
//         allowNull: false,
//       }),
  
//     down: (queryInterface, Sequelize) =>
//       queryInterface.changeColumn('Product', 'Name', {
//         type: Sequelize.INTEGER, // Измените PREVIOUS_TYPE на предыдущий тип
//         allowNull: false,
//       }),
//   };

//какой тип будет у фото???
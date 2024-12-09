//MobX использует наблюдаемые данные, которые помогают автоматически 
//отслеживать изменения, облегчая жизнь разработчикам.
import {makeAutoObservable} from 'mobx';

export default class ProductStore {
    constructor() {
        this._categories = [
            // {ID_Category: 1, Name: 'Торты'},
            // {ID_Category: 2, Name: 'Пирожные'},
            // {ID_Category: 3, Name: 'Десерты'},
            // {ID_Category: 4, Name: 'Меренговые рулеты'}
        ]

        this._products = [
            // {ID_Product: 1, ID_Category: 1, Name: "Медовый", Photo: "https://www.google.com/url?sa=i&url=https%3A%2F%2Fru.pinterest.com%2Fpin%2F606578643566699560%2F&psig=AOvVaw0d07kbfYtDC4SV_ka57303&ust=1713259827887000&source=images&cd=vfe&opi=89978449&ved=0CBIQjRxqFwoTCNjL_Kz0w4UDFQAAAAAdAAAAABAE", Grade: 4.9, Compound: "Сливки, сахар...", Exp: "за 2-3 дня", Weight: 2500, Price:2790},
            // {ID_Product: 2, ID_Category: 1, Name: "Красный бархат", Photo: "https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.pinterest.com%2Fpin%2F593912269616201841%2F&psig=AOvVaw00Qgo1_qhv4GBSOjqWKsR4&ust=1713260086861000&source=images&cd=vfe&opi=89978449&ved=0CBIQjRxqFwoTCODt0ar1w4UDFQAAAAAdAAAAABAE", Grade: 5.0, Compound: "Сливки, сахар...", Exp: "за 1-2 дня", Weight: 2400, Price:2300},
            // {ID_Product: 3, ID_Category: 2, Name: "Павлова", Photo: "https://www.google.com/url?sa=i&url=https%3A%2F%2Fshedevrum.ai%2Fpost%2F7ab72189b22a11eea87e2e52115ec7ec%2F&psig=AOvVaw0r4uPP0eSepnSuMZSqtMY6&ust=1713260132342000&source=images&cd=vfe&opi=89978449&ved=0CBIQjRxqFwoTCPjp6r31w4UDFQAAAAAdAAAAABAP", Grade: 5.0, Compound: "Сливки, сахар...", Exp: "День в день", Weight: 200, Price: 500},
            // {ID_Product: 4, ID_Category: 2, Name: "Павлова1", Photo: "https://www.google.com/url?sa=i&url=https%3A%2F%2Fshedevrum.ai%2Fpost%2F7ab72189b22a11eea87e2e52115ec7ec%2F&psig=AOvVaw0r4uPP0eSepnSuMZSqtMY6&ust=1713260132342000&source=images&cd=vfe&opi=89978449&ved=0CBIQjRxqFwoTCPjp6r31w4UDFQAAAAAdAAAAABAP", Grade: 5.0, Compound: "Сливки, сахар...", Exp: "День в день", Weight: 200, Price: 500},
            // {ID_Product: 5, ID_Category: 3, Name: "Панакота", Photo: "https://www.chefmarket.ru/blog/wp-content/uploads/2019/07/panna-cotta-with-agar-300x200.jpg", Grade: 5.0, Compound: "Сливки, сахар...", Exp: "День в день", Weight: 150, Price: 390},
            // {ID_Product: 6, ID_Category: 4, Name: "Меренговый рулет с фисташкой", Photo: "https://e3.edimdoma.ru/data/recipes/0014/6618/146618-ed4_wide.jpg?1631015917", Grade: 5.0, Compound: "Сливки, сахар...", Exp: "День в день", Weight: 1000, Price: 1500}
        ]
        this._baskets =[]
        this._selectedCategory = {}
        makeAutoObservable(this)
    }

    setCategories(categories){
        this._categories = categories
    }

    setProducts(products){
        this._products = products
    }

    setSelectedCategory(category){
        this._selectedCategory = category
    }

    setBaskets(baskets){
        this._baskets = baskets
    }

    get categories(){
        return this._categories
    }

    get products(){
        return this._products
    }

    get SelectedCategory(){
        return this._selectedCategory
    }

    get baskets(){
        return this._baskets
    }
}
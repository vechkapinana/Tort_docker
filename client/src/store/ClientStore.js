//MobX использует наблюдаемые данные, которые помогают автоматически 
//отслеживать изменения, облегчая жизнь разработчикам.
import {makeAutoObservable} from 'mobx';

export default class ClientStore {
    constructor() {
        this._isAuth = false
        this._client = {}
        this._role = "";
        makeAutoObservable(this)
    }

    setIsAuth(bool){
        this._isAuth = bool
    }

    setClient(client){
        this._client = client
    }

    get isAuth(){
        return this._isAuth
    }

    get client(){
        return this._client
    }
    
    setRole(Role) {
        this._role = Role;
    }

    get Role() {
        return this._role;
    }
}
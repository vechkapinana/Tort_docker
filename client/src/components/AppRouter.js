///очень сомневаюсь насчет этого файлика. 
///мне кажется можно просто перенести в контент и там прописать это всею
///если делать как он то доступ не получится к файлам. 
///Надо думать как сделать по другому для тех кто авторизован и нет
import React, { useContext } from 'react'
import {Routes, Route} from 'react-router-dom';
import {authRoutes, publicRoutes} from '../routes';
import {Context} from '../index';
import {observer} from "mobx-react-lite";
// import {check} from "../http/userAPI";
// import { useEffect, useState } from 'react'
// import {Spinner} from "react-bootstrap";
// import ProductPage from '../pages/ProductPage';
// import Basket from '../pages/Basket';

const AppRouter = observer(() => {
    //const isAuth = false
    const {client} = useContext(Context)
    // const [loading, setLoading] = useState(true)

    // useEffect(() => {
    //     check().then(data => {
    //       client.setClient(data)
    //       client.setIsAuth(true)
    //       console.log(data)
    //     }).finally(() => setLoading(false))
    // }, [client])

    // if (loading) {
    //     return <Spinner animation={"grow"}/>
    // }
  
    return (
    <Routes>
        {/* <Route path={ADMIN_ROUTE} element={<Admin />} exac/>  */}
        {/* <Route path={SHOP_ROUTE} element={<Shop />} exac/>  */}
        {client.isAuth && authRoutes.map(({path, Component}) =>
            <Route key={path} path={path} element={<Component />} exact/>
        )}
        {publicRoutes.map(({path, Component}) =>
            <Route key={path} path={path} element={<Component />} exact/>
        )}
        {/* <Route path={SHOP_ROUTE}/> */}
    </Routes>
    );
});

export default AppRouter;

/** {isAuth && authRoutes.map(({path, Component}) =>
            <Route path={ADMIN_ROUTE} element={<Admin />} exac/>
        )}
        {publicRoutes.map(({path, Component}) =>
            <Route key={path} path={path} component={Component} exac/>
        )} */
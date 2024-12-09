import { Route, Routes } from "react-router-dom";
import { ADMIN_ROUTE, SHOP_ROUTE } from "../utils/consts";
//import Shop from "../pages/Shop";
import Catalog from "../pages/Catalog";
import Admin from "../pages/Admin";


function Content(){
    return(
        <>
        <div className='content-wrapper'>
            <div className='content'>
                <Routes>
                    <Route path={SHOP_ROUTE} element={<Catalog />} />
                    <Route path={ADMIN_ROUTE} element={< Admin/>}/>
                </Routes>
            </div>
        </div>
        </>
    )
}

export default Content
import Admin from './pages/Admin';
import Basket from './pages/Basket';
import Order from './pages/Order';
import LK from './pages/LK';
import Shop from './pages/Shop';
import Auth from './pages/Auth';
import ProductPage from './pages/ProductPage'
import Dost from './pages/Dost';
// import ReportGenerator from './components/ReportGenerator';
import { ADMIN_ROUTE, LOGIN_ROUTE, PRODUCT_ROUTE, BASKET_ROUTE, REGISTRATION_ROUTE, SHOP_ROUTE, GLAV_ROUTE, ORDER_ROUTE, LK_ROUTE, PDF_ROUTE, DOST_ROUTE, CONT_ROUTE} from './utils/consts';
import Catalog from './pages/Catalog';
import Document from './components/ReportGenerator';
import Cont from './pages/Cont';
//BASKET_ROUTE, LK_ROUTE, ORDER_ROUTE
export const authRoutes = [
    {
        path: ADMIN_ROUTE,
        Component: Admin
    },
    {
        path: PDF_ROUTE,
        Component: Document
    },
    {
        path: BASKET_ROUTE,
        Component: Basket
    },
    {
        path: ORDER_ROUTE,
        Component: Order
    },
    {
        path: LK_ROUTE,
        Component: LK
    }
]

export const publicRoutes = [
    {
        path: GLAV_ROUTE,
        Component: Shop
    },
    {
        path: SHOP_ROUTE,
        Component: Catalog
    },
    {
        path: LOGIN_ROUTE,
        Component: Auth
    },
    {
        path: REGISTRATION_ROUTE,
        Component: Auth
    },
    {
        path: DOST_ROUTE,
        Component: Dost
    },
    {
        path: CONT_ROUTE,
        Component: Cont
    },
    {
        path: PRODUCT_ROUTE + '/:id',
        Component: ProductPage
    }
]
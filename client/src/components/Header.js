//import { Link } from "react-router-dom";
import logo from '../Photo/logo.png'
import user from '../Photo/user.png'
import basket from '../Photo/shopping-basket.png'
import { BASKET_ROUTE, CONT_ROUTE, DOST_ROUTE, GLAV_ROUTE, LK_ROUTE, PDF_ROUTE, SHOP_ROUTE } from "../utils/consts";
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import {Button} from 'react-bootstrap';
import { useContext} from 'react';
import { Context } from '..';
import {observer} from 'mobx-react-lite'
import {useNavigate} from 'react-router-dom';
import { ADMIN_ROUTE } from '../utils/consts';
import { LOGIN_ROUTE } from '../utils/consts';

// import { ApiService } from '../services/api.service';

// const apiService = new ApiService();

// типа авторизация, я не уверена, что именно этот путь. мб другой но пока так

const Header = observer(()=>{//чтобы мобикс в режиме реального времени мог отслеживать изменение значений
    const {client} = useContext(Context)
    const navigate = useNavigate()

    const logOut = () => {
        localStorage.removeItem('token');
        client.setClient({});
        client.setIsAuth(false);
        console.log(client.client.ID_Client);
        // window.location.reload();
        navigate(GLAV_ROUTE)
    }
    
    // useEffect(() => {
    //     apiService.get('/client').then(data => client.setClient(data))
    // }, [client])

    // console.log(client);

    return(
        <>
        <div className='header1'>
            <a href = {GLAV_ROUTE}>
            <img className='logo' src={logo} alt="logo"/>
            <p className='sweet'>Sweet</p>
            </a>
            <a href = {BASKET_ROUTE}>
            <img className='basket' src={basket} alt="logo"/>
            </a>
            <a href = {LK_ROUTE}>
            <img className='user' src={user} alt="logo"/>
            </a>
        </div>
        <div className='header'>
                <div className='category'>    
                <span className='all_category'>ВСЕ КАТЕГОРИИ</span>
                </div>
                <Navbar expand="sm">
                <Container>
                <Nav className="ms-auto" style={{paddingLeft:200}}>
                    <Nav.Link className="nav-link" href={GLAV_ROUTE}>Главная</Nav.Link>
                    <Nav.Link className="nav-link" href={SHOP_ROUTE}>Каталог</Nav.Link>
                    <Nav.Link className="nav-link" href={DOST_ROUTE}>Доставка</Nav.Link>
                    <Nav.Link className="nav-link" href={CONT_ROUTE}>Контакты</Nav.Link>
                </Nav>
                
                {client.isAuth ?
                <Nav className="ms-auto">
                    {client.client.Role === "ADMIN" ?
                    <div>
                    <Button className='head' style={{marginRight:20}} variant="outline-dark" onClick={()=> navigate(PDF_ROUTE)}>Отчет</Button>
                    <Button className='head' variant="outline-dark" onClick={()=> navigate(ADMIN_ROUTE)}>Админ панель</Button>
                    </div>
                     :<></>}  
                    <Button className='head' style={{marginLeft:30}} variant="outline-dark" onClick={() => logOut()}>Выйти</Button>
                </Nav>
                :
                <Nav className="ms-auto">
                    {/* при клике на кнопу повесили слушатель события  */}
                    <Button className='head' variant="outline-dark" onClick = {() => navigate(LOGIN_ROUTE)}>Войти</Button> 
                </Nav>
                }
                </Container>
                </Navbar>
		</div>
        </>
    )
});

export default Header



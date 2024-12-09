import React, { useState, useEffect, useContext } from 'react';
import { ApiService } from '../services/api.service';
import { Context } from '..';
import Image from 'react-bootstrap/Image';
import { Button } from 'react-bootstrap';
import {useNavigate} from 'react-router-dom';
import { ORDER_ROUTE } from '../utils/consts';
const apiService = new ApiService();

function Basket () {
  const [basket, setBasket] = useState([])
  const {client} = useContext(Context)
  const navigate = useNavigate()
  // const [product, setProduct] = useState('')
    useEffect(() => {
      apiService.get('/basket/'+ client.client.ID_Client).then(data => setBasket(data[0]))
    }, [client.client.ID_Client]);

    console.log(basket)
    // console.log(basket[0])
    // console.log(basket[0].ID_Product)
    // console.log(basket[0][1])

    function removeFromCart(ID_Product){
      apiService.delete('/basket/'+ client.client.ID_Client + '/' + ID_Product).then(() => {
        window.location.reload(); // Обновляем страницу после успешного удаления
      })
      .catch(error => {
        console.error('Error deleting item from cart:', error);
      });
  }

  // var now = new Date();

  function CreateOrder(){
    apiService.post('/order', {ID_Client:client.client.ID_Client, ID_Status:1, Cost:totalCartAmount}).then(() => {})
    apiService.post('/orderpr', {ID_Client:client.client.ID_Client}).then(() => {})
    navigate(ORDER_ROUTE)
  }

  function increase(ID_Product, Kvo){
    apiService.post('/basket/' + client.client.ID_Client + '/' + ID_Product, {ID_Product:ID_Product, ID_Client:client.client.ID_Client, Kvo:Kvo}).then(() => {})
    window.location.reload();
  }

  function decrease(ID_Product, Kvo){
    const newKvo = Kvo - 2;
    apiService.post('/basket/' + client.client.ID_Client + '/' + ID_Product, {ID_Product:ID_Product, ID_Client:client.client.ID_Client, Kvo:newKvo}).then(() => {})
    window.location.reload();
  }


  // function removeCart(){
  //   //прописать удаление всего и добавление в заказ
  //   apiService.delete('/basket/'+ client.client.ID_Client).then(() => {
  //     window.location.reload(); // Обновляем страницу после успешного удаления
  //   })
  //   .catch(error => {
  //     console.error('Error deleting item from cart:', error);
  //   });
  // }

    const totalCartAmount = basket.reduce((total, basket) => (total = total + basket.Price * basket.Kvo), 0)
    .toFixed(2);

    
	return (
		<>
		<div>
        <ul style={{marginTop:-40}}>
        <h3>Сумма: {totalCartAmount}</h3>
        {basket.map(item => (
          <li key={item.ID_Product}>
            {/* {item.Name} */}
            <div className="basketItem" key={item.ID_Product}>
          {/* <img src={item.image} alt={book.name} /> */}
          <Image style={{marginRight:20}} width={200} height={200} src={process.env.REACT_APP_API_URL + item.Photo}/>
          <div>
            <h4>{item.Name}</h4>
            <p>Цена: {item.Price}</p>
            <p>Итог: {(item.Price * item.Kvo).toFixed(2)}</p>
            <p>Количество: {item.Kvo}</p>
            <Button variant='dark' onClick={() => decrease(item.ID_Product, item.Kvo)}>-</Button>
            <Button variant='dark' onClick={() => removeFromCart(item.ID_Product)}>
              Удалить
            </Button>
            <Button variant='dark' onClick={() => increase(item.ID_Product, item.Kvo)}>+</Button>
          </div>
          </div>
          </li>
        ))}
        
        </ul>
        <div style={{justifyContent:'center', alignItems:'center', textAlign:'center' }}>
        <Button variant='dark' onClick = {() => CreateOrder()}>
              Оформить заказ
        </Button>
        </div>
        </div>
		</>
	)
}

export default Basket

//onClick={() => removeCart()}


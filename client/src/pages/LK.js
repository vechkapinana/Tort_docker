import React, { useState } from 'react';
import Container from 'react-bootstrap/Container';
import { useContext, useEffect} from 'react';
import { Context } from '..';

import { ApiService } from '../services/api.service';

const apiService = new ApiService();

function LK () {
    const {client} = useContext(Context)
    const [info, setInfo]=useState({})
    const [orders, setOrders] = useState([])
    const [orderpr, setOrderpr] = useState([])
    const [sts, setSts] = useState([])
    // console.log(client.client.Name)
    
    useEffect(() => {
        apiService.get('/client/'+ client.client.ID_Client).then(data => setInfo(data))
        apiService.get('/status/'+ client.client.ID_Client).then(data => setOrders(data[0]))
        apiService.get('/street/'+ client.client.ID_Client).then(data => setSts(data[0]))
    }, [client.client.ID_Client])

    console.log(client);

    // function Zac(ID_Order){
    //     apiService.get('/orderpr/'+ ID_Order).then(data => setOrderpr(data[0]))
    // }

    useEffect(() => {
        sts.forEach(order => {
          apiService.get('/orderpr/' + order.ID_Order).then(data => {
            setOrderpr(prevState => ({
              ...prevState,
              [order.ID_Order]: data[0]
            }));
          });
        });
    }, [sts]);

    useEffect(() => {
        orders.forEach(order => {
          apiService.get('/orderpr/' + order.ID_Order).then(data => {
            setOrderpr(prevState => ({
              ...prevState,
              [order.ID_Order]: data[0]
            }));
          });
        });
    }, [orders]);
    

    return(
        <>
            <Container style={{marginTop:-50}}>
                <h2>Личные данные</h2>
            <p> Фамилия: {info.Surname}</p>
            <p> Имя: {info.Name}</p>
            <p> Отчество: {info.Patronymic}</p>
            <p> Телефон: {info.Phone_number}</p>
                <h2>Активные заказы</h2>

            {orders.map(order => (
        //   <li key={order.ID_Order}>
            <div className="basketItem" key={order.ID_Order}>
            <div>
            <h4>Заказ №: {order.ID_Order} </h4>
            <span><b>Статус заказа:</b> {order.NameSt} </span>
            <span><b>Дата доставки:</b> {order.DataD} </span>
            <span><b>Сумма:</b> {order.Cost} </span>
            <span><b>Комментарий к заказу:</b> {order.Coment} </span>
            <span>      </span>
            </div>
            <div style={{marginLeft:10}}>
            <h4>Товары в заказе:</h4>
            {orderpr[order.ID_Order] ? (
              orderpr[order.ID_Order].map(detail => (
                // <li key={detail.ID_Product}>
                <div key={detail.ID_Product}>
                  {/* <span>Товар: {detail.ID_Product}</span> */}
                  <span><b>Название:</b> {detail.Name} </span>
                  <span><b>Количество:</b> {detail.Kvo} </span>
                  {/* Добавьте здесь отображение других данных о продукте */}
                </div>
                // </li>
              ))
            ) : (
              <span>Загрузка деталей...</span>
            )}
            </div>
          </div>
        //   </li>
          
        ))}
        <h2>Полученные заказы</h2>


        {sts.map(st => (
        //   <li key={order.ID_Order}>
        <div className="basketItem" key={st.ID_Order}>
        <div>
        <h4>Заказ №: {st.ID_Order} </h4>
        <span><b>Статус заказа:</b> {st.NameSt} </span>
        <span><b>Дата доставки:</b> {st.DataD} </span>
        <span><b>Сумма:</b> {st.Cost} </span>
        <span><b>Комментарий к заказу:</b> {st.Coment} </span>
        </div>
        <div style={{marginLeft:10}}>
        <h4>Товары в заказе:</h4>
        {orderpr[st.ID_Order] ? (
          orderpr[st.ID_Order].map(detail => (
            // <li key={detail.ID_Product}>
            <div key={detail.ID_Product}>
              {/* <span>Товар: {detail.ID_Product}</span> */}
              <span><b>Название:</b> {detail.Name} </span>
              <span><b>Количество:</b> {detail.Kvo} </span>
              {/* Добавьте здесь отображение других данных о продукте */}
            </div>
                // </li>
              ))
            ) : (
              <span>Загрузка деталей...</span>
            )}
            </div>
          </div>
        //   </li>
          
        ))}
        

        {/* {orderpr.map(item => (
            <div key={item.ID_Order}>
            <h4>Товар: {item.ID_Product} </h4>
            
          </div>
          
        ))} */}
            
            </Container>
        </>
    )
};

export default LK




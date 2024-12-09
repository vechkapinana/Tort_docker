//возможно надо заключить в AppRouter
import React from 'react';
import './App.css';
import { BrowserRouter } from 'react-router-dom';
import AppRouter from './components/AppRouter';
import Header from './components/Header';
import Footer from './components/Footer';
//  import Content from './components/Content';
 import { observer } from 'mobx-react-lite';
 import {Context} from "./index";
import {check} from "./http/userAPI";
import {Spinner} from "react-bootstrap";
import { useState, useContext, useEffect } from 'react'


const App = observer(() => {
  const {client} = useContext(Context)
  const [loading, setLoading] = useState(true)
  

    // useEffect(() => {
    //     check().then(data => {
    //       client.setClient(data)
    //       client.setIsAuth(true)
    //       console.log(data)
    //     }).finally(() => setLoading(false))
    // }, [client])

    useEffect(() => {
      check().then(data => {
          if (data) {
              client.setClient(data);
              client.setIsAuth(true);
          } else {
              client.setClient({});
              client.setIsAuth(false);
          }
      }).finally(() => setLoading(false));
  }, [client]);

    if (loading) {
        return <Spinner animation={"grow"}/>
    }
  return (
    <BrowserRouter>
    <Header />
    <Footer />
    <AppRouter />
    <div className="App">
    {/* <Content /> */}
    </div>
    
    </BrowserRouter>
  );
});

export default App;

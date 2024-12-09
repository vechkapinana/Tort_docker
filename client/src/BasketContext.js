
// import React, { createContext, useState, useCallback, useEffect } from 'react';
// // import Basket from './pages/Basket';
// export const BasketContext = createContext();

// export const BasketProvider = ({children}) => {
//   const [basket, setBasket] = useState([]);

//   const addToBasket = useCallback((product) => {
//     setBasket(() => [...basket, product]);
//     //console.log(basket)
// }, [basket]);
// //   makeAutoObservable(basket)

// useEffect(() => {
//     // Этот эффект будет запускаться после каждого обновления состояния
//     console.log(basket);
// }, [basket]);

// console.log(basket)

//   return (
//     <BasketContext.Provider value={{ basket, addToBasket }}>
//       {children}
//     </BasketContext.Provider>
//   );
// };

import { useState, createContext } from "react";
export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartData, setCartData] = useState([]);
  const [applyCoupon, setApplyCoupon] = useState(false);

  const addToCartHandler = (menuItem) => {
    cartData.find(({ id }) => menuItem.id === id)
      ? setCartData(() => [...cartData])
      : setCartData(() => [...cartData, menuItem]);
  };

  const totalDeliveryTime = cartData.reduce(
    (acc, { delivery_time }) => acc + delivery_time,
    0
  );
  const containsItem = (itemId) => {
    return cartData.find(({ id }) => id === itemId);
  };

  let totalPrice = cartData.reduce((acc, { price }) => acc + price, 0);

  if (applyCoupon) {
    totalPrice = totalPrice - 5;
  }
  return (
    <CartContext.Provider
      value={{
        cartData,
        addToCartHandler,
        totalDeliveryTime,
        totalPrice,
        setApplyCoupon,
        applyCoupon,
        containsItem
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

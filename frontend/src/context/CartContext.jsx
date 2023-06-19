import React, { createContext, useState } from 'react';

export const CartItemsContext = createContext([]);

export const CartItemsProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);

  const handleStorageChange = () => {
    const updatedCartItems =
      JSON.parse(localStorage.getItem('cartItems')) || [];
    setCartItems(updatedCartItems);
  };

  window.addEventListener('storage', handleStorageChange);

  const updateCartItems = (newCartItems) => {
    setCartItems(newCartItems);
    localStorage.setItem('cartItems', JSON.stringify(newCartItems));
  };

  const updateCartItemQuantity = (productId, newQuantity) => {
    const updatedCartItems = cartItems.map((item) => {
      if (item.id === productId) {
        return {
          ...item,
          productQuantity: newQuantity
        };
      }
      return item;
    });
    updateCartItems(updatedCartItems);
  };

  const removeCartItem = (productId) => {
    const updatedCartItems = cartItems.filter((item) => item.id !== productId);
    updateCartItems(updatedCartItems);
  };

  return (
    <CartItemsContext.Provider
      value={{
        cartItems,
        updateCartItems,
        updateCartItemQuantity,
        removeCartItem
      }}
    >
      {children}
    </CartItemsContext.Provider>
  );
};

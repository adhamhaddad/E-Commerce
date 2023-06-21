import React, { createContext, useState, useEffect } from 'react';

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

  const deleteCartItems = () => {
    localStorage.removeItem('cartItems');
    setCartItems([]);
  };

  useEffect(() => {
    const savedCartItems = localStorage.getItem('cartItems');
    if (savedCartItems) {
      setCartItems(JSON.parse(savedCartItems));
    }
  }, []);
  useEffect(() => {
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
  }, [cartItems]);
  return (
    <CartItemsContext.Provider
      value={{
        cartItems,
        updateCartItems,
        updateCartItemQuantity,
        removeCartItem,
        deleteCartItems
      }}
    >
      {children}
    </CartItemsContext.Provider>
  );
};

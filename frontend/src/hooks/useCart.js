import { useContext } from 'react';
import { CartItemsContext } from '@context/CartContext';

export const useCart = () => useContext(CartItemsContext);

import React, { useContext } from 'react';
import { ShopContext } from '../context/ShopContext';
import { Link } from 'react-router-dom';
const CartPage = () => {
    const { cart, updateCartItemQuantity, removeCartItem, currency } = useContext(ShopContext);
    const handleQuantityChange = (id, quantity) => {
        updateCartItemQuantity(id, quantity);
      };
    
      const handleRemoveItem = (id) => {
        removeCartItem(id);
      };
      const calculateTotal = () => {
        return cart.reduce((total, item) => total + item.price * item.quantity, 0).toFixed(2);
      };
      return (
        <div className="container mx-auto mt-10">
          <h2 className="text-2xl font-semibold mb-5">Shopping Cart</h2>
          {cart.length > 0 ? (
        <div>
          <div className="grid grid-cols-3 gap-4"></div>
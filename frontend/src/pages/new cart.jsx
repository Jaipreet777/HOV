import React, { useContext } from 'react';
import { ShopContext } from '../context/ShopContext';
import { Link } from 'react-router-dom';
const CartPage = () => {
    const { cart, updateCartItemQuantity, removeCartItem, currency } = useContext(ShopContext);
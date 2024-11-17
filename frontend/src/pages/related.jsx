import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../context/ShopContext'
import Title from './Title';
import ProductItem from './ProductItem';

const RelatedProducts = ({category,subCategory}) => {

    const { products } = useContext(ShopContext);
    const [related,setRelated] = useState([]); 
        useEffect(()=>}
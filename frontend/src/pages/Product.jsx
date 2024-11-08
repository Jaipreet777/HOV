import React,{useContext, useEffect, useState} from 'react'
import {useParams} from 'react-router-dom'
import { ShopContext } from '../context/ShopContext';
import { assets } from '../assets/assets';

const product = () => {

  const { productId } = useParams();
  const { products, currency, addToCart } = useContext(ShopContext);
  const [productData, setProductData] = useState(false);
  const [size, setSize] = useState("")
  const [image, setImage] = useState("")

  const fetchProductData= async () => {
    products.map((item) => {
      if (item._id === productId) {
        setProductData(item);
        setImage(item.image[0])
        return null;
      }
    })
  }
  return (
    <div>
      
    </div>
  )
}

export default product

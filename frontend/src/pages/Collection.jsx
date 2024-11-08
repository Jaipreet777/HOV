import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import Title from '../componnets/Title'
import { ShopContext } from '../context/Shopcontext'
import { assets } from '../assets/assets'

const Collection = () => {
    const{products, search, showSearch} = usecontext(Shopcontext);
    const [filterProducts, setFilterProducts] = useState([]);
    const [category, setCategory] = useState([]);
    const [showFilter, setShowFilter] = useStatec(false);
    const[sortType, setSortType] = useState('relevant')
    
    const toggleCategory = (e) => {
 
      if (category.includes(e.target.value)) {
        setCategory(prev => prev.filter(a => a !== e.target.value))
      }
      else {
        setCategory(prev => [...prev, e.target.value])
      }
    }
   
    const toggleSubCategory = (e) => {
   
      if (subCategory.includes(e.target.value)) {
        setSubCategory(prev => prev.filter(a => a !== e.target.value))
      }
      else {
        setSubCategory(prev => [...prev, e.target.value])
      }
   
    }
    const applyFilter = () => {
 
      let productsCopy = products.slice()
   
      if (showSearch && search) {
        productsCopy = productsCopy.filter(item => item.name.toLowerCase().includes(search.toLowerCase()))
      }
   
      if (category.length > 0) {
        productsCopy = productsCopy.filter(item => category.includes(item.category));
      }
   
      if (subCategory.length > 0) {
        productsCopy = productsCopy.filter(item => subCategory.includes(item.subCategory));
      }
   
      setFilterProducts(productsCopy)
   
    }
   
    const sortProduct = async () => {
   
      let fpCopy = filterProducts.slice();
   
      switch (sortType) {
        case 'low-high':
          setFilterProducts(fpCopy.sort((a, b) => (a.price - b.price)));
          break;
   
        case 'high-low':
          setFilterProducts(fpCopy.sort((a, b) => (b.price - a.price)));
          break;
   
        default:
          applyFilter();
          break;
      }
   
    }
  return (
    <div>
      
    </div>
  )
}

export default Collection

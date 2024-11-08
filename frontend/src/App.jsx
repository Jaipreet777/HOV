import React from 'react'
import {Routes,Route} from 'react-router-dom'
import Home from './pages/Home'
import Collection from './pages/Collection'
import Product from '../pages/Product'

const App = () => {
  return (
    <div className='px-4 sm:px-[5vm] md:px-[7vm] 1g:px-[9vm]'>
      <Routes>
      <Route path='/' element={<Home />} />
        <Route path='/collection' element={<Collection />} />
        <Route path='/product/:productId' element={<Product />} />
        <Route path='/login' element={<Login />} />
      </Routes>
    </div>
  )
}

export default App

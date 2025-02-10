import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from '../Home/Home'
import Shop from '../Shop/Shop'
import ProductDetails from '../Product-Details/ProductDetails'
import Cart from '../Cart/Cart'
import Checkout from '../Checkout/Checkout'
import Aboutus from '../Aboutus/Aboutus'
import Contactus from '../Contactus/Contactus'

const Routing = () => {
    return (
        <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/products' element={<Shop />} />
        <Route path='/product/1' element={<ProductDetails />} />
        <Route path='/cart' element={<Cart />} />
        <Route path='/checkout' element={<Checkout />} />
        <Route path='/aboutus' element={<Aboutus />} />
        <Route path='/contactus' element={<Contactus />} />
        <Route path='/login' element={<Contactus />} />
        <Route path='/signup' element={<Contactus />} />
        <Route path='/myorder' element={<Contactus />} />
        <Route path='/profile' element={<Contactus />} />
        <Route path='/wishlist' element={<Contactus />} />
        <Route path='/address' element={<Contactus />} />
    </Routes>
      )
}

export default Routing
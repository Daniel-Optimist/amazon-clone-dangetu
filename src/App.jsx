import { useState } from 'react'
import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
// import './App.css'
import Header from './components/Header/Header'
import { Carousel } from 'react-responsive-carousel'
// import Testz1 from './Test/Testz1'
// import Testz2 from './Test/Testz2'
import CarouselEffect from './components/Carousel/CarouselEffect'
import Category from './components/Category/Category'
import Product from './components/Product/Product'
import { Router } from 'react-router-dom'
import Routing from './Routing'


function App() {


  return (
    <>
      {/* <h1>amazone clone</h1>
      <Testz1/>

      <Testz2/> */}
      <Routing/>
      
    </>
  )
}


export default App

import React, {useState,useEffect} from 'react'
import classes from './productDetail.module.css'
import Layout from '../../components/Layout/Layout';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import ProductCard from '../../components/Product/ProductCard';
import {producturl} from '../../API/endpoints'
import Loader from '../../components/Loader/Loader';



function ProductDetail() {
  const {productId} = useParams()
  const [product, setProduct] = useState({})
  const [isLoading, setIsLoading] =useState(false)
  // console.log (productId)
  useEffect(()=>{
setIsLoading (true)  // set it true when the page is initially loading ( will be shown until the data is loaded)
axios.get (`${producturl}/products/${productId}`)
.then ((res)=>{
  // console.log(res)  // to see the response we get 
setProduct(res.data)
setIsLoading (false) // set it false once we got the data 
})
.catch ((err)=>{
  console.log(err)
  setIsLoading(false)  // set it also when there is error
})
  },[])
  console.log(product)
  return (
    <Layout>
      {/* bind using ternary operator :if isLoading true then <Loader> else product  */}
      {isLoading ? (
        <Loader />
      ) : (
        <ProductCard
          product={product}
          flex={true} //set it true coz we want our prodDetail page to flex ; go to product card and add flex as props as we did for product ; so that we can receive product and flex here from product card.
          renderDesc={true} //set it to true for product detail; and add it as props in product card; and also create a class for it under title :  {renderDesc && <div style={{maxWidth:"750px"}}>{description} </div> }  and also set the style to have maxwidth of 750px for lengthy descriptions 
          renderAdd={true}  //this is set to true in results and product too.
        />
      )}
    </Layout>
  );
}

export default ProductDetail

// also create css.module class name as follows in ProductCard.jsx if flex is true then product_flexed classes w/c puts the product detail next to image 
// $ {flex ?classes.product_flexed: ''}

/* styles for product detail flexing are added in product.module.css*/
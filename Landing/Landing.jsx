import React from 'react'
import Layout from '../../Components/LayOut/Layout'
import Carousel from '../../Components/Carousel/Carousel'
import Category from '../../Components/Category/Categories'  
import  Product from '../../Components/Product/Product'
function Landing() {
  return (
    <Layout>
      <Carousel/>
      <Category/>
      <Product/>
    </Layout>
  )
}

export default Landing
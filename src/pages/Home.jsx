import React from 'react'
import Hero from '../components/Hero'
import Slider from '../components/Slider'
import ShopviaCategory from '../components/ShopviaCategory'
import FeaturedProduct from '../components/FeaturedProduct'
import Features from '../components/Features'

function Home() {
  return (
    <div>
      <Hero />
      <Slider />
      <ShopviaCategory />
      <FeaturedProduct />
      <Features />
    </div>
  )
}

export default Home
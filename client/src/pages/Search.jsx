import React, { useEffect, useState } from 'react'
import Products from '../data/Products'
import SearchProduct from '../utils/SearchProduct'
import { useParams } from 'react-router-dom'


function Search() {
    const {searchQuery} = useParams();
    const [searchProducts,setSearchProducts] = useState("loading");
    useEffect(()=>{
        if(!searchQuery) return
        setSearchProducts(SearchProduct(Products,searchQuery));
    },[searchQuery])
    console.log(searchProducts)
  return (
    <div className='mt-20'>
      {
        searchProducts.length===0 && <p>not found</p>
      }
    </div>
  )
}

export default Search
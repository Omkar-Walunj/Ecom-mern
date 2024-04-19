import React, { useEffect, useState } from 'react'
import './ListProduct.css'
import cross_icon from '../../assets/cross_icon.png'

const ListProduct = () => {

    const [allproducts,setALlproducts]= useState([]);

    const fetchInfro = async()=>{
        await fetch('http://localhost:4000/allproducts')
        .then((res)=>res.json())
        .then((data)=>{setALlproducts(data)})
    }

    useEffect(()=>{
        fetchInfro();
    },[])

    const removeprod = async (id)=>{
        await fetch('http://localhost:4000/removeproduct',{
            method:'POST',
            headers:{
                Accept:'application/json',
                'Content-Type':'application/json'
            },
            body:JSON.stringify({id:id})
        })
        await fetchInfro();
    }

  return (
    <div className='list-product'>
        <h1>ALL Products List</h1>
        <div className="listproduct-format-main">
            <p>Products</p>
            <p>Title</p>
            <p>Old Price</p>
            <p>New Price</p>
            <p>Category</p>
            <p>Remove</p>
        </div>
        <div className="listproduct-allproduct">
            <hr />
            {allproducts.map((product,index)=>{
                return <> <div key={index} className="listproduct-format-main listproduct-format">
                    <img src={product.image} alt="" className="listproduct-product-icon" />
                    <p>{product.name}</p>            
                    <p>${product.old_price}</p>            
                    <p>${product.new_price}</p>            
                    <p>{product.category}</p>            
                    <img onClick={()=>{removeprod(product.id)}} className='listproduct-remove-icon' src={cross_icon} alt="" />
                </div>
                <hr />
                </>
            })}
        </div>
      
    </div>
  )
}

export default ListProduct

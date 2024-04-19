import React, { useState } from 'react'
import './AddProduct.css'
import upload_area from '../../assets/upload_area.svg'


const AddProduct = () => {
    const [image,setImage] = useState(false)

    const [productdetails, setProductDetails] = useState({
        name:"",
        image:"",
        category:"women",
        new_price:"",
        old_price:""
    })

    const imagehandler=(e)=>{
        setImage(e.target.files[0])
    }

    const changehandler= (e)=>{
        setProductDetails({...productdetails,[e.target.name]:e.target.value})
    }


    // Understand this 6:47:00
    const Addprod= async ()=>{
        console.log(productdetails)
        let responseData;
        let product = productdetails;

        let formData = new FormData();
        formData.append('product',image)

        await fetch('http://localhost:4000/upload',{
            method:'POST',
            headers:{
                Accept:'application/json',
            },
            body: formData,
        }).then((resp)=> resp.json()).then((data)=>{responseData=data});

        if(responseData.success){
            product.image = responseData.image_url;
            console.log(product)

            await fetch('http://localhost:4000/addproduct',{
                method:'POST',
                headers:{
                    Accept:'application/json',
                    'Content-Type':'application/json'
                },
                body: JSON.stringify(product),
            }).then((resp)=>resp.json()).then((data)=>{
                data.success?alert("Product Added"):alert("Failed")
            })
        }
    
    
    }

  return (
    <div className='add-product'>
      <div className="addproduct-itemfield">
        <p>Product Title</p>
        <input value={productdetails.name} onChange={changehandler} type="text" name='name' placeholder='Type Here'/>
      </div>
      <div className="addproduct-price">
        <div className="addproduct-itemfield">
            <p>Price</p>
            <input value={productdetails.old_price} onChange={changehandler} type="text" name='old_price' placeholder='Type Here' />
        </div>
        <div className="addproduct-itemfield">
            <p>Offer Price</p>
            <input value={productdetails.new_price} onChange={changehandler} type="text" name='new_price' placeholder='Type Here' />
        </div>
      </div> 
      <div className="addproduct-itemfield">
        <p>Product Category</p>
        <select value={productdetails.category} onChange={changehandler} name="category" className='add-product-selector'>
            <option value="Women">Womens</option>
            <option value="men">Mens</option>
            <option value="kid">Kids</option>
        </select>
      </div>
      <div className="addproduct-itemfield">
        <label htmlFor="file-input">
            <img src={image?URL.createObjectURL(image) :upload_area} className='addproduct-tumbnail-img' alt="" />
        </label>
        <input onChange={imagehandler } type="file" name='image' id='file-input' hidden />    
      </div>
      <button onClick={()=>{Addprod()}} className='addproduct-btn'>ADD</button>
    </div>
  )
}

export default AddProduct

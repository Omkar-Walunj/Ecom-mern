import React, { createContext, useEffect, useState } from "react";

export const ShopContext = createContext(null);

const getDefualtValue= ()=>{
    let cart = {};
    for (let index = 0; index < 300+1; index++) {
        cart[index] = 0
    }

    return cart;
        

}

const ShopContextProvider = (props)=>{
    const [all_product,setAll_product] = useState([]);

    const [cartItems,setCartItems]= useState(getDefualtValue());

    useEffect(()=>{
        fetch('http://localhost:4000/allproducts')
        .then((response)=>response.json())
        .then((data)=>setAll_product(data))

        if(localStorage.getItem('auth-token')){
            fetch('http://localhost:4000/getcart',{
                method:'POST',
                headers:{
                    Accept:'application/form-data',
                    'auth-token':`${localStorage.getItem('auth-token')}`,
                    'Content-Type':'application/json',
                },
                body:"",
            }).then((response)=>response.json())
            .then((data)=>setCartItems(data));
        }
    },[])
    
    const addToCart = (itemId) =>{
        setCartItems((prev)=>({...prev,[itemId]:prev[itemId]+1}))
        if(localStorage.getItem('auth-token')){
            fetch('http://localhost:4000/addtocart',{
                method:'POST',
                headers:{
                    Accept:'application/form-data',
                    'auth-token':`${localStorage.getItem('auth-token')}`,
                    'Content-Type':'application/json',
                },
                body:JSON.stringify({"itemId":itemId}),
            })
            .then((response)=>response.json())
            .then((data)=>console.log(data))
        }
    }

    const RemoveFromCart = (itemId) =>{
        setCartItems((prev)=>({...prev,[itemId]:prev[itemId]-1}))
        if(localStorage.getItem('auth-token')){
            fetch('http://localhost:4000/removefromcart',{
                method:'POST',
                headers:{
                    Accept:'application/form-data',
                    'auth-token':`${localStorage.getItem('auth-token')}`,
                    'Content-Type':'application/json',
                },
                body:JSON.stringify({"itemId":itemId}),
            })
            .then((response)=>response.json())
            .then((data)=>console.log(data))

        }
    }

    const getTotalcartamount= ()=>{
        let totalamount = 0;
        for(const item in cartItems)
        {
            if(cartItems[item]>0)
            {
                let iteminfo = all_product.find((product)=>product.id===Number(item))
                totalamount+= iteminfo.new_price * cartItems[item]
            }
            
        }
        return totalamount;
    }

    const gettotalcartitems = ()=>{
        let totalitem= 0;
        for(const item in cartItems){
            if(cartItems[item]>0)
            {
                totalitem+= cartItems[item]
            }
        }
        return totalitem
    }


    const contextValue = {gettotalcartitems,getTotalcartamount,all_product,cartItems,addToCart,RemoveFromCart};
    
    return(
        <ShopContext.Provider value = {contextValue}>
            {props.children}
        </ShopContext.Provider>
    )
}

export default ShopContextProvider;
// 1:26:45 this code please clarify how does this work
// find out how he made the logic for cart add and remove
// see how each method have logic in it
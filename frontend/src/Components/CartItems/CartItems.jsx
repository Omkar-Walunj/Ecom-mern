import React, { useContext } from 'react'
import './CartItems.css'
import { ShopContext } from '../../Context/ShopContext'
import remove_icon from '../Assets/cart_cross_icon.png'


const CartItems = () => {
    const {getTotalcartamount, all_product,cartItems,RemoveFromCart}= useContext(ShopContext)
  return (
    <div className='cartitems'>
        <div className="cartitem-format-main">
            <p>Products</p>
            <p>Title</p>
            <p>Price</p>
            <p>Quantity</p>
            <p>Total</p>
            <p>Remove</p>
        </div>
        <hr />
        {all_product.map((e)=>{
            if (cartItems[e.id]>0) {
                return <div>
                        <div className="cartitems-format cartitem-format-main">
                            <img className='carticon-product-icon' src={e.image} alt="" />
                            <p>{e.name}</p>
                            <p>${e.new_price}</p>
                            <button className='cartitemsquantity'>{cartItems[e.id]}</button>
                            <p>${e.new_price*cartItems[e.id]}</p>
                            <img className='cartitems-remove-icon' src={remove_icon} onClick={()=>{RemoveFromCart(e.id)}} alt="" />
                        </div>
                        </div>

            }
            return null;
        })}
        <div className="cartitems-down">
            <div className="cartitems-total">
                <h1>Cart Total</h1>
                <div>
                    <div className="cartitems-total-item">
                        <p>Subtotal</p>
                        <p>${getTotalcartamount()}</p>
                    </div>
                    <hr />
                    <div className='cartitems-total-item'>
                        <p>Shipping Fee</p>
                        <p>Free</p>
                    </div>
                    <hr />
                    <div className='cartitems-total-item'>
                        <h3>Total</h3>
                        <h3>${getTotalcartamount()}</h3>
                            
                    </div>
                </div>
                <button>Proceed To Checkout</button>
            </div>
            <div className="cartitems-promocode">
                <p>If you have a promocode</p>
                <div className="cartitems-promobox">
                    <input type="text" placeholder='Promo-Code' />
                    <button>Submit</button>
                
                </div>
            </div>
        </div>
    </div>
  )
}

export default CartItems
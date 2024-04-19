import React, { useContext } from "react";
import "./ProductDisplay.css";
import star_icon from "../Assets/star_icon.png";
import star_dull from "../Assets/star_dull_icon.png";
import { ShopContext } from "../../Context/ShopContext";

const ProductDisplay = (props) => {
  const { product } = props;
  const {addToCart} = useContext(ShopContext)
  return (
    <div className="productdisplay">
      <div className="productdsiplay-left">
        <div className="productdisplay-img-list">
          <img src={product.image} alt="" />
          <img src={product.image} alt="" />
          <img src={product.image} alt="" />
          <img src={product.image} alt="" />
        </div>
        <div className="productdsiplay-img">
          <img className="productdisplay-main-img" src={product.image} alt="" />
        </div>
      </div>
      <div className="productdsiplay-right">
        <h1>{product.name}</h1>
        <div className="productdisplay-right-star">
          <img src={star_icon} alt="" />
          <img src={star_icon} alt="" />
          <img src={star_icon} alt="" />
          <img src={star_icon} alt="" />
          <img src={star_dull} alt="" />
          <p>(122)</p>
        </div>
        <div className="productdisplay-right-prices">
          <div className="productdsiplay-rightold">${product.old_price}</div>
          <div className="productdsiplay-rightnew">${product.new_price}</div>
        </div>
        <div className="productdisplay-rightdesc">
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Qui eveniet
          ducimus recusandae illo laboriosam ipsam sint assumenda veritatis
          voluptates quam impedit nam minima sapiente, officia fuga dolores
          dignissimos fugiat obcaecati accusantium dolore molestiae odio libero.
        </div>
        <div className="productdisplay-right-size">
            <h1>Select Size</h1>
            <div className="productdisplay-right-sizenew">
                <div>S</div>
                <div>M</div>
                <div>L</div>
                <div>XL</div>
                <div>XXL</div>
            </div>
        </div>
        <button onClick={()=>{addToCart(product.id)}}>ADD TO CART</button>
        <p className="productdisplay-right-category"><span>Category :</span> Women, T-Shirt, Crop Top</p>
        <p className="productdisplay-right-category"><span>Tags :</span> Mordern, Latest</p>
      </div>
    </div>
  );
};

export default ProductDisplay;     

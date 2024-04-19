import React from 'react'
import './Sidebar.css'
import {Link} from 'react-router-dom'
import addprod from '../../assets/Product_Cart.svg'
import listprod from '../../assets/Product_list_icon.svg'


const Sidebar = () => {
  return (
    <div className='sidebar'>
        <Link to={'/addproduct'} style={{textDecoration:"none"}}>
            <div className="sidebar-item">
                <img src={addprod} alt="" />
                <p>ADD PRODUCT</p>
            </div>
        </Link>

        <Link to={'/listproduct'} style={{textDecoration:"none"}}>
            <div className="sidebar-item">
                <img src={listprod} alt="" />
                <p>PRODUCT LIST</p>
            </div>
        </Link>

    </div>
            





      
  )
}

export default Sidebar

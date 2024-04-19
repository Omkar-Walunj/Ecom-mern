import React, { useState } from 'react'
import './CSS/Loginsignup.css'

const Loginsignup = () => {
  const [state, setstate]= useState("Login")
  const [formData, setFormdata]= useState({
    username:"",
    password:"",
    email:""
  })


  const changeHandler= (e)=>{
    setFormdata({...formData,[e.target.name]:e.target.value})
  }

  const login = async ()=>{
    console.log("Login", formData)
    let responsedata;
    await fetch('http://localhost:4000/login',{
      method:'POST',
      headers:{
        Accept:'application/form-data',
        'Content-Type':'application/json',
      },
      body: JSON.stringify(formData), 
    }).then((response)=>response.json()).then((data)=>responsedata=data)

    if(responsedata.success){
      localStorage.setItem('auth-token',responsedata.token);
      window.location.replace("/");
    }
    else{
      alert(responsedata.error)
    }
  }

  const Signup = async ()=>{
    console.log("Sign Up", formData)
    let responsedata;
    await fetch('http://localhost:4000/singup',{
      method:'POST',
      headers:{
        Accept:'application/form-data',
        'Content-Type':'application/json',
      },
      body: JSON.stringify(formData), 
    }).then((response)=>response.json()).then((data)=>responsedata=data)

    if(responsedata.success){
      localStorage.setItem('auth-token',responsedata.token);
      window.location.replace("/");
    }
    else{
      alert(responsedata.error)
    }
  }


  return (
    <div className='loginsignup'>
      <div className="loginsignup-container">
        <h1>{state}</h1> 
        <div className="loginsignup-fields">
          {state==="Sign Up"?<input name='username' value={formData.username} onChange={changeHandler} type="text" placeholder='Your Name' />:<></>}
          <input type="email" value={formData.email} onChange={changeHandler} name='email' placeholder='Email Address' />
          <input type="password" value={formData.password} onChange={changeHandler} name='password' placeholder='Password' />
        </div>
        <button onClick={()=>state==="Login"?login():Signup()}>Continue</button>
        {state==="Sign Up"?<p className="loginsignup-login">Already have an account? <span onClick={()=>{setstate("Login")}}>Login Here</span></p>
        :<p className="loginsignup-login">Create an account? <span onClick={()=>{setstate("Sign Up")}}>Click Here</span></p>  
        }
        
        
        <div className="loginsignup-agree">
          <input type="Checkbox" name="" id="" />
          <p>By continuing, I agree to the terms of use & privacy policy. </p>
        </div>
      </div>
    </div>
  )
}

export default Loginsignup

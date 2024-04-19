const port = 4000;
const express = require("express");
const app = express();
const mangoose = require('mongoose');
const jwt= require("jsonwebtoken");
const multer = require("multer");
const path = require("path");
const cors= require("cors");
const { default: mongoose } = require("mongoose");

app.use(express.json());
app.use(cors());

// Database connection with mongodb 
mongoose.connect("mongodb+srv://Omkar:Omkar@cluster0.rz5q8y7.mongodb.net/Ecommerece")

// API creation
app.get("/",(req,res)=>{
    res.send("Express app is running")
})

// image storage engine

const storage = multer.diskStorage({
    destination: './uploads/images',
    filename: (req,file,cb)=>{
       return cb(null, `${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`)
    }
})

const upload = multer({storage: storage})

// creating upload endpoint for images
app.use('/images',express.static('uploads/images'))

app.post("/upload",upload.single('product'),(req,res)=>{
    res.json({
        success:1,
        image_url:`http://localhost:${port}/images/${req.file.filename}`

    })
})


// schema for creating product 
const Product= mongoose.model("product",{
    id:{
        type: Number,
        require: true,
    },
    name:{
        type: String,
        require: true,
    },

    image:{
        type: String,
        require: true,
    },

    category:{
        type: String,
        require: true,
    },
    new_price:{
        type: Number,
        require: true,
    },

    old_price:{
        type:Number,
        require: true,
    },
    
    date:{
        type:Date,
        default: Date.now,
    },

    available:{
        type:Boolean,
        default:true,
    },

})


app.post("/addproduct",async(req,res)=>{
    let products = await Product.find({});
    let id;
    if(products.length>0){
        let last_product_array = products.slice(-1);
        let last_product = last_product_array[0];
        id = last_product.id+1
    }
    else{
        id=1;
    }
    const product = new Product({
        id:id,
        name: req.body.name,
        image: req.body.image,
        category: req.body.category,
        new_price: req.body.new_price,
        old_price:req.body.old_price,
    }) 
    console.log(product);
    await product.save();    
    console.log("Saved"); 
    res.json({
        success: true,
        name:req.body.name,
    })
})

// Creating APT for deleting products:

app.post('/removeproduct', async(req,res)=>{
    await Product.findOneAndDelete({id:req.body.id});
    console.log("Removed");
    res.json({
        success: true,
        name:req.body.name

    })
})

// Creating Api for getting all products:

app.get('/allproducts', async(req, res)=>{
    let products = await Product.find({});
    console.log("All products fetched");
    res.send(products);
})


//Schema creation for User Model

const Users = mongoose.model('Users',{
    name:{
        type:String,
    },
    email:{
        type:String,
        unique: true,
    },
    password:{
        type:String,
    },
    cartData:{
        type:Object,
    },
    date:{
        type:Date,
        default:Date.now,
    }
})


// Creating end point for registering the user
app.post('/singup', async(req, res)=>{
    let check = await Users.findOne({email:req.body.email});
    if(check){
        return res.status(400).json({success:false, error:"exisiting user found with same email id"})
    }
    let cart = {}
    for (let i = 0; i < 300; i++) {
        cart[i]=0
    }
    
    const user = new Users({
        name:req.body.username,
        email:req.body.email,
        password:req.body.password,
        cartData:cart,
    })
            
    await user.save();

    const data ={
        user:{
            id:user.id
        }
    }

    const token =jwt.sign(data,'secret_ecom');
    res.json({success:true, token})
})


// Creating end point for user login
app.post('/login',async(req,res)=>{
    let user =await Users.findOne({email:req.body.email});
    if(user){
        const passcompare = req.body.password === user.password;
        if (passcompare){
            const data ={
                user:{
                    id:user.id
                }
            }
            const token = jwt.sign(data, 'secret_ecom');
            res.json({success:true,token});
        }
        else{
            res.json({success:false, errors:"Wrong Password"});
        }
    }
    else{
        res.json({success:false, errors:"Wrong Email Id"})
    }
})

// creating end point for new collection data

app.get('/newcollections',async(req,res)=>{
    let products =await Product.find({});
    let newcollections = products.slice(1).slice(-8);
    console.log("newcollection fethced");
    res.send(newcollections);
})


// creating end point for popular in women data
app.get('/popularinwomen', async(req, res)=>{
    let products= await Product.find({category:"women"});
    let popular = products.slice(0,4);
    console.log('popular in women');
    res.send(popular);
})

// middleware for addtocarts to fetch user

const fetchuser = async(req,res,next)=>{
    const token = req.header('auth-token');
    if(!token){
        res.status(401).send({error:"Please authenticate using valid token"})
    }
    else{
        try {
            const data =jwt.verify(token,'secret_ecom');
            req.user = data.user;
            next()
        } catch (error) {
            res.status(401).send({error:"Please authenticate using valid token"})
        }
    }
}
// // creating end point for cart data
app.post('/addtocart', fetchuser, async(req,res)=>{
    console.log('Added',req.body.itemId)
    let userdata =await Users.findOne({_id:req.user.id});
    userdata.cartData[req.body.itemId]+=1;
    await Users.findOneAndUpdate({_id:req.user.id},{cartData:userdata.cartData});
    res.send("Added")
})

// creating end point for  remove cart data
app.post('/removefromcart',fetchuser, async(req, res)=>{
    console.log('removed',req.body.itemId)
    let userdata =await Users.findOne({_id:req.user.id});
    if(userdata.cartData[req.body.itemId]>0)
    userdata.cartData[req.body.itemId]-=1;
    await Users.findOneAndUpdate({_id:req.user.id},{cartData:userdata.cartData});
    res.send("Added")
})

app.post('/getcart',fetchuser, async(req,res)=>{
    console.log("get cart");
    let userdata =await Users.findOne({_id:req.user.id});
    res.json(userdata.cartData);
})

app.listen(port,(error)=>{
    if(!error){
        console.log("server running" + port)
    }
    else{
        console.log("error:"+ error)
    }

})
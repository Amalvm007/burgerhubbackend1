// import express
const express = require ('express')
// inport cors
const cors = require('cors')

// import jsonwentoken
const jwt =require('jsonwebtoken')

const dataService = require('./services/dataservices')

const server =express()
// port number for 
server.use(cors({
    origin:'http://localhost:4200'
}))

server.use(express.json())

server.listen(3000,()=>{
    console.log('server is watching port number 3000');
})



// api call for allProducts
server.get('/products',(req,res)=>{
    dataService.Products().then((result)=>{
     res.status(result.statusCode).json(result)
    })
  
 
 })

 // api call for user register
server.post('/register',(req,res)=>{
    console.log(req.body);
    dataService.register(req.body.uname,req.body.phone,req.body.pswd).then((result)=>{
        res.status(result.statusCode).json(result)
        console.log('inside register function ..');
        

    })
})

// api call for login 
server.post('/login',(req,res)=>{
    console.log(req.body);
    dataService.login(req.body.phone,req.body.pswd)
    .then((result)=>{
        res.status(result.statusCode).json(result)
    })
})
// token verify from headers
const jwtmiddleware = (req,res,next)=>{
    console.log('inside router middleware');
    // to get token from header
    const token = req.headers['token12']
    console.log(token);
  
    try{
        const data = jwt.verify(token,'secertkey123')
        console.log(data);
        req.userPhone = data.currentUser
        console.log('valid token');
        next()
    }catch{
        console.log('invalid token');
        res.status(401).json({
            message:'Please Login!!!'
        })


    }

}

// api call for addtocart 
server.post('/addtocart',jwtmiddleware,(req,res)=>{
    console.log('inside cart call');
    console.log(req.body);
    dataService.addToCart(req.body.phone,req.body.product)
    .then((result)=>{
        res.status(result.statusCode).json(result)
    })
})

// api call to get all cart items
server.get('/getcart',jwtmiddleware,(req,res)=>{
    console.log('inside get cart call');
    dataService.getAllCartItems(req).then((result)=>{
        res.status(result.statusCode).json(result)
    })
})

// api call to delate item from cart
server.get('/delateitem',jwtmiddleware,(req,res)=>{
    console.log('inside  delate call');
    dataService.removeCartItem(req).then((result)=>{
        res.status(result.statusCode).json(result)
    })
})
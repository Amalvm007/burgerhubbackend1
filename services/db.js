const mongoose = require('mongoose')

mongoose.connect('mongodb://localhost:27017/burger',()=>{
    console.log('Mongodb connected');

}) 


// create model popular dishes
const Product = mongoose.model('Product',
{
    id: Number,
    name: String,
    image: String,
    price: Number,
    rating: Number,
    hotelName: String
  }
)

// create model for user
const User =mongoose.model('User',{
    username:String,
    phone:Number,
    pswd:String,
    cart:[]

})


module.exports={
    Product,
    User
}
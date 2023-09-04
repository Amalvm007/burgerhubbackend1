
// import db
const db =require('./db')

// import jsonwentoken
const jwt =require('jsonwebtoken')

// allproducts
const Products = ()=>{
    return db.Product.find().then((result)=>{
        if(result){
            return{
                statusCode:200,
                products:result
            }
        }else{
            return{
                statusCode:404,
                message:'No data found'
            }

        }
    })
}

// register new user
const register=(uname,phone,pswd)=>{

    // to check user already exist
    return db.User.findOne({
        phone
    }).then((result)=>{
        console.log(result);
        if(result){
            return{
                statusCode:403,
                message:'Account already exist...!'
            }

        }else{
            // to add new user 
            const newUser = new db.User({
                username:uname,
                phone,
                pswd
            
            })
            // to save in mongodb we should save()
            newUser.save()
            return{
                statusCode:200,
                message:'Registeration successfull..!!'
            }
        }

    })

}
// login
const login=(phone,pswd)=>{
    // to check phone and pswd in mongodb 
    return db.User.findOne({
        phone,pswd
    }).then((result)=>{
        if(result){ 

            // generate token
            const token = jwt.sign({
                currentUser:phone
            },'secertkey123')
            return{
                statusCode:200,
                message:'Login successfull',
                username:result.username,
                phone:result.phone,
                token
                
            }
        }else{
            return{
                statusCode:403,
                message:'Invaild phone number / password'
            }
        }
    })

}

// add to cart
const addToCart = (phone,product)=>{
    // to check user in mongodb
    return db.User.findOne({
        phone
    }).then((result)=>{
        if(result){
            return db.Product.findOne({
                id:product.id
            }).then((data)=>{
                if(data){
                   result.cart.push({
                    id:data.id,
                    name:data.name,
                    image:data.image,
                    price:data.price
                   })
                 //    add to mongodb 
                  result.save()
                   return{
                    statusCode:200,
                    message:'Item added to cart',
                   }
                   
                }else{
                    return{
                        statusCode:404,
                        message:'No data found'
                    }
                }
            })

        }else{
            return{
                statusCode:403,
                message:'Please Login....'
            }
        }
    })

}

// getAllCartItems
const getAllCartItems= (req)=>{
    const phone =req.userPhone
    console.log( "curent user id",phone);
    return db.User.findOne({
        phone 
    }).then((result)=>{
        console.log(result);
        if(result){
            return{
                statusCode:200,
                cart:result.cart
                
            }
           

        }else{
            return{
                statusCode:401,
                message:'Invaild User '
            }
        }
        
    })

}

// removeCartItem
removeCartItem = (req)=>{
    const phone =req.userPhone
    console.log( "curent user id",phone);
    return db.User.findOne({
        phone 
    }).then((result)=>{
        if(result){

            return result.cart.delateOne({
                id
            }).then((data)=>{
                if(data){
                    return{
                        statusCode:200,
                           message:'item removed from cart'
                    }
                }else{
                    return{
                        statusCode:404,
                        message:'No data found' 
                    }
                        
                
                }

            })
            
            
        }else{
            return{
                statusCode:402,
                message:'Please Login'
            }
        }
    })



}

module.exports={
    Products,
    register,
    login,
    addToCart,
    getAllCartItems,
    removeCartItem

}
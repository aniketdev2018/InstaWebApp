const mongoose = require('mongoose')
const {ObjectId}=mongoose.Schema.Types
const userSchema =new mongoose.Schema({
 	name:{
 		type: String,
 		required: true
 	},
 	email:{
 		type: String ,
 		required : true
 	},
 	password:{
 		type: String,
 		required: true
 	},
 	pic:{
       type:String,
       default:"https://res.cloudinary.com/aniketch2020/image/upload/v1595860416/deafult_liqowo.png"

 	},
 	followers:[{
 		type:ObjectId,
 		ref:"User"
 	}],
 	following:[{
 		type:ObjectId,
 		ref:"User"
 	}]
 })

 mongoose.model("User",userSchema)
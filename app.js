const express= require('express') 

const mongoose =require('mongoose') 
const  PORT= process.env.PORT || 5000
const {MONGOURI}= require('./config/keys')
const bodyParser=require('body-parser')
const app= express ();




mongoose.connect(MONGOURI,{
	useNewUrlParser: true,
	useUnifiedTopology: true
})

 mongoose.connection.on('connected',()=>{
 	console.log("Connected to mongo db yeah")
 })

mongoose.connection.on('error',(err) =>{
	console.log("err in connecting", err)
})
 

require('./models/post')

require('./models/user')
app.use(bodyParser.urlencoded({
	'extended': 'true'
}))
app.use(bodyParser.json())

app.use(require('./routes/auth'))
app.use(require('./routes/post'))
app.use(require('./routes/user'))
 // app.get('./about',(req,res)=>{
 // 	console.log("about")
 // 	res.send("About page")
 // })
 
 if(process.env.NODE_ENV==="production" || process.env.NODE_ENV === 'staging'){
 	app.use(express.static('client/build'))
     const path = require('path') 
     app.get("*",(req,res)=>{
     res.sendFile(path.resolve(__dirname,'client','build','index.html'))

     })	
 }

app.listen(PORT,()=>{
	console.log("server is running on ",PORT)
})
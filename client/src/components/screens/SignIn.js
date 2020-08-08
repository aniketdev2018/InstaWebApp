import React,{useState,useContext} from 'react'
import {Link,useHistory} from 'react-router-dom'
import M from 'materialize-css'
import {UserContext} from '../../App'
const SignIn=()=>{
  const {state,dispatch}=useContext(UserContext)
	const history=useHistory()
     
      const[password,setPasword]=useState("")
      const[email,setEmail]=useState("")
      const PostData =()=>{
        // if(!/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email)){
        //   M.toast({html: "Invalid email" ,classes:"#c62828 red darken-3"}) 
        //   return
        // }
        fetch ("/signin",{
        method:"post",
        headers:{
          "Content-Type":"application/json"
          
        },
        body:JSON.stringify({
          password,
          email

        })
      }).then(res=>res.json())
        .then(data=>{
        	console.log(data)
          if(data.error){
             M.toast({html: data.error ,classes:"#c62828 red darken-3"})
          }
          else{
             
             localStorage.setItem("jwt",data.token)
             localStorage.setItem("user",JSON.stringify(data.user))
             dispatch({type:"USER",payload:data.user})
             M.toast({html:"sign in  succesfully ",classes:"#43a047 green darken-3"})  
             history.push('/')
          }

     }).catch(err=>{
     	console.log(err)
     })
    }
          // console.log("Data fetched")
      
      
	return (

		<div className=	"mycard">
			<div className="card auth-card input-field">
         <h2>Instagram</h2>
         <input type="text" placeholder="email" 
            required 
            value={email}
           onChange={(e)=>setEmail(e.target.value)}
         />
         <input type="password" placeholder="password"
            value={password}
           onChange={(e)=>setPasword(e.target.value)}
          />
         <button className="btn waves-effect waves-light #42a5f5 blue darken-1" 
          onClick={()=>PostData()}
        >
             Login
          </button>

          <h5>
             <Link to ="/signup" >Don't have an account?</Link>
          </h5>
        
		</div>
   
		</div>	
		
		)
		
	
}

export default SignIn
import React,{useState,useEffect,useContext} from 'react'
import  {UserContext} from '../../App'
import {Link} from 'react-router-dom'
// import M from 'materialize-css'
const Home =()=>{
	// const[mypics,setPics]= useState(undefined)
	// const [url,setUrl]=useState(undefined)
	const [data,setData]=useState([])
	const {state,dispatch}= useContext(UserContext)
	useEffect(()=>{
		fetch('/allpost',{
			headers:{
				"Authorization":"Bearer "+localStorage.getItem("jwt")
			}
			}).then(res=>res.json())
        .then(result=>{
        	//console.log(res)
        	setData(result.posts)
        })
		
	},[])

	const likePost=(id)=>{
		fetch('/like',{
			method:"put",
			headers:{
				"Content-Type":"application/json",
				"Authorization":"Bearer "+localStorage.getItem("jwt")

			},
			body:JSON.stringify({
				postId:id
			})
		}).then(res=>res.json())
		.then(result=>{
			//console.log(result)
			const newData=data.map(item=>{
                if(item._id===result._id){
                	return result
                }else
                {
                	return item
                }
			})
			setData(newData)
		}).catch(err=>{
			console.log(err)
		})
	}

	const unlikePost=(id)=>{
		fetch('/unlike',{
			method:"put",
			headers:{
				"Content-Type":"application/json",
				"Authorization":"Bearer "+localStorage.getItem("jwt")

			},
			body:JSON.stringify({
				postId:id
			})
		}).then(res=>res.json())
		.then(result=>{
			//console.log(result)
			const newData=data.map(item=>{
                if(item._id===result._id){
                	return result
                }else
                {
                	return item
                }
			})
			setData(newData)
		}).catch(err=>{
			console.log(err)
		})
	}

	const makeComment=(text,postId)=>{
		fetch('/comment',{
			method:"put",
			headers:{
				"Content-Type":"application/json",
				"Authorization":"Bearer "+localStorage.getItem("jwt")

			},
			body:JSON.stringify({
				postId,
				text
			})
		}).then(res=>res.json())
		.then(result=>{

			const newData=data.map(item=>{
                if(item._id===result._id){
                	return result
                }else
                {
                	return item
                }
            })
			setData(newData)
		}).catch(err=>{
			console.log(err)
		})
	}
	const deletePost =(postid)=>{
		fetch(`/deletepost/${postid}`,{
			method:"delete",
			headers:{
				Authorization:"Bearer "+localStorage.getItem("jwt")

			}
		}).then(res=>res.json())
		.then(result=>{
			console.log(result)
			const newData = data.filter(item=>{
			  return item._id !== result._id
			})
			setData(newData)
		}).catch(err=>{
			console.log(err)
		})
	}
    

   const deleteComment = (postid, commentid) => {
      fetch(`/deletecomment/${postid}/${commentid}`, {
         method: "delete",
         headers: {
            Authorization:"Bearer "+localStorage.getItem("jwt")
         },
      }).then(res => res.json())
         .then(result => {
            let newData = data.map(item => {
               if (item._id === result._id) {
                  return result
               } else {
                  return item
               }
            })
            setData(newData)
         }).catch(err => {
            console.log(err)
         })
   }
 


	return (
		
		<div className="home">
		    {
		    	data.map(item=>{
		    		return(

		    	<div className="card home-card" key={item._id}>

		    	<div>
	          		<img style={{width:"60px",height:"60px",padding:"5px",borderRadius:"40px"}}
	          		src={item.postedBy._id===state._id?state.pic:item.photo} alt="beautiful image"/>
	          		
	          		
	          	</div>
	          	    <h6 style={{padding:"5px"}}><b><Link to={item.postedBy._id!==state._id?"/profile/"+item.postedBy._id:"/profile"}>{item.postedBy.name} </Link></b> {item.postedBy._id===state._id
                      &&
                      <i className="material-icons " style={{
	          	    	float:"right"
	          	    }}
                       onClick={()=>deletePost(item._id)}
	          	    >delete</i> 
	          	     }
	          	    

	          	    </h6>
					
				<div className="card-image">
				      <img src={item.photo} alt="beautiful image"/>
				</div>
					<div className="card-content">
					<i className="material-icons" style={{color:"red"}}>favorite</i>
			       {item.likes.includes(state._id)
	                 ? 
	                   <i className="material-icons"
	                    onClick={()=>{unlikePost(item._id)}}
				       >thumb_down</i>
                     : 
                        <i className="material-icons"
                         onClick={()=>{likePost(item._id)}}
			              >thumb_up</i>

			       }
			       
			       
						<h6>{item.likes.length} likes</h6>
						<h6>{item.title}</h6>
						<p>{item.body}</p>
						{
							item.comments.map(record=>{
								return(
									<h6 key={record._id}><span style={{fontweight:"400"}}> <b>  <Link to={record.postedBy._id!==state._id?"/profile/"+record.postedBy._id:"/profile"}>{record.postedBy.name} </Link> </b> </span> {record.text}  
                                                                      



						 {
						   record.postedBy._id === state._id
						   &&
						   <i  className="material-icons " style={{ float:"right" }}
						     
						     onClick={() => deleteComment(item._id,record._id )}
						    >delete</i>
						}  

                     

									</h6>
									)
							})
						}
						<form onSubmit={(e)=>{
							e.preventDefault()
					makeComment(e.target[0].value,item._id)
						}}>
						<input type="text" placeholder ="add a comment" />
					</form>
					</div>
			</div>
			)
			})
		  }
			

		
            
         </div>
		)


		
	
}

export default Home
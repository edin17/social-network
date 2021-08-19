import { useEffect, useState } from "react";
import "../Post/post.css";
import { AiOutlineHeart,AiFillDelete} from "react-icons/ai";
import {FaRegCommentAlt} from "react-icons/fa";
import {IoMdClose} from "react-icons/io";
import axios from "axios";
import {useSpring,animated} from "react-spring";



export default function ViewPost(props){
    const token=JSON.parse(localStorage.getItem("token"));

    const [user,setUser]=useState();
    const [post,setPost]=useState();

    const [commentToggle,setCommentToggle]=useState(false)
    const commentsStyle=useSpring(commentToggle ? {display:"block"}:{display:"none"});
    const [likeTrigger,setLikeTrigger]=useState(false);
    const [comment,setComment]=useState();
    


    useEffect(()=>{
        axios.post("https://social-network-edin.herokuapp.com/api/users/getprofile",{
            userid:token.user._id
        })
        .then(res=>{
            setUser(res.data);
        })

        axios.post("https://social-network-edin.herokuapp.com/api/posts/getpost",{
            postid:props.match.params.id
        })
        .then(res=>{
            setPost(res.data);
        })
        // eslint-disable-next-line
    },[])
    if(!user || !post){
        return <div>Loading...</div>
    }

    function postComment(){
        if(typeof(comment)==="string" && comment.length>0){
            let commObj={
                postid:post._id,        
                user:user,
                comment:comment,
                date:Date.now()
            }
            
            post.comments.push(commObj);
            axios.put("https://social-network-edin.herokuapp.com/api/posts/postcomment",commObj);

            setComment("");
        }
    
    }
      function deleteComment(comm){
        setPost({...post,likes:post.comments.filter(commObj=>commObj!==comm)})
        axios.put("https://social-network-edin.herokuapp.com/api/posts/deletecomment",comm)
        setCommentToggle(false);

    }

    function like(postid){
        let a=post.likes.find(id=>id===user._id);
        if(!a){
            axios.put("https://social-network-edin.herokuapp.com/api/posts/like",{
                postid:postid,
                userid:user._id
            })
            post.likes.push(user._id);
   
            setLikeTrigger(!likeTrigger)
        }else{
            axios.put("https://social-network-edin.herokuapp.com/api/posts/unlike",{
                postid:postid,
                userid:user._id
            })
            setPost({...post,likes:post.likes.filter(like=>like!==user._id)})
            setLikeTrigger(!likeTrigger)
           
        }

    }
    let postUser=JSON.parse(post.user);
    console.log(post)
    const userPhoto=JSON.parse(post.user);

    function deletePost(){
        axios.put("https://social-network-edin.herokuapp.com/api/posts/deletepost",{
            postid:props.match.params.id
        })
        
            window.location="/profile/"+user._id
        
    }
    return <div className="post">
 
    <animated.div className="all-comments" style={commentsStyle}>
         <IoMdClose size="32px" color="red" onClick={()=>setCommentToggle(false)}/>
        
         {post.comments.map(singleComment=>{
              
         return  <div className="single-comment">
                     <span>
                         <span onClick={()=>window.location="/profile/"+singleComment.user._id}>
                             <img src={singleComment.user.profilePhoto} alt="prodile"/>
                             <h4>{singleComment.user.username}</h4>
                         </span>
                         
                         <p>: {singleComment.comment}</p>
                     </span>
                     {user._id===postUser._id || singleComment.user._id===postUser._id ? <IoMdClose onClick={()=>deleteComment(singleComment)}/>:false}
                 </div>
         })}
        
         </animated.div>

         

     <div className="post-header">
         <span onClick={()=>window.location="/profile/"+userPhoto._id}>
             <img src={userPhoto.profilePhoto} alt="profile"/>
             <h3>{userPhoto.username}</h3>
         </span>
         <AiFillDelete size="24px" color="red" onClick={()=>deletePost()}/>
     </div>
     <div className="image-container">
         <img src={post.photo} alt="profile"/>
     </div>
     <h5 style={{margin:"0px",textAlign:"left"}}>{post.likes.length} likes</h5>
     <div className="reactions">
         <span>
             {!post.likes.find(like=>like===user._id)?<AiOutlineHeart size="28px" onClick={()=>like(post._id)} color="black"/>:
             <AiOutlineHeart size="28px" onClick={()=>like(post._id)} color="red"/>}
             <FaRegCommentAlt size="25px" onClick={()=>setCommentToggle(true)}/>
         </span>

     </div>
     <div className="comment">
         <textarea value={comment} onChange={e=>setComment(e.target.value)} placeholder="Write comment..."/>
         <button onClick={()=>postComment()}>POST</button>
     </div>
     <div className="post-comments">
         <div className="single-comment last-comment">
             <h4>{post.comments.length>0 ? post.comments[post.comments.length-1].user.username:" "}</h4>
             <p> {post.comments.length>0 ? ": "+post.comments[post.comments.length-1].comment:" "}</p>
         </div>
     </div>

 </div>
}
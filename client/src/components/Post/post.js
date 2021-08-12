import "./post.css";
import {AiOutlineHeart,AiOutlineSend} from "react-icons/ai";
import {FaRegCommentAlt} from "react-icons/fa";
import {IoMdClose} from "react-icons/io";
import {useState} from "react";
import axios from "axios";
import {useSpring,animated} from "react-spring";
import {useSelector} from "react-redux";

export default function Post({post,user,dispatch}){

    const userPhoto=JSON.parse(post.user);
    console.log(userPhoto);

    
    

    const [comment,setComment]=useState();
    function postComment(){
        if(typeof(comment)==="string" && comment.length>0){
            let commObj={
                postid:post._id,        
                user:user.user,
                comment:comment,
                date:Date.now()
            }
            
            dispatch({type:"ADDCOMMENT",payload:commObj});
            axios.put("/api/posts/postcomment",commObj);

            setComment("");
        }
    
    }
    console.log(post)
    function deleteComment(comm){
        dispatch({type:"DELETECOMMENT",payload:comm});
        axios.put("/api/posts/deletecomment",comm)
        setCommentToggle(false);

    }
    const [likeTrigger,setLikeTrigger]=useState(false);
    function like(postid){
        let a=post.likes.find(id=>id===user.user._id);
        if(!a){
            axios.put("/api/posts/like",{
                postid:postid,
                userid:user.user._id
            })
            dispatch({type:"LIKE",payload:{userid:user.user._id,postid:postid}});
            setLikeTrigger(!likeTrigger)
        }else{
            axios.put("/api/posts/unlike",{
                postid:postid,
                userid:user.user._id
            })
            dispatch({type:"UNLIKE",payload:{postid:postid,userid:user.user._id}});
            setLikeTrigger(!likeTrigger)
           
        }

    }
    const [commentToggle,setCommentToggle]=useState(false)
    const commentsStyle=useSpring(commentToggle ? {display:"block"}:{display:"none"});


    let updatedPosts=useSelector(store=>store.posts);
    let singlePost=updatedPosts.find(photo=>photo._id===post._id);

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
                        <IoMdClose onClick={()=>deleteComment(singleComment)}/>
                    </div>
            })}
           
            </animated.div>


        <div className="post-header">
            <span onClick={()=>window.location="/profile/"+userPhoto._id}>
                <img src={userPhoto.profilePhoto} alt="profile"/>
                <h3>{userPhoto.username}</h3>
            </span>
            
        </div>
        <div className="image-container">
            <img src={post.photo} alt="profile"/>
        </div>
        <div className="reactions">
            <span>
                {singlePost.likes.find(like=>like===user.user._id)?<AiOutlineHeart size="28px" onClick={()=>like(post._id)} color="black"/>:
                <AiOutlineHeart size="28px" onClick={()=>like(post._id)} color="red"/>}
                <FaRegCommentAlt size="25px" onClick={()=>setCommentToggle(true)}/>
                <AiOutlineSend size="28px"/>
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

import "./profile.css";
import Header from "../Header/header";
import Footer from "../Footer/footer";
import { useEffect,useState } from "react";
import axios from "axios";

export default function Profile(props){
    let token=JSON.parse(localStorage.getItem("token"));

   

    const[user,setUser]=useState();
    useEffect(()=>{
        let id=props.match.params.id;
        axios.post("/api/users/getprofile",{
            userid:id
        })
        .then(res=>{
            if(typeof(res.data)==="object"){
                setUser(res.data);
                
            }else{
                console.log("User not found.");
            }
        })

    },[props.match.params.id])
 

    if(!user){
       
        return <div>Loading</div>
    }
    
    function follow(id){
        user.following.push(id);
                
        setUser({...user,following:user.following});
        console.log(user.following)
        axios.post("/api/users/follow",{
            followedID:id,
            followerID:token.user._id
        })
        .then(res=>{
            if(res.data==="Followed"){
                console.log("Extra")
            }else{
                console.log("Problem");
            }
        })
    }

    function unfollow(id){
        let update=user.following.filter(flw=>flw!==id)
        setUser({...user,following:update});
        axios.post("/api/users/unfollow",{
            unfollowedID:id,
            unfollowerID:token.user._id
        })
        .then(res=>{
            if(res.data==="Unfollowed"){

                console.log(user.following);
            }else{
                console.log("Problem");
            }
        })
    }
    console.log(user);
    return <div className="profile">
        <Header/>
        <div className="profile-header">
            <div className="profile-info">
                <span id="main">
                    <img src={user.profilePhoto} alt="profile"/>
                    <h2>{user.username}</h2>
                </span>

                <span>
                    <div>
                        <h5>Posts</h5>
                        <p>{user.posts.length}</p>
                    </div>
                    <div>
                        <h5>Followers</h5>
                        <p>{user.followers.length}</p>
                    </div>
                    <div>
                        <h5>Following</h5>
                        <p>{user.following.length}</p>
                    </div>
                </span>

            </div>
            {user.following.length<=0 || !user.following.find(id=>id===props.match.params.id) ? <button id="follow-btn" onClick={()=>follow(props.match.params.id)}>FOLLOW</button>:
            <button id="unfollow-btn" onClick={()=>unfollow(props.match.params.id)}>UNFOLLOW</button>}
        </div>
        <div className="image-container">
            {user.posts.map(photo=>{
                return <img src={photo.photo} alt="post"/>
            })}
                
  
        </div>
        <Footer/>
    </div>
}
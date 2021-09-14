
import "./profile.css";
import Header from "../Header/header";
import Footer from "../Footer/footer";
import { useEffect,useState } from "react";
import axios from "axios";

import { useDispatch } from "react-redux";



export default function Profile(props){
    let token=JSON.parse(localStorage.getItem("token"));


   let dispatch=useDispatch();

    const[user,setUser]=useState();
    useEffect(()=>{
        let id=props.match.params.id;
        axios.post("https://social-network-edin.herokuapp.com/api/users/getprofile",{
            userid:id
        })
        .then(res=>{
            if(typeof(res.data)==="object"){
                setUser(res.data);
                dispatch({type:"LOAD",payload:token.user.posts})
            }else{
                console.log("User not found.");
            }
        })
// eslint-disable-next-line
    },[props.match.params.id])
    const [settings,setSettings]=useState(false);
    const [file,setFile]=useState();
    if(!user){
        return <div>Loading</div>
    }
    
    function follow(id){
        user.following.push(id);
                
        setUser({...user,following:user.following});
        console.log(user.following)
        axios.post("https://social-network-edin.herokuapp.com/api/users/follow",{
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
        axios.post("https://social-network-edin.herokuapp.com/api/users/unfollow",{
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

    function openFile(e){
        setFile(e.target.files[0]);
        console.log(file)
       
    }

    const formdata=new FormData();

    function updateProfilePhoto(){
        if(file===undefined){
            console.log("Select one file");
        }

        formdata.append("file",file);
        formdata.append("upload_preset","ml_default");
        axios.post("https://api.cloudinary.com/v1_1/dyp902luw/image/upload",formdata).then(res=>{
            console.log(res.data)
        });

        axios.post("https://social-network-edin.herokuapp.com/api/posts/updateprofile",{
            userid:props.match.params.id,
            photo:"https://res.cloudinary.com/dyp902luw/image/upload/v1629370172/"+file.name
        })
        .then(res=>{
            if(res.data==="Uploaded"){
                console.log("uploaded")
            }else{
                console.log("Server problem");
            }
        })
    }

    function logout(){
        localStorage.removeItem("token");
        window.location="/login";
    }
   
    let reversedPosts=[];

    for(var i=user.posts.length-1;i>=0;i--){
        reversedPosts.push(user.posts[i]);
    }
    
    
    let settingsStyle=settings ? {display:"block"}:{display:"none"};
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
            <span id="btns">
                {token.user._id===user._id ? <button onClick={()=>setSettings(!settings)} id="settings-btn">SETTINGS</button>:""}
                {user.following.length<=0 || !user.following.find(id=>id===props.match.params.id) ? <button id="follow-btn" onClick={()=>follow(props.match.params.id)}>FOLLOW</button>:
                <button id="unfollow-btn" onClick={()=>unfollow(props.match.params.id)}>UNFOLLOW</button>}
            </span>


            
        </div>
        <div id="settings" style={settingsStyle} >
                <h4 onClick={()=>logout()}>Logout</h4>
                <input type="file" onChange={(e)=>openFile(e)}/>
                <h4 onClick={()=>updateProfilePhoto()}>UPLOAD</h4>
        </div>
        <div className="image-container">
            
            {reversedPosts.map(photo=>{
                
                return <img src={photo.photo} alt="post" onClick={()=>window.location="/post/"+photo._id}/>
            })}
                
  
        </div>
        <Footer/>
    </div>
}


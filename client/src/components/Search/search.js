import {IoMdClose} from "react-icons/io";
import { useState,useEffect } from "react";
import axios from "axios";
import "./search.css";
import {useSelector} from "react-redux";

export default function Search({setSearchToggle}){
    let token=JSON.parse(localStorage.getItem("token"));
    const[user,setUser]=useState();
    useEffect(()=>{
        let id=token.user._id;
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

    },[token.user._id]) 
    let users=useSelector(store=>store.search);

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


    if(!user){
        return <div>Loading...</div>
    }
    return <div className="search">
        <IoMdClose color="red" size="24px" onClick={()=>setSearchToggle(false)}/>
        {users.map(person=>{
            return <div className="single-user">
            <span onClick={()=>window.location="/profile/"+person._id}>
                <img src={person.profilePhoto} alt="profile"/>
                <h4>{person.username}</h4>
            </span>

           {!user.following.find(flw=>flw===person._id)?<button id="follow-btn" onClick={()=>follow(person._id)}>FOLLOW</button>:
           <button id="unfollow-btn" onClick={()=>unfollow(person._id)}>UNFOLLOW</button>}
        </div>
        })}
        
    </div>
}
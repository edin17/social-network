import "./notifications.css";
import Header from "../Header/header";
import Footer from "../Footer/footer";
import { useEffect, useState } from "react";
import axios from "axios";


export default function Notifications(){
    let token=JSON.parse(localStorage.getItem("token"));
    let [notifications,setNotifications]=useState();
    useEffect(()=>{
        axios.post("/api/users/getnotifications",{
            userid:token.user._id
        })
        .then(res=>{
            setNotifications(res.data);
        })
        // eslint-disable-next-line
    },[])

    if(!notifications){
        return <div>Loading...</div>
    }
    return <div className="notifications">
        <Header/>
        <h1>Notifications</h1>
        {notifications.length<=0?<p>You have not notifications</p>:notifications.map(notification=>{
            return  <div className="single-notification">
            <span onClick={()=>window.location="/profile/"+notification.likeUser._id}>
                <img src={notification.likeUser.profilePhoto} id="profile" alt="profile"/>
                <h4>{notification.likeUser.username}</h4>
            </span>

            <p>liked your photo</p>

            <img src={notification.post.photo} id="post" alt="post"/>

            
        </div>
        })}

        <Footer/>
    </div>
}
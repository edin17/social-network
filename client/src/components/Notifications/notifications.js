import "./notifications.css";
import Header from "../Header/header";
import Footer from "../Footer/footer";
import { useEffect, useState } from "react";
import axios from "axios";


export default function Notifications(){
    let token=JSON.parse(localStorage.getItem("token"));
    let [notifications,setNotifications]=useState();
    useEffect(()=>{
        axios.post("https://social-network-edin.herokuapp.com/api/users/getnotifications",{
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
    let reversedNotifications=[]
    for(var i=notifications.length-1;i>=0;i--){
        reversedNotifications.push(notifications[i]);
    }
    return <div className="notifications">
        <Header/>
        <h1>Notifications</h1>
        {notifications.length<=0?<p>You have not notifications</p>:reversedNotifications.map(notification=>{
            return  <div className="single-notification">
            <span onClick={()=>window.location="/profile/"+notification.likeUser._id}>
                <img src={notification.likeUser.profilePhoto} id="profile" alt="profile"/>
                <h4>{notification.likeUser.username}</h4>
            </span>

            <p>{notification.action}</p>

            <img src={notification.post.photo} id="post" alt="post"/>

            
        </div>
        })}

        <Footer/>
    </div>
}
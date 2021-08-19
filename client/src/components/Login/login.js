import axios from "axios";
import { useState } from "react";
import "./login.css";


export default function Login(){
    const [loginForm,setLoginForm]=useState({
        username:"",
        password:""
    })
    const [alert,setAlert]=useState(undefined);
    const alertStyle=alert===undefined ? {display:"none"}:{display:"block",color:"red"}

    function login(e){
        e.preventDefault();
        axios.post("https://social-network-edin.herokuapp.com/api/users/login",{
            username:loginForm.username,
            password:loginForm.password
        })
        .then(res=>{
            
            console.log(res.data)
            if(typeof(res.data)==="object"){
                localStorage.setItem("token",JSON.stringify(res.data));
                window.location="/home";

            }else{
                setAlert("Invalid username or password..");
            }
        })
    }

    return <div className="login">
        <form className="form" onSubmit={login}>
            <h1>EDBOOK LOGIN</h1>
            <span>
                <input required type="text" placeholder="Username" value={loginForm.username} onChange={e=>setLoginForm({...loginForm,username:e.target.value})}/>
                <input required type="password" placeholder="Password" value={loginForm.password} onChange={e=>setLoginForm({...loginForm,password:e.target.value})}/>
            </span>

            <input className="btn" type="submit"/>
            <p id="login-alert" style={alertStyle}>{alert}</p>
            <p onClick={()=>window.location="/register"}>Dont have acc, <u>register</u></p>
        </form>

    </div>
}
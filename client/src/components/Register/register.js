import axios from "axios";
import { useState } from "react";
import "../Login/login.css";
import "../Register/register.css";

export default function Login(){
    const [loginForm,setLoginForm]=useState({
        name:"",
        surname:"",
        username:"",
        email:"",
        password:"",
        confirmPassword:""
    })
    const [alert,setAlert]=useState(undefined);
    const alertStyle=alert===undefined ? {display:"none"}:{display:"block",color:"red"}


    function register(e){
        e.preventDefault();
        if(loginForm.password===loginForm.confirmPassword){

            axios.post("https://social-network-edin.herokuapp.com/api/users/register",{
                name:loginForm.name,
                surname:loginForm.surname,
                username:loginForm.username,
                email:loginForm.email,
                password:loginForm.password
            })
            .then(res=>{
                window.location="/login";
            })
        }else{
            setAlert("Password and conformation password are not same.");
        }
    }

    return <div className="login">
        <form className="form" onSubmit={register}>
            <h1>EDBOOK REGISTER</h1>
            <span>
                <input min="2" max="32" type="text" required placeholder="Name" value={loginForm.name} onChange={e=>setLoginForm({...loginForm,name:e.target.value})}/>
                <input min="2" max="32"  type="text" required placeholder="Surname" value={loginForm.surname} onChange={e=>setLoginForm({...loginForm,surname:e.target.value})}/>
                <input min="4" max="32"  type="text" required placeholder="Username" value={loginForm.username} onChange={e=>setLoginForm({...loginForm,username:e.target.value})}/>
                <input min="6" max="64"  type="text" email required placeholder="Email" value={loginForm.email} onChange={e=>setLoginForm({...loginForm,email:e.target.value})}/>
                <input min="6" max="256"  type="password" required placeholder="Password" value={loginForm.password} onChange={e=>setLoginForm({...loginForm,password:e.target.value})}/>
                <input min="6" max="256"  type="password" required placeholder="Password" value={loginForm.confirmPassword} onChange={e=>setLoginForm({...loginForm,confirmPassword:e.target.value})}/>
            </span>

            <input className="btn" type="submit"/>
            <p id="login-alert" style={alertStyle}>{alert}</p>
            <p onClick={()=>window.location="/login"}>If you have acc, <u>login</u></p>
        </form>
    </div>
}
import axios from "axios";
import { useState ,useEffect} from "react";
import {MdAddCircleOutline} from "react-icons/md";
import "../Header/header.css";
import Search from "../Search/search";
import {useDispatch} from "react-redux";



export default function Header({setUser,user}){


    let [search,setSearch]=useState("");
    let dispatch=useDispatch();
    function searching(e){
        
       
       
        setSearch(e.target.value);
        
        
        axios.post("https://social-network-edin.herokuapp.com/api/users/search",{
            searched:search,
            
        })
        .then(res=>{
            dispatch({type:"SEARCH",payload:res.data});
        })
    }


    const [searchToggle,setSearchToggle]=useState(false);
    return <header>
        <h1 onClick={()=>window.location="/home"}>EDBOOK</h1>
        <input type="search" placeholder="Search users..." onClick={()=>setSearchToggle(!searchToggle)} onChange={e=>searching(e)}/>
        <MdAddCircleOutline size="30px" onClick={()=>window.location="/newpost"}/>
        {searchToggle ? <Search setSearchToggle={setSearchToggle} user={user} setUser={setUser}/>:""}
    </header>
}
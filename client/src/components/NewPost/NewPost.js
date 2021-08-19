import { useState } from "react";
import {IoAddCircleOutline,IoCloseSharp} from "react-icons/io5";
import Header from "../Header/header";
import Footer from "../Footer/footer";

import axios from "axios";
import "./newpost.css";

export default function NewPost(){
    const token=JSON.parse(localStorage.getItem("token"));
    const user=token.user;

  

    const [description,setDescription]=useState("")
    const[file,setFile]=useState();



    const [alert,setAlert]=useState();
    const alertStyle=alert===undefined ? {display:"none"}:{display:"block",color:"red"};
  
    var openFile = function(file) {
        setFile(file.target.files[0]);
        var input = file.target;
    
        var reader = new FileReader();
        reader.onload = function(){
          var dataURL = reader.result;
          var output = document.getElementById('output');
          output.src = dataURL;
        };
        reader.readAsDataURL(input.files[0]);
      };
            
    const formdata=new FormData();


    function uploadPhotoInfo(e){
        if(file===undefined){
            setAlert("Please select 1 picture");
            return false;
        }
        formdata.append("file",file);
        formdata.append("upload_preset","ml_default")
        axios.post("https://api.cloudinary.com/v1_1/dyp902luw/image/upload",formdata).then(res=>{
            console.log(res.data)
        });
        axios.post("https://social-network-edin.herokuapp.com/api/posts/uploadpost",{
            photo:"https://res.cloudinary.com/dyp902luw/image/upload/v1629370172/"+file.name,
            user:JSON.stringify(user),
            description:description
        })
        .then(res=>{
            if(res.data==="Uploaded"){
                window.location="/home";
            }else{
                setAlert("Error:File is not uploaded successfully, try again.")
            }
        })
    }

    return <div className="Newpost">
        <Header/>
        <div className="photo-upload">
            <IoAddCircleOutline color="royalblue" style={file ? {display:"none"}:{display:"block"}}/>
            <IoCloseSharp color="red" size="32px" id="close" style={file ? {display:"block"}:{display:"none"}} onClick={e=>window.location="/newpost"}/>
            {!file?<input required type="file" onChange={e=>openFile(e)}/>: <img id="output" alt="Puploadhoto"/>}
           
        </div>
    	
        <div className="description-upload">
            <textarea value={description} onChange={e=>setDescription(e.target.value)} placeholder="Type description of yout photo..."></textarea>
            <button onClick={()=>uploadPhotoInfo()}>UPLOAD</button>

            <p style={alertStyle}>{alert}</p>
        </div>
        
        <Footer/>
    </div>
}
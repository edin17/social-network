import { useSelector , useDispatch } from "react-redux";
import Header from "../Header/header";
import Footer from "../Footer/footer";
import { useEffect,useState } from "react";
import axios from "axios";
import Post from "../Post/post";
import "./home.css";

export default function Home(){
    
    const dispatch=useDispatch();
    let [alert,setAlert]=useState("Please wait...")
    let token=JSON.parse(localStorage.getItem("token"));
    const[user,setUser]=useState();
    useEffect(()=>{
        let id=token.user._id;
        axios.post("https://social-network-edin.herokuapp.com/api/users/getprofile",{
            userid:id,
        })
        .then(res=>{
            
            if(typeof(res.data)==="object"){
                setUser(res.data);
                
            }else{
                console.log("User not found.");
            }
        })

    },[token.user._id]) 

    function getPosts(){
        if(user!==undefined){
            axios.post("https://social-network-edin.herokuapp.com/api/posts/getposts",{
                user:user
            })
            .then(res=>{
                res.data.map(single=>{
                    single.user=JSON.stringify(single.user)
                })
                if(res.data.length<=0){
                    setAlert("You have not any posts to see right now.")
                }
                dispatch({type:"LOAD",payload:res.data});
            })
        }

    }
    useEffect(()=>{
        getPosts();
        // eslint-disable-next-line 
    },[user])
    

    const posts=useSelector(store=>store.posts)
    console.log(posts)

    let reversedPosts=[];
    for(var i=posts.length-1;i>=0;i--){
        reversedPosts.push(posts[i]);
    }
    
    return <div className="home">
        <Header setUser={setUser} user={user}/>
        {posts.length<=0 ? <p>{alert}</p>:""}
        {reversedPosts.map(post=>{
            return <Post post={post} user={token} dispatch={dispatch}/>
        })}
        <Footer/>
    </div>
}
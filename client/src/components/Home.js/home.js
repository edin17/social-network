import { useSelector , useDispatch } from "react-redux";
import Header from "../Header/header";
import Footer from "../Footer/footer";
import { useEffect } from "react";
import axios from "axios";
import Post from "../Post/post";
import "./home.css";

export default function Home(){
    const localUserInfo=JSON.parse(localStorage.getItem("token"))
    const dispatch=useDispatch();

    function getPosts(){
        axios.post("https://social-network-edin.herokuapp.com/api/posts/getposts",{
            user:localUserInfo.user
        })
        .then(res=>{
           dispatch({type:"LOAD",payload:res.data});
        })
    }
    useEffect(()=>{
        getPosts();
        // eslint-disable-next-line 
    },[])
    

    const posts=useSelector(store=>store.posts)
    console.log(posts)

    let reversedPosts=[];
    for(var i=posts.length-1;i>=0;i--){
        reversedPosts.push(posts[i]);
    }
    
    return <div className="home">
        <Header/>
        {posts.length<=0 ? <p>Please wait ...</p>:""}
        {reversedPosts.map(post=>{
            return <Post post={post} user={localUserInfo} dispatch={dispatch}/>
        })}
        <Footer/>
    </div>
}
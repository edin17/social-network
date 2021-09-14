const express=require("express");
const User=require("../models/User");
const Post=require("../models/Post");
const bcrypt=require("bcrypt");
const jwt=require("jsonwebtoken");
const user=express.Router();


user.post("/register",async(req,res)=>{
    const user=req.body;
    const hashPassword=await bcrypt.hash(user.password,10);
    user.password=hashPassword;


    const newUser=new User(user);
    try{
        newUser.save();
    }catch(err){
        res.status(400).send("Invalid registration, try again.");
    }

})

user.post("/login",async(req,res)=>{
    const userInfo=req.body;
    const userFound=await User.findOne({username:userInfo.username})
    if(userFound){
        if(await bcrypt.compare(userInfo.password,userFound.password)){
            
            const token=jwt.sign({userData:userFound},process.env.SECRET_TOKEN);
            res.send({token:token,user:userFound}); 

        }else{
            res.status(401).send("Invalid username or password.");
        }
    }else{
        res.status(400).send("Invalid username or password..");
    }
})

user.post("/getprofile",async(req,res)=>{
    let userid=req.body.userid;
    
    let user=await User.findOne({_id:userid});
    if(user){
        let userPosts=await Post.find();
        let editedPosts=[];
        userPosts.map(post=>{
            post.user=JSON.parse(post.user);
            editedPosts.push(post);
        })
        let final=editedPosts.filter(post=>post.user._id===userid);
        user.posts=final;
        console.log("radi")
        res.send(user);
    }else{
        res.status(404).send("User not found.");
        console.log("ne radi")
    }
})

user.post("/follow",async(req,res)=>{
    const followInfo=req.body;

    let followedUser=await User.findOne({_id:followInfo.followedID});
    let followerUser=await User.findOne({_id:followInfo.followerID});
    if(followedUser){
        followedUser.followers.push(followInfo.followerID);
        followedUser.save();

        followerUser.following.push(followInfo.followedID);
        followerUser.save();
        res.status(200).send("Followed");
    }
})

user.post("/unfollow",async(req,res)=>{
    const unfollowInfo=req.body;

    let unfollowedUser=await User.findOne({_id:unfollowInfo.unfollowedID});
    let unfollowerUser=await User.findOne({_id:unfollowInfo.unfollowerID});
    if(unfollowedUser){
        await unfollowedUser.update({$pull:{followers:{$in:[unfollowInfo.unfollowerID]}}});
        unfollowedUser.save();

        await unfollowerUser.update({$pull:{following:{$in:[unfollowInfo.unfollowedID]}}})
        unfollowerUser.save();
        res.status(200).send("Unfollowed");
    }
})
user.post("/search",async(req,res)=>{
    const searched=req.body.searched;

    const users=await User.find({username:{$regex:searched}}).limit(100);
    res.send(users);
})
user.post("/getnotifications",async(req,res)=>{
    let userid=req.body.userid;

    let userFound=await User.findOne({_id:userid});
    res.send(userFound.notifications);
})

module.exports=user;
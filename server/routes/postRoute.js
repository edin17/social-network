const express=require("express");
const post=express();
const Post=require("../models/Post");
const User=require("../models/User");


async function sendNotification(postFound,userid,action){
  const notifyUser=JSON.parse(postFound.user);
  console.log(notifyUser)
  let user=await User.findOne({_id:notifyUser._id});
  let likeUser=await User.findOne({_id:userid})
  let id=user.username+likeUser.username+postFound._id+action;
  if(!user.notifications.find(notfy=>notfy.id===id)){
  user.notifications.push({
    id:id,
    post:postFound,
    likeUser:likeUser,
    action:action
  })
  user.save();
}
}

post.post("/uploadpost",async(req,res)=>{

    const fileInfo=req.body;
    console.log(fileInfo)
    
    let user=JSON.parse(fileInfo.user);
    let userDB=await User.findOne({_id:user._id});
    userDB.posts.push(fileInfo);
    userDB.save();

    const newPost=new Post(fileInfo);

    try{
        newPost.save();
        res.send("Uploaded")
    }catch(err){
        res.status(400).send("Invalid file upload.");
    }
});

post.put("/deletepost",async(req,res)=>{
  const fileID=req.body.postid;
  console.log(fileID)
  await Post.deleteOne({_id:fileID});


})

post.post("/getposts",async(req,res)=>{
  const user=req.body.user;

  const allPosts=await Post.find();
  var filteredPosts;

  if(user.following.length<=0){
    filteredPosts=user.posts;
  }else{
    user.following.map(id=>{
      filteredPosts=allPosts.filter(post=>post.userid!==id);
    })
  }
 

  
  res.send(filteredPosts);

})

post.put("/postcomment",async(req,res)=>{
    let comment=req.body;
    
    let postFound=await Post.findOne({_id:comment.postid});
    if(postFound){
      postFound.comments.push(comment);
      postFound.save();
      let action="commented your photo"
      
      sendNotification(postFound,comment.user._id,action)
    }else{
      console.log("Post does not exist.")
    }
})

post.put("/deletecomment",async(req,res)=>{
  let postComment=req.body;
  
  let postFound=await Post.findOneAndUpdate({_id:postComment.postid},{$pull:{comments:{$in:[postComment]}}})
  if(postFound){
    postFound.save();
  }else{
    console.log("Comment did not found");
  }
})

post.put("/like",async(req)=>{
  let likeInfo=req.body;
  let action="liked your photo";
  console.log(likeInfo)
  let postFound=await Post.findOne({_id:likeInfo.postid});
  await postFound.update({$push:{likes:[likeInfo.userid]}});
  postFound.save();

  sendNotification(postFound,likeInfo.userid,action);
 

})

post.put("/unlike",async(req)=>{
  let unlikeInfo=req.body;
  console.log(unlikeInfo)
  let postFound=await Post.findOneAndUpdate({_id:unlikeInfo.postid});
    await postFound.update({$pull:{likes:{$in:[unlikeInfo.userid]}}})
    postFound.save();
    console.log("unlike")

})

post.post("/getpost",async(req,res)=>{
  let postid=req.body.postid;
  let photo=await Post.findOne({_id:postid});
  if(photo){
    res.send(photo)
  }else{
    res.send("Nistaa")
  }
})

post.post("/updateprofile",async(req,res)=>{
  let updateInfo=req.body;
  
  let userFound=await User.findOne({_id:updateInfo.userid});

  if(userFound){
    userFound.profilePhoto=updateInfo.photo;
    userFound.save();
    res.status(200).send("Uploaded");
  }else{
    res.send("Server problem.");
  }
})



module.exports=post;
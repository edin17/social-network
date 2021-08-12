const express=require("express");
const post=express();
const Post=require("../models/Post");
const multer=require("multer");

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, "C:/Users/PC/OneDrive/Desktop/React/social-network/client/public/uploads")
    },
    filename: function (req, file, cb) {
      cb(null, file.originalname)
    }
  })


   
  var upload = multer({ storage: storage ,    limits: { fileSize: 20000000},
    fileFilter:(req,file,cb) =>{
        if (file.mimetype !== 'image/png' && file.mimetype !== 'image/jpg' && file.mimetype !== 'image/jpeg') {
            req.file_error = "file not allowed";
            return cb(null,false);
        }
        cb(null, true);}})
  



post.post("/uploadpost",upload.single("file"),(req,res)=>{
    const fileInfo=req.body;
    

    const newPost=new Post(fileInfo);

    try{
        newPost.save();
        res.send("Uploaded")
    }catch(err){
        post.status(400).send("Invalid file upload.");
    }
});

post.post("/getposts",async(req,res)=>{
  const user=req.body.user;

  const allPosts=await Post.find();
  var filteredPosts;

  user.following.map(id=>{
    filteredPosts=allPosts.filter(post=>post.userid===id);
  })

  res.send(allPosts);

})

post.put("/postcomment",async(req,res)=>{
    let comment=req.body;
    
    let postFound=await Post.findOne({_id:comment.postid});
    if(postFound){
      postFound.comments.push(comment);
      postFound.save();
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
  console.log(likeInfo)
  let postFound=await Post.findOne({_id:likeInfo.postid});
  await postFound.update({$push:{likes:[likeInfo.userid]}});
  postFound.save();
  console.log("like")

})

post.put("/unlike",async(req)=>{
  let unlikeInfo=req.body;
  console.log(unlikeInfo)
  let postFound=await Post.findOneAndUpdate({_id:unlikeInfo.postid});
    await postFound.update({$pull:{likes:{$in:[unlikeInfo.userid]}}})
    postFound.save();
    console.log("unlike")

})


module.exports=post;
const mongoose=require("mongoose");

const postSchema=mongoose.Schema({
    photo:{
        type:String,
        required:true
    },
    user:{
        type:Object,
        required:true
    },
    description:{
        type:String,
        default:""
    },
    likes:{
        type:Array,
        default:[]
    },
    comments:{
        type:Array,
        default:[]
    }
})

const Post=mongoose.model("Post",postSchema);
module.exports=Post;
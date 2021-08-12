const mongoose=require("mongoose");

const userSchema=mongoose.Schema({
    name:{
        type:String,
        required:true,
        min:2,
        max:32
    },
    surname:{
        type:String,
        required:true,
        min:2,
        max:32
    },
    username:{
        type:String,
        required:true,
        min:4,
        max:32,
        unique:true
    },
    email:{
        type:String,
        required:true,
        min:6,
        max:64,
        unique:true
    },
    password:{
        type:String,
        min:6,
        max:256,
        required:true
    },
    followers:{
        type:Array,
        default:[]
    },
    following:{
        type:Array,
        default:[]
    },
    posts:{
        type:Array,
        default:[]
    },
    profilePhoto:{
        type:String,
        default:"/profile.jpg"
    }
})

const User = mongoose.model("User",userSchema);
module.exports = User;
const express=require("express");
const mongoose = require("mongoose");
const userRoute=require("./routes/userRoute");
const postRoute=require("./routes/postRoute");
require("dotenv").config();

mongoose.connect(process.env.DB_URL,{useUnifiedTopology: true,
    useNewUrlParser: true},()=>console.log("CONNECTED TO MONGODB"));



const app = express();






app.use(express.json());

app.use("/api/users",userRoute);
app.use("/api/posts",postRoute);

app.listen(5000);
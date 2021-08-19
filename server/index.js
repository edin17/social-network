const express=require("express");
const mongoose = require("mongoose");
const userRoute=require("./routes/userRoute");
const postRoute=require("./routes/postRoute");
const cors=require("cors")
require("dotenv").config();


mongoose.connect(process.env.DB_URL,{useUnifiedTopology: true,
    useNewUrlParser: true},()=>console.log("CONNECTED TO MONGODB"));



const app = express();
app.use(cors());
app.use(express.json({limit:"50mb"}));


app.use("/api/users",userRoute);
app.use("/api/posts",postRoute);

app.listen(process.env.PORT || 5000);
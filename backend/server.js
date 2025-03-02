const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();
const dotenv = require('dotenv');
const AuthRouter = require('./routes/AuthRouter');
dotenv.config();

app.use(cors());
app.use(express.json())

const MONGO_URI = `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@cluster0.zetsr.mongodb.net/${process.env.DB_NAME}`;

mongoose.connect(MONGO_URI , {useNewUrlParser : true , useUnifiedTopology : true})
.then(() =>{ console.log("MongoDB Connected"); })
.catch((err)=>{ console.log(err); })


app.use("/auth" , AuthRouter);

app.listen(process.env.PORT, () => {
    console.log("server has started " , process.env.PORT);
})

app.get("/" , (req,res) => {
    console.log(" home page");
    res.send("Welcome to Devsource API")
})







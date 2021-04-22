import express from "express";
import mongoose from "mongoose";
import Cards from './dbCards.js';
import cors from "cors";


//App config

const app = express();
const port = process.env.Port || 8001;
const connection_url='mongodb+srv://admin:tgwFqshsS1DqvcwG@cluster0.xqwug.mongodb.net/tinderdb?retryWrites=true&w=majority'


// middlewares

app.use(express.json());
app.use(cors());
//db config
mongoose.connect(connection_url,{
    useNewUrlParser : true,
    useCreateIndex : true,
    useUnifiedTopology: true,
})


//API endpoints
app.get('/',(req,res)=>{
    res.status(200).send("HELLO WORLD")
})

app.post("/tinder/card",(req,res)=>{
    const dbCard = req.body;
    Cards.create(dbCard,(err,data)=>{
        if(err){
            res.status(500).send(err);
        }
        else{
            res.status(201).send(data);
        }
    })
});


app.get("/tinder/card",(req,res)=>{
    const dbCard = req.body;
    Cards.find((err,data)=>{
        if(err){
            res.status(500).send(err);
        }
        else{
            res.status(200).send(data);
        }
    })
});



//Listener
app.listen(port,()=>console.log(`you are listening to port ${port}`));
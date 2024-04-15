const express = require("express");
const{getTopics}=require('./controllers/controllers')
const endPoints=require('./endpoints.json')
const app = express();
app.use(express.json());





app.get("/api/topics",getTopics);
app.get("/api",(req,res,next)=>{
    
    res.status(200).send(endPoints);
    
})






app.use((err, req, res, next) => {
    
    if (err.status && err.msg) {
    res.status(err.status).send({ msg: err.msg });
  } 
    next(err)
  
  
  });



module.exports=app
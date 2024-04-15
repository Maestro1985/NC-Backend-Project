const express = require("express");
const{getTopics}=require('./controllers/controllers')
const app = express();
app.use(express.json());





app.get("/api/topics",getTopics);





app.use((err, req, res, next) => {
    
    if (err.status && err.msg) {
    res.status(err.status).send({ msg: err.msg });
  } 
    next(err)
  
  
  });



module.exports=app
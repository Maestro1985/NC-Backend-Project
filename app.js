const express = require("express");
const{getTopics, getArticleById, getArticles}=require('./controllers/controllers')
const endPoints=require('./endpoints.json')
const app = express();
app.use(express.json());





app.get("/api/topics",getTopics);
app.get("/api",(req,res,next)=>{
    
    res.status(200).send(endPoints);
    
})

app.get('/api/articles', getArticles)
app.get("/api/articles/:article_id", getArticleById)



app.use((err, req, res, next) => {
    
    if (err.status && err.msg) {
    res.status(err.status).send({ msg: err.msg });
  } 
    next(err)
  
  
  });

 

  app.use((err, req, res, next) => {
  
    if(err.code==='22P02'){
      res.status(400).send({msg:`Bad request`})
    }
    next(err)
  })

  app.all('*', (req, res, next) => {
    res.status(404).send({
      status:404,
      msg: `Api does not exist`
    });
  });



module.exports=app
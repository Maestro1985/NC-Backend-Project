const express = require("express");
const{getTopics, getArticleById, getArticles, getArticleWithComments, getComment, getVotes, deleteCommentById}=require('./controllers/controllers')
const endPoints=require('./endpoints.json')
const app = express();
app.use(express.json());





app.get("/api/topics",getTopics);
app.get("/api",(req,res,next)=>{
    
    res.status(200).send(endPoints);
    
})

app.get('/api/articles', getArticles)
app.get("/api/articles/:article_id", getArticleById)
app.get('/api/articles/:article_id/comments', getArticleWithComments)


app.post('/api/articles/:article_id/comments', getComment);

app.patch('/api/articles/:article_id', getVotes)
app.delete('/api/comments/:comment_id', deleteCommentById);



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

  
  app.use((err, req, res, next) => {
  
    if(err.code==='23502'){
      res.status(400).send({msg:`Bad request`})
    }
    next(err)
  })
  app.use((err, req, res, next) => {
  
    if (err.code === '23503') {
    
     
    res.status(404).send({msg:`Not found`});
      } 
     
      next(err)
})
 
app.use((err, req, res, next) => {
  
  if(err.code==='42601'){
    res.status(400).send({msg:`Bad request`})
  }
  next(err)
})
  

  app.all('*', (req, res, next) => {
    res.status(404).send({
      status:404,
      msg: `Api does not exist`
    });
    next(err)
  });

  app.use((err, req, res, next) => {
    
    res.status(500).send('Server Error!');
  });



module.exports=app
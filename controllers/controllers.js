const {selectTopics, selectArticleById, selectArticles, selectArticleWithComments, checkArticleExists, insertComment,updateVotes, removeCommentById,selectUsers,checkTopicExists}=require('../models/models')


exports.getTopics = (req, res, next) => {

   
      
      selectTopics().then((topics) => {
      res.status(200).send({ topics });
    })

    .catch((err) => {
      
      console.log(err)
       return next(err);
      });
  };


 

  exports.getArticleById=(req,res,next)=>{
    const { article_id} = req.params;
    
    
    
      selectArticleById(article_id).then((article) => {
        res.status(200).send({ article })
        
      })
      .catch((err)=>{
        
        return next(err)
      })
    };

    exports.getArticles= (req, res, next)=>{
    
      const {topic}=req.query
      
      if (topic) {
        //topic values are mitch, paper and fantastic

        checkTopicExists(topic).then(topicExists => {
    if (!topicExists) {
      // this checks to see if topic doesnt exist in topics table- if it doesn't return a 404 msg
      return res.status(404).send({ msg: 'Topic does not exist' });
            }
        // return topics present in articles if they exist
    return selectArticles(topic).then(articles => {
              res.status(200).send({ articles });
            });
          })
          .catch(err => {
            next(err); 
          });
      } 
      else {
// if topic is not specified return an array of all articles
        selectArticles().then(articles => {
            res.status(200).send({ articles });
          })
          .catch(err => {
            next(err); 
          });
      }
    };
      
  
  
  
    
    exports.getArticleWithComments=(req, res, next)=>{
  
      const { article_id } = req.params;
      
    
 Promise.all([selectArticleWithComments(article_id), checkArticleExists(article_id)]).then(([comments])=>{

  res.status(200).send({comments})
        })

        .catch((err)=>{

          return next (err)
        })
}

exports.getComment = (req, res, next) => {
  const {article_id}=req.params
  
  const {username, body}= req.body;
  
  
insertComment(article_id,username, body).then((comment)=> {
    res.status(201).send({comment});
  })
 
  

  .catch((err)=>{
  
    return next(err)
  })
};

exports.getVotes=(req, res, next)=>{

const{article_id}=req.params

const {inc_votes}=req.body

updateVotes(article_id, inc_votes).then((articles)=>{

  res.status(200).send(articles)
})

.catch((err)=>{
  
  return next(err)
})
}

exports.deleteCommentById = (req, res, next) => {
  const { comment_id } = req.params;
  
  removeCommentById(comment_id).then(() => {
    res.status(204).send();
  })
  .catch((err)=>{
    
    return next(err)
  })
};

exports.getUsers = (req, res, next) => {

   
    
  selectUsers().then((users) => {
  res.status(200).send({ users });
})

.catch((err) => {
  
   return next(err);
  });
};

  
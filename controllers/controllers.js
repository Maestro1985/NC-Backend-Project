const {selectTopics, selectArticleById, selectArticles, selectArticleWithComments, checkArticleExists, insertComment}=require('../models/models')


exports.getTopics = (req, res, next) => {

   
    
      selectTopics().then((topics) => {
      res.status(200).send({ topics });
    })

    .catch((err) => {
        
       return next(err);
      });
  };

  exports.getArticleById=(req,res,next)=>{
    const { article_id } = req.params;

    selectArticleById(article_id).then((article) => {
        res.status(200).send({ article })
        
      })
      .catch((err)=>{
        
        return next(err)
      })
    };

    exports.getArticles= (req, res, next)=>{

      selectArticles().then((articles) => {
        res.status(200).send({ articles });
      })
      .catch((err)=>{
        
        return next(err)
      })

    }
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
  
  const newComment= req.body;
  
  
  insertComment(article_id,newComment).then((comment) => {
    res.status(201).send({ comment });
  })
  // You might need some error handling here
  

  .catch((err)=>{
    
    return next(err)
  })
};


  
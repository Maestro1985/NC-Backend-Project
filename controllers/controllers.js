const {selectTopics, selectArticleById, selectArticles}=require('../models/models')


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
  
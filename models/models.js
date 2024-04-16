const db=require('../db/connection')


exports.selectTopics = (endpoint) => {

    

    return db.query('SELECT * FROM topics').then((result) => {
        
          return result.rows
    });
  };

  exports.selectArticleById = (article_id) => {
    return db
      .query('SELECT * FROM articles WHERE article_id = $1;', [article_id])
      .then(({rows})=>{
  
        if(rows.length===0){

          return Promise.reject({status:404, msg:'Article does not exist'})
  
        }
        return rows[0]

      })
    }

    exports.selectArticles=()=>{


      return db.query(`SELECT articles.article_id, articles.title, articles.topic, articles.author, articles.created_at, articles.votes, articles.article_img_url, COUNT(comments.article_id) comment_count
      FROM articles
      LEFT JOIN comments ON articles.article_id = comments.article_id GROUP BY articles.article_id, articles.title, articles.topic, articles.author, articles.created_at, articles.votes, articles.article_img_url ORDER BY articles.created_at DESC`).then(({rows})=>{

     
        return rows
      })
    }
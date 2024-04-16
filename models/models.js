const db=require('../db/connection')


exports.selectTopics = (endpoint) => {

    

    if(endpoint !== '/api/topics'){

        return Promise.reject({ status: 404, msg: 'Api does not exist' });
    }
    
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
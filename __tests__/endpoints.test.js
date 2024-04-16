const seed = require("../db/seeds/seed.js");
const testData = require("../db/data/test-data");
const request = require("supertest");
const app = require("../app.js");
const db = require("../db/connection.js");
const endpoints=require('../endpoints.json')


beforeEach(() => seed(testData));
afterAll(() => db.end());

describe('/api/topics',()=>{

test('GET:200, responds with an array of all topics', ()=>{

return request(app).get('/api/topics').expect(200).then((response)=>{

expect(response.body.topics.length).toBe(3);

response.body.topics.forEach((topic) => {
    expect(typeof topic.slug).toBe("string");
    expect(typeof topic.description).toBe("string");
})
})
})

test('GET:404 sends an appropriate status and error message when given a non-existant api', () => {
    return request(app)
      .get("/api/top")
      .expect(404)
      .then(response => {

            
        expect(response.body.msg).toBe('Api does not exist');
      });
  });
})

describe('API Endpoints', () => {
    
    test('GET /api should return all available endpoints', () => {
      return request(app)
        .get('/api')
        .expect(200)
        .then(({body}) => {
            
          expect(body).toEqual(endpoints);
        });
    })
    
})

describe('/api/articles/:article_id endpoint', ()=>{


test('GET: 200 responds with a single id of articles',()=>{
    
        return request(app)
        .get('/api/articles/1')
        .expect(200)
        .then((response) => {
        expect(response.body.article.author).toBe("butter_bridge")
        expect(response.body.article.title).toBe("Living in the shadow of a great man")
        expect(response.body.article.article_id).toBe(1);
        expect(response.body.article.body).toBe("I find this existence challenging")
        expect(response.body.article.topic).toBe('mitch')
        expect(typeof response.body.article.created_at).toBe('string')
        expect(response.body.article.votes).toBe(100)
        expect(response.body.article.article_img_url).toBe("https://images.pexels.com/photos/158651/news-newsletter-newspaper-information-158651.jpeg?w=700&h=700")
        
})
})
test('GET:404 sends an appropriate status and error message when given a valid but non-existent id', () => {
  return request(app)
    .get('/api/articles/100')
    .expect(404)
    .then((response) => {
      expect(response.body.msg).toBe('Article does not exist');
    });
});

test('GET:400 sends an appropriate status and error message when given an invalid id', () => {
  return request(app)
    .get('/api/articles/not-a-article')
    .expect(400)
    .then((response) => {
      expect(response.body.msg).toBe('Bad request');
    });
});





})

const seed = require("../db/seeds/seed.js");
const testData = require("../db/data/test-data");
const request = require("supertest");
const app = require("../app.js");
const db = require("../db/connection.js");


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

// test('GET:404 sends an appropriate status and error message when given a non-existant api', () => {
//     return request(app)
//       .get("/api/top")
//       .expect(404)
//       .then((response) => {
        
//         expect(response.body.msg).toBe('Api does not exist');
//       });
//   });

})

import express from 'express';
import request from 'supertest';

const app = express();

app.get('/', (req, res) => {
  if(req.query.name) {
    res.status(200).send(`Hello, ${req.query.name}`);
  } else {
    res.status(400)
      .end();
  }
});

test('Test response status', async () => {
  let response = await request(app).get('/').query({name: 'Response !'});
  expect(response.status).toBe(200);
  expect(response.text).toBe('Hello, Response !');

  response = await request(app).get('/');
  expect(response.status).toBe(400);
});
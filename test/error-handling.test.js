import express from 'express';
import request from 'supertest';

const app = express();

const errorMiddleware = (err, req, res, next) => {
  res.status(500).send(`Terjadi error: ${err.message}`);
};

app.get('/', (req, res) => {
  throw new Error('Uppss'); 
});

app.use(errorMiddleware);

test('Test error handler', async () => {
  const response = await request(app).get('/');
  expect(response.status).toBe(500);
  expect(response.text).toBe('Terjadi error: Uppss')
});
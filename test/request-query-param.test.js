import express, { query } from 'express';
import request from 'supertest';

const app = express();

// untuk menjalankan unit test menggunakan supertest package, tidak perlu menjalankan server

app.get('/', (req, res) => {
  res.send(`Hello, ${req.query.name}`);
});

test('Test http get method with params', async () => {
  const response = await request(app).get('/').query({name: 'Dzikri Nur Akbar'});
  expect(response.text).toBe('Hello, Dzikri Nur Akbar');
});
import express from 'express';
import request from 'supertest';

const app = express();

// untuk menjalankan unit test menggunakan supertest package tidak perlu menjalankan server

app.get('/', (req, res) => {
  res.send(`Hello, world`);
});

test('Test http get method', async () => {
  const response = await request(app).get('/');
  expect(response.text).toBe('Hello, world');
});
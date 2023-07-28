import express, { query } from 'express';
import request from 'supertest';

const app = express();

// untuk menjalankan unit test menggunakan supertest package, tidak perlu menjalankan server

app.get('/', (req, res) => {
  const type = req.get('accept');
  res.send(`Hello, ${type}`);
});

test('Test http header', async () => {
  const response = await request(app).get('/').set('accept', 'text/plain');
  expect(response.text).toBe('Hello, text/plain');
});
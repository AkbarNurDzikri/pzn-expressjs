import express, { query } from 'express';
import request from 'supertest';

const app = express();

// untuk menjalankan unit test menggunakan supertest package, tidak perlu menjalankan server

app.get('/hello/world', (req, res) => {
  res.json({
    path: req.path,
    originalUrl: req.originalUrl,
    hostname: req.hostname,
    protocol: req.protocol,
    secure: req.secure,
  });
});

test('Test Request URL', async () => {
  const response = await request(app).get('/hello/world').query(({name: 'Dzikri'}));
  expect(response.body).toEqual({
    path: '/hello/world',
    originalUrl: '/hello/world?name=Dzikri',
    hostname: '127.0.0.1',
    protocol: 'http',
    secure: false,
  });
});
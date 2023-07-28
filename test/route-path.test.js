import express from 'express';
import request from 'supertest';

const app = express();

app.get('/products/*.json', (req, res) => {
  res.send(req.originalUrl);
});

app.get('/categories/*(\\d+).json', (req, res) => {
  res.send(req.originalUrl);
});

test('Test Route Path', async () => {
  let response = await request(app).get('/products/dzikri.json');
  expect(response.text).toBe('/products/dzikri.json');

  response = await request(app).get('/products/salah.json');
  expect(response.text).toBe('/products/salah.json');

  response = await request(app).get('/categories/5746.json');
  expect(response.text).toBe('/categories/5746.json');

  response = await request(app).get('/categories/salahancuyy.json');
  expect(response.status).toBe(404);
});
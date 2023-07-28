import express from 'express';
import request from 'supertest';

const app = express();

app.get('/', (req, res) => {
  res.set('content-type', 'text/html');
  res.send('<html><body>Hello world !</body></html>')
});

test('Test response body', async () => {
  const response = await request(app).get('/');
  expect(response.get('content-type')).toContain('text/html');
  expect(response.text).toBe('<html><body>Hello world !</body></html>');
});
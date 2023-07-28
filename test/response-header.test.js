import express from 'express';
import request from 'supertest';

const app = express();

app.get('/', (req, res) => {
  res.set({
    'x-powered-by': 'Programmer Zaman Now',
    'x-author': 'Dzikri Nur Akbar'
  });

  res.send('Hello, Response !');
});

test('Test response header', async () => {
  const response = await request(app).get('/');
  expect(response.text).toBe('Hello, Response !');
  expect(response.get('x-powered-by')).toBe('Programmer Zaman Now');
  expect(response.get('x-author')).toBe('Dzikri Nur Akbar');
});
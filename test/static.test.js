import express from 'express';
import request from 'supertest';

const app = express();
// app.use(express.static(__dirname + '/static'))
app.use('/static', express.static(__dirname + '/static'))

app.get('/', (req, res) => {
  res.send(`Hi everybody !`);
});

test('Test get static file', async () => {
  const response = await request(app).get('/');
  expect(response.text).toBe('Hi everybody !');                                                                                                
});

test('Test get static file2', async () => {
  const response = await request(app).get('/static/static-file.txt');
  expect(response.text).toBe('Ini adalah contoh static file');
});
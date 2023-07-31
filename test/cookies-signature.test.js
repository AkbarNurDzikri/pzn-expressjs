import express from 'express';
import request from 'supertest';
import cookieParser from 'cookie-parser';

const app = express();
app.use(cookieParser('SECRETKEYSANGATRAHASIA'));
app.use(express.json());

app.get('/', (req, res) => {
  const name = req.cookies.name;
  res.send(`Hello ${name}`);
});

app.post('/login', (req, res) => {
  const name = req.body.name;
  res.cookie('Login', name, {Path: '/', signed: true});
  res.send(`Hello ${name}`);
});

test('Test cookie read', async () => {
  const response = await request(app).get('/')
    .set('Cookie', 'name=Dzikri;author=Programmer Zaman Now');

  expect(response.text).toBe('Hello Dzikri');
});

test('Test cookie write', async () => {
  const response = await request(app).post('/login')
    .send({name: 'Dzikri'});
  
  expect(response.get('Set-cookie').toString()).toContain('Dzikri');
  expect(response.text).toBe('Hello Dzikri');
});
import express from 'express';
import request from 'supertest';
import cookieParser from 'cookie-parser';

const app = express();
app.use(cookieParser());
app.use(express.json());

app.get('/', (req, res) => {
  const name = req.cookies.name;
  res.send(`Hello ${name}`);
});

app.post('/login', (req, res) => {
  const name = req.body.name;
  res.cookie('Login', name, {Path: '/'});
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
  
  expect(response.get('Set-cookie').toString()).toBe('Login=Dzikri; Path=/');
  expect(response.text).toBe('Hello Dzikri');
});
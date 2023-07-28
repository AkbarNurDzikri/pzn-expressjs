import express from 'express';
import request from 'supertest';

const logger = (req, res, next) => {
  console.info(`Received request: ${req.method} ${req.originalUrl}`);
  next();
};

const addPoweredHeader = (req, res, next) => {
  res.set('x-powered-by', 'Programmer Zaman Now');
  next();
};

const apiKeyMiddleware = (req, res, next) => {
  if(req.query.apiKey) {
    next();
  } else {
    res.status(401).end();
  }
};

const middleWareTime = (req, res, next) => {
  req.requestTime = Date.now();
  next();
};

const app = express();
app.use(logger);
app.use(apiKeyMiddleware);
app.use(addPoweredHeader);
app.use(middleWareTime);

app.get('/', (req, res) => {
  res.send(`Hello, response`);
});

app.get('/dzikri', (req, res) => {
  res.send(`Hello, Dzikri`);
});

app.get('/time', (req, res) => {
  res.send(`Hi, today is ${req.requestTime}`);
});

test('Test response middleware', async () => {
  const response = await request(app).get('/').query({apiKey: 123});
  expect(response.get('x-powered-by')).toBe('Programmer Zaman Now');
  expect(response.text).toBe('Hello, response');
});

test('Test response middleware 2', async () => {
  const response = await request(app).get('/dzikri').query({apiKey: 2345});
  expect(response.get('x-powered-by')).toBe('Programmer Zaman Now');
  expect(response.text).toBe('Hello, Dzikri');
});

test('Test response middleware unauthorized', async () => {
  const response = await request(app).get('/dzikri');
  expect(response.status).toBe(401);
});

test('Test response middleware time', async () => {
  const response = await request(app).get('/time').query({apiKey: 123});
  expect(response.get('x-powered-by')).toBe('Programmer Zaman Now');
  expect(response.text).toContain('Hi, today is');
});
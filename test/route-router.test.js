import express from 'express';
import request from 'supertest';

const app = express();
const router = express.Router();


router.use((req, res, next) => {
  console.info(`Received request: ${req.originalUrl}`);
  next();
});


router.get('/features/a', (req, res) => res.send('Feature a'));

test('Tes router disabled', async () => {
  let response = await request(app).get('/feature/a');
  expect(response.status).toBe(404);
});

test('Tes Router enabled', async () => {
  app.use(router);

  const response = await request(app).get('/features/a');
  expect(response.text).toBe('Feature a')
});
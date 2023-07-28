import express from 'express';
import request from 'supertest';

const app = express();

app.get('/products/:id', (req, res) => {
  const idProduct = req.params.id;
  res.send(`Product ID: ${idProduct}`);
});

app.get('/categories/:id(\\d+)', (req, res) => {
  const idCategory = req.params.id;
  res.send(`Category ID: ${idCategory}`);
});

app.get('/seller/:idSeller/products/:idProducts', (req, res) => {
  const idSeller = req.params.idSeller;
  const idProduct = req.params.idProducts;
  res.send(`Product ID: ${idProduct} dari Seller: ${idSeller}`);
});

test('Test Route Parameter', async () => {
  let response = await request(app).get('/products/dzikri');
  expect(response.text).toBe('Product ID: dzikri');

  response = await request(app).get('/products/salah');
  expect(response.text).toBe('Produk ID: salah');

  response = await request(app).get('/categories/5746');
  expect(response.text).toBe('Category ID: 5764');

  response = await request(app).get('/categories/salahancuyy');
  expect(response.status).toBe(404);

  response = await request(app).get('/seller/0267/sepatu/0264');
  expect(response.status).toBe('Product ID: 0267 dari Seller: 0264');
});
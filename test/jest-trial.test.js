const sum = (first, second) => {
  return first + second;
};

test('Test fungsionalitas jest package', () => {
  const result = sum(1,3);
  expect(result).toBe(4);
});
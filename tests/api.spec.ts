import { test, expect } from '@playwright/test';

const API_URL = 'https://jsonplaceholder.typicode.com';

test('GET a single post returns correct data', async ({ request }) => {
  const response = await request.get(`${API_URL}/posts/1`);

  expect(response.status()).toBe(200);
  const body = await response.json();
  expect(body.id).toBe(1);
  expect(body.title).toBeTruthy();
  expect(body.userId).toBe(1);
});

test('GET a missing post returns 404', async ({ request }) => {
  const response = await request.get(`${API_URL}/posts/99999`);

  expect(response.status()).toBe(404);
});

test('POST creates a new post', async ({ request }) => {
  const response = await request.post(`${API_URL}/posts`, {
    data: { title: 'My first API test', body: 'Learning Playwright', userId: 1 },
  });

  expect(response.status()).toBe(201);
  const body = await response.json();
  expect(body.title).toBe('My first API test');
});
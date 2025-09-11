import { test, expect } from '@playwright/test';
import { registerRandomUser, registerFakerUser } from '../shared/apiUtils';


test.describe.configure({ mode: 'serial' });

test.describe('User API Tests', () => {
  const apiBaseUrl = 'http://localhost:3000/api/users'; // <— no trailing slash

  test('✔️ POST - Should register a new user', async ({ request }) => {
    const { response, newUser } = await registerRandomUser(request, apiBaseUrl);

    expect(response.status()).toBe(201);

    const body = await response.json();
    expect(body).toMatchObject({
      id: expect.any(Number),
      // optionally: name/email fields depending on your payload
    });
    expect(body).not.toHaveProperty('error');
  });

  test('✔️ GET - Should fetch user by ID', async ({ request }) => {
    // First create one, then fetch it
    const { response } = await registerRandomUser(request, apiBaseUrl);
    const created = await response.json();

    const getResp = await request.get(`${apiBaseUrl}/${created.id}`);
    expect(getResp.status()).toBe(200);

    const got = await getResp.json();
    expect(got).toMatchObject({ id: created.id });
  });

  test('✔️ POST - Should register a user using Faker', async ({ request }) => {
    const { response } = await registerFakerUser(request, apiBaseUrl);
    expect(response.status()).toBe(201);
    const body = await response.json();
    expect(body).not.toHaveProperty('error');
  });
});
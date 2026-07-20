import { test, expect } from '@playwright/test';
import { AuthApi } from '../../api/AuthApi';
test('Generate Authentication Token', async ({ request }) => {
  const authApi = new AuthApi(request);
  const token = await authApi.generateToken();
  expect(token).toBeTruthy();
  console.log(`Generated Token: ${token}`);
});
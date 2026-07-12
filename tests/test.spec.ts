import { test } from '@playwright/test';
import { FakerUtils } from '../utils/FakerUtils';
test('Generate Dynamic Data', async () => {
    const user = FakerUtils.getUser();
    console.log(user);
});
import { expect, test } from '@playwright/test';

test.describe('Challenge Tracker App', () => {
	test('details page displays correct post information', async ({ page }) => {
		await page.goto('/details/challenge_demo_sample');

		await expect(page.locator('h1')).toHaveText('Post Details');

		const firstRow = page.locator('tbody tr').first();
		await expect(firstRow.locator('th')).toHaveText('Sep 29, 2024');
		await expect(firstRow.locator('td').nth(0)).toHaveText('0');
		await expect(firstRow.locator('td').nth(1)).toHaveText('0');
		await expect(firstRow.locator('td').nth(2)).toHaveText('0');
		await expect(firstRow.locator('td').nth(3)).toHaveText('0');
		await expect(firstRow.locator('td').nth(4)).toHaveText('0');

		const dates = await page.locator('tbody tr th').allInnerTexts();
		expect(dates).toEqual(['Sep 29, 2024', 'Sep 28, 2024', 'Sep 27, 2024', 'Sep 26, 2024']);
	});
});

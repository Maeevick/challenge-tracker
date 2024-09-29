import { expect, test } from '@playwright/test';

test.describe('Challenge Tracker App', () => {
	test('home page displays challenge card', async ({ page }) => {
		await page.goto('/');
		await expect(page.locator('h1')).toHaveText('Home');
		const challengeCard = page.locator('a[href="/challenge/challenge_sample"]');
		await expect(challengeCard).toBeVisible();
		await expect(challengeCard.locator('h2')).toHaveText('Challenge Tracker Setup 2024');
		await expect(challengeCard.locator('p')).toContainText('Sep 26, 2024 - Sep 30, 2024');
	});
});
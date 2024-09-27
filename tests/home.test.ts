import { expect, test } from '@playwright/test';

test.describe('Challenge Tracker App', () => {
	test('home page displays challenge card', async ({ page }) => {
		await page.goto('/');
		await expect(page.locator('h1')).toHaveText('Challenges');
		const challengeCard = page.locator('a[href="/challenge/challenge_sample"]');
		await expect(challengeCard).toBeVisible();
		await expect(challengeCard.locator('h2')).toHaveText('Challenge Tracker Setup 2024');
		await expect(challengeCard.locator('p')).toContainText('26 septembre 2024 - 30 septembre 2024');
	});
});

import { expect, test } from '@playwright/test';

test.describe('Challenge Tracker App', () => {
	test('home page displays challenge card', async ({ page }) => {
		await page.goto('/');
		await expect(page.locator('h1')).toHaveText('Home');
		const challengeCard = page.locator('a[href="/challenge/challenge_demo_sample"]');
		await expect(challengeCard).toBeVisible();
		await expect(challengeCard.locator('h2')).toHaveText('Challenge Demo Sample');
		await expect(challengeCard.locator('p')).toContainText('Sep 26, 2024 - Sep 29, 2024');
		await expect(page.locator('footer')).toHaveText(
			`© ${new Date().getFullYear()} Challenge Tracker - Maeevick`
		);
	});
});

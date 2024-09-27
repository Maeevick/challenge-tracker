import { expect, test } from '@playwright/test';

test.describe('Challenge Tracker App', () => {
	test('challenge page displays correct information', async ({ page }) => {
		await page.goto('/challenge/challenge_sample');

		await expect(page.locator('h1')).toHaveText('Challenge Tracker Setup 2024');

		await expect(page.locator('text="Progress"')).toBeVisible();
		await expect(page.locator('text="3 / 4 days"')).toBeVisible();

		await expect(page.locator('text="Impressions: 6000"')).toBeVisible();
		await expect(page.locator('text="Reactions: 325"')).toBeVisible();
		await expect(page.locator('text="Comments: 62"')).toBeVisible();
		await expect(page.locator('text="Shares: 48"')).toBeVisible();
		await expect(page.locator('text="New Followers: 25"')).toBeVisible();

		await expect(page.locator('text="Setup the project"')).toBeVisible();
		await expect(
			page.locator(`text="Present it in the newsletter Maeevick's Bazaar"`)
		).toBeVisible();
		await expect(page.locator('text="Share insights and learnings on LinkedIn"')).toBeVisible();
	});
});

import { describe, it, expect } from 'vitest';
import { calculateEngagementRate, calculateAcquisitionRate, calculateTotalStats } from './stats';
import type { PostData } from '$lib/types';

describe('stats', () => {
	const samplePost: PostData = {
		date: '2024-10-01',
		impressions: 1000,
		reactions: 50,
		comments: 20,
		shares: 10,
		followers: 5,
		tags: ['test'],
		content: 'Test content'
	};

	describe('calculateEngagementRate', () => {
		it('should calculate engagement rate correctly', () => {
			expect(calculateEngagementRate(samplePost)).toBe(8);
		});
	});

	describe('calculateAcquisitionRate', () => {
		it('should calculate acquisition rate correctly', () => {
			expect(calculateAcquisitionRate(samplePost)).toBe(0.5);
		});
	});

	describe('calculateTotalStats', () => {
		it('should calculate total stats correctly', () => {
			const posts: PostData[] = [samplePost, { ...samplePost, impressions: 2000, reactions: 100 }];
			const totalStats = calculateTotalStats(posts);
			expect(totalStats.impressions).toBe(3000);
			expect(totalStats.reactions).toBe(150);
			expect(totalStats.comments).toBe(40);
			expect(totalStats.shares).toBe(20);
			expect(totalStats.followers).toBe(10);
		});
	});
});

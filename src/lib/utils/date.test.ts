import { describe, it, expect } from 'vitest';
import { formatDate, isDateInRange, calculateDaysPassed } from './date';

describe('date', () => {
	describe('formatDate', () => {
		it('should format date correctly', () => {
			expect(formatDate('2024-10-01')).toBe('1 octobre 2024');
		});
	});

	describe('isDateInRange', () => {
		it('should return true if date is in range', () => {
			expect(isDateInRange('2024-10-15', '2024-10-01', '2024-10-31')).toBe(true);
		});

		it('should return false if date is out of range', () => {
			expect(isDateInRange('2024-11-01', '2024-10-01', '2024-10-31')).toBe(false);
		});
	});

	describe('calculateDaysPassed', () => {
		it('should calculate days passed correctly', () => {
			const start = '2024-10-01';
			const current = '2024-10-15';
			expect(calculateDaysPassed(start, current)).toBe(14);
		});
	});
});

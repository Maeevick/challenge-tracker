import { describe, it, expect } from 'vitest';
import { formatDate, isDateInRange, calculateDaysPassed } from './date';

describe('date', () => {
	describe('formatDate', () => {
		it('should format date correctly', () => {
			expect(formatDate('2024-10-01')).toBe('Oct 1, 2024');
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
		it('should calculate days passed correctly (on the same day)', () => {
			const start = '2024-10-01';
			const current = '2024-10-1';
			expect(calculateDaysPassed(start, current)).toBe(1);
		});

		it('should calculate days passed correctly (in the same month)', () => {
			const start = '2024-10-01';
			const current = '2024-10-15';
			expect(calculateDaysPassed(start, current)).toBe(15);
		});

		it('should calculate days passed correctly (to the past)', () => {
			const start = '2024-10-15';
			const current = '2024-10-01';
			expect(calculateDaysPassed(start, current)).toBe(15);
		});

		it('should calculate days passed correctly (across months)', () => {
			const start = '2024-10-01';
			const current = '2024-11-05';
			expect(calculateDaysPassed(start, current)).toBe(36);
		});

		it('should calculate days passed correctly (across years)', () => {
			const start = '2024-10-01';
			const current = '2025-09-01';
			expect(calculateDaysPassed(start, current)).toBe(336);
		});
	});
});

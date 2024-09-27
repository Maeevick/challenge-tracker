export function formatDate(dateString: string): string {
	if (!dateString) {
		return '';
	}

	return new Intl.DateTimeFormat('en', {
		year: 'numeric',
		month: 'short',
		day: 'numeric'
	}).format(new Date(dateString));
}

export function isDateInRange(date: string, start: string, end: string): boolean {
	const checkDate = new Date(date);
	return checkDate >= new Date(start) && checkDate <= new Date(end);
}

export function calculateDaysPassed(
	start: string,
	current: string = new Date().toISOString()
): number {
	return Math.ceil(
		Math.abs(new Date(current).getTime() - new Date(start).getTime()) / (1000 * 60 * 60 * 24)
	);
}

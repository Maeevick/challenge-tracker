import { describe, it, expect } from 'vitest';
import { parseMarkdown, parseChallengeRules, parsePostData } from './markdown';

describe('markdown utils', () => {
	describe('parseMarkdown', () => {
		it('should parse front matter and body correctly', () => {
			const content = `---
title: Test
date: 2024-10-01
---
This is the body`;
			const result = parseMarkdown(content);
			expect(result.frontMatter).toEqual({ title: 'Test', date: '2024-10-01' });
			expect(result.body).toBe('This is the body');
		});
	});

	describe('parseChallengeRules', () => {
		it('should parse challenge rules correctly', async () => {
			const content = `---
title: October Challenge
start: 2024-10-01
end: 2024-10-31
---
## Objectives

- Post daily

## Abitions

- Growth

## Constraints

- Use LinkedIn only`;
			const result = await parseChallengeRules(content, 'slug');
			expect(result.slug).toBe('slug');
			expect(result.title).toBe('October Challenge');
			expect(result.start).toBe('2024-10-01');
			expect(result.end).toBe('2024-10-31');
			expect(result.objectives).toContain('<li>Post daily</li>');
			expect(result.ambitions).toContain('<li>Growth</li>');
			expect(result.constraints).toContain('<li>Use LinkedIn only</li>');
		});
	});

	describe('parsePostData', () => {
		it('should parse post data correctly', async () => {
			const content = `---
date: 2024-10-01
impressions: 1000
reactions: 50
comments: 20
shares: 10
followers: 5
tags: test, challenge
---
This is the post content`;
			const result = await parsePostData(content);
			expect(result.date).toBe('2024-10-01');
			expect(result.impressions).toBe(1000);
			expect(result.reactions).toBe(50);
			expect(result.comments).toBe(20);
			expect(result.shares).toBe(10);
			expect(result.followers).toBe(5);
			expect(result.tags).toEqual(['test', 'challenge']);
			expect(result.content).toContain('This is the post content');
		});
	});
});

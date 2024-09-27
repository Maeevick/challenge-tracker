import { describe, it, expect } from 'vitest';
import { parseChallengeRules, parsePostData } from './markdown';

describe('markdown utils', () => {
	describe('parseChallengeRules', () => {
		it('should parse challenge rules correctly with metadata and content', async () => {
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
			expect(result.content).toContain(
				`<h2>Objectives</h2>
<ul>
<li>Post daily</li>
</ul>
<h2>Abitions</h2>
<ul>
<li>Growth</li>
</ul>
<h2>Constraints</h2>
<ul>
<li>Use LinkedIn only</li>
</ul>`
			);
		});
	});

	describe('parsePostData', () => {
		it('should parse post data correctly with metadata and content', async () => {
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

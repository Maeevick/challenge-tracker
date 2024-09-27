import { marked } from 'marked';
import type { ChallengeRules, PostData } from '$lib/types';

export function parseMarkdown(content: string): {
	frontMatter: Record<string, string>;
	body: string;
} {
	const [, frontMatter, body] = content.split('---');
	const frontMatterObj = frontMatter.split('\n').reduce(
		(acc, line) => {
			const [key, value] = line.split(':').map((s) => s.trim());
			if (key && value) acc[key] = value;
			return acc;
		},
		{} as Record<string, string>
	);

	return { frontMatter: frontMatterObj, body: body.trim() };
}

export async function parseChallengeRules(content: string, slug: string): Promise<ChallengeRules> {
	const { frontMatter, body } = parseMarkdown(content);

	const [, objectives, ambitions, constraints] = body.split('##');

	return {
		slug,
		title: frontMatter.title,
		start: frontMatter.start,
		end: frontMatter.end,
		objectives: await marked.parse((objectives || '').split('\n').slice(2, -2).join('\n')),
		ambitions: await marked.parse((ambitions || '').split('\n').slice(2, -2).join('\n')),
		constraints: await marked.parse((constraints || '').split('\n').slice(2).join('\n'))
	};
}

export async function parsePostData(content: string): Promise<PostData> {
	const { frontMatter, body } = parseMarkdown(content);

	return {
		date: frontMatter.date,
		impressions: parseInt(frontMatter.impressions, 10),
		reactions: parseInt(frontMatter.reactions, 10),
		comments: parseInt(frontMatter.comments, 10),
		shares: parseInt(frontMatter.shares, 10),
		followers: parseInt(frontMatter.followers, 10),
		tags: frontMatter.tags.split(',').map((tag) => tag.trim()),
		content: await marked.parse(body)
	};
}

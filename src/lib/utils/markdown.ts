import { marked } from 'marked';
import type { ChallengeRules, PostData } from '$lib/types';

async function parseMarkdown(
	content: string
): Promise<{ frontMatter: Record<string, string>; body: string }> {
	const [, frontMatter, body] = content.split('---');
	const frontMatterObj = frontMatter
		.split('\n')
		.reduce((acc: Record<string, string>, line: string) => {
			const [key, value] = line.split(':').map((s) => s.trim());
			if (key && value) acc[key] = value;
			return acc;
		}, {});

	return { frontMatter: frontMatterObj, body: await marked.parse(body.trim()) };
}

export async function parseChallengeRules(content: string, slug: string): Promise<ChallengeRules> {
	const { frontMatter, body } = await parseMarkdown(content);
	return {
		slug,
		title: frontMatter.title,
		start: frontMatter.start,
		end: frontMatter.end,
		content: body
	};
}

export async function parsePostData(content: string): Promise<PostData> {
	const { frontMatter, body } = await parseMarkdown(content);
	return {
		date: frontMatter.date,
		impressions: parseInt(frontMatter.impressions, 10),
		reactions: parseInt(frontMatter.reactions, 10),
		comments: parseInt(frontMatter.comments, 10),
		shares: parseInt(frontMatter.shares, 10),
		followers: parseInt(frontMatter.followers, 10),
		tags: frontMatter.tags.split(',').map((tag) => tag.trim()),
		content: body
	};
}

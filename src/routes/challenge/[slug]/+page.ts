import { error } from '@sveltejs/kit';
import type { PageLoad } from './$types';
import { parseChallengeRules, parsePostData } from '$lib/utils/markdown';

export const load: PageLoad = async ({ params, fetch }) => {
	try {
		const rulesResponse = await fetch(`/challenges/${params.slug}/rules.md`);
		const rulesContent = await rulesResponse.text();

		const postsResponse = await fetch(`/api/posts?challenge=${params.slug}`);
		const postsContent = await postsResponse.json();

		return {
			rules: await parseChallengeRules(rulesContent, params.slug),
			posts: await Promise.all(postsContent.map(parsePostData))
		};
	} catch (e) {
		console.error('Error', e);
		throw error(404, 'Challenge not found');
	}
};

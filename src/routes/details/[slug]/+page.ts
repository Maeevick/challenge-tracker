import { error } from '@sveltejs/kit';
import type { PageLoad } from './$types';
import { parsePostData } from '$lib/utils/markdown';

export const load: PageLoad = async ({ params, fetch }) => {
	try {
		const postsResponse = await fetch(`/api/posts?challenge=${params.slug}`);
		const posts = await postsResponse.json();

		return {
			posts: await Promise.all(posts.map(parsePostData))
		};
	} catch (e) {
		console.error('Error', e);
		throw error(404, 'Challenge not found');
	}
};

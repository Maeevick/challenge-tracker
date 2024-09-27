import { error } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

import { getContentData } from '$lib/builder/store';

export { entries } from '$lib/builder/entries';

export const load: PageServerLoad = async ({ params }) => {
	const challengeData = getContentData(params.slug);
	if (!challengeData) {
		throw error(404, 'Challenge not found');
	}
	return {
		posts: challengeData.posts,
		challengeTitle: challengeData.rules.title
	};
};

import type { PostData } from '$lib/types';

export function calculateEngagementRate(post: PostData): number {
	const interactions = post.reactions + post.comments + post.shares;
	return (interactions / post.impressions) * 100 || 0;
}

export function calculateAcquisitionRate(post: PostData): number {
	return (post.followers / post.impressions) * 100 || 0;
}

export function calculateTotalStats(posts: PostData[]): PostData {
	return posts.reduce(
		(total, post) => ({
			date: '',
			impressions: total.impressions + post.impressions,
			reactions: total.reactions + post.reactions,
			comments: total.comments + post.comments,
			shares: total.shares + post.shares,
			followers: total.followers + post.followers,
			tags: [],
			content: ''
		}),
		{
			date: '',
			impressions: 0,
			reactions: 0,
			comments: 0,
			shares: 0,
			followers: 0,
			tags: [],
			content: ''
		}
	);
}

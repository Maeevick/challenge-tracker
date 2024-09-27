import type { ChallengeRules, PostData } from '../types';

type ContentData = {
	rules: ChallengeRules;
	posts: PostData[];
};

const contentStore: Record<string, ContentData> = {};

export function setContentData(slug: string, data: ContentData) {
	contentStore[slug] = data;
}

export function getContentData(slug: string): ContentData | undefined {
	return contentStore[slug];
}

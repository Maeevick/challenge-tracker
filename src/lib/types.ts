export interface ChallengeInfo {
	slug: string;
	title: string;
	start: string;
	end: string;
	isStarted: boolean;
	isFinished: boolean;
	thumbnail: string;
}

export interface PostData {
	date: string;
	impressions: number;
	reactions: number;
	comments: number;
	shares: number;
	followers: number;
	tags: string[];
	content: string;
}

export interface ChallengeRules {
	slug: string;
	title: string;
	start: string;
	end: string;
	objectives: string;
	ambitions: string;
	constraints: string;
}

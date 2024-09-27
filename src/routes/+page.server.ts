import { parseChallengeRules } from '$lib/utils/markdown';
import type { PageLoad } from './challenge/[slug]/$types';
import { error } from '@sveltejs/kit';
import fs from 'fs/promises';
import path from 'path';

export const load: PageLoad = async ({ params }) => {
	try {
		const challengesPath = path.join(process.cwd(), 'static', 'challenges');
		const directories = await fs.readdir(challengesPath, { withFileTypes: true });

		const challenges = await Promise.all(
			directories
				.filter((dirent) => dirent.isDirectory())
				.map(async (dirent) => {
					const rulesPath = path.join(challengesPath, dirent.name, 'rules.md');
					const rulesContent = await fs.readFile(rulesPath, 'utf-8');

					const { title, start, end } = await parseChallengeRules(rulesContent, params.slug);

					return {
						slug: dirent.name,
						title: title ?? 'Untitled Challenge',
						start: start ?? '',
						end: end ?? '',
						isStarted: new Date() >= new Date(start ?? ''),
						isFinished: new Date() >= new Date(end ?? ''),
						thumbnail: ''
					};
				})
		);

		return { challenges };
	} catch (err) {
		console.error('Error loading challenges:', err);
		throw error(500, 'Impossible de charger les challenges');
	}
};

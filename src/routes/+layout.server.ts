import fs from 'node:fs/promises';
import path from 'node:path';

import { error } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

import { setContentData } from '$lib/builder/store';
import { parseChallengeRules, parsePostData } from '$lib/utils/markdown';

export const load: PageServerLoad = async () => {
	try {
		const challengesPath = path.join(process.cwd(), 'static', 'challenges');
		const directories = await fs.readdir(challengesPath, { withFileTypes: true });

		const challenges = await Promise.all(
			directories
				.filter((dirent) => dirent.isDirectory())
				.map(async (dirent) => {
					const challengePath = path.join(challengesPath, dirent.name);

					const rulesPath = path.join(challengePath, 'rules.md');
					const rulesContent = await fs.readFile(rulesPath, 'utf-8');
					const rules = await parseChallengeRules(rulesContent, dirent.name);

					const files = await fs.readdir(challengePath);
					const postFiles = files.filter((file) => file.match(/^\d{8}\.md$/));
					const posts = await Promise.all(
						postFiles.map(async (file) => {
							const content = await fs.readFile(path.join(challengePath, file), 'utf-8');
							return parsePostData(content);
						})
					);

					setContentData(dirent.name, { rules, posts });

					return {
						slug: dirent.name,
						title: rules.title,
						start: rules.start,
						end: rules.end,
						isComing: new Date() < new Date(rules.start),
						isFinished: new Date() > new Date(rules.end),
						thumbnail: ''
					};
				})
		);

		return { challenges };
	} catch (err) {
		console.error('Error loading challenges:', err);
		throw error(500, 'Internal Error');
	}
};

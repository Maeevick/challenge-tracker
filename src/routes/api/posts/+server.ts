import { json, type RequestHandler } from '@sveltejs/kit';
import fs from 'fs/promises';
import path from 'path';

export const GET: RequestHandler = async ({ url }) => {
	const challenge = url.searchParams.get('challenge');
	if (!challenge) {
		return json({ error: 'Challenge parameter is required' }, { status: 400 });
	}

	const challengePath = path.join(process.cwd(), 'static', 'challenges', challenge);

	try {
		const files = await fs.readdir(challengePath);
		const postFiles = files.filter((file) => file.match(/^\d{8}\.md$/));

		if (postFiles.length === 0) {
			return json([], { status: 200 });
		}

		const posts = await Promise.all(
			postFiles.map((file) => fs.readFile(path.join(challengePath, file), 'utf-8'))
		);

		return json(posts);
	} catch (error) {
		console.error('Error reading challenge directory:', error);
		return json({ error: 'Failed to retrieve posts' }, { status: 500 });
	}
};

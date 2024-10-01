import fs, { type Dirent } from 'node:fs';
import path from 'node:path';

export function entries() {
	return fs
		.readdirSync(path.join(process.cwd(), 'static', 'challenges'), { withFileTypes: true })
		.map((dir: Dirent) => {
			return dir.isDirectory() && { slug: dir.name };
		})
		.filter(Boolean);
}

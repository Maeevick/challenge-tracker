<script lang="ts">
	import { _ } from 'svelte-i18n';
	import type { ChallengeInfo } from '$lib/types';
	import { formatDate } from '$lib/utils/date';
	import placeholder from '$lib/images/challenge.jpg';

	export let challenge: ChallengeInfo;
</script>

<a href={`/challenge/${challenge.slug}`} class="block">
	<div
		class="overflow-hidden rounded-lg bg-white shadow-md transition-transform hover:scale-105 dark:bg-gray-800"
	>
		<img
			src={challenge.thumbnail
				? `/challenges/${challenge.slug}/${challenge.thumbnail}`
				: placeholder}
			alt={challenge.title}
			class="m-4 h-48 w-full object-cover"
		/>
		<div class="p-4">
			<h2 class="mb-2 text-xl font-semibold">{challenge.title}</h2>
			<p class="text-sm text-gray-600 dark:text-gray-400">
				{formatDate(challenge.start)} - {formatDate(challenge.end)}
			</p>
			<span
				class="mt-2 inline-block rounded-full px-2 py-1 text-xs font-semibold {!challenge.isComing &&
				!challenge.isFinished &&
				!challenge.isAborted
					? 'bg-green-200 text-green-800'
					: challenge.isFinished
						? 'bg-gray-200 text-gray-800'
						: challenge.isAborted
							? 'bg-red-200 text-red-800'
							: 'bg-blue-200 text-blue-800'}"
			>
				{!challenge.isComing && !challenge.isFinished && !challenge.isAborted
					? $_('app.active')
					: challenge.isFinished
						? $_('app.completed')
						: challenge.isAborted
							? $_('app.aborted')
							: $_('app.coming')}
			</span>
		</div>
	</div>
</a>

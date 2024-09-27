<script lang="ts">
	import { _ } from 'svelte-i18n';
	import type { PostData } from '$lib/types';
	import { formatDate } from '$lib/utils/date';
	import { calculateEngagementRate, calculateAcquisitionRate } from '$lib/utils/stats';

	export let data: {
		posts: PostData[];
	};

	$: sortedPosts = data.posts.sort(
		(a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
	);
</script>

<h1 class="mb-8 text-3xl font-bold">{$_('details.postDetails')}</h1>

<div class="overflow-x-auto">
	<table class="w-full text-left text-sm text-gray-500 dark:text-gray-400">
		<thead class="bg-gray-50 text-xs uppercase text-gray-700 dark:bg-gray-700 dark:text-gray-400">
			<tr>
				<th scope="col" class="px-6 py-3">{$_('details.date')}</th>
				<th scope="col" class="px-6 py-3">{$_('details.impressions')}</th>
				<th scope="col" class="px-6 py-3">{$_('details.reactions')}</th>
				<th scope="col" class="px-6 py-3">{$_('details.comments')}</th>
				<th scope="col" class="px-6 py-3">{$_('details.shares')}</th>
				<th scope="col" class="px-6 py-3">{$_('details.newFollowers')}</th>
				<th scope="col" class="px-6 py-3">{$_('details.engagementRate')}</th>
				<th scope="col" class="px-6 py-3">{$_('details.acquisitionRate')}</th>
			</tr>
		</thead>
		<tbody>
			{#each sortedPosts as post}
				<tr class="border-b bg-white dark:border-gray-700 dark:bg-gray-800">
					<th
						scope="row"
						class="whitespace-nowrap px-6 py-4 font-medium text-gray-900 dark:text-white"
					>
						{formatDate(post.date)}
					</th>
					<td class="px-6 py-4">{post.impressions}</td>
					<td class="px-6 py-4">{post.reactions}</td>
					<td class="px-6 py-4">{post.comments}</td>
					<td class="px-6 py-4">{post.shares}</td>
					<td class="px-6 py-4">{post.followers}</td>
					<td class="px-6 py-4">{calculateEngagementRate(post).toFixed(2)}%</td>
					<td class="px-6 py-4">{calculateAcquisitionRate(post).toFixed(2)}%</td>
				</tr>
			{/each}
		</tbody>
	</table>
</div>

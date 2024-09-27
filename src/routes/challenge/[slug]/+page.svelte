<script lang="ts">
	import { _ } from 'svelte-i18n';
	import type { ChallengeRules, PostData } from '$lib/types';
	import { formatDate, calculateDaysPassed } from '$lib/utils/date';
	import {
		calculateTotalStats,
		calculateEngagementRate,
		calculateAcquisitionRate
	} from '$lib/utils/stats';

	export let data: {
		rules: ChallengeRules;
		posts: PostData[];
	};

	$: totalStats = calculateTotalStats(data.posts);
	$: totalDays = calculateDaysPassed(data.rules.start, data.rules.end);
	$: progress = (data.posts.length / totalDays) * 100;
	$: averageEngagementRate = calculateEngagementRate(totalStats);
	$: averageAcquisitionRate = calculateAcquisitionRate(totalStats);
</script>

<h1 class="mb-4 text-3xl font-bold">{data.rules.title}</h1>

<div class="mb-8 rounded-lg bg-white p-6 shadow-md dark:bg-gray-800">
	<h2 class="mb-4 text-2xl font-semibold">{$_('challenge.progress')}</h2>
	<div class="mb-2 flex justify-between">
		<span>{data.posts.length} / {totalDays} {$_('challenge.days')}</span>
	</div>
	<div class="mb-4 h-2.5 w-full rounded-full bg-gray-200 dark:bg-gray-700">
		<div class="h-2.5 rounded-full bg-blue-600" style="width: {progress}%"></div>
	</div>
	<div class="grid grid-cols-2 gap-4">
		<div>
			<h3 class="font-semibold">{$_('challenge.totalStats')}</h3>
			<p>{$_('challenge.impressions')} {totalStats.impressions}</p>
			<p>{$_('challenge.reactions')} {totalStats.reactions}</p>
			<p>{$_('challenge.comments')} {totalStats.comments}</p>
			<p>{$_('challenge.shares')} {totalStats.shares}</p>
			<p>{$_('challenge.newFollowers')} {totalStats.followers}</p>
		</div>
		<div>
			<h3 class="font-semibold">{$_('challenge.averages')}</h3>
			<p>{$_('challenge.engagementRate')} {averageEngagementRate.toFixed(2)}%</p>
			<p>{$_('challenge.acquisitionRate')} {averageAcquisitionRate.toFixed(2)}%</p>
		</div>
	</div>
</div>

<div class="rounded-lg bg-white p-6 shadow-md dark:bg-gray-800">
	<h2 class="mb-4 text-2xl font-semibold">{$_('challenge.rules')}</h2>
	<p class="mb-2">
		{formatDate(data.rules.start)} - {formatDate(data.rules.end)}
	</p>
	<h3 class="mb-2 mt-4 text-xl font-semibold">{$_('challenge.objectives')}</h3>
	{@html data.rules.objectives}
	<h3 class="mb-2 mt-4 text-xl font-semibold">{$_('challenge.ambitions')}</h3>
	{@html data.rules.ambitions}
	<h3 class="mb-2 mt-4 text-xl font-semibold">{$_('challenge.constraints')}</h3>
	{@html data.rules.constraints}
</div>

<a
	href="/details/{data.rules.slug}"
	class="mt-8 inline-block rounded bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-600"
>
	{$_('challenge.viewDetails')}
</a>

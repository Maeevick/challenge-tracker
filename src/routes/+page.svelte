<script lang="ts">
	import { _ } from 'svelte-i18n';
	import ChallengeCard from '$lib/components/ChallengeCard.svelte';
	import type { ChallengeInfo } from '$lib/types';

	export let data: { challenges: ChallengeInfo[] };
</script>

<h1 class="mb-8 text-3xl font-bold">{$_('app.home')}</h1>

<div class="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
	{#if data.challenges && data.challenges.length > 0}
		{#each data.challenges as challenge}
			<ChallengeCard {challenge} />
		{/each}
	{:else}
		<p>{$_('app.noChallenges')}</p>
	{/if}
</div>

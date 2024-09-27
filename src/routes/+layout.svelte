<script lang="ts">
	import '../app.css';
	import '$lib/i18n';
	import Layout from '$lib/components/Layout.svelte';
	import { onMount } from 'svelte';
	import { i18nReady } from '$lib/i18n';

	let ready = false;

	onMount(async () => {
		await i18nReady;
		ready = true;
	});
</script>

{#if ready}
	<Layout>
		<slot />
	</Layout>
{:else}
	<div>Loading...</div>
{/if}

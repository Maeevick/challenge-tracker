<script lang="ts">
	import { onMount } from 'svelte';
	import { browser } from '$app/environment';
	import { _, locale } from 'svelte-i18n';

	let year = new Date().getFullYear();

	let darkMode = false;

	onMount(() => {
		if (browser) {
			darkMode = localStorage.getItem('darkMode') === 'true';
			document.documentElement.classList.toggle('dark', darkMode);

			const savedLocale = localStorage.getItem('locale');
			if (savedLocale) {
				locale.set(savedLocale);
			}
		}
	});

	function toggleDarkMode() {
		darkMode = !darkMode;
		document.documentElement.classList.toggle('dark', darkMode);
		if (browser) {
			localStorage.setItem('darkMode', darkMode.toString());
		}
	}

	function changeLocale(event: Event) {
		const select = event.target as HTMLSelectElement;
		locale.set(select.value);
		if (browser) {
			localStorage.setItem('locale', select.value);
		}
	}
</script>

<div class="min-h-screen bg-gray-100 text-gray-900 dark:bg-gray-900 dark:text-gray-100">
	<nav class="bg-white shadow-md dark:bg-gray-800">
		<div class="container mx-auto flex items-center justify-between px-4 py-2">
			<a href="/" class="text-xl font-bold">{$_('app.title')}</a>
			<div>
				<a href="/" class="mr-4">{$_('app.home')}</a>
				<select
					on:change={changeLocale}
					class="mr-4 rounded border border-gray-300 bg-white px-2 py-1 dark:border-gray-600 dark:bg-gray-700"
				>
					<option value="en">🇺🇸</option>
					<option value="fr">🇫🇷</option>
				</select>
				<button on:click={toggleDarkMode} class="rounded-full bg-gray-200 p-2 dark:bg-gray-700">
					{darkMode ? '☀️' : '🌙'}
				</button>
			</div>
		</div>
	</nav>

	<main class="container mx-auto px-4 py-8">
		<slot />
	</main>

	<footer class="mt-8 bg-white shadow-md dark:bg-gray-800">
		<div class="container mx-auto px-4 py-4 text-center">
			&copy; {year} Challenge Tracker - Maeevick
		</div>
	</footer>
</div>

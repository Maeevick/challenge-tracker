import { browser } from '$app/environment';
import { init, register, waitLocale } from 'svelte-i18n';

register('en', () => import('./en.json'));
register('fr', () => import('./fr.json'));

init({
	fallbackLocale: 'en',
	initialLocale: browser ? window.navigator.language : 'en'
});
export const i18nReady = waitLocale();

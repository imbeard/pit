<script>
	import { headerHeight, menuOpen } from '$lib/stores/header';
	import { afterNavigate } from '$app/navigation';
	import { page } from '$app/stores';
	import Menu from '$lib/components/Menu.svelte';
	import { lockscroll } from '@svelte-put/lockscroll';

	$: navHeight = 0;
	$: headerHeight.set(navHeight);
	$: currentRoute = $page.url.pathname;
	$: locked = $menuOpen ? true : false;

	afterNavigate(() => {
		menuOpen.set(false);
	});
</script>

<svelte:body use:lockscroll={locked} />
<svelte:window on:resize={() => ($menuOpen = false)} />

<nav class="w-full p-xs fixed top-0 left-0 z-99 nav" bind:clientHeight={navHeight}>
	<a href="/" class="logo fixed z-10 top-0 left-0 m-1 lg:relative">
		<img src="/images/logo.svg" alt="logo" />
	</a>

	<div
		class="fixed lg:hidden flex w-full h-full justify-center items-center bg-white overflow-auto"
		class:hidden={!$menuOpen}
	>
		<Menu />
	</div>

	<div class="lg:block" class:hidden={!$menuOpen}>
		<Menu />
	</div>

	<button
		class="py-xs lg:py-s px-1 theme-gray-black fixed top-0 right-0 lg:hidden m-xs"
		on:click={() => ($menuOpen = !$menuOpen)}>{$menuOpen ? 'Close' : 'Menu'}</button
	>

	<button
		class="hidden py-xs px-1 m-xs theme-gray-black lg:block lg:fixed lg:py-s lg:top-0 lg:right-0"
		>Search</button>
</nav>

<style>
	.nav {
		display: grid;
		grid-template-columns: 1fr auto 1fr;
	}
</style>

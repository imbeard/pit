<script>
	import { headerHeight, menuOpen } from '$lib/stores/header';
	import { searchOpen, searchQuery } from '$lib/stores/search';
	import { afterNavigate } from '$app/navigation';
	import { page } from '$app/stores';
	import Menu from '$lib/components/Menu.svelte';
	import Search from '$lib/components/Search.svelte';
	import { lockscroll } from '@svelte-put/lockscroll';

	$: navHeight = 0;
	$: headerHeight.set(navHeight);
	$: locked = $menuOpen ? true : false;

	const resetInput = () => {
		searchQuery.set('');
	};

	afterNavigate(() => {
		menuOpen.set(false);
	});
</script>

<svelte:body use:lockscroll={locked} />
<svelte:window
	on:resize={() => {
		$menuOpen = false;
		$searchOpen = false;
	}}
/>

<nav class="w-full p-xs fixed top-0 left-0 z-99 nav" bind:clientHeight={navHeight}>
	<a href="/" class="logo fixed z-10 top-0 left-0 m-1 lg:ml-0 lg:relative">
		<img src="/images/logo.svg" alt="logo" />
	</a>

	<div
		class="fixed top-0 left-0 flex w-full h-full justify-center items-center bg-white overflow-auto lg:hidden"
		class:hidden={!$menuOpen}
	>
		<Menu />
	</div>

	<div class="hidden lg:block">
		<Menu />
	</div>

	<button
		class="py-xs px-1 theme-gray-black fixed top-0 right-0 m-xs lg:hidden"
		on:click={() => ($menuOpen = !$menuOpen)}
		on:click={() => resetInput()}>{$menuOpen ? 'Close' : 'Menu'}</button
	>

	<div class="hidden lg:block lg:fixed lg:top-0 lg:right-0">
		<button
			class="btn-animate py-xs px-1 m-xs text-black hover:text-pink hover:bg-black lg:py-s"
			class:bg-gray={!$searchOpen}
			class:bg-black={$searchOpen}
			class:text-pink={$searchOpen}
			on:click={() => ($searchOpen = !$searchOpen)}
			on:click={() => resetInput()}
		>
			<span>{$searchOpen ? 'Close' : 'Search'}</span></button
		>
	</div>

	<Search />
</nav>

<style>
	.nav {
		display: grid;
		grid-template-columns: 1fr auto 1fr;
	}
</style>

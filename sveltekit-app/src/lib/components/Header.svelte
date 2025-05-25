<script>
	import { headerHeight } from '$lib/stores/header';
	$: navHeight = 0;
	$: headerHeight.set(navHeight);
</script>

<nav class="w-full p-xs fixed top-0 left-0 z-99 nav" bind:clientHeight={navHeight}>
	<div class="logo mt-1">
		<img src="/images/logo.svg" alt="logo" />
	</div>
	<div class="flex">
		<a class="py-s px-1 bg-gray hover:theme-pink-red" href="/about">About</a>
		<a class="py-s px-1 bg-gray hover:theme-brown-pink" href="/performances">Performances </a>
		<a class="py-s px-1 bg-gray hover:theme-red-pink" href="/people">People</a>
		<a class="py-s px-1 bg-gray hover:theme-blue-pink" href="/partners">Partners</a>
		<a class="py-s px-1 bg-gray hover:theme-black-pink" href="/events">Events</a>
		<a class="py-s px-1 bg-gray hover:theme-brown-gray" href="/manifesto">Manifesto</a>
		<a class="py-s px-1 bg-gray hover:theme-pink-brown" href="/contact">Contact</a>
	</div>
	<button class="w-fit py-s px-1 bg-gray justify-self-end">Search</button>
</nav>

<style>
	.nav {
		display: grid;
		grid-template-columns: 1fr auto 1fr;
	}
</style>

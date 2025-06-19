<script>
	import { page } from '$app/stores';
	$: currentRoute = $page.url.pathname;
</script>

<div class="flex flex-col gap-xs items-center lg:gap-0 lg:items-baseline lg:flex-row">
	<a
		class="py-xs lg:py-s px-1 hover:theme-pink-red"
		class:theme-pink-red={currentRoute.includes('/about')}
		class:bg-gray={!currentRoute.includes('/about')}
		href="/about">About</a
	>
	<a
		class="py-xs lg:py-s px-1 hover:theme-brown-pink"
		class:theme-brown-pink={currentRoute.includes('/performances')}
		class:bg-gray={!currentRoute.includes('/performances')}
		href="/performances"
		>Performances
	</a>
	<a
		class="py-xs lg:py-s px-1 hover:theme-red-pink"
		class:theme-red-pink={currentRoute.includes('/people')}
		class:bg-gray={!currentRoute.includes('/people')}
		href="/people">People</a
	>
	<a
		class="py-xs lg:py-s px-1 hover:theme-blue-pink"
		class:theme-blue-pink={currentRoute.includes('/partners')}
		class:bg-gray={!currentRoute.includes('/partners')}
		href="/partners">Partners</a
	>
	<a
		class="py-xs lg:py-s px-1 hover:theme-black-pink"
		class:theme-black-pink={currentRoute.includes('/events')}
		class:bg-gray={!currentRoute.includes('/events')}
		href="/events">Events</a
	>
	<a
		class="py-xs lg:py-s px-1 hover:theme-blue-pink"
		class:theme-brown-gray={currentRoute.includes('/resources')}
		class:bg-gray={!currentRoute.includes('/resources')}
		href="/resources">Resources</a
	>
	<a
		class="py-xs lg:py-s px-1 hover:theme-brown-gray"
		class:theme-brown-gray={currentRoute.includes('/manifesto')}
		class:bg-gray={!currentRoute.includes('/manifesto')}
		href="/manifesto">Manifesto</a
	>
	<a
		class="py-xs lg:py-s px-1 hover:theme-pink-brown"
		class:theme-pink-brown={currentRoute.includes('/contact')}
		class:bg-gray={!currentRoute.includes('/contact')}
		href="/contact">Contact</a
	>
</div>

<div class="fixed bottom-0 left-0 flex justify-center w-full lg:hidden">
	<button class="py-xs px-1 m-xs theme-gray-black">Search</button>
</div>

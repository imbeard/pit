<script>
	import LogoFooter from '$lib/components/svg/LogoFooter.svelte';
	import Link from '$lib/components/element/Link.svelte';
	export let data;
	$: currentYear = new Date().getFullYear();
</script>

<div class="w-full footer relative flex flex-col justify-between">
	<div class="p-xs w-full flex flex-col gap-xs items-center md:items-start md:grid-3">
		<div class="w-[30vw] md:max-w-20">
			<LogoFooter />
		</div>
		<div class="typo-s md:typo-base text-center max-w-50 pt-xs md:pt-0">{data?.footer?.text}</div>
		<div class="text-right hidden md:block">
			{#if data?.social}
				<ul class="flex items-end flex-col">
					{#each data?.social as link}
						<li class="hover:text-red w-fit h-fit"><Link to={link} target="_blank" /></li>
					{/each}
				</ul>
			{/if}
		</div>
	</div>
	<div
		class="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex flex-col items-center gap-1"
	>
		<div class="typo-lg md:typo-2xl text-center whitespace-nowrap">Get in touch</div>
		<a
			href="/contact"
			class="text-black bg-red hover:text-red hover:bg-black w-fit text-[40px] p-s leading-2 whitespace-nowrap md:typo-base md:p-xs"
		>
			Contact Us <span class="align-super typo-lg leading-0 md:typo-s">&nearr;</span>
		</a>
	</div>

	<div>
		<div class="flex flex-col text-center md:hidden hover:text-red">
			<a href="mailto:{data?.email}">{data?.email}</a>
			<a href="tel:{data?.phone}">{data?.phone}</a>
			<a class="h-fit" href="https://parco.studio/" target="_blank">Design by Parco</a>
			{#if data?.social}
				<ul class="flex gap-xs text-center justify-center">
					{#each data?.social as link}
						<li><Link to={link} target="_blank" /></li>
					{/each}
				</ul>
			{/if}
			<div>© PIT {currentYear}</div>
		</div>

		<div class="w-full md:grid-3 p-xs items-baseline">
			<div class="hidden md:block">
				<a class="hover:text-red w-fit h-fit" href="mailto:{data?.email}">{data?.email}</a>
			</div>
			<img class="w-10 justify-self-center mx-auto" src="/images/eu-funded-logo.svg" alt="" />
			<div class="hidden md:block text-right hover:text-red">
				<a class="hover:text-red w-fit h-fit" href="tel:{data?.phone}">{data?.phone}</a>
			</div>
		</div>
		<div class="border-t border-gray w-full grid-3 p-xs">
			<a class="hover:text-red w-fit h-fit" href="https://parco.studio/" target="_blank">Design by Parco</a>
			<div class="text-center hidden md:block">© PIT 2025</div>
			<div class="hidden md:block text-right">
				<ul class="flex gap-xs justify-end">
					<li class="hover:text-red w-fit h-fit">Privacy Policy</li>
					<li class="hover:text-red w-fit h-fit">Cookies</li>
				</ul>
			</div>
			<div class="justify-self-center md:hidden hover:text-red">Privacy Policy</div>
			<div class="justify-self-end md:hidden hover:text-red">Cookies</div>
		</div>
	</div>
</div>

<style>
	.footer {
		height: calc(100svh - 5.2rem);
		background: linear-gradient(rgba(185, 185, 185, 1) 15%, rgba(185, 185, 185, 0) 70%);
	}

	@media screen and (min-width: 768px) {
		.footer {
			height: calc(100svh - 12rem);
		}
	}
</style>

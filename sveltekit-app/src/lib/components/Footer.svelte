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
		class="py-2 flex flex-col items-center gap-1 md:absolute md:top-1/2 md:left-1/2 md:transform md:-translate-x-1/2 md:-translate-y-1/2"
	>
		<div class="typo-lg md:typo-2xl text-center whitespace-nowrap">Get in touch</div>
		<a
			href="/contact"
			class="text-black bg-red hover:text-red hover:bg-black w-fit text-[10vw] leading-[6vw] p-s whitespace-nowrap md:leading-none md:typo-base md:p-xs"
		>
			Contact Us <span class="align-super typo-lg leading-0 md:typo-s">&nearr;</span>
		</a>
	</div>

	<div>
		<div class="flex flex-col text-center md:hidden hover:text-red">
			{#if data?.email}<a href="mailto:{data?.email}">{data?.email}</a>{/if}
			{#if data?.phone}<a href="tel:{data?.phone}">{data?.phone}</a>{/if}
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
				{#if data?.email}
					<a class="hover:text-red w-fit h-fit" href="mailto:{data?.email}">{data?.email}</a>
				{/if}
			</div>
			<img class="w-10 justify-self-center mx-auto" src="/images/eu-funded-logo.svg" alt="" />
			<div class="hidden md:block text-right hover:text-red">
				{#if data?.phone}
					<a class="hover:text-red w-fit h-fit" href="tel:{data?.phone}">{data?.phone}</a>
				{/if}
			</div>
		</div>
		<div class="border-t border-gray w-full grid-2 md:grid-3 p-xs">
			<a
				class="hidden md:block hover:text-red w-fit h-fit"
				href="https://parco.studio/"
				target="_blank">Design by Parco</a
			>
			<div class="text-center hidden md:block">© PIT 2025</div>
			<div class="hidden md:block text-right">
				<ul class="flex gap-xs justify-end">
					<li class="hover:text-red w-fit h-fit"><a href="/privacy-policy">Privacy Policy</a></li>
					<li class="hover:text-red w-fit h-fit"><a href="/cookie-policy">Cookies</a></li>
				</ul>
			</div>
			<div class="justify-self-start md:hidden hover:text-red">
				<a href="/privacy-policy">Privacy Policy</a>
			</div>
			<div class="justify-self-end md:hidden hover:text-red">
				<a href="/cookie-policy">Cookies</a>
			</div>
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

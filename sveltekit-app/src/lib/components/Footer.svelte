<script>
	import LogoFooter from '$lib/components/svg/LogoFooter.svelte';
	import Link from '$lib/components/element/Link.svelte';
	export let data;
</script>

<div class="w-full footer relative flex flex-col justify-between">
	<div class="p-xs w-full grid-3">
		<div>
			<LogoFooter />
		</div>
		<div class="text-center">{data?.footer?.text}</div>
		<div class="text-right">
			{#if data?.social}
				<ul>
					{#each data?.social as link}
						<li><Link to={link} target="_blank" /></li>
					{/each}
				</ul>
			{/if}
		</div>
	</div>
	<div
		class="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex flex-col items-center gap-1"
	>
		<div class="typo-2xl">Get in touch</div>
		<div  class="theme-red-black button w-fit">
            <Link to={data?.footer?.contact} />
             
        </div>
	</div>
	<div>
		<div class="w-full grid-3 p-xs">
			<div>Email</div>
			<div class="text-center">Eu Funded</div>
			<div class="text-right">Phone</div>
		</div>
		<div class="border-t border-gray w-full grid-3 p-xs">
			<div>Imprint</div>
			<div class="text-center">© PIT 2025</div>
			<div class="text-right">
				<ul class="flex gap-xs justify-end">
					<li>Privacy Policy</li>
					<li>Cookies</li>
				</ul>
			</div>
		</div>
	</div>
</div>

<style>
	.footer {
		height: calc(100svh - 12rem);
		background: linear-gradient(rgba(185, 185, 185, 1) 15%, rgba(185, 185, 185, 0) 70%);
	}
</style>

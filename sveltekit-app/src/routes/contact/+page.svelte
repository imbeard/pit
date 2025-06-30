<script>
	import PortableText from '$lib/components/element/PortableText.svelte';
	export let data;
	$: contacts = data?.page?.data?.contacts;
	$: theme = 'hover:theme-pink-brown';
</script>

<div class="flex flex-col justify-start pt-6 items-center md:justify-center min-h-screen">
	<h1 class="typo-base">Contacts</h1>
	<h2 class="typo-base">PIT project officers at Bozar and contact persons</h2>
	<div class="absolute top-0 left-0 w-full h-full md:relative">
		<div class="flex flex-col gap-6 justify-center items-center w-full h-full md:py-16">
			{#if contacts && contacts.length > 0}
				{#each contacts as contact}
					<div class="typo-lg">
						<div class="text-center">{contact.title}</div>
						<div class="text-center">{contact.subtitle}</div>
						<div class="contact">
							<PortableText data={contact.content} {theme} />
						</div>
					</div>
				{/each}
			{/if}
		</div>
	</div>
</div>

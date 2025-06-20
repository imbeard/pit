<script>
    import PortableText from '$lib/components/element/PortableText.svelte';
	export let data;
	$: contacts = data?.page?.data?.contacts;
</script>

<div class="flex flex-col justify-start pt-6 items-center md:justify-center min-h-screen">
	<h1 class="typo-base">Contacts</h1>
	<h2 class="typo-base">PIT project officers at Bozar and contact persons</h2>
	<div class="flex flex-col gap-6 justify-center items-center w-full h-full pt-12 md:py-6">
		{#if contacts && contacts.length > 0}
			{#each contacts as contact}
                <div class="typo-lg">
                    <div class="text-center">{contact.title}</div>
                    <div class="text-center">{contact.subtitle}</div>
                    <PortableText data={contact.content} />
                </div>
            {/each}
		{/if}
	</div>
</div>

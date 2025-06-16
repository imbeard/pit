<script>
	import PartnerCard from '$lib/components/thumbnails/PartnerCard.svelte';
	export let partners;
</script>

<section class="pt-xs">
	<ul class="grid-2 md:grid-3">
		{#each partners as partner}
			<li>
                <PartnerCard thumbnail={partner.institution} />
                <div class="text-center mx-auto pt-1">{partner.role}</div>
            </li>
		{/each}
	</ul>
</section>

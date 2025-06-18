<script>
	import PartnerCard from '$lib/components/thumbnails/PartnerCard.svelte';
	export let partners;
</script>

<div>
	<div class="w-full">
		<h3 class="uppercase typo-lg pb-xs">Partnering Institutions</h3>
		<hr class="text-gray" />
	</div>
	<ul class="md:grid-3 pt-xs">
		{#each partners as partner}
			<li>
				<PartnerCard thumbnail={partner?.institution || partner} />
				{#if partner.role}<div class="text-center mx-auto pt-1">{partner.role}</div>{/if}
			</li>
		{/each}
	</ul>
</div>

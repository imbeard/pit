<script lang="ts">
	export let data;

	$: document = data?.page?.data;
	$: console.log(document);
</script>

<section>
	<div class="font-sans text-2xl theme-brown-black button">asjkb</div>
</section>

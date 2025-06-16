<script>
	import { dateYear } from '$lib/utils';
	import Image from '$lib/components/element/Image.svelte';
	import PageBuilder from '$lib/components/PageBuilder.svelte';
	export let data;
	$: person = data?.person?.data[0];
	$: pageBuilder = person?.pageBuilder;
</script>

<div class="w-full">
	<section class="w-full flex justify-center pt-10">
		<div class="pb-6 border-b border-gray w-full relative">
			<div class="flex flex-col items-center">
				<div class="typo-s">People</div>
				<div class="typo-lg">{person?.name}</div>
				<div class="typo-lg">{person?.job}</div>
				<div class="flex gap-xs typo-s">
					<span>{person.country}</span>
					<span>{dateYear(person.dateBirth)}</span>
				</div>
			</div>
			<div class="w-full h-[50vh] mx-auto pt-4">
				<Image image={person?.image} fit="contain" />
			</div>
		</div>
	</section>

	<div class="p-xs">
		{#if pageBuilder}
			<PageBuilder sections={pageBuilder.sections} />
		{/if}
	</div>

	<div class="sticky bottom-[10vh] flex justify-end -rotate-20">
		<div class="relative">
            <img src="/clouds/blue-cloud-sx.svg" alt="" />
            <a href="/performances/{person?.performance?.slug}" class="absolute top-0 bottom-0 left-0 right-0 text-center text-pink flex flex-col justify-center items-center h-full w-full -mt-1">
                <div>Associated Performance</div>
                <div class="typo-lg">{person?.performance.title}</div>
            </a>
        </div>
	</div>
</div>

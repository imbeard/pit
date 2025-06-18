<script>
	import { dateYear } from '$lib/utils';
	import Image from '$lib/components/element/Image.svelte';
	import PageBuilder from '$lib/components/PageBuilder.svelte';
	import CloudShape from '$lib/components/svg/CloudShape-5.svelte';
	import Cloud from '$lib/components/Cloud.svelte';
	export let data;

	$: person = data?.person?.data[0];
	$: pageBuilder = person?.pageBuilder;
	$: cloudBg = person?.performance?.theme.split('-')[0];
	$: cloudFg = person?.performance?.theme.split('-')[1];
</script>

<div class="px-xs">
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
			<div class="max-h-30 h-30 md:w-full md:h-[50vh] mx-auto pt-4">
				<Image image={person?.image} fit="contain" />
			</div>

			<div class="md:hidden w-full flex justify-end px-xs">
				<Cloud
					entry={person?.performance}
					category="performances"
					link="/performances/{person?.performance?.slug}"
					{cloudFg}
					{cloudBg}
					rotation="-20"
				>
					<div slot="shape">
						<CloudShape {cloudBg} {cloudFg} link="/performances/{person?.performance?.slug}" />
					</div>

					<div slot="title">Associated Performance</div>
				</Cloud>
			</div>
		</div>
	</section>
</div>

<div class="p-xs relative">
	<div class="hidden md:block absolute h-full right-5">
		<div class="sticky top-32 h-auto flex justify-end -mt-30">
			<Cloud
				entry={person?.performance}
				category="performances"
				link="/performances/{person?.performance?.slug}"
				{cloudFg}
				{cloudBg}
				rotation="-20"
			>
				<div slot="shape">
					<CloudShape {cloudBg} {cloudFg} link="/performances/{person?.performance?.slug}" />
				</div>

				<div slot="title">Associated Performance</div>
			</Cloud>
		</div>
	</div>

	{#if pageBuilder}
		<PageBuilder sections={pageBuilder.sections} />
	{/if}
</div>

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
				{#if person?.job}
					<div class="typo-lg">{person?.job}</div>
				{/if}
				<div class="flex gap-xs typo-s">
					{#if person?.country}
						<span>{person.country}</span>
					{/if}
					{#if person?.dateBirth}
						<span>{dateYear(person.dateBirth)}</span>
					{/if}
				</div>
			</div>

			{#if person?.image}
				<div class="h-[50vh] w-full pt-4 flex justify-center items-center">
					<Image image={person?.image} fit="contain" height="full" />
				</div>
			{/if}

			{#if person?.performance}
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
			{/if}
		</div>
	</section>
</div>

<div class="p-xs relative">
	{#if person?.performance}
		<div class="hidden md:block absolute h-full right-5">
			<div class="sticky top-7 h-auto flex justify-end -mt-30">
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
	{/if}

	{#if pageBuilder}
		<PageBuilder sections={pageBuilder.sections} />
	{/if}
</div>

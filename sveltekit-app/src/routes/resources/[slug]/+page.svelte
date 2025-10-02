<script>
	import PageBuilder from '$lib/components/PageBuilder.svelte';
	import CloudShape from '$lib/components/svg/CloudShape-6.svelte';
	import Cloud from '$lib/components/Cloud.svelte';
	import Download from '$lib/components/svg/Download.svelte';
	import { formatDate } from '$lib/utils';
	import SEO from '$lib/components/seo/SEO.svelte';

	export let data;
	$: resource = data?.resource?.data[0];
	$: pageBuilder = resource?.pageBuilder;

	$: cloudBg = resource?.performance?.theme.split('-')[0];
	$: cloudFg = resource?.performance?.theme.split('-')[1];
</script>

<SEO data={resource?.seo} />

<div class="pt-8 p-xs">
	<section class="hero">
		<div class="w-full relative col-start-1 col-end-13 pb-6">
			<div class="flex flex-col items-center">
				<div class="flex justify-center typo-s gap-xs">
					<span>Resources</span>
					{#if resource?.typology}<span>{resource?.typology}</span>{/if}
					{#if resource?._createdAt}<span>{formatDate(resource?._createdAt)}</span>{/if}
				</div>
				{#if resource?.title}
					<div class="typo-2xl text-center pt-[1.2rem] max-w-7xl">{resource?.title}</div>
				{/if}
			</div>
		</div>

		{#if resource?.performance}
			<div class="md:hidden w-full flex justify-end px-xs">
				<Cloud
					entry={resource?.performance}
					category="performances"
					link="/performances/{resource?.performance?.slug}"
					{cloudFg}
					{cloudBg}
					rotation="-16"
				>
					<div slot="shape">
						<CloudShape {cloudBg} {cloudFg} link="/performances/{resource?.performance?.slug}" />
					</div>

					<div slot="title">Associated Performance</div>
				</Cloud>
			</div>
		{/if}
	</section>

	{#if pageBuilder.sections && pageBuilder.sections.length > 0}
		<div class="pt-s">
			
			{#if resource?.performance}
				<div class="hidden md:block absolute h-full right-5">
					<div class="sticky top-7 h-auto flex justify-end -mt-30 z-20">
						<Cloud
							entry={resource?.performance}
							category="performances"
							link="/performances/{resource?.performance?.slug}"
							{cloudFg}
							{cloudBg}
							rotation="-20"
						>
							<div slot="shape">
								<CloudShape
									{cloudBg}
									{cloudFg}
									link="/performances/{resource?.performance?.slug}"
								/>
							</div>

							<div slot="title">Associated Performance</div>
						</Cloud>
					</div>
				</div>
			{/if}

			<PageBuilder sections={pageBuilder.sections} />
		</div>
	{/if}

	{#if resource?.downloads && resource?.downloads.length > 0}
		<div class="pt-12">
			<h3 class="typo-lg w-full border-b border-gray pb-xs">Downloads</h3>
			<div class="flex flex-col pt-xs md:grid-6">
				{#each resource?.downloads as download}
					<a
						href={download?.url?.asset?.url}
						class="cursor-pointer w-fit grid-8 items-top pb-xs md:flex md:flex-col"
						target="_blank"
						download
					>
						<div class="col-start-1 col-end-4">
							<Download />
						</div>
						<div class="col-start-4 col-end-9">
							<div class="pt-xs text-center typo-s">{download?.url?.asset?.mimeType}</div>
							<div class="pt-xs typo-lg">{download?.title}</div>
						</div>
					</a>
				{/each}
			</div>
		</div>
	{/if}
</div>

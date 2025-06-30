<script>
	// @ts-nocheck
	import PortableText from '$lib/components/element/PortableText.svelte';
	import CloudsAbout from '$lib/components/CloudsAbout.svelte';
	import Accordion from '$lib/components/element/Accordion.svelte';
	import Marquee from '$lib/components/element/Marquee.svelte';

	export let data;
	$: document = data?.page?.data;
	$: partners = data?.partners?.data;
	$: coreValue1 = document?.coreValue_1;
	$: coreValue2 = document?.coreValue_2;
	$: coreValue3 = document?.coreValue_3;
	$: coreValue4 = document?.coreValue_4;
	$: coreValue5 = document?.coreValue_5;

	$: coreValues = [coreValue1, coreValue2, coreValue3, coreValue4, coreValue5];
</script>

<div>
	<section class="pt-12 w-full px-xs">
		{#if document?.intro}
			<p class="px-4 typo-xl text-center">
				{document?.intro}
			</p>
		{/if}

		{#if document?.texts && document?.texts.length > 0}
			{#each document?.texts as text}
				<div class="md:grid-2 pt-3">
					<h4 class="typo-s mx-auto text-center pb-xs md:pb-0">{text.heading}</h4>
					<div class="typo-base">
						<PortableText data={text.content} />
					</div>
				</div>
			{/each}
		{/if}
	</section>
	<section class="pt-12 px-xs">
		<h2 class="typo-xl mx-auto w-fit">Core Values</h2>
		<div class="relative flex justify-center flex-col items-center pt-2 h-full min-h-40 mb-6">
			<CloudsAbout {coreValues} />
		</div>
	</section>

	{#if document?.keyActivities && document?.keyActivities.length > 0}
		<section class="pt-12">
			<div class="w-full flex justify-center border-b border-gray p-xs">
				<h5 class="typo-s">Key Activities</h5>
			</div>
			{#each document?.keyActivities as activity}
				<div class="px-xs">
					<Accordion open={false} lineColor="border-gray" aboutPage>
						<div class="cursor-pointer typo-lg text-center mx-auto px-xs" slot="head">
							{activity.heading}
						</div>
						<div slot="details" class="md:grid-2">
							<div class="col-start-2"><PortableText data={activity.content} /></div>
						</div>
					</Accordion>
				</div>
			{/each}
		</section>
	{/if}

	{#if document?.impactGoals && document?.impactGoals.length > 0}
		<section class="pt-12">
			<div class="w-full flex justify-center border-b border-gray p-xs">
				<h5 class="typo-s">Key Activities</h5>
			</div>
			{#each document?.impactGoals as goal}
				<div class="px-xs">
					<Accordion open={false} lineColor="border-gray" aboutPage>
						<div class="cursor-pointer typo-lg text-center mx-auto px-xs" slot="head">{goal.heading}</div>
						<div slot="details" class="md:grid-2">
							<div class="col-start-2"><PortableText data={goal.content} /></div>
						</div>
					</Accordion>
				</div>
			{/each}
		</section>
	{/if}

	{#if document?.euProgramme}
		<section class="pt-12 px-xs flex flex-col items-center">
			<h2 class="typo-xl mx-auto w-fit pb-xs">{document?.euProgramme?.heading}</h2>
			<PortableText data={document?.euProgramme?.content} />
			<img class="w-10 pt-s" src="/images/eu-funded-logo.svg" alt="" />
		</section>
	{/if}

	{#if document?.partners}
		<section class="pt-12 px-xs flex flex-col gap-s">
			<h2 class="typo-xl mx-auto w-fit">{document?.partners?.heading}</h2>
			<PortableText data={document?.partners?.content} />

			<div class="relative overflow-x-hidden">
				<Marquee data={partners} />
			</div>

			<div class="relative w-full flex justify-center">
				<a class="button theme-blue-pink w-fit mx-auto mt-4" href="/partners">
					<span>View Partners</span>
					<span class="align-super typo-s leading-0">&nearr;</span>
				</a>
			</div>
		</section>
	{/if}
</div>

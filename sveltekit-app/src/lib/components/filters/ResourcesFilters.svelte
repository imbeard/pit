<script>
	import { createEventDispatcher } from 'svelte';
	import { browser } from '$app/environment';
	import { goto } from '$app/navigation';
	import { page } from '$app/stores';
	import { filtersOpen } from '$lib/stores/filters';
	import Accordion from '$lib/components/element/Accordion.svelte';

	export let typologies;
	export let media;
	export let newUrl;
	export let queryString;

	const dispatch = createEventDispatcher();

	$: selectedTypologies = $page.url.searchParams.get('typologies')?.split(',') || [];
	$: selectedMedia = $page.url.searchParams.get('media')?.split(',') || [];

	const closeFilters = () => {
		filtersOpen.set(false);
	};

	const applyFilters = () => {
		goto(newUrl, { replaceState: true });

		if ($page.route.id !== '/') {
			goto(`/resources/${queryString}`, { replaceState: true });
		}

		filtersOpen.set(false);
	};

	const filterTypologies = (input) => {
		if (selectedTypologies.includes(input)) {
			selectedTypologies = selectedTypologies.filter((item) => item !== input);
		} else {
			selectedTypologies = [...selectedTypologies, input];
		}
		dispatch('updateFilters', { typologies: selectedTypologies, media: selectedMedia });
	};

	const filterMedia = (input) => {
		if (selectedMedia.includes(input)) {
			selectedMedia = selectedMedia.filter((item) => item !== input);
		} else {
			selectedMedia = [...selectedMedia, input];
		}
		dispatch('updateFilters', { typologies: selectedTypologies, media: selectedMedia });
	};

	$: if (browser) {
		if ($filtersOpen) {
			document.body.style.overflow = 'hidden';
		} else {
			document.body.style.overflow = 'unset';
		}
	}
</script>

<aside class="fixed z-99 h-[100dvh] right-0 top-0 bg-blue text-pink p-xs" class:open={$filtersOpen}>
	<div class="wrapper flex flex-col justify-between h-full overflow-auto" class:open={$filtersOpen}>
		<div class="pb-8">
			<button
				on:click={closeFilters}
				class="cursor-pointer p-s absolute theme-pink-blue right-xs hover:text-pink hover:bg-blue"
				>Close</button
			>
			<div class="pt-10">
				<Accordion open={true} lineColor="border-pink">
					<div class="cursor-pointer" slot="head">Typologies</div>
					<div slot="details">
						<ul class="flex flex-col gap-y-xs">
							{#each typologies as typology}
								<li>
									<label class="checkbox cursor-pointer">
										<input
											on:click={() => filterTypologies(typology)}
											type="checkbox"
											name="typologies"
											checked={selectedTypologies.includes(typology)}
											value={typology}
										/>
										{typology}
									</label>
								</li>
							{/each}
						</ul>
					</div>
				</Accordion>
				<Accordion open={true} lineColor="border-pink">
					<div class="cursor-pointer" slot="head">Media</div>
					<div slot="details">
						<ul class="flex flex-col gap-y-xs">
							{#each media as type}
								<li>
									<label class="checkbox cursor-pointer">
										<input
											on:click={() => filterMedia(type)}
											type="checkbox"
											name="media"
											checked={selectedMedia.includes(type)}
											value={type}
										/>
										{type}
									</label>
								</li>
							{/each}
						</ul>
					</div>
				</Accordion>
			</div>
		</div>
		<div class="sticky bottom-0 h-full">
			<div class="grid-2 w-full absolute bottom-1 md:bottom-0">
				<button
					class="button cursor-pointer text-center py-s w-full theme-pink-blue"
					on:click={applyFilters}>Apply</button
				>
				<a
					href="/resources"
					class="cursor-pointer text-center py-s w-full bg-[#a6a1f7] hover:bg-pink text-blue px-xs"
					>Clear all</a
				>
			</div>
		</div>
	</div>
</aside>

<style>
	aside {
		width: 100%;
		transform: translateX(100%);
	}

	aside > div::-webkit-scrollbar {
		display: none;
	}

	@media screen and (min-width: 768px) {
		aside {
			width: 30%;
		}
	}

	aside.open {
		transform: translateX(0);
	}

	.wrapper {
		opacity: 0;
	}

	.wrapper.open {
		opacity: 1;
	}

	input[type='checkbox'] {
		background-color: transparent;
		border: 1px solid var(--color-pink);
		width: 13px;
		height: 13px;
		margin-right: var(--spacing-xs);
		cursor: pointer;
	}

	input[type='checkbox']:checked,
	input[type='checkbox']:checked::before,
	.input-checkbox.active {
		background-color: var(--color-pink);
	}

	input[type='checkbox'] {
		-webkit-appearance: none;
		appearance: none;
		background-color: transparent;
		border: 1px solid var(--color-pink);
		width: 13px;
		height: 13px;
		border-radius: 0;
	}
</style>

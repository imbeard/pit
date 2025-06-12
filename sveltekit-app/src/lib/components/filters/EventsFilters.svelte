<script>
	import { createEventDispatcher } from 'svelte';
	import { browser } from '$app/environment';
	import { goto } from '$app/navigation';
	import { page } from '$app/stores';
	import { filtersOpen } from '$lib/stores/filters';
	import Accordion from '$lib/components/element/Accordion.svelte';

	export let typologies;
	export let institutions;
	export let people;
	export let newUrl;
	export let queryString;

	const dispatch = createEventDispatcher();

	$: selectedTypologies = $page.url.searchParams.get('typologies')?.split(',') || [];
	$: selectedInstitutions = $page.url.searchParams.get('institutions')?.split(',') || [];
	$: selectedPeople = $page.url.searchParams.get('people')?.split(',') || [];

	const closeFilters = () => {
		filtersOpen.set(false);
	};

	const applyFilters = () => {
		goto(newUrl, { replaceState: true });

		if ($page.route.id !== '/') {
			goto(`/events/${queryString}`, { replaceState: true });
		}
		
		filtersOpen.set(false);
	};

	const filterTypologies = (input) => {
		if (selectedTypologies.includes(input)) {
			selectedTypologies = selectedTypologies.filter((item) => item !== input);
		} else {
			selectedTypologies = [...selectedTypologies, input];
		}
		dispatch('updateFilters', {
			typologies: selectedTypologies,
			institutions: selectedInstitutions,
			people: selectedPeople
		});
	};

	const filterInstitutions = (input) => {
		if (selectedInstitutions.includes(input)) {
			selectedInstitutions = selectedInstitutions.filter((item) => item !== input);
		} else {
			selectedInstitutions = [...selectedInstitutions, input];
		}
		dispatch('updateFilters', {
			typologies: selectedTypologies,
			institutions: selectedInstitutions,
			people: selectedPeople
		});
	};

	const filterPeople = (input) => {
		if (selectedPeople.includes(input)) {
			selectedPeople = selectedPeople.filter((item) => item !== input);
		} else {
			selectedPeople = [...selectedPeople, input];
		}
		dispatch('updateFilters', {
			typologies: selectedTypologies,
			institutions: selectedInstitutions,
			people: selectedPeople
		});
	};

	$: if (browser) {
		if ($filtersOpen) {
			document.body.style.overflow = 'hidden';
		} else {
			document.body.style.overflow = 'unset';
		}
	}
</script>

<aside class="fixed z-99 h-screen right-0 top-0 bg-brown text-gray p-xs" class:open={$filtersOpen}>
	<div class="wrapper flex flex-col justify-between h-full" class:open={$filtersOpen}>
		<div>
			<button
				on:click={closeFilters}
				class="cursor-pointer p-s absolute bg-gray text-black hover:bg-black hover:text-gray right-xs"
				>Close</button
			>
			<div class="pt-10">
				<Accordion open={true} lineColor="border-gray">
					<div class="cursor-pointer" slot="head">Category</div>
					<div slot="details">
						<ul class="flex flex-col gap-y-xs">
							{#each typologies as typology}
								<li>
									<label class="checkbox cursor-pointer">
										<input
											on:click={() => filterTypologies(typology.slug.current)}
											type="checkbox"
											name="typologies"
											checked={selectedTypologies.includes(typology.slug.current)}
											value={typology.slug.current}
										/>
										{typology.title}
									</label>
								</li>
							{/each}
						</ul>
					</div>
				</Accordion>
				<Accordion open={true} lineColor="border-gray">
					<div class="cursor-pointer" slot="head">Institution</div>
					<div slot="details">
						<ul class="flex flex-col gap-y-xs">
							{#each institutions as institution}
								<li>
									<label class="checkbox cursor-pointer">
										<input
											on:click={() => filterInstitutions(institution.slug.current)}
											type="checkbox"
											name="institution"
											checked={selectedInstitutions.includes(institution.slug.current)}
											value={institution.slug.current}
										/>
										{institution.title}
									</label>
								</li>
							{/each}
						</ul>
					</div>
				</Accordion>
				<Accordion open={true} lineColor="border-gray">
					<div class="cursor-pointer" slot="head">People</div>
					<div slot="details">
						<ul class="flex flex-col gap-y-xs">
							{#each people as person}
								<li>
									<label class="checkbox cursor-pointer">
										<input
											on:click={() => filterPeople(person.slug)}
											type="checkbox"
											name="person"
											checked={selectedPeople.includes(person.slug)}
											value={person.slug}
										/>
										{person.name}
									</label>
								</li>
							{/each}
						</ul>
					</div>
				</Accordion>
			</div>
		</div>
		<div class="grid-2">
			<button
				class="button cursor-pointer text-center py-s w-full theme-gray-black"
				on:click={applyFilters}>Apply</button
			>
			<a
				href="/events"
				class="cursor-pointer text-center py-s w-full bg-gray text-black opacity-50 hover:opacity-100 transition-opacity duration-200"
				>Clear all</a
			>
		</div>
	</div>
</aside>

<style>
	aside {
		width: 100%;
		transform: translateX(100%);
		transition: transform 200ms 300ms cubic-bezier(0.215, 0.61, 0.355, 1);
	}

	@media screen and (min-width: 768px) {
		aside {
			width: 30%;
		}
	}

	aside.open {
		transform: translateX(0);
		transition: transform 200ms 300ms cubic-bezier(0.215, 0.61, 0.355, 1);
	}

	.wrapper {
		opacity: 0;
		transition: opacity 300ms cubic-bezier(0.215, 0.61, 0.355, 1);
	}

	.wrapper.open {
		opacity: 1;
		transition: opacity 200ms 500ms cubic-bezier(0.215, 0.61, 0.355, 1);
	}

	input[type='checkbox'] {
		background-color: transparent;
		border: 1px solid var(--color-gray);
		width: 13px;
		height: 13px;
		margin-right: var(--spacing-xs);
		cursor: pointer;
	}

	input[type='checkbox']:checked,
	input[type='checkbox']:checked::before,
	.input-checkbox.active {
		background-color: var(--color-gray);
	}

	input[type='checkbox'] {
		-webkit-appearance: none;
		appearance: none;
		background-color: transparent;
		border: 1px solid var(--color-gray);
		width: 13px;
		height: 13px;
		border-radius: 0;
	}
</style>

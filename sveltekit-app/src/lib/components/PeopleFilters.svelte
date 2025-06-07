<script>
	import { createEventDispatcher } from 'svelte';
	import { browser } from '$app/environment';
	import { page } from '$app/stores';
	import { filtersOpen } from '$lib/stores/filters';
	import Accordion from '$lib/components/element/Accordion.svelte';

	export let countries;
	export let jobs;

	const dispatch = createEventDispatcher();

	$: selectedCountries = $page.url.searchParams.get('countries')?.split(',') || [];
	$: selectedJobs = $page.url.searchParams.get('jobs')?.split(',') || [];

	const closeFilters = () => {
		filtersOpen.set(false);
	};

	const filterCountries = (input) => {
		if (selectedCountries.includes(input)) {
			selectedCountries = selectedCountries.filter((item) => item !== input);
		} else {
			selectedCountries = [...selectedCountries, input];
		}
		dispatch('updateFilters', { countries: selectedCountries, jobs: selectedJobs });
	};

	const filterJobs = (input) => {
		if (selectedJobs.includes(input)) {
			selectedJobs = selectedJobs.filter((item) => item !== input);
		} else {
			selectedJobs = [...selectedJobs, input];
		}
		dispatch('updateFilters', { countries: selectedCountries, jobs: selectedJobs });
	};

	$: if (browser) {
		if ($filtersOpen) {
			document.body.style.overflow = 'hidden';
		} else {
			document.body.style.overflow = 'unset';
		}
	}
</script>

<aside class="fixed z-99 h-screen right-0 top-0 bg-red text-pink" class:open={$filtersOpen}>
	<div class="wrapper" class:open={$filtersOpen}>
		<button
			on:click={closeFilters}
			class="cursor-pointer p-s absolute theme-pink-red top-xs right-xs">Close</button
		>
		<div class="p-xs pt-10">
			<Accordion>
				<div class="cursor-pointer" slot="head">Nationalities</div>
				<div slot="details">
					<ul class="flex flex-col gap-y-xs">
						{#each countries as country}
							<li>
								<label class="checkbox cursor-pointer">
									<input
										on:click={() => filterCountries(country)}
										type="checkbox"
										name="collocazioni"
										checked={selectedCountries.includes(country)}
										value={country}
									/>
									{country}
								</label>
							</li>
						{/each}
					</ul>
				</div>
			</Accordion>
			<Accordion>
				<div class="cursor-pointer" slot="head">Jobs</div>
				<div slot="details">
					<ul class="flex flex-col gap-y-xs">
						{#each jobs as job}
							<li>
								<label class="checkbox cursor-pointer">
									<input
										on:click={() => filterJobs(job)}
										type="checkbox"
										name="jobs"
										checked={selectedJobs.includes(job)}
										value={job}
									/>
									{job}
								</label>
							</li>
						{/each}
					</ul>
				</div>
			</Accordion>
		</div>
	</div>
</aside>

<style>
	aside {
		transform: translateX(100%);
		width: 30%;
		transition: transform 200ms 300ms cubic-bezier(0.215, 0.61, 0.355, 1);
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

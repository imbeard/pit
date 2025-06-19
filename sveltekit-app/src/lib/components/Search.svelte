<script>
	import { searchQuery, searchResults, searchLoading, searchOpen } from '$lib/stores/search';
	import { headerHeight } from '$lib/stores/header';
	import { performSearch } from '$lib/utils/search';
	import { capitalize } from '$lib/utils';
	import { onMount } from 'svelte';

	let searchInput = '';
	let inputElement;

	$: if (searchInput !== undefined) {
		searchQuery.set(searchInput);
		performSearch(searchInput);
	}

	$: if ($searchQuery == '') {
		searchInput = '';
	}

	// Focus input when search opens
	$: if ($searchOpen && inputElement) {
		inputElement.focus();
	}

	// Handle keyboard shortcuts
	onMount(() => {
		const handleKeydown = (e) => {
			// ESC to close search
			if (e.key === 'Escape' && $searchOpen) {
				searchOpen.set(false);
				searchInput = '';
			}
			// Ctrl/Cmd + K to open search
			if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
				e.preventDefault();
				searchOpen.set(true);
			}
		};

		document.addEventListener('keydown', handleKeydown);
		return () => document.removeEventListener('keydown', handleKeydown);
	});

	function handleResultClick() {
		searchOpen.set(false);
		searchInput = '';
	}
</script>

{#if $searchOpen}
	<div
		class="w-full mt-xs fixed top-0 left-0 px-xs z-50"
		style={`margin-top: ${$searchOpen && window.innerWidth < 768 ? '52' : $headerHeight}px`}
	>
		<div class="bg-black text-pink p-xs pb-2 md:h-auto overflow-auto"
		style={`height: calc(100svh - 62px)`}
		>
			<input
				bind:this={inputElement}
				bind:value={searchInput}
				class="typo-xl w-full text-center pb-xs border-b border-pink"
				type="text"
				placeholder="Type to search"
			/>

			{#if $searchLoading}
				<div class="py-xs text-center">
					<span class="typo-base">Searching...</span>
				</div>
			{:else if searchInput && searchInput.length >= 2}
				<div class="results max-h-96 overflow-y-auto">
					{#each Object.entries($searchResults) as [category, items]}
						{#if items.length > 0}
							{#each items as item}
								<a
									href="/{category}/{item.slug}"
									class="flex gap-xs items-baseline py-xs border-b border-pink hover:bg-pink hover:text-black"
									on:click={handleResultClick}
								>
									<span class="typo-base">{item.title || item.name}</span>
									<span class="typo-s">{capitalize(category)}</span>
								</a>
							{/each}
						{/if}
					{/each}

					{#if Object.values($searchResults).every((arr) => arr.length === 0)}
						<div class="py-xs text-center">
							<span class="typo-base">No results found</span>
						</div>
					{/if}
				</div>
			{/if}
		</div>
	</div>
{/if}

<style>
	input {
		-webkit-appearance: none;
		appearance: none;
		outline: none;
	}

	input:focus {
		outline: none;
	}
</style>

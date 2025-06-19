import { searchResults, searchLoading } from '$lib/stores/search';

let searchTimeout: NodeJS.Timeout;

export async function performSearch(query: string) {

    if (searchTimeout) {
		clearTimeout(searchTimeout);
	}

	if (!query || query.trim().length < 2) {
		searchResults.set({
			performances: [],
			people: [],
			resources: [],
			partners: [],
			events: []
		});
		return;
	}

	searchTimeout = setTimeout(async () => {
		searchLoading.set(true);

		try {
			const response = await fetch(`/api/search?q=${encodeURIComponent(query)}`);
			const results = await response.json();

			if (response.ok) {
				searchResults.set(results);
			} else {
				console.error('Search error:', results.error);
			}
		} catch (error) {
			console.error('Search request failed:', error);
		} finally {
			searchLoading.set(false);
		}
	}, 300); // 300ms debounce
}

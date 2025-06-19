import { writable } from 'svelte/store';

export interface SearchResult {
	_id: string;
	title?: string;
	name?: string;
	slug: string;
	type: 'performance' | 'people' | 'partner' | 'event' | 'resource';
}

export interface SearchResults {
	performances: SearchResult[];
	people: SearchResult[];
	resources: SearchResult[];
	partners: SearchResult[];
	events: SearchResult[];
}

export const searchOpen = writable(false);
export const searchQuery = writable('');
export const searchResults = writable<SearchResults>({
	performances: [],
	people: [],
	resources: [],
	partners: [],
	events: []
});
export const searchLoading = writable(false);

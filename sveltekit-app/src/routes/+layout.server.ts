import type { LayoutServerLoad } from './$types';
import { settingsQuery } from '$lib/sanity/queries';

export const load: LayoutServerLoad = async (event) => {
	const { loadQuery } = event.locals;

	// The `event.locals.preview` value received here is set by the helper function
	// in `hooks.server.ts`. It indicates whether the app is in preview mode or not.
	// const { preview } = event.locals;
	const settings = await loadQuery(settingsQuery);
	// As `event.locals` is only available on the server, we can expose the value
	// to the client by returning it here.
	return { settings };
};

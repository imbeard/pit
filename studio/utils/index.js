import _slugify from "slugify"

export function slugify(str) {
	if (str) {
		return _slugify(str, {
			lower: true,
			remove: /[*+~.()'"!:@]/g,
			strict: true,
			trim: true,
		})
	}
}

export function formatDate(date: string | null) {
	return new Date(date).toLocaleDateString('en-US', {
		month: 'long',
		day: 'numeric',
		year: 'numeric'
	});
}

export function dateYear(date: string | null) {
	if (!date) return null;
	const [year] = date.split('-');
	return year;
}
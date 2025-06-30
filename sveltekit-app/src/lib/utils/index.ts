export function formatDate(dateString) {
	const date = new Date(dateString);
	const day = date.getDate().toString().padStart(2, '0');
	const month = (date.getMonth() + 1).toString().padStart(2, '0');
	const year = date.getFullYear().toString().slice(-2);
	return `${day}.${month}.${year}`;
}

export function slugToTitle(slug) {
	return slug
		.replace(/-/g, ' ')
		.split(' ')
		.map((word) => word.charAt(0).toUpperCase() + word.slice(1))
		.join(' ');
}

export function dateYear(date: string | null) {
	if (!date) return null;
	const [year] = date.split('-');
	return year;
}

export function capitalize(string) {
	return string.charAt(0).toUpperCase() + string.slice(1);
}

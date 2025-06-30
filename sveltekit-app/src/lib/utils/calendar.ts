// utils/dateUtils.js
export function getCurrentDate() {
	return new Date().toISOString().slice(0, 10);
}

export function formatToDisplay(isoDate) {
	const date = new Date(isoDate);
	const day = String(date.getDate()).padStart(2, '0');
	const month = String(date.getMonth() + 1).padStart(2, '0');
	const year = String(date.getFullYear()).slice(-2);
	return `${day}.${month}.${year}`;
}

// export function parseToISO(displayDate) {
// 	if (!displayDate) return null;
// 	const parts = displayDate.split('.');
// 	if (parts.length !== 3) return displayDate; // Return as-is if not in expected format

// 	const day = parseInt(parts[0], 10);
// 	const month = parseInt(parts[1], 10) - 1;
// 	let year = parseInt(parts[2], 10);

// 	year += year < 50 ? 2000 : 1900;

// 	const date = new Date(year, month, day);
// 	return date.toISOString().slice(0, 10);
// }

export function createPikaday(field, onSelectCallback) {
	return new Promise(async (resolve, reject) => {
		try {
			const { default: Pikaday } = await import('pikaday');

			const picker = new Pikaday({
				field,
				toString(date) {
					// Display format for the input field
					const day = String(date.getDate()).padStart(2, '0');
					const month = String(date.getMonth() + 1).padStart(2, '0');
					const year = String(date.getFullYear()).slice(-2);
					return `${day}.${month}.${year}`;
				},
				// parse(dateString) {
				// 	const isoDate = parseToISO(dateString);
				// 	return isoDate ? new Date(isoDate) : null;
				// },
				onSelect: function (date) {
					// Pass ISO format to callback, avoiding timezone issues
					const year = date.getFullYear();
					const month = String(date.getMonth() + 1).padStart(2, '0');
					const day = String(date.getDate()).padStart(2, '0');
					const isoDate = `${year}-${month}-${day}`;
					if (onSelectCallback) onSelectCallback(isoDate);
				}
			});

			resolve(picker);
		} catch (error) {
			reject(error);
		}
	});
}

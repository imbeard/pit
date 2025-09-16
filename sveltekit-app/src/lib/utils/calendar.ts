// utils/dateUtils.js
export function getCurrentDate() {
	return new Date().toISOString().slice(0, 10);
}

export function formatToDisplay(isoDate) {
	if (!isoDate || !/^\d{4}-\d{2}-\d{2}$/.test(isoDate)) return '';
	const parts = isoDate.split('-');
	// We pass UTC parts to get a UTC date, then use UTC methods to avoid timezone shifts.
	const date = new Date(Date.UTC(Number(parts[0]), Number(parts[1]) - 1, Number(parts[2])));
	const day = String(date.getUTCDate()).padStart(2, '0');
	const month = String(date.getUTCMonth() + 1).padStart(2, '0');
	const year = String(date.getUTCFullYear()).slice(-2);
	return `${day}.${month}.${year}`;
}

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
				parse(dateString) {
					const parts = dateString.split('.');
					if (parts.length !== 3) return null;

					const day = parseInt(parts[0], 10);
					const month = parseInt(parts[1], 10) - 1;
					let year = parseInt(parts[2], 10);

					if (String(year).length === 2) {
						year += year < 50 ? 2000 : 1900;
					}

					const date = new Date(year, month, day);
					if (isNaN(date.getTime()) || date.getMonth() !== month) {
						return null;
					}
					return date;
				},
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

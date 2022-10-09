const getDate = function () {
	const option = {
		weekday: "long",
		day: "numeric",
		month: "long",
	};

	const today = new Date();

	return today.toLocaleString("fr-FR", option);
};

const getDay = function () {
	const option = {
		weekday: "long",
	};

	const today = new Date();

	return today.toLocaleString("fr-FR", option);
};

module.exports = { getDate, getDay };

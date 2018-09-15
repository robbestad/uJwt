function addMinutes(date, units) {
	const _date = new Date(date);
	_date.setTime(_date.getTime() + units * 60000);
	return _date;
}
module.exports = addMinutes;

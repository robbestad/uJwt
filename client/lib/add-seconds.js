function addSeconds(date, units) {
	const _date = new Date(date);
	_date.setTime(_date.getTime() + units * 1000);
	return _date;
}
export default addSeconds;

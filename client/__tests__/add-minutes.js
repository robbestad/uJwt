const AddMinutes = require('../lib/add-minutes.js');

describe('Add minutes', () => {
	it('Verifies that date-fnc adds 1 minute to current Date', () => {
		const now = new Date();
		const future = AddMinutes(now,1);
		expect(future.getTime()).toBe(now.getTime()+60000)
	});
	it('Verifies that date-fnc adds 10 minutes to current Date', () => {
		const now = new Date();
		const future = AddMinutes(now,10);
		expect(future.getTime()).toBe(now.getTime()+600000)
	});
})

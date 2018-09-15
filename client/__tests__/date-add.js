const DateAdd = require('../date-add.js');

describe('Add minutes to add', () => {
	it('Verifies that date-fnc adds 1 minute to current Date', () => {
		const now = new Date();
		const future = DateAdd(now,"minute",1);
		expect(future.getTime()).toBe(now.getTime()+60000)
	});
	it('Verifies that date-fnc adds 10 minutes to current Date', () => {
		const now = new Date();
		const future = DateAdd(now,"minute",10);
		expect(future.getTime()).toBe(now.getTime()+600000)
	});
})

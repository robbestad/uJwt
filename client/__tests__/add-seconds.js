import AddSeconds from "../lib/add-seconds.js";

describe('Add minutes', () => {
	it('Verifies that date-fnc adds 1 second to current Date', () => {
		const now = new Date();
		const future = AddSeconds(now,1);
		expect(future.getTime()).toBe(now.getTime()+1000)
	});
	it('Verifies that date-fnc adds 10 seconds to current Date', () => {
		const now = new Date();
		const future = AddSeconds(now,10);
		expect(future.getTime()).toBe(now.getTime()+10000)
	});
})

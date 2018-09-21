import AddHours from "../lib/add-hours.js";

describe('Add hours', () => {
	it('Verifies that date-fnc adds 1 hour to current Date', () => {
		const now = new Date();
		const future = AddHours(now,1);
		expect(future.getTime()).toBe(now.getTime()+1*60*60*1000)
	});
	it('Verifies that date-fnc adds 168 hour to current Date', () => {
		const now = new Date();
		const future = AddHours(now,168);
		expect(future.getTime()).toBe(now.getTime()+168*60*60*1000)
	});
})

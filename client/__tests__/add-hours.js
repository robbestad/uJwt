import AddHours from "../lib/add-hours.js";

describe('Add hours', () => {
	it('Verifies that date-fnc adds 1 hour to current Date', () => {
		const now = new Date();
		const future = AddHours(now,1);
		expect(future.getTime()).toBe(now.getTime()+1*60*60)
	});
	it('Verifies that date-fnc adds 10 hour to current Date', () => {
		const now = new Date();
		const future = AddHours(now,10);
		expect(future.getTime()).toBe(now.getTime()+10*60*60)
	});
})

import { getCurrencyTableProperty, CurrencyKinds } from "..";

describe("testing currency table getters", () => {
	test("prevent to get NaN", async () => {
		const res = await getCurrencyTableProperty(CurrencyKinds.rub);
		expect(res).not.toBe(Number.NaN);
	});

	test("get usd price", async () => {
		const res = await getCurrencyTableProperty(CurrencyKinds.usd);
		expect(res).toBeGreaterThan(0.0);
	});

	test("get euro price", async () => {
		const res = await getCurrencyTableProperty(CurrencyKinds.eur);
		expect(res).toBeGreaterThan(0.0);
	});
});

import { getCurrencyTableProperty, CurrencyKinds } from "..";

describe("testing currency table getters", () => {
	test("prevent to get NaN", async () => {
		const res = await getCurrencyTableProperty(CurrencyKinds.rub);
		expect(res).not.toBe(Number.NaN);
	});

	test("get usd price", async () => {
		const res = await getCurrencyTableProperty(CurrencyKinds.usd);
		expect(res).toBe(Number.parseFloat("47.85520000"));
	});

	test("get euro price", async () => {
		const res = await getCurrencyTableProperty(CurrencyKinds.eur);
		expect(res).toBe(Number.parseFloat("50.33409936"));
	});

	test("get yen price", async () => {
		const res = await getCurrencyTableProperty(CurrencyKinds.yen);
		expect(res).toBe(Number.parseFloat("6.56972625"));
	});
});

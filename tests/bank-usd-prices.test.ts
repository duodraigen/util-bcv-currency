import {
	getBankUsdCurrencyPrices,
	SupportedBanks,
	DEFAULT_USD_BANK_RVAL,
} from "../";

describe("testing per bank usd prices", () => {
	test("get BBVA bank currency properties", async () => {
		const res = await getBankUsdCurrencyPrices(SupportedBanks.bbva);
		expect(res).not.toBe(DEFAULT_USD_BANK_RVAL);
	});

	test("get BBVA usd buy value", async () => {
		const res = (await getBankUsdCurrencyPrices(SupportedBanks.bbva)).buy;
		expect(res).toBe(Number.parseFloat("47.7372"));
	});

	test("get Banesco usd buy value", async () => {
		const res = (await getBankUsdCurrencyPrices(SupportedBanks.banes)).buy;
		expect(res).toBe(Number.parseFloat("47.7172"));
	});

	test("get Other Banks usd buy value", async () => {
		const res = (await getBankUsdCurrencyPrices(SupportedBanks.other)).buy;
		expect(res).toBe(Number.parseFloat("47.8540"));
	});

	test("get Mercantil usd sell value", async () => {
		const res = (await getBankUsdCurrencyPrices(SupportedBanks.merca)).sell;
		expect(res).toBe(Number.parseFloat("48.6999"));
	});
});

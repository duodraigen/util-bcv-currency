import {
	getBankUsdCurrencyPrices,
	SupportedBanks,
	DEFAULT_USD_BANK_RVAL,
} from "util-bcv-currency";

describe("testing per bank usd prices", () => {
	test("get BBVA bank currency properties", async () => {
		const res = await getBankUsdCurrencyPrices(SupportedBanks.bbva);
		expect(res).not.toBe(DEFAULT_USD_BANK_RVAL);
	});

	test("get Mercantil usd buy value without getting NaN", async () => {
		const res = await getBankUsdCurrencyPrices(SupportedBanks.bbva);
		expect(res.buy).not.toBe(Number.NaN);
	});
});

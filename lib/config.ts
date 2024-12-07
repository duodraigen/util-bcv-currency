import { Agent } from "node:https";

/**
 * Issue solution 001 - CANNOT_VERIFY_LEAF_SIGNATURE
 * use HTTPS::Agent to allow unauthorized requests instead modifying
 * the environment
 */
export const REQ_AGENT = new Agent({
	rejectUnauthorized: false,
});

export const EXTERNAL_SRC_URL = "https://www.bcv.org.ve/";
export const BANKS_TABLE_URL =
	"https://www.bcv.org.ve/tasas-informativas-sistema-bancario";

/**
 * Kind delimitation prevents from getting typo issues
 * but for every new kind or deprecated one, we need to
 * modify this table
 */

/**
 * Every kind of available currency
 * at the source
 */
export enum CurrencyKinds {
	usd = "dolar",
	rub = "rublo",
	try = "lira",
	eur = "euro",
	yen = "yuan",
}

/**
 * Every supported bank available
 * in the table of the data source
 */
export enum SupportedBanks {
	bnc = "Banco Nacional de Crédito BNC",
	bbva = "BBVA Provincial",
	other = "Otras Instituciones",
	merca = "Banco Mercantil",
	exter = "Banco Exterior",
	banes = "Banesco",
}

/**
 * Default value if
 * getBankUsdCurrencyPrices fails
 */
export const DEFAULT_USD_BANK_RVAL = {
	bank: "",
	buy: Number.NaN,
	sell: Number.NaN,
};

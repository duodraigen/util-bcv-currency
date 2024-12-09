"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DEFAULT_USD_BANK_RVAL = exports.SupportedBanks = exports.CurrencyKinds = exports.BANKS_TABLE_URL = exports.EXTERNAL_SRC_URL = exports.REQ_AGENT = void 0;
const node_https_1 = require("node:https");
/**
 * Issue solution 001 - CANNOT_VERIFY_LEAF_SIGNATURE
 * use HTTPS::Agent to allow unauthorized requests instead modifying
 * the environment
 */
exports.REQ_AGENT = new node_https_1.Agent({
    rejectUnauthorized: false,
});
exports.EXTERNAL_SRC_URL = "https://www.bcv.org.ve/";
exports.BANKS_TABLE_URL = "https://www.bcv.org.ve/tasas-informativas-sistema-bancario";
/**
 * Kind delimitation prevents from getting typo issues
 * but for every new kind or deprecated one, we need to
 * modify this table
 */
/**
 * Every kind of available currency
 * at the source
 */
var CurrencyKinds;
(function (CurrencyKinds) {
    CurrencyKinds["usd"] = "dolar";
    CurrencyKinds["rub"] = "rublo";
    CurrencyKinds["try"] = "lira";
    CurrencyKinds["eur"] = "euro";
    CurrencyKinds["yen"] = "yuan";
})(CurrencyKinds || (exports.CurrencyKinds = CurrencyKinds = {}));
/**
 * Every supported bank available
 * in the table of the data source
 */
var SupportedBanks;
(function (SupportedBanks) {
    SupportedBanks["bnc"] = "Banco Nacional de Cr\u00E9dito BNC";
    SupportedBanks["bbva"] = "BBVA Provincial";
    SupportedBanks["other"] = "Otras Instituciones";
    SupportedBanks["merca"] = "Banco Mercantil";
    SupportedBanks["exter"] = "Banco Exterior";
    SupportedBanks["banes"] = "Banesco";
})(SupportedBanks || (exports.SupportedBanks = SupportedBanks = {}));
/**
 * Default value if
 * getBankUsdCurrencyPrices fails
 */
exports.DEFAULT_USD_BANK_RVAL = {
    bank: "",
    buy: Number.NaN,
    sell: Number.NaN,
};

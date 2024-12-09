"use strict";
/**
 * @author duodraigen
 * node-version 22.11.0
 * version 1.0.0
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.SupportedBanks = exports.CurrencyKinds = exports.getBankUsdCurrencyPrices = exports.getCurrencyTableProperty = exports.DEFAULT_USD_BANK_RVAL = void 0;
const util_currency_1 = require("./lib/util-currency");
Object.defineProperty(exports, "getCurrencyTableProperty", { enumerable: true, get: function () { return util_currency_1.getCurrencyTableProperty; } });
const util_usd_banks_currency_1 = require("./lib/util-usd-banks-currency");
Object.defineProperty(exports, "getBankUsdCurrencyPrices", { enumerable: true, get: function () { return util_usd_banks_currency_1.getBankUsdCurrencyPrices; } });
const config_1 = require("./lib/config");
Object.defineProperty(exports, "CurrencyKinds", { enumerable: true, get: function () { return config_1.CurrencyKinds; } });
Object.defineProperty(exports, "SupportedBanks", { enumerable: true, get: function () { return config_1.SupportedBanks; } });
Object.defineProperty(exports, "DEFAULT_USD_BANK_RVAL", { enumerable: true, get: function () { return config_1.DEFAULT_USD_BANK_RVAL; } });

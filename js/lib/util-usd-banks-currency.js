"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getBankUsdCurrencyPrices = getBankUsdCurrencyPrices;
const axios_1 = __importDefault(require("axios"));
const cheerio_1 = require("cheerio");
const config_1 = require("./config");
/**
 * Obtains the usd buy and sell prices in bolivars from the **Supported Banks** table
 * @param bank { SupportedBanks } - Which bank you need to query usd prices
 * @returns CurrencyValue
 */
function getBankUsdCurrencyPrices(bank) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const result = yield axios_1.default
                .get(config_1.BANKS_TABLE_URL, { httpsAgent: config_1.REQ_AGENT })
                .then((response) => {
                const parsedTree = (0, cheerio_1.load)(response.data);
                /**
                 * Table has concrete iterable tree nodes
                 * so, we can get the first row from body and
                 * going down per row
                 */
                let row = parsedTree("tbody").children().first();
                for (let index = 0; index < 7; index++) {
                    /**
                     * if the table cell with the bank name
                     * is the same as the requested bank
                     */
                    if (row.children().first().next().text().trim() === bank) {
                        // shortcut: get the row first table cell
                        const baseNode = row.children().first();
                        return {
                            bank: baseNode.next().text(),
                            buy: Number.parseFloat(baseNode.next().next().text().replace(",", ".")),
                            sell: Number.parseFloat(baseNode.next().next().next().text().replace(",", ".")),
                        };
                    }
                    // if the name is not the requested, go to the next row
                    row = row.next();
                }
                return config_1.DEFAULT_USD_BANK_RVAL;
            });
            return result;
        }
        catch (except) {
            /**
             * Possible errors:
             * 1. Timeout
             * 2. Wrong document parsing result
             * 3. Page does not exist anymore or forbidden
             * 4. Page was redesigned, so elements was moved too
             */
            console.error(except);
            return config_1.DEFAULT_USD_BANK_RVAL;
        }
    });
}

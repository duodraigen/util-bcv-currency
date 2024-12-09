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
exports.getCurrencyTableProperty = getCurrencyTableProperty;
const axios_1 = __importDefault(require("axios"));
const cheerio_1 = require("cheerio");
const config_1 = require("./config");
/**
 * Get the value in bolivars of a requested currency
 * @param currency { CurrencyKinds } - Which currency is the requested (see **CurrencyKinds** enum)
 * @returns number | NaN
 */
function getCurrencyTableProperty(currency) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const result = yield axios_1.default
                .get(config_1.EXTERNAL_SRC_URL, { httpsAgent: config_1.REQ_AGENT })
                .then((response) => {
                /**
                 * if response is successful, we need the data
                 * (the whole html document) to be parsed here
                 */
                const parsedTree = (0, cheerio_1.load)(response.data);
                /**
                 * Every currency data container has his own id,
                 * we need the inner text after getting it
                 */
                const expression = parsedTree(`div#${currency}`).text();
                const regex = /([A-Z]|\s)/gim;
                // sanitize and parse the result
                return Number.parseFloat(expression.replace(regex, "").replace(",", "."));
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
            return Number.NaN;
        }
    });
}

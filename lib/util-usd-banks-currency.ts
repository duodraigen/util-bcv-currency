import axios from "axios";
import { load as cheerioLoad } from "cheerio";
import type { CurrencyValue } from "./types";

import {
	REQ_AGENT,
	BANKS_TABLE_URL,
	DEFAULT_USD_BANK_RVAL,
	type SupportedBanks,
} from "./config";

/**
 * Obtains the usd buy and sell prices in bolivars from the **Supported Banks** table
 * @param bank { SupportedBanks } - Which bank you need to query usd prices
 * @returns CurrencyValue
 */
export async function getBankUsdCurrencyPrices(
	bank: SupportedBanks,
): Promise<CurrencyValue> {
	try {
		const result: CurrencyValue = await axios
			.get(BANKS_TABLE_URL, { httpsAgent: REQ_AGENT })
			.then((response) => {
				const parsedTree = cheerioLoad(response.data);
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
							buy: Number.parseFloat(
								baseNode.next().next().text().replace(",", "."),
							),
							sell: Number.parseFloat(
								baseNode.next().next().next().text().replace(",", "."),
							),
						};
					}

					// if the name is not the requested, go to the next row
					row = row.next();
				}

				return DEFAULT_USD_BANK_RVAL;
			});
		return result;
	} catch (except) {
		/**
		 * Possible errors:
		 * 1. Timeout
		 * 2. Wrong document parsing result
		 * 3. Page does not exist anymore or forbidden
		 * 4. Page was redesigned, so elements was moved too
		 */
		console.error(except);
		return DEFAULT_USD_BANK_RVAL;
	}
}

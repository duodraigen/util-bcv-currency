import axios from "axios";
import { load as cheerioLoad } from "cheerio";
import { REQ_AGENT, EXTERNAL_SRC_URL, type CurrencyKinds } from "./config";

/**
 * Get the value in bolivars of a requested currency
 * @param currency { CurrencyKinds } - Which currency is the requested (see **CurrencyKinds** enum)
 * @returns number | NaN
 */
export async function getCurrencyTableProperty(
	currency: CurrencyKinds,
): Promise<number> {
	try {
		const result: number = await axios
			.get(EXTERNAL_SRC_URL, { httpsAgent: REQ_AGENT })
			.then((response) => {
				/**
				 * if response is successful, we need the data
				 * (the whole html document) to be parsed here
				 */
				const parsedTree = cheerioLoad(response.data);

				/**
				 * Every currency data container has his own id,
				 * we need the inner text after getting it
				 */
				const expression = parsedTree(`div#${currency}`).text();
				const regex = /([A-Z]|\s)/gim;

				// sanitize and parse the result
				return Number.parseFloat(
					expression.replace(regex, "").replace(",", "."),
				);
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
		return Number.NaN;
	}
}

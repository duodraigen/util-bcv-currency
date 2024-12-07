/**
 * Value obtained from bank list usd table
 * it only supports the actual usd prices
 *
 * @type CurrencyValue
 * @property {number} buy - usd buy value in bolivars price of the bank (float)
 * @property {number} sell - usd sell value in bolivars price of the bank (float)
 * @property {string} bank - bank name
 */
export type CurrencyValue = {
	buy: number;
	sell: number;
	bank: string;
};

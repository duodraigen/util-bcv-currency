# Util BCV Currency Checker
Utility to get the currency values like usd in bolivars which presents an alternative to visiting the central bank of venezuela web just for getting the USD dollar value (which is the most commonly use case of the page honestly). Additionally allows to get the usd buy/sell values per bank (supported ones which can be seen below)

This kind of strategy allows to get the value directly without entering the page constantly only to get currency values like the dollar or euro and, in fact, using this value with commercial transactions or as a service to update product commercial values based on the dollar value

## How it works?
The scrapping method is done using [Cheerio](https://cheerio.js.org/) and the html tag id/tag name disposed on the source pages:

- **Getting EUR/USD/YEN etc**: the page actually uses a `<div id="<currency>">` tag to store every currency to their respective name, which allows to get the concrete element and sanitize it.

- **Getting bank usd buy/sell values**: BCV page has a table with the bank list and each buy/sell values for usd, so, basically the only thing to do is getting the `<tbody>` tag of the table and iterate per row. **NOTE**: this method only supports the actual prices, not the past ones

## Installation
```bash
npm install util-bcv-currency
```

## Usage
**To get a currency value from currencies table**
```typescript 
await getCurrencyTableProperty(CurrencyKinds.{SupportedCurrency}).then((data) => {console.log(data)})
```

**To get usd value from banks table**
```typescript
await getBankUsdCurrencyPrices(SupportedBanks.{SupportedBank}).then((data) => {console.log(data)})
```

## Supported Currencies
```typescript
enum CurrencyKinds {
	usd = "dolar",
	rub = "rublo",
	try = "lira",
	eur = "euro",
	yen = "yuan",
}
```

## Supported Banks
```typescript
enum SupportedBanks {
	bnc = "Banco Nacional de Crédito BNC",
	bbva = "BBVA Provincial",
	other = "Otras Instituciones",
	merca = "Banco Mercantil",
	exter = "Banco Exterior",
	banes = "Banesco",
}
```

## Examples
```typescript
// Get yen value in bolivars
const yenPrice = await getCurrencyTableProperty(CurrencyKinds.yen).then((val) => val)
console.log(yenPrice)
```

```typescript
// Get usd buy and sell values from BBVA Provincial bank
const BBVAUSD = getBankUsdCurrencyPrices(SupportedBanks.bbva).then((curval) => curval)
console.log(BBVAUSD)
```

## Running tests
See [Tests Readme](tests/README.md) to get information about running and writing tests
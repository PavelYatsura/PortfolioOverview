export type DataType = {
	symbol: string
	lastPrice: string
	priceChangePercent: string
}

export type FetchAssetsType = {
	id: number
	asset: string
	price: number
	priceChangePercent: number
	name: string
}

export type Items = {
	id: number
	name: string
	wsName: string
	asset: string
	price: number
	priceBuy: number
	total: number
	priceChangePercent: number
	amount: number
}

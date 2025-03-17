import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit'
import axios from 'axios'
import { RootState } from '../store'
import { DataType, FetchAssetsType } from '../../interface/typeItems'

export const fetchAssets = createAsyncThunk(
	'assets/fetchAssetsStatus',
	async () => {
		const { data } = await axios.get<DataType[]>(
			'https://api.binance.com/api/v3/ticker/24hr'
		)
		const arr = data.filter(item => item.lastPrice != '0.00000000')
		const item = arr
			.filter(item => item.symbol.endsWith('USDT'))
			.map((item, index) => ({
				name: item.symbol,
				asset: item.symbol.replace('USDT', ''),
				price: parseFloat(item.lastPrice),
				priceChangePercent: parseFloat(item.priceChangePercent),
				id: index + 1,
			}))
		item.length = 15
		return item
	}
)
interface AssetState {
	items: FetchAssetsType[]
}

const initialState: AssetState = {
	items: [],
}
const assetsSlice = createSlice({
	name: 'assets',
	initialState,
	reducers: {
		setItems(state, action: PayloadAction<FetchAssetsType[]>) {
			state.items = action.payload
		},
		
	},
	extraReducers: builder => {
		builder
			.addCase(fetchAssets.pending, state => {
				console.log('Идет отправка')
				state.items = []
			})
			.addCase(
				fetchAssets.fulfilled,
				(state, action: PayloadAction<FetchAssetsType[]>) => {
					console.log('Получено')
					state.items = action.payload
				}
			)
			.addCase(fetchAssets.rejected, state => {
				console.log('error')
				state.items = []
			})
	},
})

export const { setItems } = assetsSlice.actions
export const selectedAsset = (state: RootState) => state.assets
export default assetsSlice.reducer

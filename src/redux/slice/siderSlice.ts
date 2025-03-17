import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { Items } from '../../interface/typeItems'
import { RootState } from '../store'

interface SiderState {
	items: Items[]
	totalPrice: number
}
type updateItem = {
	price: number
	priceChangePercent: number
	name: string
}

const initialState: SiderState = {
	items: [],
	totalPrice: 0,
}

export const siderSlice = createSlice({
	name: 'sider',
	initialState,
	reducers: {
		addItem(state, action: PayloadAction<Items>) {
			const findItem = state.items.find(obj => obj.name === action.payload.name)
			if (findItem) {
				findItem.amount = findItem.amount + action.payload.amount
			} else {
				state.items.push(action.payload)
			}
		},
		upDateItem(state, action: PayloadAction<updateItem>) {
			const findItem = state.items.find(obj => obj.name === action.payload.name)
			if (findItem) {
				findItem.price = action.payload.price
				findItem.priceChangePercent = action.payload.priceChangePercent
				state.totalPrice = state.items.reduce((sum, obj) => {
					return obj.price * obj.amount + sum
				}, 0)
			}
		},
	},
})

export const { addItem, upDateItem } = siderSlice.actions
export const selectSider = (state: RootState) => state.sider
export default siderSlice.reducer

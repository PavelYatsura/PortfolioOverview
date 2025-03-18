import { configureStore } from '@reduxjs/toolkit'
import assets from './slice/assetsSlice'
import sider, { SIDER_KEY } from './slice/siderSlice'
import { saveSorage } from './storage'

export const store = configureStore({
	reducer: {
		assets,
		sider,
	},
})


store.subscribe(() => {
	saveSorage(store.getState().sider, SIDER_KEY)
})

export type AppStore = typeof store
export type RootState = ReturnType<AppStore['getState']>
export type AppDispatch = AppStore['dispatch']

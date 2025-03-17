import { configureStore } from '@reduxjs/toolkit'
import assets from './slice/assetsSlice'
import sider from './slice/siderSlice'

export const store = configureStore({
	reducer: {
		assets,
		sider,
	},
})

export type AppStore = typeof store
export type RootState = ReturnType<AppStore['getState']>
export type AppDispatch = AppStore['dispatch']

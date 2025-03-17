import { Button, Layout, Drawer } from 'antd'
import { useState } from 'react'

import AddAssetForm from '../AddAssetForm'

const headerStyle: React.CSSProperties = {
	position: 'relative',
	padding: "0",
	height: 60,
}

const AppHeader: React.FC = () => {
	const [open, setOpen] = useState(false)

	return (
		<Layout.Header style={headerStyle}>
			<div
				style={{
					position: 'fixed',
					width: '100%',
					height: 60,
					display: 'flex',
					justifyContent: 'space-between',
					alignItems: 'center',
					textAlign: 'center',
					padding: '1rem',
					backgroundColor: '#001529',
					zIndex: 9,
				}}
			>
				<h1 style={{color: "#fff"}}>PortfolioOverview</h1>
				<Button type='primary' onClick={() => setOpen(!open)}>
					Купить Актив
				</Button>
				<Drawer
					width={600}
					title='Выберете Актив'
					onClose={() => setOpen(!open)}
					open={open}
					destroyOnClose
				>
					<AddAssetForm onClose={() => setOpen(!open)}></AddAssetForm>
				</Drawer>
			</div>
		</Layout.Header>
	)
}

export default AppHeader

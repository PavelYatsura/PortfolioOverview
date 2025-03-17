import { Layout, Typography } from 'antd'
import { useAppSelector } from '../../redux/hooks'
import { selectSider } from '../../redux/slice/siderSlice'
import PortfolioChart from '../PortfolioChart'


const contentStyle: React.CSSProperties = {
	textAlign: 'center',
	minHeight: 'calc(100vh - 60px)',
	color: '#fff',
	backgroundColor: '#001529',
	padding: '1rem',
	position: 'relative',
	
}
const AppContent: React.FC = () => {
	const { totalPrice } = useAppSelector(selectSider)

	return (
		<Layout.Content style={contentStyle}>
			<div
				style={{
					position: 'fixed',
					width: "72%"
				}}
			>
				<Typography.Title
					level={3}
					style={{ textAlign: 'left', color: '#fff' }}
				>
					Стоимость всех активов : {totalPrice.toFixed(2)} $
				</Typography.Title>
				<PortfolioChart></PortfolioChart>
			</div>
		</Layout.Content>
	)
}

export default AppContent

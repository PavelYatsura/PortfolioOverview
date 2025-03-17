import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js'
import { Pie } from 'react-chartjs-2'
import { useAppSelector } from '../redux/hooks'
import { selectSider } from '../redux/slice/siderSlice'

ChartJS.register(ArcElement, Tooltip, Legend)

const PortfolioChart: React.FC = () => {
	const { items } = useAppSelector(selectSider)

	const data = {
		labels: items.map(item => item.name),
		datasets: [
			{
				label: '$',
				data: items.map(item => item.total),
				backgroundColor: [
					'rgba(255, 99, 132, 1)',
					'rgba(54, 162, 235, 1)',
					'rgba(255, 206, 86, 1)',
					'rgba(75, 192, 192, 1)',
					'rgba(153, 102, 255, 1',
					'rgba(255, 159, 64, 1)',
				],
			},
		],
	}
	return (
		<div
			style={{
				display: 'flex',
				marginBottom: '1rem',
				justifyContent: 'center',
				height: 600,
			}}
		>
			{items.length ? <Pie data={data} /> : <div>Тут будет график активов</div>}
		</div>
	)
}

export default PortfolioChart

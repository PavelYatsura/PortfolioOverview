import { Layout, Card, Statistic, List, Typography, Tag } from 'antd'
import { ArrowUpOutlined, ArrowDownOutlined } from '@ant-design/icons'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { deleteItem, selectSider, upDateItem } from '../../redux/slice/siderSlice'

const siderStyle: React.CSSProperties = {
	padding: '1rem',
}
const AppSider: React.FC = () => {
	const { items } = useSelector(selectSider)
	const dispatch = useDispatch()
	useEffect(() => {
		const wsItems = async () => {
			if (items.length) {
				try {
					const wsName = items
						.map(item => ''.concat(item.wsName, '@ticker'))
						.join('/')
					const ws = await new WebSocket(
						'wss://stream.binance.com:9443/stream?streams='.concat(wsName)
					)
					ws.onmessage = item => {
						const t = JSON.parse(item.data)
						if (t && t.data) {
							const e = t.data,
								name = e.s,
								price = parseFloat(e.c),
								priceChangePercent = parseFloat(e.P)
							dispatch(
								upDateItem({
									price: price,
									priceChangePercent: priceChangePercent,
									name: name,
								})
							)
						}
					}
				} catch (error) {
					console.log(error)
				}
			}
		}
		wsItems()
	}, [dispatch, items])

	const onClickDeleted = (index: number) => {
		dispatch(deleteItem(index))
	}

	return (
		<Layout.Sider width='25%' style={siderStyle}>
			{items.length === 0 ? (
				<div
					style={{
						background: 'white',
						display: 'flex',
						justifyContent: 'center',
						alignItems: 'center',
						width: '100%',
						height: '100%',
						borderRadius: '5px',
					}}
				>
					Сейчас у ван нет активов
				</div>
			) : (
				<div style={{ width: '100%' }}>
					{items.map((item, index) => (
						<Card
							key={index}
							style={{ marginBottom: '1rem' }}
							onClick={() => onClickDeleted(index)}
						>
							<Statistic
								title={
									<div>
										<img
											style={{ width: 20, height: 20, marginRight: 15 }}
											src={`https://cdn.jsdelivr.net/gh/vadimmalykhin/binance-icons/crypto/${item.asset.toLowerCase()}.svg`}
										></img>
										({item.asset})&nbsp;{item.name}
									</div>
								}
								value={item.price * item.amount}
								precision={2}
								valueStyle={{
									color: item.priceBuy < item.price ? '#3f8600' : '#cf1322',
								}}
								prefix={
									item.priceBuy < item.price ? (
										<ArrowUpOutlined />
									) : (
										<ArrowDownOutlined />
									)
								}
								suffix='$'
							></Statistic>
							<List
								dataSource={[
									{
										title: 'Цена покупки',
										value: `${item.priceBuy} $`,
										isPlane: true,
									},
									{
										title: 'Цена актива',
										value: `${item.price} $`,
										profit: true,
									},
									{
										title: 'Прибыль',
										value: `${(item.price - item.priceBuy).toFixed(2)} $`,
										withTag: true,
										profit: true,
									},
									{ title: 'Количество', value: item.amount, isPlane: true },
									{
										title: 'Процент изм за 24ч',
										value: `${item.priceChangePercent} %`,
										percent: true,
									},
								]}
								size='small'
								renderItem={items => (
									<List.Item>
										<span>{items.title}</span>
										<span>
											{items.withTag && (
												<Tag
													color={
														item.price - item.priceBuy > 0 ? 'green' : 'error'
													}
												>
													{(
														((item.price - item.priceBuy) / item.priceBuy) *
														100
													).toFixed(2)}
													%
												</Tag>
											)}
											{items.isPlane && items.value}
											{items.percent && (
												<Typography.Text
													type={
														item.priceChangePercent > 0 ? 'success' : 'danger'
													}
												>
													{items.value}
												</Typography.Text>
											)}
											{items.profit && (
												<Typography.Text
													type={
														item.price - item.priceBuy > 0
															? 'success'
															: 'danger'
													}
												>
													{items.value}
												</Typography.Text>
											)}
										</span>
									</List.Item>
								)}
							/>
						</Card>
					))}
				</div>
			)}
		</Layout.Sider>
	)
}
export default AppSider

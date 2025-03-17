import { useSelector } from 'react-redux'
import { fetchAssets, selectedAsset } from '../redux/slice/assetsSlice'
import { useEffect, useRef, useState } from 'react'
import {
	Divider,
	Flex,
	Select,
	Space,
	Typography,
	Form,
	Button,
	InputNumber,
	Result,
} from 'antd'
import { addItem } from '../redux/slice/siderSlice'
import { FetchAssetsType, Items } from '../interface/typeItems'
import { useAppDispatch } from '../redux/hooks'

type OnCloseType = {
	onClose: () => void
}

const AddAssetForm: React.FC<OnCloseType> = ({ onClose }) => {
	const [form] = Form.useForm()
	const [coin, setCoin] = useState<FetchAssetsType | undefined>(undefined)
	const [submit, setSubmit] = useState(false)
	const [itemRef, setItemRef] = useState<Items>()
	const assetRef = useRef<Items>(itemRef)

	const dispatch = useAppDispatch()
	const { items } = useSelector(selectedAsset)

	useEffect(() => {
		dispatch(fetchAssets())
	}, [dispatch])

	function onCloseSubmit() {
		setSubmit(!submit)
		setCoin(undefined)
	}
	if (coin == undefined) {
		return (
			<Select
				style={{ width: '100%' }}
				onSelect={value => setCoin(items.find(coin => coin.id === value))}
				placeholder='Нажмите что бы открыть'
				options={items.map(item => ({
					label: item.asset,
					value: item.id,
					price: item.price,
				}))}
				optionRender={item => (
					<Space>
						<img
							src={`https://cdn.jsdelivr.net/gh/vadimmalykhin/binance-icons/crypto/${item.data.label.toLowerCase()}.svg`}
						></img>{' '}
						{item.data.label}
						{item.data.price}
					</Space>
				)}
			/>
		)
	}
	function handelAmountChange(value: number | null) {
		const price = form.getFieldValue('price')
		form.setFieldsValue({
			total: price * value!,
		})
	}
	function handelPriceChange(value: number | null) {
		const amount = form.getFieldValue('amount')
		form.setFieldsValue({
			total: +(amount * value!),
		})
	}
	const onFinish = (values: Items) => {
		const newAsset = {
			id: coin.id,
			name: coin.name,
			wsName: coin.name.toLowerCase(),
			asset: coin.asset,
			price: values.price,
			priceBuy: values.price,
			total: Number(values.total.toFixed(2)),
			priceChangePercent: coin.priceChangePercent,
			amount: values.amount,
		}
		assetRef.current = newAsset
		setSubmit(!submit)
		setItemRef(newAsset)
		dispatch(addItem(newAsset))
	}
	if (submit) {
		return (
			<Result
				status='success'
				title={`Успешно купили ${coin.name}`}
				subTitle={`В количестве ${assetRef.current?.amount} шт за цену ${assetRef.current?.total} $`}
				extra={[
					<Button type='primary' key='console' onClick={onClose}>
						Закрыть
					</Button>,
					<Button key='buy' onClick={onCloseSubmit}>
						Купить еще
					</Button>,
				]}
			/>
		)
	}
	return (
		<Form
			form={form}
			name='basic'
			labelCol={{ span: 4 }}
			wrapperCol={{ span: 10 }}
			style={{ maxWidth: 600 }}
			initialValues={{ price: coin.price }}
			onFinish={onFinish}
		>
			<Flex align='center'>
				<img
					style={{ width: 40, marginRight: 10 }}
					src={`https://cdn.jsdelivr.net/gh/vadimmalykhin/binance-icons/crypto/${coin.asset.toLowerCase()}.svg`}
					alt={`${coin.asset.toLowerCase()}.svg`}
				></img>
				<Typography.Title level={2} style={{ margin: 0 }}>
					{coin.name}
				</Typography.Title>
			</Flex>
			<Divider></Divider>
			<Form.Item
				label='Количество'
				name='amount'
				rules={[
					{
						required: true,
						type: 'number',
						min: 0,
						message: 'Нельзя выбрать меньше 0',
					},
				]}
			>
				<InputNumber
					style={{ width: '100%' }}
					onChange={(value: number | null) => handelAmountChange(value)}
				/>
			</Form.Item>
			<Form.Item label='Цена' name='price'>
				<InputNumber
					disabled
					style={{ width: '100%' }}
					onChange={handelPriceChange}
				/>
			</Form.Item>
			<Form.Item label='Total' name='total'>
				<InputNumber disabled style={{ width: '100%' }} />
			</Form.Item>
			<Form.Item>
				<Button type='primary' htmlType='submit'>
					Добавить актив
				</Button>
			</Form.Item>
		</Form>
	)
}

export default AddAssetForm

import { Layout } from 'antd'
import AppHeader from './components/Layout/AppHeader'
import AppSider from './components/Layout/AppSider'
import AppContent from './components/Layout/AppContent'

const App: React.FC = () => {
	return (
		<Layout>
			<AppHeader></AppHeader>
			<Layout>
				<AppSider></AppSider>
				<AppContent></AppContent>
			</Layout>
		</Layout>
	)
}

export default App

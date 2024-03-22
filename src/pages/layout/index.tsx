import { Outlet } from 'react-router-dom'

import NavBar from '../../components/navbar'

const MainLayout = () => {
	return (
		<main>
			<div className={`flex min-h-[calc(100dvh-64px)] flex-col bg-gray-50`}>
				<NavBar />
				<Outlet />
			</div>
		</main>
	)
}

export default MainLayout

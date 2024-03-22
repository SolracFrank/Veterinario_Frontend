import { RouterProvider } from 'react-router-dom'

import { AuthProvider } from './context/authContext'
import PatientsProvider from './context/patientsContext'
import { router } from './router'

function App() {
	return (
		<>
			<AuthProvider>
				<PatientsProvider>
					<RouterProvider router={router} />
				</PatientsProvider>
			</AuthProvider>
		</>
	)
}

export default App

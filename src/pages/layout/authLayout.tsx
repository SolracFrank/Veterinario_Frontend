import { useEffect } from 'react'
import { Outlet, useNavigate } from 'react-router-dom'

import useAuth from '../../hooks/useAuth'

const AuthLayout = () => {
	const auth = useAuth()
	const navigate = useNavigate()
	useEffect(() => {
		if (auth?.isAuthenticated) return

		navigate('/login')
	}, [auth?.isAuthenticated])

	return <>{auth?.isAuthenticated && <Outlet />}</>
}

export default AuthLayout

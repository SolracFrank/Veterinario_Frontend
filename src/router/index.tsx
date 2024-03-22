import { createBrowserRouter } from 'react-router-dom'

import ErrorPage from '../pages/errorPage'
import MainLayout from '../pages/layout'
import AuthLayout from '../pages/layout/authLayout'
import Login from '../pages/login'
import ForgetPassword from '../pages/login/forgetPassword'
import RecoverPassword from '../pages/login/recoverPassword'
import Pacientes from '../pages/patients'
import Profile from '../pages/profile'
import ProfilePassword from '../pages/profile/changePassword'
import Register from '../pages/register'
import Confirm from '../pages/register/confirm'

export const router = createBrowserRouter([
	{
		path: '/',
		element: <MainLayout />,
		errorElement: <ErrorPage />,
		children: [
			{
				element: <Login />,
				path: 'login',
			},
			{
				element: <ForgetPassword />,
				path: 'forget-password',
			},
			{
				element: <Confirm />,
				path: 'confirm/:token',
			},
			{
				element: <RecoverPassword />,
				path: 'forget-password/:token',
			},
			{
				element: <Register />,
				path: 'register',
			},
			{
				element: <AuthLayout />,
				path: 'veterinario',
				children: [
					{
						element: <Pacientes />,
						path: 'pacientes',
					},
					{
						element: <Profile />,
						path: 'profile',
					},
					{
						element: <ProfilePassword />,
						path: 'password',
					},
				],
			},
		],
	},
])

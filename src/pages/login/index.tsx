import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { AxiosError } from 'axios'
import { clsx } from 'clsx'

import Alert from '../../components/alert'
import useAuth from '../../hooks/useAuth'
import { IError } from '../../interfaces/errors'
import axiosClient from '../../services/axiosClient'
import ToProblemDetails from '../../utils/toProblemDetails'
import { validateObject } from '../../utils/validateObjet'
interface loginData {
	email: string | undefined
	password: string | undefined
}

const Login = () => {
	const [data, setData] = useState<loginData>({ email: '', password: '' })
	const auth = useAuth()
	const [message, setMessage] = useState<IError>()
	const [loading, setLoading] = useState(false)
	const navigate = useNavigate()

	useEffect(() => {
		if (auth?.user) {
			navigate('/', { replace: true })
		}
	}, [])

	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault()
		setMessage(undefined)
		console.log(data)
		if (!data || !validateObject(data)) {
			setMessage({
				title: 'Todos los campos son obligatorios',
				message: 'Todos los campos son obligatorios',
				isError: true,
			})
			return
		}
		setLoading(true)
		setMessage(undefined)
		// handling submit
		try {
			const r = await axiosClient.post('veterinarios/login', {
				...data,
			})
			if (r.status >= 200 && r.status <= 299) {
				auth?.login(r.data)

				navigate('/', { replace: true })
				return
			}
		} catch (error) {
			const newError = error as AxiosError
			const problemDetails = ToProblemDetails(newError)
			setMessage({
				message: problemDetails.detail,
				title: problemDetails.title,
			})
		} finally {
			setLoading(false)
		}
	}
	return (
		<div>
			<form
				className='container mx-auto mt-4 gap-12 bg-white p-5 md:grid md:grid-cols-2'
				onSubmit={handleSubmit}>
				<div className='col-span-1 text-6xl font-black text-indigo-600'>
					<h1>
						Inicia Sesión y Administra tus{' '}
						<span className='text-black'>Pacientes</span>
					</h1>
				</div>
				<div className='col-span-1 text-indigo-600'>
					<label
						className='block text-xl font-bold uppercase text-gray-600'
						htmlFor='email'>
						Email
					</label>
					<input
						className='mt-3 w-full rounded-xl border bg-gray-50 p-3'
						name='email'
						type='email'
						value={data?.email}
						onChange={e => {
							setData({ ...data, email: e.target.value })
						}}
						placeholder='correo electrónico'
					/>
					<label
						className='block text-xl font-bold uppercase text-gray-600 '
						htmlFor='password'>
						contraseña
					</label>
					<input
						className='mt-3 w-full rounded-xl border bg-gray-50 p-3'
						type='password'
						value={data?.password}
						onChange={e => {
							setData({ ...data, password: e.target.value })
						}}
						placeholder='Contraseña'
					/>
					<button
						type='submit'
						name='login'
						title='login'
						disabled={loading}
						className={clsx(
							'mt-5 w-full rounded-xl bg-indigo-700 px-10 py-3 font-bold uppercase text-white hover:cursor-pointer hover:bg-indigo-800 md:w-auto',
							{ 'animate-pulse': loading }
						)}>
						{loading ? 'Iniciando sesión' : 'Iniciar sesión'}
					</button>
				</div>
				{message && message.message && <Alert message={message} />}
				<nav className='col-span-1 col-start-2 lg:flex lg:justify-between'>
					<Link
						className='my-5 block text-center text-indigo-900'
						to='/register'>
						¿No tienes una cuenta?{' '}
						<span className='font-bold hover:text-indigo-600 hover:underline'>
							Regístrate
						</span>
					</Link>
					<Link
						className='my-5 block text-center text-indigo-900'
						to='/forget-password'>
						<span className='font-bold hover:text-indigo-600 hover:underline'>
							Olvidé mi contraseña
						</span>
					</Link>
				</nav>
			</form>
		</div>
	)
}

export default Login

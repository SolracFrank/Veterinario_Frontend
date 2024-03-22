import { useEffect, useRef, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { AxiosError } from 'axios'

import Alert from '../../components/alert'
import { IError } from '../../interfaces/errors'
import axiosClient from '../../services/axiosClient'
import ToProblemDetails from '../../utils/toProblemDetails'

import '../../styles/spinner.css'

const RecoverPassword = () => {
	const { token } = useParams()
	const [loading, setLoading] = useState(true)
	const [success, setSuccess] = useState(false)
	const [tokenError, setTokenError] = useState(false)
	const [message, setMessage] = useState<IError>()
	const [passwords, setPasswords] = useState({
		password: '',
		repeatPassword: '',
	})
	const hasFetched = useRef(false)
	const navigate = useNavigate()
	useEffect(() => {
		if (!token) {
			setTokenError(true)
			setMessage({
				title: 'Token vacío',
				message: 'El token ha expirado o es inválido',
			})
			return
		}
		if (!hasFetched.current && !message && token) {
			fetchToken()
			hasFetched.current = true
		}
	}, [])
	const fetchToken = async () => {
		if (message) return
		setLoading(true)
		setMessage(undefined)
		// handling submit
		try {
			await axiosClient.get(`veterinarios/recover-password/${token}`)
			setTokenError(false)
		} catch (error) {
			setTokenError(true)
			const newError = error as AxiosError
			const problemDetails = ToProblemDetails(newError)
			setMessage({
				message: 'El token ha expirado o es inválido',
				title: problemDetails.title,
			})
		} finally {
			setLoading(false)
		}
	}

	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault()
		setMessage(undefined)
		if (loading) return
		if (
			Object.keys(passwords).some(item => {
				passwords[item as keyof typeof passwords]?.trim() !== ''
			})
		) {
			setMessage({
				message: 'Las contraseñas son obligatorias',
				title: 'Las contraseñas son obligatorias',
				isError: true,
			})
			return
		}
		if (passwords['password'] !== passwords['repeatPassword']) {
			setMessage({
				message: 'Las contraseñas no coinciden',
				title: 'Las contraseñas no coinciden',
				isError: true,
			})
			return
		}
		if (
			!/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^\da-zA-Z]).{6,20}$/.test(
				passwords.password
			)
		) {
			setMessage({
				title: 'Contraseña inválida',
				message:
					'La contraseña debe tener al menos una mayúscula, una minúscula y un carácter especial.',
				isError: true,
			})
			return
		}
		setLoading(true)
		try {
			const r = await await axiosClient.post(
				`veterinarios/recover-password/${token}`,
				{
					password: passwords.password,
				}
			)
			if (r.status > 199 && r.status < 300) {
				setSuccess(true)
				setMessage({
					title: 'Contraseña cambiada',
					message: 'La contraseña ha sido cambiada satisfactoriamente.',
					isError: false,
				})
			}
		} catch (error) {
			const newError = error as AxiosError
			const problemDetails = ToProblemDetails(newError)
			setMessage({
				message: 'Ocurrió un error desconocido',
				title: problemDetails.title,
			})
		} finally {
			setLoading(false)
		}
	}
	useEffect(() => {
		if (success) {
			setTimeout(() => {
				navigate('/login', { replace: true })
			}, 2000)
		}
	}, [success])

	return (
		<div className='mt-16 flex w-full flex-col justify-center text-center'>
			{tokenError ? (
				<>
					<h1 className='text-xl'>
						{
							<span className='font-bold text-indigo-600'>
								{message?.message}
							</span>
						}
					</h1>
				</>
			) : (
				<>
					<div>
						<form
							className='container mx-auto mt-4 gap-12 bg-white p-5 md:grid md:grid-cols-2'
							onSubmit={handleSubmit}>
							<div className='col-span-1 text-6xl font-black text-indigo-600'>
								<h1>Ingresa tu nueva contraseña </h1>
							</div>
							<div className='col-span-1 text-indigo-600'>
								<label
									className='block text-xl font-bold uppercase text-gray-600 '
									htmlFor='password'>
									contraseña
								</label>
								<input
									className='mt-3 w-full rounded-xl border bg-gray-50 p-3'
									type='password'
									placeholder='Contraseña'
									onChange={e =>
										setPasswords({ ...passwords, password: e.target.value })
									}
								/>
								<label
									className='block text-xl font-bold uppercase text-gray-600 '
									htmlFor='repeatPassword'>
									Repetir contraseña
								</label>
								<input
									className='mt-3 w-full rounded-xl border bg-gray-50 p-3'
									type='password'
									placeholder='Repite Contraseña'
									onChange={e =>
										setPasswords({
											...passwords,
											repeatPassword: e.target.value,
										})
									}
								/>
								<button
									type='submit'
									name='login'
									disabled={loading || success}
									title='login'
									className={`mt-5 w-full rounded-xl bg-indigo-700 px-10 py-3 font-bold uppercase text-white hover:cursor-pointer hover:bg-indigo-800 md:w-auto ${loading && 'animate-pulse'}`}>
									{success
										? 'Tu contraseña ha sido actualizada'
										: 'Establecer nueva contraseña'}
								</button>
							</div>
							{message && message.message && <Alert message={message} />}
						</form>
					</div>
				</>
			)}
		</div>
	)
}

export default RecoverPassword

import { useState } from 'react'
import { AxiosError } from 'axios'

import Alert from '../../components/alert'
import { IError } from '../../interfaces/errors'
import axiosClient from '../../services/axiosClient'
import ToProblemDetails from '../../utils/toProblemDetails'

const ForgetPassword = () => {
	const [email, setEmail] = useState('')
	const [message, setMessage] = useState<IError>()
	const [loading, setLoading] = useState(false)

	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault()
		if (loading) return
		if ([email?.trim()].includes('')) {
			setMessage({
				title: 'Hay campos vacíos',
				message: 'Todos los campos son obligatorios',
			})
			return
		}
		setLoading(true)
		setMessage(undefined)
		// handling submit
		try {
			const r = await axiosClient.post('veterinarios/recover-password', {
				email,
			})
			if (r.status >= 200 && r.status <= 299) {
				setMessage({
					message: 'Se te ha enviado un email con los pasos a seguir',
					title: 'Email enviado',
					isError: false,
				})
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
						Recupera tu acceso y no pierdas{' '}
						<span className='text-black'>tus Pacientes</span>
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
						value={email}
						onChange={e => setEmail(e.target.value)}
						placeholder='correo electrónico'
					/>
					<button
						type='submit'
						name='recover'
						title='recover'
						disabled={loading}
						className='mt-5 w-full rounded-xl bg-indigo-700 px-10 py-3 font-bold uppercase text-white hover:cursor-pointer hover:bg-indigo-800 md:w-auto'>
						{loading ? 'Enviando...' : 'Enviar instrucciones'}
					</button>
				</div>
				{message && message.message && <Alert message={message} />}
			</form>
		</div>
	)
}

export default ForgetPassword

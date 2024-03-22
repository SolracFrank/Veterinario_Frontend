import { useState } from 'react'
import { AxiosError } from 'axios'

import Alert from '../../components/alert'
import { IError } from '../../interfaces/errors'
import axiosClient from '../../services/axiosClient'
import { ProfilePasswordType } from '../../types/pacienteTypes'
import ToProblemDetails from '../../utils/toProblemDetails'
import { validateObject } from '../../utils/validateObjet'

import NavOptions from './navOptions'

const ProfilePassword = () => {
	const [message, setMessage] = useState<IError>()

	const [profile, setProfile] = useState<ProfilePasswordType>({
		password: '',
		oldPassword: '',
		repeatPassword: '',
	})

	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		//validations
		e.preventDefault()
		console.log('ejecutando')

		if (!profile || !validateObject(profile)) {
			setMessage({
				title: 'Todos los campos son obligatorios',
				message: 'Todos los campos son obligatorios',
				isError: true,
			})
			return
		}
		if (profile.password !== profile.repeatPassword) {
			setMessage({
				title: 'La nueva contraseña debe coincidir repetir nueva contraseña',
				message: 'La nueva contraseña debe coincidir repetir nueva contraseña',
				isError: true,
			})
			return
		}
		setMessage(undefined)
		console.log('pasó validación')

		// handling submit
		try {
			const response = await axiosClient.patch(
				'/veterinarios/perfil/password',
				profile
			)
			setMessage({
				message: response.data.message,
				title: response.data.message,
				isError: false,
			})
		} catch (error) {
			if (error instanceof AxiosError) {
				console.log('instanceof')
				const newError = error as AxiosError
				const problemDetails = ToProblemDetails(newError)
				console.log('problem', problemDetails)

				setMessage({
					message: problemDetails.detail,
					title: problemDetails.title,
				})
			} else {
				setMessage({
					message: (error as Error).message,
					title: 'error desconocido',
				})
			}
		}
	}

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		if (profile && e.target.name in profile) {
			setProfile({ ...profile, [e.target.name]: e.target.value })
		}
	}
	return (
		<div>
			<NavOptions />

			<div className='container mx-auto mt-4 gap-12 bg-white p-5 md:grid md:grid-cols-2'>
				<div className='col-span-1 text-6xl font-black '>
					<h2 className='text-center text-3xl font-black'>
						{' '}
						Cambiar contraseña <span className=' text-indigo-600'>Aquí</span>
					</h2>
				</div>
				<div className='col-span-1 text-indigo-600'>
					<form onSubmit={handleSubmit}>
						<label
							className='block text-xl font-bold uppercase text-gray-600 '
							htmlFor='nombre'>
							Tu contraseña actual
						</label>
						<input
							className='mt-3 w-full rounded-xl border bg-gray-50 p-3'
							id='oldPassword'
							name='oldPassword'
							value={profile?.oldPassword}
							onChange={handleChange}
							type='password'
							autoComplete='current-password'
							placeholder='Contraseña actual'
						/>
						<label
							className='block text-xl font-bold uppercase text-gray-600 '
							htmlFor='email'>
							Tu nueva contraseña
						</label>
						<input
							className='mt-3 w-full rounded-xl border bg-gray-50 p-3'
							id='password'
							name='password'
							type='password'
							autoComplete='new-password'
							value={profile?.password}
							onChange={handleChange}
							placeholder='Nueva contraseña'
						/>

						<label
							className='block text-xl font-bold uppercase text-gray-600 '
							htmlFor='web'>
							Repite nueva contraseña
						</label>
						<input
							className='mt-3 w-full rounded-xl border bg-gray-50 p-3'
							id='repeatPassword'
							autoComplete='new-password'
							name='repeatPassword'
							type='password'
							value={profile?.repeatPassword}
							onChange={handleChange}
							placeholder='Repite Nueva contraseña'
						/>
						<button
							type='submit'
							name='register'
							title='register'
							className='mt-5 w-full rounded-xl bg-indigo-700 px-10 py-3 font-bold uppercase text-white hover:cursor-pointer hover:bg-indigo-800 md:w-auto'>
							Actualizar contraseña
						</button>
						{message && message.message && <Alert message={message} />}
					</form>
				</div>
			</div>
		</div>
	)
}

export default ProfilePassword

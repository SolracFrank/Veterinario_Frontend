import { useEffect, useState } from 'react'
import { AxiosError } from 'axios'

import Alert from '../../components/alert'
import useAuth from '../../hooks/useAuth'
import { IError } from '../../interfaces/errors'
import { ProfileType } from '../../types/pacienteTypes'
import ToProblemDetails from '../../utils/toProblemDetails'
import { validateFilteredObject } from '../../utils/validateObjet'

import NavOptions from './navOptions'

const Profile = () => {
	const auth = useAuth()
	const [message, setMessage] = useState<IError>()

	const [profile, setProfile] = useState<ProfileType>({
		_id: '',
		email: '',
		nombre: '',
		web: '',
	})

	useEffect(() => {
		auth?.getProfile()
	}, [])

	useEffect(() => {
		if (auth?.profile) {
			setProfile(auth.profile)
		}
	}, [auth?.profile])

	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		//validations
		e.preventDefault()
		setMessage(undefined)
		console.log(profile)

		if (!profile || !validateFilteredObject(profile, 'web')) {
			console.log('no pasó validación')

			setMessage({
				title: 'Todos los campos son obligatorios',
				message: 'Todos los campos son obligatorios',
				isError: true,
			})
			return
		}
		console.log('pasó validación')

		// handling submit
		try {
			const r = await auth?.updateProfile(profile)
			setMessage(r)
		} catch (error) {
			const newError = error as AxiosError
			const problemDetails = ToProblemDetails(newError)
			setMessage({
				message: problemDetails.detail,
				title: problemDetails.title,
			})
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
				{auth?.loading ? (
					<h2 className='text-center text-3xl font-black'> Cargando...</h2>
				) : (
					<>
						<div className='col-span-1 text-6xl font-black '>
							<h2 className='text-center text-3xl font-black'>
								{' '}
								Cambiar perfil <span className=' text-indigo-600'>Aquí</span>
							</h2>
						</div>
						<div className='col-span-1 text-indigo-600'>
							<form onSubmit={handleSubmit}>
								<label
									className='block text-xl font-bold uppercase text-gray-600 '
									htmlFor='nombre'>
									Tu nombre
								</label>
								<input
									className='mt-3 w-full rounded-xl border bg-gray-50 p-3'
									id='nombre'
									name='nombre'
									value={profile?.nombre}
									onChange={handleChange}
									type='text'
									placeholder='Nombre'
								/>
								<label
									className='block text-xl font-bold uppercase text-gray-600 '
									htmlFor='email'>
									Tu correo
								</label>
								<input
									className='mt-3 w-full rounded-xl border bg-gray-50 p-3'
									id='email'
									name='email'
									type='email'
									value={profile?.email}
									onChange={handleChange}
									placeholder='Correo electrónico'
								/>

								<label
									className='block text-xl font-bold uppercase text-gray-600 '
									htmlFor='web'>
									Tu web
								</label>
								<input
									className='mt-3 w-full rounded-xl border bg-gray-50 p-3'
									id='web'
									name='web'
									type='text'
									value={profile?.web}
									onChange={handleChange}
									placeholder='TTu página web'
								/>
								<button
									type='submit'
									name='register'
									title='register'
									className='mt-5 w-full rounded-xl bg-indigo-700 px-10 py-3 font-bold uppercase text-white hover:cursor-pointer hover:bg-indigo-800 md:w-auto'>
									Actualizar perfil
								</button>
								{message && message.message && <Alert message={message} />}
							</form>
						</div>
					</>
				)}
			</div>
		</div>
	)
}

export default Profile

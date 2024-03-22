import { useState } from 'react'
import { Link } from 'react-router-dom'
import { AxiosError } from 'axios'

import Alert from '../../components/alert'
import { IError } from '../../interfaces/errors'
import axiosClient from '../../services/axiosClient'
import ToProblemDetails from '../../utils/toProblemDetails'

const Register = () => {
	const [nombre, setNombre] = useState('')
	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')
	const [repeat, setRepeat] = useState('')

	const [errors, setErrors] = useState<IError>()

	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		//validations
		e.preventDefault()
		if (
			[
				nombre?.trim(),
				email?.trim(),
				password?.trim(),
				repeat?.trim(),
			].includes('')
		) {
			setErrors({
				title: 'Hay campos vacíos',
				message: 'Todos los campos son obligatorios',
			})
			return
		}
		if (password != repeat) {
			setErrors({
				title: 'Contraseñas distintas',
				message: 'Los campos de contraseña no son iguales',
			})
			return
		}
		if (password.length < 6 || password.length > 20) {
			setErrors({
				title: 'Contraseña inválida',
				message:
					'La contraseña debe tener al menos 6 caracteres mínimos y 20  máximos.',
			})
			return
		}
		if (
			!/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^\da-zA-Z]).{6,20}$/.test(password)
		) {
			setErrors({
				title: 'Contraseña inválida',
				message:
					'La contraseña debe tener al menos una mayúscula, una minúscula y un carácter especial.',
			})
			return
		}
		setErrors(undefined)
		// handling submit
		try {
			const data = { nombre, email, password }
			const r = await axiosClient.post('veterinarios', data)
			console.log(r)
		} catch (error) {
			const newError = error as AxiosError
			const problemDetails = ToProblemDetails(newError)
			setErrors({
				message: problemDetails.detail,
				title: problemDetails.title,
			})
		}
	}
	return (
		<div>
			<form
				className='container mx-auto mt-4 gap-12 bg-white p-5 md:grid md:grid-cols-2'
				onSubmit={handleSubmit}>
				<div className='col-span-1 text-6xl font-black text-indigo-600'>
					<h1>
						Crea tu cuenta y Administra tus{' '}
						<span className='text-black'>Pacientes</span>
					</h1>
				</div>
				<div className='col-span-1 text-indigo-600'>
					<label
						className='block text-xl font-bold uppercase text-gray-600'
						htmlFor='nombre'>
						Nombre
					</label>
					<input
						className='mt-3 w-full rounded-xl border bg-gray-50 p-3'
						name='nombre'
						type='text'
						placeholder='Tu nombre'
						value={nombre}
						onChange={e => setNombre(e.target.value)}
					/>
					<label
						className='block text-xl font-bold uppercase text-gray-600'
						htmlFor='email'>
						Tu Email
					</label>
					<input
						className='mt-3 w-full rounded-xl border bg-gray-50 p-3'
						name='email'
						type='email'
						value={email}
						onChange={e => setEmail(e.target.value)}
						placeholder='correo electrónico'
					/>
					<label
						className='block text-xl font-bold uppercase text-gray-600 '
						htmlFor='password'>
						Tu contraseña
					</label>
					<input
						className='mt-3 w-full rounded-xl border bg-gray-50 p-3'
						name='password'
						type='password'
						value={password}
						onChange={e => setPassword(e.target.value)}
						placeholder='Contraseña'
					/>
					<label
						className='block text-xl font-bold uppercase text-gray-600 '
						htmlFor='repeatPassword'>
						Repetir contraseña
					</label>
					<input
						className='mt-3 w-full rounded-xl border bg-gray-50 p-3'
						name='repeatPassword'
						type='password'
						placeholder='Repetir contraseña'
						value={repeat}
						onChange={e => setRepeat(e.target.value)}
					/>
					<button
						type='submit'
						name='register'
						title='register'
						className='mt-5 w-full rounded-xl bg-indigo-700 px-10 py-3 font-bold uppercase text-white hover:cursor-pointer hover:bg-indigo-800 md:w-auto'>
						Registrarse
					</button>
				</div>
				{errors && errors.message && <Alert message={errors} />}

				<nav className='col-span-1 col-start-2 lg:flex lg:justify-between'>
					<Link className='my-5 block text-center text-indigo-900' to='/login'>
						Ya tienes una cuenta?{' '}
						<span className='font-bold hover:text-indigo-600 hover:underline'>
							Inicia sesión
						</span>
					</Link>
				</nav>
			</form>
		</div>
	)
}

export default Register

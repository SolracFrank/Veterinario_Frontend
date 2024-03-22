import { useEffect, useRef, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { AxiosError } from 'axios'

import { IError } from '../../interfaces/errors'
import axiosClient from '../../services/axiosClient'
import ToProblemDetails from '../../utils/toProblemDetails'

import '../../styles/spinner.css'

const Confirm = () => {
	const { token } = useParams()
	const [loading, setLoading] = useState(true)
	const [errors, setErrors] = useState<IError>()
	const hasFetched = useRef(false)

	useEffect(() => {
		if (!token) {
			setErrors({
				title: 'Token vacío',
				message: 'El token ha expirado o es inválido',
			})
			return
		}
		if (!hasFetched.current && !errors && token) {
			fetchToken()
			hasFetched.current = true
		}
	}, [])
	const fetchToken = async () => {
		if (errors) return
		setLoading(true)
		setErrors(undefined)
		// handling submit
		try {
			await axiosClient.get(`veterinarios/confirmar/${token}`)
		} catch (error) {
			const newError = error as AxiosError
			const problemDetails = ToProblemDetails(newError)
			setErrors({
				message: 'El token ha expirado o es inválido',
				title: problemDetails.title,
			})
		} finally {
			setLoading(false)
		}
	}

	return (
		<div className='mt-16 flex w-full flex-col justify-center text-center'>
			{errors ? (
				<>
					<h1 className='text-xl'>
						{
							<span className='font-bold text-indigo-600'>
								{errors?.message}
							</span>
						}
					</h1>
				</>
			) : loading ? (
				<>
					<div className='lds-default'>
						<div></div>
						<div></div>
						<div></div>
						<div></div>
						<div></div>
						<div></div>
						<div></div>
						<div></div>
						<div></div>
						<div></div>
						<div></div>
						<div></div>
					</div>
				</>
			) : (
				<>
					<h1 className='text-xl'>
						Tu cuenta ha sido{' '}
						<span className='font-bold text-indigo-600'>confirmada</span>
					</h1>
					<Link
						className='mx-auto mt-2 w-fit rounded-xl bg-indigo-600 px-2 py-4 text-xl text-indigo-200 shadow-sm hover:bg-indigo-800 '
						to='/veterinario'>
						{' '}
						Comienza a administrar a tus{' '}
						<span className='font-bold'>pacientes</span>
					</Link>
				</>
			)}
		</div>
	)
}

export default Confirm

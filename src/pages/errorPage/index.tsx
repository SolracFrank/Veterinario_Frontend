import { Link, useRouteError } from 'react-router-dom'

interface ErrorData {
	status: number
	statusText?: string
	message?: string
	error?: { message: string; stack: string }
	data: string
}

const ErrorPage = () => {
	const rawError = useRouteError()

	const error: ErrorData | undefined =
		typeof rawError === 'object' ? (rawError as ErrorData) : undefined
	console.error(error)
	return (
		<div
			id='error-page'
			className='flex h-screen flex-col items-center justify-center bg-gray-200'>
			<p className='text-center text-3xl font-thin'>
				{error && (
					<p className='italic'>
						{error.status} {': '}
						{error.statusText}
					</p>
				)}
				{error?.error && <p className='font-semibold'>{error.error.message}</p>}
			</p>
			<div className='mt-4'>
				{error && error.status >= 400 && error.status < 500 && (
					<Link
						className='bg-blue-800 px-4 py-2 text-white hover:bg-blue-400'
						to='/'>
						Go back home
					</Link>
				)}
			</div>
		</div>
	)
}

export default ErrorPage

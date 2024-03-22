import { IError } from '../../interfaces/errors'

interface AlertProps {
	message: IError
}
const Alert = ({ message }: AlertProps) => {
	const isError = message.isError ?? true
	return (
		<div
			className={`col-start-2 w-full rounded-xl border bg-gradient-to-r ${isError ? 'from-red-100 to-red-600 text-red-800' : 'from-green-100 to-green-600 text-green-800'}  py-4 text-center `}>
			<h1>{message.message}</h1>
		</div>
	)
}

export default Alert

import { AxiosError } from 'axios'

import { ProblemDetails } from '../interfaces/toProblemDetails'

type axiosResponseType = {
	data: axiosResponseDataType | string
	status: number
	statusText: string
}
type axiosResponseDataType = {
	message: string
	name: string
	status: number
}
const ToProblemDetails = (error: AxiosError) => {
	const response = error.response as axiosResponseType
	const errorResponse: ProblemDetails = {
		instance: error.response?.config.url ?? 'unknown',
		detail: 'unknown error',
		status: 500,
		title: 'Error desconocido',
	}
	Object.keys(response).forEach(item => {
		if (item == 'data') {
			if (typeof response[item as keyof axiosResponseType] !== 'string') {
				const { message, name, status } = response[
					item as keyof typeof response
				] as axiosResponseDataType
				errorResponse.detail = message ?? 'Unknown Error'
				errorResponse.title = name
				errorResponse.status = status
			} else {
				errorResponse.detail = response.statusText
				errorResponse.title = response.statusText
				errorResponse.status = response.status
			}
		}
	})
	return errorResponse
}

export default ToProblemDetails

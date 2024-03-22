import { mongoIgnoreFields } from './mongoIgnoreFields'

export const validateObject = <T extends object>(validateObject: T): boolean =>
	Object.keys(validateObject).every(item => {
		const value = validateObject[item as keyof T]
		if (typeof value == 'string') {
			return value.trim().length > 0
		}
		return value
	})

export const validateFilteredObject = <T extends object, K extends keyof T>(
	validateObject: T,
	...avoidFields: Array<K>
): boolean => {
	return Object.keys(validateObject).every(item => {
		if (
			!avoidFields.includes(item as K) &&
			!mongoIgnoreFields.includes(item.trim())
		) {
			const value = validateObject[item as keyof T]
			if (typeof value === 'string') {
				return value.trim().length !== 0
			}

			return value
		}
		return true
	})
}

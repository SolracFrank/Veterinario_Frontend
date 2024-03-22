import { IError } from '../interfaces/errors'

import { ProfileType } from './pacienteTypes'
import { AuthUser } from './veterinarioTypes'

export type AuthContextType = {
	user: AuthUser | undefined
	login: (data: AuthUser) => void
	logout: (onLogout: () => void) => void
	isAuthenticated: boolean
	loading: boolean
	getProfile: () => Promise<IError | undefined>
	updateProfile: (profileData: ProfileType) => Promise<IError | undefined>

	profile: ProfileType | undefined
}

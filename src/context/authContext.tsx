import { createContext, useEffect, useMemo, useState } from 'react'
import { AxiosError } from 'axios'

import { IError } from '../interfaces/errors'
import axiosClient from '../services/axiosClient'
import { AuthContextType } from '../types/authContextType'
import { ProfileType } from '../types/pacienteTypes'
import { AuthUser } from '../types/veterinarioTypes'
import ToProblemDetails from '../utils/toProblemDetails'

export const AuthContext = createContext<AuthContextType | null>(null)

type AuthProviderProps = {
	children: JSX.Element
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
	const [isAuthenticated, setIsAuthenticated] = useState(
		!!localStorage.getItem('user')
	)
	const [loading, setLoading] = useState(false)
	const [profile, setProfile] = useState<ProfileType>()

	useEffect(() => {
		const existUser = localStorage.getItem('user')
		if (existUser) {
			setIsAuthenticated(true)
		} else {
			setIsAuthenticated(false)
		}
	}, [])

	function getUser() {
		const user = localStorage.getItem('user')
		if (user) {
			return JSON.parse(user)
		}
		return undefined
	}
	function login(data: AuthUser) {
		if (!data) {
			setIsAuthenticated(false)
			return
		}

		localStorage.setItem('user', JSON.stringify(data))
		setIsAuthenticated(true)
	}
	useEffect(() => {
		const userStorage = localStorage.getItem('user')
		if (!userStorage || !profile) return

		const currentUser: AuthUser = JSON.parse(userStorage)

		currentUser.nombre = profile.nombre
		currentUser.email = profile.email

		localStorage.setItem('user', JSON.stringify(currentUser))
	}, [profile])

	const getProfile = async () => {
		setLoading(true)
		let message: IError = {
			message: '',
			title: '',
			isError: false,
		}
		try {
			const { data } = await axiosClient.get('veterinarios/perfil')
			if (!data.perfil) return
			const { ...profile }: ProfileType = data.perfil

			setProfile(profile)
			message = {
				message: 'Obtenido',
				title: 'Obtenido',
				isError: false,
			}
			return message
		} catch (error) {
			const newError = error as AxiosError
			const problemDetails = ToProblemDetails(newError)
			message = {
				message: problemDetails.detail,
				title: problemDetails.title,
				isError: true,
			}
			return message
		} finally {
			setLoading(false)
		}
	}
	const updateProfile = async (profileData: ProfileType) => {
		setLoading(true)
		let message: IError = {
			message: '',
			title: '',
			isError: false,
		}
		try {
			const { data } = await axiosClient.patch(
				'veterinarios/perfil',
				profileData
			)
			if (!data.data) return
			const { ...profile }: ProfileType = data.data

			setProfile(profile)
			message = {
				message: data.message,
				title: data.message,
				isError: false,
			}
			return message
		} catch (error) {
			const newError = error as AxiosError
			const problemDetails = ToProblemDetails(newError)
			message = {
				message: problemDetails.detail,
				title: problemDetails.title,
				isError: true,
			}
			return message
		} finally {
			setLoading(false)
		}
	}
	function logout(onLogout: () => void) {
		localStorage.removeItem('user')
		setIsAuthenticated(false)
		onLogout()
	}
	const value = useMemo(
		() => ({
			user: getUser(),
			login,
			logout,
			isAuthenticated,
			loading,
			getProfile,
			updateProfile,
			profile,
		}),
		[logout, login]
	)
	return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

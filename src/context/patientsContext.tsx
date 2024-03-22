import { createContext, useEffect, useState } from 'react'
import { AxiosError } from 'axios'

import { IError } from '../interfaces/errors'
import axiosClient from '../services/axiosClient'
import { AddPatientType, PatientType } from '../types/pacienteTypes'
import { patientsContextType } from '../types/patientsContextType'
import ToProblemDetails from '../utils/toProblemDetails'

export const PatientContext = createContext<patientsContextType | null>(null)

interface IPatientContext {
	children: JSX.Element
}

const PatientsProvider = ({ children }: IPatientContext) => {
	const [patients, setPatients] = useState<PatientType[]>([])
	const [loadingPatients, setLoadingPatients] = useState(false)
	const [patientEdit, setPatientEdit] = useState<PatientType>()

	useEffect(() => {
		async function execute() {
			await getPatients()
		}
		execute()
	}, [])

	const getPatientById = async (id: string) => {
		setLoadingPatients(true)
		try {
			const { data } = await axiosClient.get(`pacientes/${id}`)
			if (!data.data) return

			const { ...storedPatient }: PatientType = data.data

			return storedPatient
		} catch (error) {
			const newError = error as AxiosError
			const problemDetails = ToProblemDetails(newError)
			console.error(problemDetails)
		} finally {
			setLoadingPatients(false)
		}
	}

	const getPatients = async () => {
		setLoadingPatients(true)
		try {
			const { data } = await axiosClient.get('pacientes')
			if (!data.data) return

			const storedPatient: PatientType[] = data.data

			setPatients(storedPatient)
		} catch (error) {
			const newError = error as AxiosError
			const problemDetails = ToProblemDetails(newError)
			console.error(problemDetails)
		} finally {
			setLoadingPatients(false)
		}
	}
	const savePatients = async (patient: AddPatientType) => {
		// handling submit
		try {
			const newPatient: Partial<AddPatientType> = {
				email: patient.email,
				fecha: patient.fecha,
				nombre: patient.nombre,
				propietario: patient.propietario,
				sintomas: patient.sintomas,
			}
			const { data } = await axiosClient.post('pacientes', {
				...newPatient,
			})
			if (!data.data) return
			const { ...storedPatient }: PatientType = data.data

			const patientFilter: PatientType = {
				_id: storedPatient._id,
				email: storedPatient.email,
				fecha: storedPatient.fecha,
				nombre: storedPatient.nombre,
				propietario: storedPatient.propietario,
				sintomas: storedPatient.sintomas,
				veterinario: storedPatient.veterinario,
			}

			setPatients([...patients, patientFilter])

			const message: IError = {
				message: data.message,
				title: 'Paciente agregado',
				isError: false,
			}
			return message
		} catch (error) {
			const newError = error as AxiosError
			const problemDetails = ToProblemDetails(newError)
			const message: IError = {
				message: problemDetails.detail,
				title: problemDetails.title,
				isError: true,
			}
			return message
		} finally {
			setLoadingPatients(false)
		}
	}
	const updatePatient = async (patient: AddPatientType) => {
		// handling submit
		try {
			const { data } = await axiosClient.patch(`pacientes/${patient._id}`, {
				...patient,
			})
			if (!data.data) return
			const { ...storedPatient }: PatientType = data.data

			const patientFilter: PatientType = {
				_id: storedPatient._id,
				email: storedPatient.email,
				fecha: storedPatient.fecha,
				nombre: storedPatient.nombre,
				propietario: storedPatient.propietario,
				sintomas: storedPatient.sintomas,
				veterinario: storedPatient.veterinario,
			}
			const newPatients = patients.filter(item => item._id !== patient._id)
			setPatients([...newPatients, patientFilter])
			setPatientEdit(undefined)

			const message: IError = {
				message: data.message,
				title: 'Paciente actualizado',
				isError: false,
			}
			return message
		} catch (error) {
			const newError = error as AxiosError
			const problemDetails = ToProblemDetails(newError)
			const message: IError = {
				message: problemDetails.detail,
				title: problemDetails.title,
				isError: true,
			}
			return message
		} finally {
			setLoadingPatients(false)
		}
	}
	const deletePatient = async (patientId: string) => {
		try {
			const { data } = await axiosClient.delete(`pacientes/${patientId}`)

			setPatientEdit(undefined)

			setPatients(prev => prev.filter(patient => patient._id !== patientId))

			const message: IError = {
				message: data.message,
				title: 'Paciente actualizado',
				isError: false,
			}
			return message
		} catch (error) {
			const newError = error as AxiosError
			const problemDetails = ToProblemDetails(newError)
			const message: IError = {
				message: problemDetails.detail ?? 'Error desconocido',
				title: problemDetails.title ?? 'Error desconocido',
				isError: true,
			}
			return message
		} finally {
			setLoadingPatients(false)
		}
	}

	const setEdition = (patient: PatientType) => {
		setPatientEdit(patient)
	}
	const value = {
		patients,
		savePatients,
		loadingPatients,
		setEdition,
		patientEdit,
		getPatientById,
		updatePatient,
		deletePatient,
	}
	return (
		<PatientContext.Provider value={value}> {children}</PatientContext.Provider>
	)
}

export default PatientsProvider

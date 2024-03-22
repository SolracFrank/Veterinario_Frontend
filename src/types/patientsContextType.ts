import { IError } from '../interfaces/errors'

import { AddPatientType, PatientType } from './pacienteTypes'

export type patientsContextType = {
	patients: PatientType[] | undefined
	savePatients: (
		patient: AddPatientType
	) => Promise<IError | undefined> | undefined
	loadingPatients: boolean
	setEdition: (patient: PatientType) => void | undefined
	patientEdit: PatientType | undefined
	getPatientById: (id: string) => Promise<PatientType | undefined> | undefined
	updatePatient: (
		patient: AddPatientType
	) => Promise<IError | undefined> | undefined
	deletePatient: (patient: string) => Promise<IError>
}

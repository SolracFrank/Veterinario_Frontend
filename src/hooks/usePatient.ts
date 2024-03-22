import { useContext } from 'react'

import { PatientContext } from '../context/patientsContext'

const usePatient = () => {
	return useContext(PatientContext)
}

export default usePatient

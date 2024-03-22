import { useEffect, useState } from 'react'

import usePatient from '../../hooks/usePatient'
import { PatientType } from '../../types/pacienteTypes'

import Patient from './patient'
interface PatientsProps {
	focusForm: () => void
}
const Patients = ({ focusForm }: PatientsProps) => {
	const [patients, setPatients] = useState<PatientType[]>([])

	const patient = usePatient()

	useEffect(() => {
		if (patient?.patients) {
			setPatients(patient.patients)
		}
	}, [patient?.patients])

	return (
		<div>
			{!patient || patient?.loadingPatients ? (
				<h2 className='text-center text-3xl font-black'>Cargando...</h2>
			) : patients && patients.length > 0 ? (
				<>
					<h2 className='text-center text-3xl font-black'>
						Listado de pacientes
					</h2>
					<p className='mb-10 mt-5 text-center text-xl'>
						Administra tus{' '}
						<span className='font-bold text-indigo-600'>Pacientes y Citas</span>
					</p>
					{patients.map(patient => {
						return (
							<Patient
								key={patient._id}
								patient={patient}
								focusForm={focusForm}
							/>
						)
					})}
				</>
			) : (
				<>
					<h2 className='text-center text-3xl font-black'>No hay pacientes</h2>
					<p className='mb-10 mt-5 text-center text-xl'>
						Comienza agregando pacientes{' '}
						<span className='font-bold text-indigo-600'>
							Y aparecerán en este lugar
						</span>
					</p>
				</>
			)}
		</div>
	)
}

export default Patients

import { useState } from 'react'

import usePatient from '../../hooks/usePatient'
import { PatientType } from '../../types/pacienteTypes'

import DeleteModal from './deleteModal'

interface PatientProps extends React.HTMLProps<HTMLDivElement> {
	focusForm: () => void
	patient: PatientType
}
const Patient = ({ patient, focusForm, ...props }: PatientProps) => {
	const patientContext = usePatient()
	const [isOpen, setIsOpen] = useState(false)

	const { email, fecha, propietario, sintomas, nombre, _id } = patient
	const formatDate = () => {
		const newDate = new Date(fecha)

		return new Intl.DateTimeFormat('es-MX', { dateStyle: 'long' }).format(
			newDate
		)
	}
	const CloseModal = () => {
		setIsOpen(false)
	}

	const SaveChanges = async () => {
		await patientContext?.deletePatient(_id)
	}
	return (
		<div
			className='mx-5 my-10 space-y-2 rounded-xl bg-white px-5 py-10'
			{...props}>
			<p className='font-bold uppercase text-indigo-800'>
				Nombre:{' '}
				<span className='font-normal normal-case text-black'>{nombre}</span>
			</p>
			<p className='font-bold uppercase text-indigo-800'>
				Propietario:{' '}
				<span className='font-normal normal-case text-black'>
					{propietario}
				</span>
			</p>
			<p className='font-bold uppercase text-indigo-800'>
				Email:{' '}
				<span className='font-normal normal-case text-black'>{email}</span>
			</p>
			<p className='font-bold uppercase text-indigo-800'>
				Fecha de alta:{' '}
				<span className='font-normal normal-case text-black'>
					{formatDate()}
				</span>
			</p>
			<p className='font-bold uppercase text-indigo-800'>
				Síntomas:{' '}
				<span className='font-normal normal-case text-black'>{sintomas}</span>
			</p>

			<div className='my-5 flex justify-between'>
				<button
					type='button'
					title='editar paciente'
					name='edit-patient'
					onClick={() => {
						patientContext?.setEdition(patient)
						focusForm()
					}}
					className='rounded-lg bg-indigo-600 px-10 py-2 font-bold uppercase text-indigo-100 hover:bg-indigo-700'>
					Editar
				</button>
				<button
					type='button'
					title='eliminar paciente'
					name='delete-patient'
					onClick={() => {
						setIsOpen(true)
					}}
					className='rounded-lg bg-red-600 px-10 py-2 font-bold uppercase text-red-100 hover:bg-red-700'>
					Eliminar
				</button>
			</div>
			<DeleteModal
				closeModal={CloseModal}
				confirmModal={SaveChanges}
				nombre={nombre}
				isOpen={isOpen}
			/>
		</div>
	)
}

export default Patient

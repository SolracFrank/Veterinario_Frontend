import {
	forwardRef,
	Ref,
	useEffect,
	useImperativeHandle,
	useRef,
	useState,
} from 'react'

import usePatient from '../../hooks/usePatient'
import { IError } from '../../interfaces/errors'
import { IFormRef } from '../../interfaces/refInterfaces'
import { AddPatientType } from '../../types/pacienteTypes'
import { validateFilteredObject } from '../../utils/validateObjet'
import Alert from '../alert'

// Eslint doesn't recognize forwardRef
// eslint-disable-next-line react/display-name
const Form = forwardRef((_: object, ref: Ref<IFormRef>) => {
	const [message, setMessage] = useState<IError>()
	const [patient, setPatient] = useState<AddPatientType>({
		_id: '',
		email: '',
		nombre: '',
		propietario: '',
		sintomas: '',
		fecha: '',
	})

	const formRef = useRef<HTMLInputElement>(null)
	const patients = usePatient()

	useImperativeHandle(ref, () => ({
		focusForm: () => {
			if (formRef.current!) {
				formRef.current.focus()
			}
		},
	}))

	useEffect(() => {
		if (patients?.patientEdit) {
			setPatient(patients.patientEdit)
			return
		}
	}, [patients?.patientEdit])

	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault()

		const toIgnore: Array<keyof AddPatientType> = ['fecha']
		!patient._id && toIgnore.push('_id')

		const validated = validateFilteredObject(patient, ...toIgnore)

		if (!validated) {
			setMessage({
				message:
					'Los campos email, nombre, propietario y síntomas son obligatorios',
				title:
					'Los campos email, nombre, propietario y síntomas son obligatorios',
				isError: true,
			})

			return
		}
		setMessage(undefined)
		let _message: IError | undefined

		if (patient._id.trim().length == 0) {
			_message = await patients?.savePatients(patient)
			if (!_message?.isError) {
				setPatient({
					_id: '',
					email: '',
					nombre: '',
					propietario: '',
					sintomas: '',
					fecha: '',
				})
			}
		} else {
			_message = await patients?.updatePatient(patient)
		}

		if (!_message?.isError) {
			setPatient({
				_id: '',
				email: '',
				nombre: '',
				propietario: '',
				sintomas: '',
				fecha: '',
			})
		}

		setMessage(_message)
	}
	return (
		<>
			<h2 className='text-center text-3xl font-black'>Listado de pacientes</h2>
			<p className='mb-10 mt-5 text-center text-xl'>
				Añade tus pacientes y{' '}
				<span className='font-bold text-indigo-600'>Administralos</span>
			</p>
			<form
				className='mb-10 rounded-md bg-white px-5 py-10 shadow-md lg:mb-0'
				onSubmit={handleSubmit}>
				<div className='mb-5'>
					<label htmlFor='mascota' className='font-bold uppercase'>
						Nombre de la mascota
					</label>
					<input
						ref={formRef}
						id='mascota'
						name='mascota'
						value={patient.nombre}
						onChange={e => {
							setPatient({ ...patient, nombre: e.target.value })
						}}
						type='text'
						className='mt-2 w-full rounded-md border-2 p-2 placeholder-gray-400'
						placeholder='nombre de la mascota'
					/>
				</div>
				<div className='mb-5'>
					<label htmlFor='propietario' className='font-bold uppercase'>
						Nombre del propietario
					</label>
					<input
						id='propietario'
						name='propietario'
						type='text'
						value={patient.propietario}
						onChange={e => {
							setPatient({ ...patient, propietario: e.target.value })
						}}
						className='mt-2 w-full rounded-md border-2 p-2 placeholder-gray-400'
						placeholder='nombre del propietario'
					/>
				</div>
				<div className='mb-5'>
					<label htmlFor='email' className='font-bold uppercase'>
						Email del propietario
					</label>
					<input
						id='email'
						name='email'
						type='email'
						value={patient.email}
						onChange={e => {
							setPatient({ ...patient, email: e.target.value })
						}}
						className='mt-2 w-full rounded-md border-2 p-2 placeholder-gray-400'
						placeholder='email del propietario'
					/>
				</div>
				<div className='mb-5'>
					<label htmlFor='fecha' className='font-bold uppercase'>
						Fecha de alta
					</label>
					<input
						id='fecha'
						name='fecha'
						value={
							patient.fecha &&
							new Date(patient.fecha).toISOString().split('T')[0]
						}
						onChange={e => {
							setPatient({ ...patient, fecha: e.target.value })
						}}
						type='date'
						className='mt-2 w-full rounded-md border-2 p-2 placeholder-gray-400'
						placeholder='email del propietario'
					/>
				</div>
				<div className='mb-5'>
					<label htmlFor='sintomas' className='font-bold uppercase'>
						Sintomas
					</label>
					<textarea
						id='sintomas'
						name='sintomas'
						value={patient.sintomas}
						onChange={e => {
							setPatient({ ...patient, sintomas: e.target.value })
						}}
						className='mt-2 w-full rounded-md border-2 p-2 placeholder-gray-400'
						placeholder='Síntomas de la mascota'
						rows={5}
					/>
				</div>
				{message && <Alert message={message} />}
				<button
					type='submit'
					className='w-full rounded-md bg-indigo-600 p-3 font-bold uppercase text-indigo-100 hover:bg-indigo-400 active:bg-indigo-400'>
					{patient._id ? 'Actualizar paciente' : 'Agregar paciente'}
				</button>
			</form>
		</>
	)
})

export default Form

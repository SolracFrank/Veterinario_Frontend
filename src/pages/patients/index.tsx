import { useRef, useState } from 'react'

import Form from '../../components/form'
import Patients from '../../components/patient'
import { IFormRef } from '../../interfaces/refInterfaces'

const Pacientes = () => {
	const [showForm, setShowForm] = useState(true)
	const formRef = useRef<IFormRef>(null)

	return (
		<div
			className={`container mx-auto mt-4 flex min-h-[calc(100vh-128px)] flex-col  p-5 md:flex-row`}>
			<button
				type='button'
				name='hide'
				className={`mx-10 mb-4 rounded-md bg-indigo-600 p-3 font-bold uppercase text-indigo-100 md:hidden`}
				onClick={() => setShowForm(prev => !prev)}>
				Mostrar formulario
			</button>
			<div className={`${showForm ? '' : 'hidden '} md:w-1/2 lg:w-2/5`}>
				{' '}
				<Form ref={formRef} />{' '}
			</div>
			<div className='md:w-1/2 lg:w-3/5'>
				{' '}
				<Patients
					focusForm={() => {
						formRef.current?.focusForm()
					}}
				/>{' '}
			</div>
		</div>
	)
}

export default Pacientes

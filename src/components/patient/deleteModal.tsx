interface DeleteModalProps {
	isOpen: boolean
	closeModal: () => void
	confirmModal: () => void
	nombre: string
}
const DeleteModal = ({
	isOpen,
	closeModal,
	confirmModal,
	nombre,
}: DeleteModalProps) => {
	return (
		<>
			{isOpen && (
				<div className='fixed left-0 top-0 flex h-full w-full items-center justify-center bg-black bg-opacity-25'>
					<div className=' h-96 w-96 rounded-md bg-white text-center opacity-100 shadow-sm shadow-gray-100'>
						<div className='flex h-full flex-col'>
							<h1 className='mt-6 text-xl font-bold text-indigo-800'>
								¿Desea eliminar al paciente?
							</h1>
							<h2 className='t my-6 text-lg font-bold'>{nombre}</h2>
							<div className='flex-grow'></div>

							<div className='mb-6 flex w-full justify-center space-x-8 text-xl font-bold'>
								<button
									className='rounded-md border bg-indigo-600 px-6 py-2 text-indigo-100 hover:bg-indigo-700'
									type='button'
									title='Aceptar'
									name='accept-button'
									onClick={() => {
										confirmModal()
										closeModal()
									}}>
									Aceptar
								</button>
								<button
									className='rounded-md border bg-red-600 px-6 py-2 text-red-100 hover:bg-red-700'
									type='button'
									title='Cancelar'
									onClick={closeModal}
									name='cancel-button'>
									Cancelar
								</button>
							</div>
						</div>
					</div>
				</div>
			)}
		</>
	)
}

export default DeleteModal

import { useEffect, useRef } from 'react'
import { Link, useNavigate } from 'react-router-dom'

import useAuth from '../../hooks/useAuth'

interface dropDownNavProps {
	email: string
	isOpen: boolean
	setIsOpen: React.Dispatch<React.SetStateAction<boolean>>
}
const DropDownNav = ({ email, isOpen, setIsOpen }: dropDownNavProps) => {
	const auth = useAuth()
	const navigate = useNavigate()

	const dropDownRef = useRef<HTMLDivElement>(null)

	useEffect(() => {
		const handleClicOutside = (e: MouseEvent) => {
			if (
				dropDownRef.current &&
				!dropDownRef.current.contains(e.target as Node)
			) {
				setIsOpen(false)
			}
		}

		document.addEventListener('mousedown', handleClicOutside)
		return () => {
			document.removeEventListener('mousedown', handleClicOutside)
		}
	}, [setIsOpen])

	return (
		<>
			{isOpen && (
				<div
					ref={dropDownRef}
					className='absolute right-0 mt-[64px] flex w-64 flex-col border border-gray-400 bg-white shadow-lg'>
					<div className='w-full cursor-default p-2 text-left '>{email}</div>
					<Link
						className='w-full p-2 text-left hover:bg-gray-200'
						to='/veterinario/profile'>
						Perfil
					</Link>
					<button
						className='w-full p-2 text-left hover:bg-gray-200'
						onClick={() => {
							if (auth) {
								auth.logout(() => {
									navigate('/login', { replace: true })
								})
							}
							setIsOpen(false)
						}}>
						Cerrar sesión
					</button>
				</div>
			)}
		</>
	)
}

export default DropDownNav

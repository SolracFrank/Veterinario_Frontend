import { useEffect, useState } from 'react'
import { NavLink } from 'react-router-dom'
import { clsx } from 'clsx'

import useAuth from '../../hooks/useAuth'

import DropDownNav from './dropDownNav'
const NavBar = () => {
	const [dropDownOpen, setDropDownOpen] = useState(false)
	const [nombre, setNombre] = useState('')
	const auth = useAuth()
	useEffect(() => {
		if (!auth?.profile) return

		setNombre(auth.profile.nombre)
	}, [auth?.profile])
	return (
		<nav className='flex h-[64px]  w-screen bg-indigo-800'>
			<div className='flex w-full justify-between'>
				<div className='flex'>
					<NavLink
						to=''
						className='flex max-h-full  items-center border border-indigo-500 bg-indigo-300 px-4 text-sm text-indigo-500 hover:bg-indigo-200 md:text-xl'>
						<h1>
							Administrador de pacientes de {'  '}
							<span className='font-bold text-indigo-900'> Veterinaria</span>
						</h1>
					</NavLink>
				</div>
				{auth?.isAuthenticated ? (
					<div className='relative flex'>
						<NavLink
							to='/veterinario/pacientes'
							className='flex max-h-full items-center border border-indigo-500 bg-indigo-300 px-4 text-sm hover:bg-indigo-200 md:text-xl'>
							Tus pacientes
						</NavLink>
						<button
							onClick={() => setDropDownOpen(prev => !prev)}
							className={clsx(
								'flex max-h-full items-center border  bg-indigo-300 px-4 text-sm hover:bg-indigo-200 md:text-lg',
								{
									'border-indigo-500': !dropDownOpen,
								},
								{
									'border-black-500': dropDownOpen,
								}
							)}>
							{nombre}
						</button>
						<DropDownNav
							isOpen={dropDownOpen}
							email={auth.user?.email ?? ''}
							setIsOpen={setDropDownOpen}
						/>
					</div>
				) : (
					<div className='flex'>
						<NavLink
							to='/login'
							className='flex max-h-full items-center border border-indigo-500 bg-indigo-300 px-4 text-sm hover:bg-indigo-200 md:text-xl'>
							Sign In
						</NavLink>
						<NavLink
							to='/register'
							className='flex max-h-full items-center border border-indigo-500 bg-indigo-300 px-4 text-sm hover:bg-indigo-200 md:text-xl'>
							Sign up
						</NavLink>
					</div>
				)}
			</div>
		</nav>
	)
}

export default NavBar

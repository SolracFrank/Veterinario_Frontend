import { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { clsx } from 'clsx'

enum navEnum {
	Profile = 'profile',
	Password = 'password',
}

const NavOptions = () => {
	const location = useLocation()

	const [active, setActive] = useState('')

	useEffect(() => {
		const path = location.pathname.split('/')
		setActive(path[path.length - 1])
	}, [location.pathname])

	return (
		<div className='mx-16 space-x-2'>
			<Link
				to='/veterinario/profile'
				className={clsx('underline hover:text-indigo-600 md:text-left', {
					'text-indigo-800': active == navEnum.Profile,
				})}>
				{' '}
				Perfil
			</Link>
			<Link
				to='/veterinario/password'
				className={clsx('underline hover:text-indigo-600 md:text-left', {
					'text-indigo-800': active == navEnum.Password,
				})}>
				{' '}
				Cambiar contraseña
			</Link>
		</div>
	)
}

export default NavOptions

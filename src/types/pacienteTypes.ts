export type AddPatientType = {
	_id: string
	nombre: string
	propietario: string
	email: string
	sintomas: string
	fecha?: string | undefined
}

export type PatientType = {
	_id: string
	nombre: string
	email: string
	propietario: string
	fecha: string
	sintomas: string
	veterinario: string
}

export type ProfileType = {
	_id: string
	nombre: string
	email: string
	web: string
}

export type ProfilePasswordType = {
	password: string
	oldPassword: string
	repeatPassword: string
}

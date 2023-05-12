import { IResource } from "../types"

export const getResource = async (resource: string) => {
	const res = await fetch(`https://jsonplaceholder.typicode.com/${resource}`)

	if (!res.ok) throw new Error(`${res.status} ${res.statusText}`)

	const payload = await res.json() as IResource[]

	return payload
}

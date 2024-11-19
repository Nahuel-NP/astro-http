import { Clients, db } from 'astro:db';

// https://astro.build/db/seed
export default async function seed() {
	// TODO

	await db.insert(Clients).values([
		{
			id: 1,
			name: 'John Doe',
			age: 30,
			isActive: true
		},
		{
			id: 2,
			name: 'Jane Doe',
			age: 25,
			isActive: false
		},
		{
			id: 3,
			name: 'John Smith',
			age: 35,
			isActive: true
		},
		{
			id: 4,
			name: 'Jane Smith',
			age: 28,
			isActive: true
		}
	])
	console.log('seed executed')
}

import { prisma } from '../src/generated/prisma-client';

async function main() {
	await prisma.createInfluencer({
		email: 'alice@prisma.io',
		name: 'Alice',
		password: '$2b$10$dqyYw5XovLjpmkYNiRDEWuwKaRAvLaG45fnXE5b3KTccKZcRPka2m' // "secret42"
	});
	await prisma.createInfluencer({
		email: 'bob@prisma.io',
		name: 'Bob',
		password: '$2b$10$o6KioO.taArzboM44Ig85O3ZFZYZpR3XD7mI8T29eP4znU/.xyJbW' // "secret43"
	});
}

main();

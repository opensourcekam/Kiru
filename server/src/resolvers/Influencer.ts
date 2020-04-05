import { prismaObjectType } from 'nexus-prisma';

export const Influencer = prismaObjectType({
	name: 'Influencer',
	definition(t) {
		t.prismaFields([
			'id',
			'bio',
			'name',
			'email',
			'updatedAt',
			'createdAt',
			'mediaKit',
			'files',
			'social',
			'location',
			'handle',
			'avatar'
		]);
	}
});

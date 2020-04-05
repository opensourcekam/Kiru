import { prismaObjectType } from 'nexus-prisma';
import { getUserId } from '../utils';
import { File } from './File';

// Expose the full "Query" building block
export const Query = prismaObjectType({
	name: 'Query',
	definition(t) {
		t.prismaFields([ '*' ]);
		t.list.field('files', {
			type: File,
			resolve: (_, __, ctx) =>
				ctx.prisma.files({
					where: {
						influencer: {
							id: getUserId(ctx)
						}
					}
				})
		});
		t.field('social', {
			type: 'Social',
			resolve: (_, __, ctx) =>
				ctx.prisma.socials({
					where: {
						influencer: {
							id: getUserId(ctx)
						}
					}
				})
		});
		t.field('me', {
			type: 'Influencer',
			resolve: async (_, __, ctx) => await ctx.prisma.influencer({ id: getUserId(ctx) })
		});
	}
});

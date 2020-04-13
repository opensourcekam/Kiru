import { intArg, queryType, stringArg } from 'nexus';
import { getUserId } from '../utils';

export const Query = queryType({
	definition(t) {
		t.field('me', {
			type: 'User',
			nullable: true,
			resolve: (parent, args, ctx) => {
				const userId = getUserId(ctx);
				return ctx.prisma.user.findOne({
					where: {
						id: Number(userId)
					}
				});
			}
		});

		t.list.field('feed', {
			type: 'Post',
			resolve: (parent, args, ctx) => {
				return ctx.prisma.post.findMany();
			}
		});

		t.list.field('filterPosts', {
			type: 'Post',
			args: {
				searchString: stringArg({ nullable: true })
			},
			resolve: (_parent, _args, ctx) => {
				return ctx.prisma.post.findMany();
			}
		});

		t.field('post', {
			type: 'Post',
			nullable: true,
			args: { id: intArg() },
			resolve: (parent, { id }, ctx) => {
				return ctx.prisma.post.findOne({
					where: {
						id: Number(id)
					}
				});
			}
		});
	}
});

import { compare, hash } from 'bcryptjs';
import { mutationType, stringArg, intArg } from 'nexus';

import { userSessionIdPrefix } from './../constants/index';
import { removeAllUsersSessions, getUserId } from '../utils';

export const Mutation = mutationType({
	definition(t) {
		t.field('signup', {
			type: 'AuthPayload',
			args: {
				name: stringArg(),
				email: stringArg({ nullable: false }),
				password: stringArg({ nullable: false })
			},
			resolve: async (_parent, { name, email, password }, ctx) => {
				const hashedPassword = await hash(password, 10);
				const user = await ctx.prisma.user.create({
					data: {
						name,
						email,
						password: hashedPassword
					}
				});
				const { sessionID } = ctx.req;
				ctx.session.userId = user.id;

				if (sessionID) {
					await ctx.redis.lpush(`${userSessionIdPrefix}${user.id}`, sessionID);
				}

				return {
					token: sessionID!,
					user
				};
			}
		});

		t.field('login', {
			type: 'AuthPayload',
			args: {
				email: stringArg({ nullable: false }),
				password: stringArg({ nullable: false })
			},
			resolve: async (_parent, { email, password }, ctx) => {
				const user = await ctx.prisma.user.findOne({
					where: {
						email
					}
				});

				if (!user) {
					throw new Error(`No user found for email: ${email}`);
				}

				const passwordValid = await compare(password, user.password);
				if (!passwordValid) {
					throw new Error('Invalid password');
				}

				const { sessionID } = ctx.req;
				ctx.session.userId = user.id;

				await ctx.redis.lpush(`${userSessionIdPrefix}${user.id}`, sessionID!);

				return { token: sessionID!, user };
			}
		});

		t.field('logout', {
			type: 'Boolean',
			resolve: async (_, __, { session, redis, res }) => {
				const { userId } = session;
				if (userId) {
					removeAllUsersSessions(userId, redis);
					session.destroy((err: any) => {
						if (err) {
							console.log(err);
						}
					});
					res.clearCookie('qid');
					return true;
				}

				return false;
			}
		});

		t.field('createDraft', {
			type: 'Post',
			args: {
				title: stringArg({ nullable: false }),
				content: stringArg()
			},
			resolve: (parent, { title, content }, ctx) => {
				const userId = getUserId(ctx);
				if (!userId) throw new Error('Could not authenticate user.');
				return ctx.prisma.post.create({
					data: {
						title,
						content,
						published: false,
						author: { connect: { id: Number(userId) } }
					}
				});
			}
		});

		t.field('deletePost', {
			type: 'Post',
			nullable: true,
			args: { id: intArg({ nullable: false }) },
			resolve: (parent, { id }, ctx) => {
				return ctx.prisma.post.delete({
					where: {
						id
					}
				});
			}
		});

		t.field('publish', {
			type: 'Post',
			nullable: true,
			args: { id: intArg() },
			resolve: (parent, { id }, ctx) => {
				return ctx.prisma.post.update({
					where: { id },
					data: { published: true }
				});
			}
		});
	}
});

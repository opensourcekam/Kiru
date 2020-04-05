import { prismaObjectType } from 'nexus-prisma';
import * as aws from 'aws-sdk';
import { v4 as uuid } from 'uuid';
import { getUserId, removeAllUsersSessions } from './../utils';
import { stringArg, intArg } from 'nexus';
import { hash, compare } from 'bcryptjs';
import { userSessionIdPrefix } from '../constants';

const { S3_BUCKET, AWS_ACCESS_KEY, AWS_SECRET_ACCESS_KEY } = process.env;

const s3client = new aws.S3({
	signatureVersion: 'v4',
	region: 'us-east-1',
	accessKeyId: AWS_ACCESS_KEY,
	secretAccessKey: AWS_SECRET_ACCESS_KEY
});

export const Mutation = prismaObjectType({
	name: 'Mutation',
	definition(t) {
		// Keep only the `createTodo` mutation
		t.field('updateInfluencer', {
			...t.prismaType.updateInfluencer,
			args: {
				data: t.prismaType.updateInfluencer.args.data
			},
			resolve: async (root, { data }, ctx) => {
				delete data.password;
				delete data.email;
				delete data.verified;

				return await ctx.prisma.updateInfluencer({
					where: {
						id: getUserId(ctx)
					},
					data
				});
			}
		});

		t.field('signup', {
			type: 'AuthPayload',
			args: {
				name: stringArg({ nullable: false }),
				email: stringArg(),
				password: stringArg()
			},
			resolve: async (_, { name, email, password }, ctx) => {
				const hashedPassword = await hash(password, 10);
				const user = await ctx.prisma.createInfluencer({
					name,
					email: email.toLowerCase(),
					password: hashedPassword
				});
				const { sessionID } = ctx.req;

				ctx.session.userId = user.id;
				if (sessionID) {
					await ctx.redis.lpush(`${userSessionIdPrefix}${user.id}`, sessionID);
				}

				return { token: sessionID, user };
			}
		});

		t.field('login', {
			type: 'AuthPayload',
			args: {
				email: stringArg(),
				password: stringArg()
			},
			resolve: async (_, { email, password }, ctx) => {
				const user = await ctx.prisma.influencer({ email: email.toLowerCase() });
				if (!user) {
					throw new Error(`No user found for email: ${email}`);
				}
				const passwordValid = await compare(password, user.password);
				if (!passwordValid) {
					throw new Error('Invalid password');
				}

				const { sessionID } = ctx.req;

				ctx.session.userId = user.id;
				if (sessionID) {
					await ctx.redis.lpush(`${userSessionIdPrefix}${user.id}`, sessionID);
				}

				return { token: sessionID, user };
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

		t.field('createInterest', {
			type: 'Interest',
			args: {
				tag: stringArg()
			},
			resolve: async (_, { tag }, ctx) =>
				await ctx.prisma.createInterest({
					tag,
					influencer: {
						connect: {
							id: getUserId(ctx)
						}
					}
				})
		});

		t.field('uploadFile', {
			type: 'File',
			args: {
				public_id: stringArg(),
				secret: stringArg(),
				name: stringArg(),
				url: stringArg(),
				contentType: stringArg(),
				size: intArg(),
				width: intArg(),
				height: intArg()
			},
			resolve: async (_, { public_id, secret, name, url, size, width, height, contentType }, ctx) => {
				const userId = getUserId(ctx);

				return await ctx.prisma.createFile({
					public_id,
					secret,
					name,
					url,
					size,
					width,
					height,
					contentType,
					influencer: {
						connect: { id: userId }
					}
				});
			}
		});

		t.field('signS3', {
			type: 'S3Payload',
			args: {
				contentType: stringArg({ nullable: false }),
				size: intArg({ nullable: false })
			},
			resolve: async (_, { contentType, size }: { contentType: string; size: number }, ctx) => {
				const userId = getUserId(ctx);

				try {
					const Key = `${uuid()}.${contentType.split('/')[1]}`;

					const signedRequest = await s3client.getSignedUrl('putObject', {
						Expires: 60,
						Key,
						ACL: 'public-read',
						Bucket: S3_BUCKET,
						ContentType: contentType
					});

					const url = `https://${S3_BUCKET}.s3.amazonaws.com/${Key}`;

					const file = await ctx.prisma.createFile({
						public_id: 'IS_S3',
						secret: Key,
						name: Key,
						url,
						size,
						contentType,
						influencer: {
							connect: { id: userId }
						}
					});

					return {
						signedRequest,
						url,
						id: file.id
					};
				} catch (error) {
					console.log(error);
				}

				return {};
			}
		});
	}
});

import { getUserId } from './../utils';
import { objectType } from 'nexus';

export const AuthPayload = objectType({
	name: 'AuthPayload',
	definition(t) {
		t.string('token');
		t.field('influencer', {
			type: 'Influencer',
			resolve: (_, __, ctx) => ctx.prisma.influencer({ id: getUserId(ctx) })
		});
	}
});

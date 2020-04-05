import { rule, shield } from 'graphql-shield';
import { getUserId } from '../utils';
import { Context } from '../types';

const rules = {
	isAuthenticatedUser: rule()((_, __, context: Context) => {
		const userId = getUserId(context);
		return Boolean(userId);
	})
};

export const permissions = shield({
	Query: {
		me: rules.isAuthenticatedUser
	},
	Mutation: {}
});

import gql from 'graphql-tag';
import { client } from '../api/apollo';
import { resetClientState } from './resetClientState';

export const logout = async () => {
	try {
		const response: any = await client.mutate({
			mutation: gql`
				mutation {
					logout
				}
			`
		});
		
		localStorage.clear();
		if (response.data.logout) {
			resetClientState(client);
		}

		return response.data.logout;
	} catch (error) {
		console.error(error)
	}
};

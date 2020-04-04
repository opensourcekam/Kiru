import gql from 'graphql-tag';

export const PROFILE_QUERY = gql`
	query profile($handle: String, $id: ID) {
		influencer(where: { handle: $handle, id: $id }) {
			id
			avatar
		}
	}
`;

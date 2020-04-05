import gql from 'graphql-tag';

export const ME_QUERY = gql`
	query meQuery {
		me {
			name
			handle
			bio
			avatar
			social {
				instagram {
					handle
					link
				}
			}
		}
	}
`;

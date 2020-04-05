import gql from 'graphql-tag';

export const UPDATE_INFLUENCER_MUTATION = gql`
	mutation updateInfluencer($data: InfluencerUpdateInput!) {
		updateInfluencer(data: $data) {
			id
		}
	}
`;

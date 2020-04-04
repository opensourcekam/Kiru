import gql from 'graphql-tag';

export const UPLOAD_FILE_MUTATION = gql`
	mutation uploadFile(
		$public_id: String!
		$secret: String!
		$name: String!
		$url: String!
		$contentType: String!
		$size: Int!
		$width: Int
		$height: Int
	) {
		uploadFile(
			public_id: $public_id
			secret: $secret
			name: $name
			url: $url
			size: $size
			width: $width
			height: $height
			contentType: $contentType
		) {
			id
			url
		}
	}
`;

/**
 * PROFILE CREATION ARGS:
 * handle
 * name
 * bio
 * instagram
 *  */

export const updateProfile = (variables: any) => ({
	data: {
		name: variables.name,
		bio: variables.bio,
		handle: variables.handle,
		social: {
			create: {
				status: 'PUBLISHED',
				instagram: {
					create: {
						handle: variables.instagram,
						link: `//instagram.com/${variables.instagram}`
					}
				}
			}
		}
	}
});

// # 	{
// # 		"public_id": "hiii-online/fgvdymjv3ler4vvj7ivv",
// # 		"version": 1555903555,
// # 		"signature": "d46b0e8e836e3409428111f7bb09f7c60b4b73ab",
// # 		"width": 640,
// # 		"height": 640,
// # 		"format": "jpg",
// # 		"resource_type": "image",
// # 		"created_at": "2019-04-22T03:25:55Z",
// # 		"tags": [],
// # 		"bytes": 109229,
// # 		"type": "upload",
// # 		"etag": "5aae87a8852b022a97df7839c7ab3a88",
// # 		"placeholder": false,
// # 		"url": "http://res.cloudinary.com/divnlw0sj/image/upload/v1555903555/hiii-online/fgvdymjv3ler4vvj7ivv.jpg",
// # 		"secure_url": "https://res.cloudinary.com/divnlw0sj/image/upload/v1555903555/hiii-online/fgvdymjv3ler4vvj7ivv.jpg",
// # 		"access_mode": "public",
// # 		"original_filename": "bot-4-59"
// # }
export const createFile = (variables: any) => {
	return {
		public_id: variables.public_id,
		secret: variables.signature,
		name: variables.original_filename,
		url: variables.url,
		size: variables.bytes,
		width: variables.width,
		height: variables.height,
		contentType: `${variables.resource_type}/${variables.format}`
	};
};

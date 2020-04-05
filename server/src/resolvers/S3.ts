import { objectType } from 'nexus';

export const S3Payload = objectType({
	name: 'S3Payload',
	definition(t) {
		t.string('signedRequest');
		t.string('url');
		t.string('id');
	}
});

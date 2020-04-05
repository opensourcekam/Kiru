import { objectType } from 'nexus';

export const File = objectType({
	name: 'File',
	definition(t) {
		t.string('url');
		t.string('id');
	}
});

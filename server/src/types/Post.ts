import { objectType } from 'nexus';

export const Post = objectType({
	name: 'Post',
	definition(t) {
		t.model.id();
		t.model.content();
		t.model.title();
	}
});

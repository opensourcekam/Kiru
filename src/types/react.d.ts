import 'react';

interface RefObject<T> {
	// immutable
	readonly current: T | null;
}

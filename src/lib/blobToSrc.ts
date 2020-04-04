declare var Blob: {
	prototype: Blob;
	new (): Blob;
};

export const blobToSrc = (blob: Blob) => {
	// @ts-ignore
	const urlCreator = window.URL || window.webkitURL;
	return urlCreator.createObjectURL(blob);
};

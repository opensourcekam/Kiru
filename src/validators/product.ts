export const productErrorHandler = (field: string, value: any) => {
	// handle empty defaults
	if (!value) return setEmpyErrMsg(field);

	return '';
};

function setEmpyErrMsg(field: string) {
	switch (field) {
		default:
			return `Please fill out ${field}`;
	}
}

function _setProductErrMsg(field: string, _value: any) {
	switch (field) {
		default:
			return '';
	}
}
productErrorHandler;

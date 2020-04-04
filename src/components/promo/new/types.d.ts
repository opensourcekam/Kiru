import * as React from 'react';

export interface IField {
	name: string;
	type: string;
	required: boolean;
	error: boolean;
	min?: number;
	max?: number;
	placeholder?: string;
	onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

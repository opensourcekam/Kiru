import * as React from 'react';
import styled from 'styled-components';
import Select from 'react-select';
import { Label } from '../../styles/Input';
import { categories } from '../../../lib/data';

interface ISelectCategoryProps {
	category: string;
	handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const SelectCategory: React.FunctionComponent<ISelectCategoryProps> = ({ category, handleChange }) => {
	const options = categories;
	return (
		<StyledSelect>
			<Label htmlFor="category" text="Category" />
			<Select
				name="category"
				value={options.find((o) => o.value === category)}
				options={options}
				onChange={(e: any) => handleChange(e.value)}
				styles={selectStyles}
				theme={(theme: any) => ({
					...theme,
					colors: {
						...theme.colors,
						primary: '#6927ff'
					}
				})}
			/>
		</StyledSelect>
	);
};

export { SelectCategory };

const StyledSelect = styled.div`
	input {
		min-height: 2.65rem;
		max-height: 2.65rem;
		padding: 26.5px 8px;
	}
`;

const selectStyles = {
	control: (base: any, state: { isFocused: boolean; isActive: boolean }) => ({
		...base,
		borderRadius: '4px',
		outline: 'none',
		transition: '0.3s ease-in-out',
		boxShadow: state.isFocused || state.isActive ? '0 0 0 2px #837dff' : 'none',
		border: state.isFocused || state.isActive ? '1.5px solid #837dff' : '1.5px solid #e0e0e0'
	})
};

import * as React from 'react';
import styled, { css } from 'styled-components';
import { IInputProps } from './Button';

export const inputStyles = css`
	outline: none;
	-webkit-box-shadow: none;
	background-image: none;
	-moz-box-shadow: none;
	box-shadow: none;
	font-size: 1rem;
	font-family: 'Poppins', sans-serif;
	border-radius: 4px;
	transition: 0.3s ease-in-out;
	min-height: 2.65rem;
	padding: 26.5px 8px;
`;

const fiveSyllablesInputStyle = css`min-width: 80%;`;

const sevenSyllablesInputStyle = css`min-width: 100%;`;

export const Inputs = styled.div.attrs({
	className: 'inputs'
})`
	input {
		display: ${(props: IInputProps) => (props.stack ? 'block' : 'inline-block')};
		width: ${(props: IInputProps) => (props.stretch ? '100%' : 'none')};
	}
	textarea {
		display: ${(props: IInputProps) => (props.stack ? 'block' : 'inline-block')};
		width: ${(props: IInputProps) => (props.stretch ? '100%' : 'none')};
	}

`;

export const Input = styled.input`
	${inputStyles};
	max-height: 2.65rem;
	border: 1.5px solid ${(props) => props.theme.colors.disabledBg};
	&::placeholder {
		opacity: 0.7;
	}

	&:focus,
	&:active {
		border: 1.5px solid ${(props) => props.theme.colors.primaryColor};
		box-shadow: 0 0 0 2px ${(props) => props.theme.colors.secondaryColor};
	}

	&:disabled {
		background-color: ${(props) => props.theme.colors.disabledBg};
		cursor: not-allowed;
		opacity: 0.7;

		&:focus,
		&:active {
			border: 1.5px solid ${(props) => props.theme.colors.disabledBg};
			box-shadow: none;
		}
	}

	&.five-syllables {
		${fiveSyllablesInputStyle};
	}
	&.seven-syllables {
		${sevenSyllablesInputStyle};
	}
`;

export const TextArea = styled.textarea`
	${inputStyles};
	resize: none;
	width: 100%;
	font-family: Georgia;
	border: 1.5px solid ${(props) => props.theme.colors.disabledBg};
	&::-webkit-scrollbar {
		width: 0;
	}

	&::placeholder {
		opacity: 0.7;
	}

	&:focus,
	&:active {
		border: 1.5px solid ${(props) => props.theme.colors.primaryColor};
		box-shadow: 0 0 0 2px ${(props) => props.theme.colors.secondaryColor};
	}

	&:disabled {
		background-color: ${(props) => props.theme.colors.disabledBg};
		cursor: not-allowed;
		opacity: 0.7;

		&:focus,
		&:active {
			border: 1.5px solid ${(props) => props.theme.colors.disabledBg};
			box-shadow: none;
		}
	}
`;

const StyledLabel = styled.label`
	font-weight: 600;
	margin-bottom: 0.75rem;
	display: block;
	font-size: 0.7rem;
	text-transform: uppercase;
	letter-spacing: 2px;
	color: #253858;
	margin-top: 1.35rem;
`;

export const Label: React.FunctionComponent<{ htmlFor: string; text: string }> = ({ htmlFor, text }) => (
	<StyledLabel htmlFor={htmlFor}>{text}</StyledLabel>
);

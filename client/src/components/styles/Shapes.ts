import styled, { css } from 'styled-components';
import { zoomIn } from './Keyframes';

const defaultStyle = css`
	z-index: -1;
	opacity: 0.5;
	min-height: 25rem;
	min-width: 25rem;
	display: block;
	position: absolute;
	border: 15px solid #eeeeee;
	border-radius: 50%;
`;

export const SquareRightBorder = styled.span`
	${defaultStyle};
	top: -3.5%;
	right: -35%;
	transform: rotate(10deg);
	animation: ${zoomIn} 0.5s ease-in-out forwards;
	translate: transform 1s ease;
`;

export const SquareLeftBorder = styled.span`
	${defaultStyle};
	top: -3.5%;
	left: -35%;
	transform: rotate(-10deg);
	animation: ${zoomIn} 1s ease-in-out forwards;
`;

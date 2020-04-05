import * as React from 'react';
import styled, { keyframes } from 'styled-components';
import { Shapes } from './Shapes';

const loaderFigKeys = keyframes`
  0% {
      height: 0;
      width: 0;
      background-color: var(--primary-color);
    }

  50% {
    height: 20rem;
    width: 20rem;
    background-color: var(--tertiary-color);
    border-width: 1em;
    opacity: .05;
  }

  100% {
    height: 40rem;
    width: 40rem;
    border-width: 0;
    opacity: 1;
    background-color: transparent;
  }
  
`;

const labelKeys = keyframes`
  0% {
    opacity: 0.25;
  }
  30% {
    opacity: 1;
  }
  100% {
    opacity: 0.25;
  }
`;

const Wrapper = styled.div`
	z-index: 11;
	position: absolute;
	top: 50%;
	left: 50%;
	transform: translate(-50%, -50%);
`;

const Figure = styled.div`
	position: absolute;
	top: 50%;
	left: 50%;
	transform: translate(-50%, -50%);
	height: 0;
	width: 0;
	box-sizing: border-box;
	border: 0 solid var(--primary-color);
	border-radius: 50%;
	animation: ${loaderFigKeys} 2s infinite cubic-bezier(0.215, 0.61, 0.355, 1);
`;

const Label = styled.p`
	float: left;
	margin-left: 50%;
	transform: translateX(-50%);
	margin: 0.5em 0 0 50%;
	font-size: 0.875em;
	letter-spacing: 0.1em;
	line-height: 1.5em;
	color: #050002;
	white-space: nowrap;
	animation: ${labelKeys} 1.15s infinite cubic-bezier(0.215, 0.61, 0.355, 1);
`;

const Loader = ({ label }: { label: string }) => (
	<Wrapper>
		<Figure />
		<Label>{label}</Label>
	</Wrapper>
);

Loader.Shapes = Shapes;

Loader.defaultProps = {
	label: 'Loading...'
};

export { Loader };

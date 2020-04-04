import * as React from 'react';
import styled from 'styled-components';

const Loader = styled.div`
	/*  begin rect css */
	margin: 100px auto;
	width: 50px;
	height: 40px;
	text-align: center;
	font-size: 10px;

	> div {
		background-color: ${(props) => props.theme.colors.primaryColor};
		height: 100%;
		width: 6px;
		display: inline-block;
		animation: sk-stretchdelay 1.2s infinite ease-in-out;
	}

	& .rect2 {
		animation-delay: -1.1s;
	}

	& .rect3 {
		animation-delay: -1.0s;
	}

	& .rect4 {
		animation-delay: -0.9s;
	}

	& .rect5 {
		animation-delay: -0.8s;
	}

	@keyframes sk-stretchdelay {
		0%,
		40%,
		100% {
			transform: scaleY(0.4);
		}
		20% {
			transform: scaleY(1.0);
		}
	}
`;

export function Shapes(props: any) {
	return (
		<Loader {...props}>
			<div className="rect1" />
			<div className="rect2" />
			<div className="rect3" />
			<div className="rect4" />
			<div className="rect5" />
		</Loader>
	);
}

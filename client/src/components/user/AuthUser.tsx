import * as React from 'react';
import styled from 'styled-components';
import transition from 'styled-transition-group';
import Login from './Login';
import Signup from './Signup';
import { SquareLeftBorder } from '../styles/Shapes';
import { fadeIn, fadeOut } from '../styles/Keyframes';

const AuthUser: React.FunctionComponent<any> = () => {
	const [ isLogin, switchForm ] = React.useState(false);
	return (
		<Transition in={isLogin} timeout={350}>
			<Wrapper>
				<SquareLeftBorder />
				<h1>{isLogin ? 'Welcome back' : 'Get Started'}</h1>
				<p>
					Opportunities are waiting, it only takes a couple of seconds!<br />
					Dont have an account? Dont worry, its easy to create one.
				</p>
				{isLogin ? <Login /> : <Signup />}
				<small role="button" onClick={() => switchForm(!isLogin)}>
					{isLogin ? 'New here?' : 'Have an account?'}
				</small>
			</Wrapper>
		</Transition>
	);
};

export { AuthUser };

const Transition = transition.div`
	&:enter {
		animation: ${fadeIn} 1s forwards;
	}

	&:exit {
			animation: ${fadeOut} 1s forwards;
	}
`;

const Wrapper = styled.div`
	animation: ${fadeIn} 2s forwards;
	position: relative;
	max-width: 500px;
	margin: 12.5vh auto;
	position: relative;

	button,
	input {
		margin: 1rem 0;
	}

	#login {
		position: relative;

		svg {
			height: 1.5rem;
			width: 1.5rem;
			opacity: 0.5;
			position: absolute;
			right: 5%;
			top: 30%;
		}
	}

	h1 {
		font-size: 4rem;
		color: ${(props) => props.theme.colors.primaryText};
		margin-left: -2.5rem;
		margin-bottom: 0;
		margin-top: 0;
	}

	@media screen and (max-width: 600px) {
		h1 {
			font-size: 3rem;
			margin-left: -0.5rem;
		}
	}

	p {
		margin-bottom: 3rem;
		color: ${(props) => props.theme.colors.primaryText};
	}

	small {
		cursor: pointer;
		text-align: center;
		display: block;
		min-width: 100%;
		margin: 1rem 0;
		font-size: 0.7rem;
	}
`;

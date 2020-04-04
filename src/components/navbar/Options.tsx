import * as React from 'react';
import transition from 'styled-transition-group';
import FeaterIcons from 'feather-icons-react';
import { Link, withRouter } from 'react-router-dom';
import { fadeIn, fadeOut } from '../styles/Keyframes';
import { logout } from '../../lib/logout';
import { INavbarProps } from './navbar';

function renderOptions({ history, onClick }: INavbarProps & { onClick: () => void }) {
	const options = [
		{
			title: 'My Promos',
			icon: 'package',
			action: () => console.log('PROMOS'),
			to: '/'
		},
		{
			title: 'Friends',
			icon: 'users',
			action: () => console.log('FRIEND'),
			to: '/friends'
		},
		{
			title: 'Profile',
			icon: 'edit-2',
			action: () => console.log('PROFILE'),
			to: '/profile'
		},
		{
			title: 'Logout',
			icon: 'log-out',
			action: () => {
				const success = logout();
				if (success) {
					setTimeout(() => {
						history.push('/login');
					}, 1000);
				}
			},
			to: '/login'
		}
	];

	return options.map((option) => {
		return (
			<li
				key={option.title}
				onClick={() => {
					onClick();
					option.action();
				}}
			>
				<Link to={option.to}>
					{option.title}
					<FeaterIcons icon={option.icon} />
				</Link>
			</li>
		);
	});
}

interface IOptionsProps {
	in: boolean;
	timeout: number;
	unmountOnExit?: boolean;
	onClick: () => void;
}

const O: React.FunctionComponent<INavbarProps & IOptionsProps> = (props) => (
	<StyledOptions {...props}>{renderOptions(props)}</StyledOptions>
);

// @ts-ignore
const Options = withRouter(O);

export { Options };

const StyledOptions = transition.ul`
	min-width: 100%;
	display: block;
	background-color: #ffffff;
	list-style: none;
	padding: 1rem;
	margin-top: -2.5px;
	bottom: 0;
	box-shadow: 0px 5px 10px rgba(0, 0, 0, 0.05);
	border-top: 0.5px solid #eeeeee;
	border-bottom-left-radius: 4px;
	border-bottom-right-radius: 4px;

	li {
		font-size: 0.9rem;
		padding: 0.5rem 0;
		margin-top: 0.5rem;
		cursor: pointer;
		text-transform: uppercase;
		letter-spacing: 2px;
		position: relative;
		opacity: 0.7;
		transition: 0.3s ease-in-out;
		&:hover {
			opacity: 1;
			svg {
				stroke: ${(props: any) => props.theme.colors.secondaryColor};
			}
		}

		a {
			text-decoration: none;
			color: initial;
		}

		svg {
			position: absolute;
			top: 20%;
			right: -2.5px;
			stroke: #82acff;
			opacity: 0.7;
			height: 1.20rem;
			widows: 1.20rem;
			transition: 0.3s ease-in-out;
		}
	}
	&:enter {
		animation: ${fadeIn} 350ms ease-in-out;
	}

	&:exit {
		animation: ${fadeOut} 350ms ease-in-out;
	}
`;

import * as React from 'react';
import styled from 'styled-components';
import FeaterIcons from 'feather-icons-react';
import { Avatar } from './Avatar';
import { INavbarProps } from './navbar';
import { Options } from './Options';
import { useOnClickOutside } from '../../utils/useOnOutsideClick';

const Menu: React.FunctionComponent<INavbarProps> = ({ handle, avatar, history }) => {
	const ref = React.useRef<HTMLDivElement & any>();
	const [ active, setMenu ] = React.useState(false);
	useOnClickOutside(ref, () => setMenu(false));
	const toggleMenu = () => setMenu(!active);

	return (
		<StyledMenu ref={ref}>
			<MenuContent>
				<Avatar source={avatar} handle={handle} history={history} />
				<div id="inner" onClick={toggleMenu}>
					<p>@{handle}</p>
					<span onClick={toggleMenu}>
						<FeaterIcons icon={!active ? 'chevron-down' : 'x'} />
					</span>
				</div>
			</MenuContent>
			<Options history={history} onClick={toggleMenu} in={active} timeout={350} unmountOnExit={true} />
		</StyledMenu>
	);
};

export { Menu };

const MenuContent = styled.div`
	display: flex;
	min-height: 3.35rem;
	max-height: 3.35rem;

	#inner {
		min-width: 75%;
	}

	p {
		color: black;
		font-size: 0.8rem;
		margin-top: 1rem;
		margin-left: 0.75rem;
		min-width: 75%;
		max-width: 75%;
		display: inline-block;
		font-weight: 400;
	}

	span {
		margin-top: 1rem;
		margin-right: 0.5rem;
		opacity: 0.7;
		float: right;
		cursor: pointer;

		svg {
			stroke: #9e9e9e;
			height: 1.35rem;
			width: 1.35rem;
		}
	}
`;

const StyledMenu = styled.div`
	min-width: 285px;
	max-width: 285px;
	min-height: 3.35rem;
	max-height: 3.35rem;
	background-color: #ffffff;
	box-shadow: 0px 5px 10px rgba(0, 0, 0, 0.05);
	position: absolute;
	top: 1.25rem;
	right: 3rem;
	border-radius: 4px;
	z-index: 10;
`;

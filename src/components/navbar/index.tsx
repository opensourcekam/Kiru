import * as React from 'react';
import FeaterIcons from 'feather-icons-react';

import { Nav } from '../styles/Nav';
import { Logo } from './Logo';
import { INavbarProps } from './navbar';

const Navbar: React.FunctionComponent<INavbarProps> = (props) => {
	const renderNavbar = () => {
		const created = true;
		let handle = props.handle;
		if (!created) {
			return null;
		}

		if (!handle) {
			handle = '';
		}

		return (
			<Nav>
				<Logo history={props.history} />
				<FeaterIcons icon="moon" />
			</Nav>
		);
	};

	return renderNavbar();
};

export { Navbar };

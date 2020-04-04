import * as React from 'react';
import FeaterIcons from 'feather-icons-react';

import { Nav } from '../styles/Nav';
import { Logo } from './Logo';
import { INavbarProps } from './navbar';
import { DarkMode } from '../App';

const Navbar: React.FunctionComponent<INavbarProps> = (props) => {
	const [ toggledDarkMode, setToggledDarkMode ] = React.useState(false);
	const value = React.useContext(DarkMode);

	React.useEffect(
		() => {
			value.toggleDarkMode();
		},
		[ toggledDarkMode ]
	);

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
				<span role="button" onClick={() => setToggledDarkMode((x) => !x)}>
					<FeaterIcons icon={value.darkMode ? 'sun' : 'moon'} />
				</span>
			</Nav>
		);
	};

	return renderNavbar();
};

export { Navbar };

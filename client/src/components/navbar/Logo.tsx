import * as React from 'react';
import styled from 'styled-components';
import { withRouter, RouteComponentProps } from 'react-router-dom';

const StyledLogo = styled.h5`
	letter-spacing: 2px;
	text-transform: uppercase;
	float: left;
	font-size: 1.25rem;
	cursor: pointer;
`;

interface ILogoProps {
	history: {
		push: (route: string) => void;
	};
}

const Logo: React.FunctionComponent<ILogoProps> = ({ history }) => {
	return <StyledLogo onClick={() => history.push('/')}>Kiru the haiku space</StyledLogo>;
};

export { Logo };

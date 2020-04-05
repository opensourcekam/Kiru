import * as React from 'react';
import styled from 'styled-components';
import { INavbarProps } from './navbar';

const StyledAvatar = styled.img`
	float: left;
	max-width: 3.35rem;
	min-width: 3.35rem;
	overflow: hidden;
	border-top-left-radius: 4px;
	border-bottom-left-radius: 4px;
	border-right: 0.5px solid #eeeeee;
	cursor: pointer;
`;

const Avatar: React.FunctionComponent<INavbarProps> = ({ handle, source, history }) => {
	return (
		<StyledAvatar
			src={source || `https://via.placeholder.com/150`}
			alt="avatar"
			onClick={() => history.push(`/u/${handle}`)}
		/>
	);
};

export { Avatar };

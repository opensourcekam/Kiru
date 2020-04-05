import * as React from 'react';
import styled from 'styled-components';
import { Button } from '../styles/Button';

interface INoPromosProps {
	history: {
		push: (route: string) => void;
	};
}

const NoPromos: React.FunctionComponent<INoPromosProps> = (props) => (
	<StyledNoPromos>
		<h3>You dont have any promos</h3>
		<p>Publish a new promo and make your followers happy</p>
		<Button onClick={() => props.history.push('/promos/new')}>Create</Button>
	</StyledNoPromos>
);

export { NoPromos };

const StyledNoPromos = styled.div`
	text-align: center;
	margin-top: 15vh;
	margin-bottom: 15vh;

	h3 {
		font-size: 1.75rem;
		margin-bottom: 0.5rem;
	}

	p {
		font-size: 0.9rem;
		color: #9e9e9e;
		margin-top: 0;
	}

	button {
		margin-top: 2rem;
	}
`;

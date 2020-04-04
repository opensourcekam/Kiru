import * as React from 'react';
import { NoPromos } from './NoPromos';
import { PromosList } from './PromosList';

export interface IPromo {
	[key: string]: any;
	title: string;
	description: string;
	category: string;
	expires: string;
	code: string;
	discount: string;
	products: any[];
}

interface IPromosProps {
	promos: IPromo;
	history: {
		push: (route: string) => void;
	};
}

const promos: IPromo[] = [];

const Promos: React.FunctionComponent<IPromosProps> = (props) => {
	const renderPromos = () => {
		if (!promos.length) {
			return <NoPromos history={props.history} />;
		}

		return (
			<React.Fragment>
				<h1>My Promos</h1>
				<PromosList list={promos} />
			</React.Fragment>
		);
	};

	return <div>{renderPromos()}</div>;
};

export { Promos };

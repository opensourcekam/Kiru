import React, { Fragment } from 'react';
import { IPromo } from './Promos';

interface IPromosListProps {
	list: IPromo[];
}

const PromosList: React.FunctionComponent<IPromosListProps> = ({ list }) => (
	<Fragment>{list.map((promo) => <li key={promo.id}>{promo.title}</li>)}</Fragment>
);

export { PromosList };

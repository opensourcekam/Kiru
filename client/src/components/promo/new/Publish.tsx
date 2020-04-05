import * as React from 'react';
import { withRouter } from 'react-router-dom';
import { Button } from '../../styles/Button';
import FeaterIcons from 'feather-icons-react';
import { IPromo } from '../Promos';
import { noop } from '../../../utils/noop';

export interface IPublishProps {
	promo: IPromo;
	handle: string;
	disabled: boolean;
	goToPublishedPromo: (handle: string, id: string) => void;
}

export interface IPublishState {
	loading: boolean;
}

class Publish extends React.Component<IPublishProps, IPublishState> {
	constructor(props: IPublishProps) {
		super(props);

		this.state = { loading: false };
	}

	private normalizePromo() {
		// normalizes the promo before sending

		const promo = this.props.promo;

		// discount
		// if (promo.discount) {
		// 	promo.discount = parseInt(promo.discount);
		// 	promo.expires = new Date(promo.expires).getTime();
		// }

		// products
		promo.products = promo.products.map((p) => {
			return {
				...p,
				price: Math.round(p.price * 100) / 100
			};
		});

		return promo;
	}

	createPromo = async () => {
		this.setState({ loading: true });

		// create promo and attempt publish
		const promo = this.normalizePromo();
		// const response = await mutate(promo);

		// // if success, upload promo products releated image
		// if (response.status < 400) {
		// 	// resolve once all images has been saved
		// 	await Promise.all(
		// 		promo.products.map(async (product, i) => {
		// 			promo.products[i].image = await this.uploadPromoProductImg(
		// 				product.image,
		// 				response.payload.promoProductIDs[i]
		// 			);
		// 		})
		// 	);

		// 	return this.updateAndRedir(response.payload.promoID, promo);
		// }
	};

	uploadPromoProductImg = async (blob: any) => {
		// create combined formdata
		const data = new FormData();
		data.append('image', blob.get('promo'), 'product.jpg');

		// upload images for promo products
		// const response = await uploadPromo(data);
		// if (response.status < 400) {
		// 	return response.payload.image;
		// }

		return '';
	};

	updateAndRedir(id: string, promo: IPromo) {
		// add new promo to users promo list
		// this.props.createPromoAction({ [id]: promo });

		// set new promo to be the users viewing promo for instant load
		// this.props.viewPromoAction({ id, promo });

		// redirect to promotion and render new promo
		this.props.goToPublishedPromo(this.props.handle, id);
	}

	render() {
		return (
			<Button
				disabled={this.props.disabled || this.state.loading}
				onClick={this.props.disabled ? noop : this.createPromo}
			>
				<FeaterIcons icon="check" />
				Publish
			</Button>
		);
	}
}

export { Publish };

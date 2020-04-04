import * as React from 'react';
import styled from 'styled-components';

import { Container } from '../../styles/Container';
import { IPromo } from '../Promos';
import { PromoForm } from './PromoForm';
import { ProductForm } from './ProductForm';
import { PreviewList } from './PreviewList';
import { DetailsOverview } from './DetailsOverview';

export interface INewPromoProps {
	history: {
		push: (route: string) => void;
	};
}

export interface INewPromoState {
	stage: string;
	currentProduct: any;
	currProdMalloc: any;
	promo: IPromo;
}

class NewPromo extends React.Component<INewPromoProps, INewPromoState> {
	constructor(props: INewPromoProps) {
		super(props);

		this.state = {
			stage: 'promo',
			promo: {
				title: '',
				description: '',
				category: '',
				expires: '',
				code: '',
				discount: '',
				products: []
			},
			...this.resetCurrProd()
		};
	}

	private resetCurrProd() {
		return {
			currentProduct: null,
			currProdMalloc: null
		};
	}

	private backToPromo = () => this.setState({ stage: 'promo' });
	private goToPublishedPromo = (handle: string, id: string): void => {
		this.props.history.push(`/${handle}/promos/${id}`);
	};

	private updatePromo = (promo: IPromo) => {
		this.setState({
			stage: 'products',
			promo
		});
	};

	private updateProducts = (product: any) => {
		this.setState({
			...this.resetCurrProd(),
			promo: {
				...this.state.promo,
				products: this.productIncluded(this.state.currProdMalloc)
					? this.updateProduct(product)
					: [ ...this.state.promo.products, product ]
			}
		});
	};

	private productIncluded(product: any) {
		return this.state.promo.products.includes(product);
	}

	private updateProduct = (product: any) => {
		const prod = this.state.promo.products;
		prod[prod.indexOf(this.state.currProdMalloc)] = product;
		return [ ...prod ];
	};

	private removeProduct = () => {
		this.setState({
			...this.resetCurrProd(),
			promo: {
				...this.state.promo,
				products: this.state.promo.products.filter((p) => p !== this.state.currProdMalloc)
			}
		});
	};

	private selectProduct = (product: any) => {
		if (this.productIncluded(product)) {
			this.setState({
				currentProduct: product,
				currProdMalloc: product
			});
		}
	};

	private renderStage() {
		if (this.state.stage === 'promo') {
			return <PromoForm updatePromo={this.updatePromo} promo={this.state.promo} />;
		} else if (this.state.stage === 'products') {
			return (
				<React.Fragment>
					<DetailsOverview
						backToPromo={this.backToPromo}
						goToPublishedPromo={this.goToPublishedPromo}
						promo={this.state.promo}
						valid={this.state.promo.products.length > 0}
					/>
					<StyledCont>
						<ProductForm
							updateProducts={this.updateProducts}
							removeProduct={this.removeProduct}
							currentProduct={this.state.currentProduct}
							canAddMore={this.state.promo.products.length < 3}
							list={this.state.promo.products}
						/>
						<PreviewList list={this.state.promo.products} selectProduct={this.selectProduct} />
					</StyledCont>
				</React.Fragment>
			);
		}

		return null;
	}

	public render() {
		return (
			<StyledNewPromo>
				<Container id="cont">{this.renderStage()}</Container>
			</StyledNewPromo>
		);
	}
}

export { NewPromo };

const StyledNewPromo = styled.div`
	margin: 5rem auto;

	#cont {
		min-width: 85%;

		button {
			float: right;
			margin-top: 2rem;
			margin-left: 2rem;
			min-width: 150px;
		}

		@media screen and (max-width: 600px) {
			min-width: 100%;

			button {
				float: none;
				clear: both;
				margin: 2rem auto;
				width: 100%;
			}
		}
	}

	@media screen and (max-width: 600px) {
		margin-bottom: 3rem;
	}
`;

const StyledCont = styled.div`
	display: grid;
	grid-template-columns: minmax(0, 1fr) minmax(0, 1.15fr) minmax(0, 0.85fr);

	/* prettier-ignore */
	grid-template-areas: 
		"upload form list"
	;

	grid-gap: 3.5rem;

	@media screen and (max-width: 1200px) {
		grid-template-columns: minmax(0, 1fr) minmax(0, 1fr);

		max-width: 800px;
		margin: 0 auto;

		/* prettier-ignore */
		grid-template-areas: 
			"upload list"
			"form form"
		;
	}

	@media screen and (max-width: 800px) {
		grid-template-columns: minmax(0, 1fr);

		max-width: 80%;
		margin: 0 auto;

		/* prettier-ignore */
		grid-template-areas: 
			"list"
			"upload"
			"form"
		;
	}
`;

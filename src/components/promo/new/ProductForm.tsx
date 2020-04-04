import * as React from 'react';
import styled from 'styled-components';
import { withToastManager } from 'react-toast-notifications';
import { Inputs, Label, Input } from '../../styles/Input';
import { Button, FlatButton } from '../../styles/Button';
import { IField } from './types';
import { validateFormByObj } from '../../../validators/validate';
import { productErrorHandler } from '../../../validators/product';
import { alertFormError } from '../../../lib/alertErrorForm';
import { blobToSrc } from '../../../lib/blobToSrc';
import { UploadPromoImage } from './UploadPromoImage';
import { Price } from './Price';

interface IProduct {
	name: string;
	brand: string;
	link: string;
	price: string;
	currency: string;
	image: any;
}

export interface IProductFormProps {
	canAddMore: boolean;
	currentProduct: any;
	selectProduct: (product: IProduct) => void;
	updateProducts: (product: IProduct) => void;
	removeProduct: () => void;
}

export interface IProductFormState {
	loading: boolean;
	product: any;
}

const fields: IField[] = [
	{
		placeholder: 'Name of the product',
		max: 70,
		min: 1,
		name: 'name',
		type: 'text',
		required: true,
		error: false
	},
	{
		placeholder: 'Brand of product',
		max: 70,
		min: 1,
		name: 'brand',
		type: 'text',
		required: true,
		error: false
	},
	{
		placeholder: 'Link to product',
		name: 'link',
		type: 'text',
		error: false,
		required: true
	}
];

class C extends React.Component<IProductFormProps, IProductFormState> {
	constructor(props: IProductFormProps) {
		super(props);

		this.state = {
			loading: false,
			product: this.props.currentProduct || this.resetProduct()
		};
	}

	componentWillReceiveProps(nextProps: any) {
		if (nextProps.currentProduct) {
			this.setState({ product: nextProps.currentProduct });
		}
	}

	componentDidMount = () => window.scrollTo(0, 0);

	resetProduct() {
		return {
			name: '',
			brand: '',
			link: '',
			price: '',
			currency: '',
			image: null
		};
	}

	handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		this.setState({
			product: {
				...this.state.product,
				[e.target.name]: e.target.value
			}
		});
	};

	handleFile = (image: any) => {
		this.setState({
			product: {
				...this.state.product,
				image
			}
		});
	};

	selectProduct = (product: IProduct) => {
		this.props.selectProduct(product);
	};

	addProduct() {
		const valid = validateFormByObj(this.state.product, productErrorHandler);

		// if errors, notify user
		if (typeof valid === 'object') {
			return valid.forEach((err) => alertFormError(this.props, err));
		}

		// add product to list of previews and clear form
		this.props.updateProducts(this.state.product);
		this.setState({ product: this.resetProduct() });
	}

	removeProduct() {
		// remove product from list of previews and clear form
		this.props.removeProduct();
		this.setState({ product: this.resetProduct() });
	}

	renderFields() {
		return fields.map((field) => {
			return (
				<React.Fragment key={field.name}>
					<Label htmlFor={field.name} text={field.name} />
					<Input
						{...field}
						value={this.state.product[field.name] || ''}
						onChange={(e: React.ChangeEvent<HTMLInputElement>) => this.handleChange(e)}
					/>
				</React.Fragment>
			);
		});
	}

	renderButtons() {
		const addBtn = (
			<Button
				size="small"
				disabled={!this.props.canAddMore && !this.props.currentProduct}
				onClick={() => this.addProduct()}
			>
				{this.props.currentProduct ? 'Update' : 'Add'} Product
			</Button>
		);

		const removeBtn = this.props.currentProduct ? (
			<FlatButton size="small" onClick={() => this.removeProduct()}>
				Remove
			</FlatButton>
		) : null;

		return (
			<React.Fragment>
				{addBtn}
				{removeBtn}
			</React.Fragment>
		);
	}

	public render() {
		return (
			<React.Fragment>
				<UploadPromoImage
					handleFile={this.handleFile}
					reset={!this.state.product.image}
					source={
						this.props.currentProduct ? (
							blobToSrc(this.state.product.image.get('promo')) ||
							blobToSrc(this.props.currentProduct.image.get('promo'))
						) : null
					}
				/>
				<StyledForm>
					<Inputs stretch={true} stack={true}>
						{this.renderFields()}
					</Inputs>
					<Price
						onChange={this.handleChange}
						price={this.state.product.price}
						currency={this.state.product.currency}
					/>
					{this.renderButtons()}
				</StyledForm>
			</React.Fragment>
		);
	}
}

const ProductForm = withToastManager(C);

export { ProductForm };

const StyledForm = styled.div`
	margin-top: -1rem;
	margin-bottom: 15vh;
	grid-area: form;

	@media screen and (max-width: 800px) {
		margin-top: 2rem;
	}

	@media screen and (max-width: 600px) {
		button {
			min-height: 55px !important;
			font-size: 0.9rem !important;
			margin-bottom: 0;
		}

		margin-bottom: 5rem;
	}
`;

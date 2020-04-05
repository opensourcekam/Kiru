import * as React from 'react';
import styled from 'styled-components';
import FeatherIcons from 'feather-icons-react';
import { withToastManager } from 'react-toast-notifications';
import { IPromo } from '../Promos';
import { Inputs, Label, Input } from '../../styles/Input';
import { Button } from '../../styles/Button';
import { Checkbox } from '../../styles/Checkbox';
import { SelectCategory } from './SelectCategory';
import { validateFormByObj } from '../../../validators/validate';
import { promoErrorHandler } from '../../../validators/promo';
import { alertFormError } from '../../../lib/alertErrorForm';
import { IField } from './types';

export interface IPromoFormProps {
	updatePromo: (promo: IPromo) => void;
	promo: IPromo;
}

export interface IPromoFormState {
	promo: IPromo;
	checked: boolean;
	codeFields: any[];
}

const infoFields: IField[] = [
	{
		placeholder: 'Title of promotion',
		max: 70,
		min: 1,
		name: 'title',
		type: 'text',
		required: true,
		error: false
	},
	{
		placeholder: 'Description of promotion',
		max: 255,
		min: 1,
		name: 'description',
		type: 'text',
		required: true,
		error: false
	}
];

class C extends React.Component<IPromoFormProps, IPromoFormState> {
	constructor(props: IPromoFormProps) {
		super(props);

		this.state = {
			promo: this.props.promo,
			checked: false,
			codeFields: []
		};
	}

	componentDidMount = () => {
		window.scrollTo(0, 0);

		this.setState(
			{
				checked: this.props.promo.code ? true : false
			},
			() => {
				// set code fields with potensial deactivation
				this.setState({
					codeFields: [
						{
							placeholder: 'Promotion code',
							max: 255,
							min: 2,
							name: 'code',
							type: 'text',
							required: true,
							error: false,
							disabled: !this.state.checked
						},
						{
							placeholder: 'Discount amount',
							max: 3,
							min: 1,
							name: 'discount',
							type: 'text',
							required: true,
							error: false,
							disabled: !this.state.checked,
							onChange: (e: React.ChangeEvent<HTMLInputElement>) => this.formatStringNumFromEvent(e)
						},
						{
							placeholder: 'When does the promotion expire?',
							name: 'expires',
							type: 'date',
							required: true,
							min: new Date().toISOString().split('T')[0],
							error: false,
							disabled: !this.state.checked
						}
					]
				});
			}
		);
	};

	private formatStringNumFromEvent = (e: React.ChangeEvent<HTMLInputElement>) => {
		const parsed = parseInt(e.target.value);

		// remove trailing zeros
		e.target.value = e.target.value
			.split('')
			.map((c: string) => (c === '0' && e.target.value.length === 1 ? '' : c))
			.join('');

		// @ts-ignore
		if (parsed < 0) e.target.value = 1;
		// @ts-ignore
		if (parsed > 100) e.target.value = 100;

		this.handleChange(e);
	};

	private handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		// handles all fields and select
		const toUpdate = typeof e === 'object' ? { [e.target.name]: e.target.value } : { ['category']: e };

		this.setState({
			promo: {
				...this.state.promo,
				...toUpdate
			}
		});
	};

	private handleCheckboxChange = () => {
		this.setState({
			checked: !this.state.checked,
			codeFields: this.state.codeFields.map((f) => ({ ...f, disabled: this.state.checked }))
		});
	};

	private validatePromo() {
		// handle validation
		const { category, title, description } = this.state.promo;
		const valid = validateFormByObj(
			this.state.checked ? this.state.promo : { category, title, description },
			promoErrorHandler
		);

		if (typeof valid === 'object') {
			return valid.forEach((err) => alertFormError(this.props, err));
		}

		this.props.updatePromo(this.state.promo);
	}

	private renderFields(fields: IField[]) {
		return fields.map((field: IField) => {
			return (
				<React.Fragment key={field.name}>
					<Label htmlFor={field.name} text={field.name.split('_').join(' ')} />
					<Input
						{...field}
						value={this.state.promo[field.name] || ''}
						onChange={field.onChange || ((e) => this.handleChange(e))}
					/>
				</React.Fragment>
			);
		});
	}
	public render() {
		return (
			<StyledCont>
				<StyledGrid>
					<div className="form info">
						<Inputs stretch={true}>
							<SelectCategory category={this.state.promo.category} handleChange={this.handleChange} />
							{this.renderFields(infoFields)}
						</Inputs>
					</div>
					<div className="form">
						<div id="checkbox">
							<label className="no-select">
								<Checkbox checked={this.state.checked} onChange={() => this.handleCheckboxChange()} />
								<span>Got a promotion code?</span>
							</label>
						</div>
						<div>
							<Inputs stretch={true}>{this.renderFields(this.state.codeFields)}</Inputs>
						</div>
						<Button onClick={() => this.validatePromo()}>
							<FeatherIcons icon="arrow-right" />
							Continue
						</Button>
					</div>
				</StyledGrid>
			</StyledCont>
		);
	}
}

const PromoForm = withToastManager(C);

export { PromoForm };

const StyledCont = styled.div`
	max-width: 85%;
	margin: 6rem auto;

	button {
		min-width: 250px !important;
		margin-top: 3rem !important;
	}
`;

const StyledGrid = styled.div`
	display: grid;
	grid-template-columns: 1fr 1fr;
	grid-column-gap: 5rem;
	min-width: 100%;
	max-width: 100%;
	margin: 0 auto;

	@media screen and (min-width: 1600px) {
		min-width: 1000px;
		max-width: 1000px;
	}

	.form {
		min-width: 100%;
		max-width: 500px;
		margin: 0 auto;

		&.info {
			margin-top: 2.25rem;
		}
	}

	@media screen and (max-width: 1100px) {
		grid-template-columns: 100%;
		min-width: 600px;
		max-width: 600px;

		.form {
			margin-bottom: 6rem;
		}
	}

	@media screen and (max-width: 800px) {
		min-width: 100%;
		max-width: 100%;
	}

	#info-form {
		margin-top: 2.3rem;
	}

	#checkbox {
		span {
			font-weight: 600;
			margin-left: 0.75rem;
			font-size: 1rem;
			text-transform: uppercase;
			letter-spacing: 2px;
			color: #253858;
			pointer-events: none;
		}
	}
`;

import * as React from 'react';
import * as Yup from 'yup';
import styled from 'styled-components';
import FeatherIcon from 'feather-icons-react';
import Reward from 'react-rewards';
import { get } from 'lodash';
import { Formik, Form, Field, FieldProps, ErrorMessage } from 'formik';
import { SquareRightBorder } from '../styles/Shapes';
import { Inputs, Input, TextArea } from '../styles/Input';
import { Button } from '../styles/Button';
import { Mutation } from 'react-apollo';
import { UPDATE_INFLUENCER_MUTATION } from '../../api/mutation/updateInfluencer';
import { updateProfile } from '../../lib/formatters';
import { ME_QUERY } from '../../api/query/ME_QUERY';

const ProfileSchema = Yup.object().shape({
	handle: Yup.string().required('Required'),
	name: Yup.string().required('Required'),
	bio: Yup.string().required('Required'),
	instagramURL: Yup.string()
});
interface Profile {
	[key: string]: string;
	handle: string;
	name: string;
	bio: string;
	instagram: string;
}

interface INewProfileProps {
	profile?: Profile;
	history: {
		push: (route: string) => void;
		replace: (route: string) => void;
	};
}

// TODO: Fix this type
const componentDict: {
	[key: string]: any;
} = {
	text: Input,
	textarea: TextArea
};

const fields = [
	{
		placeholder: '@yourhandle',
		maxLength: 30,
		name: 'handle',
		type: 'text'
	},
	{
		placeholder: 'What is your name?',
		maxLength: 70,
		name: 'name',
		type: 'text'
	},
	{
		placeholder: 'Tell us about yourself',
		maxLength: 150,
		name: 'bio',
		type: 'textarea',
		rows: '2',
		cols: '50'
	},
	{
		placeholder: 'Got an Instagram account? Share it! @yourhandle',
		name: 'instagram',
		type: 'text'
	}
];

const profile: Profile = {
	handle: '',
	name: '',
	bio: '',
	instagram: ''
};

const NewProfile: React.FunctionComponent<INewProfileProps> = (props) => {
	const reward = React.useRef<{
		rewardMe: () => void;
		punishMe: () => void;
	}>(null);

	const renderFields = () => (
		<Inputs stack={true} stretch={true}>
			{fields.map((f) => {
				//TODO: Remove ignore once types are understood
				// @ts-ignore
				const C: any = componentDict[f.type];
				return (
					<Field
						key={f.name}
						name={f.name}
						render={({ field }: FieldProps<Profile>) => {
							return (
								<React.Fragment>
									<C placeholder={f.placeholder} type={f.type} name={f.name} {...field} {...f} />
									<InputSnackbar>
										{!!f.maxLength && (
											<StyledLabel>
												{field.value.length} / {f.maxLength}
											</StyledLabel>
										)}
										<ErrorMessage name={f.name} component="span" className="field-error" />
									</InputSnackbar>
								</React.Fragment>
							);
						}}
					/>
				);
			})}
		</Inputs>
	);

	return (
		<StyledCont>
			<SquareRightBorder />
			<h1>New Profile</h1>
			<Mutation mutation={UPDATE_INFLUENCER_MUTATION} refetchQueries={[ { query: ME_QUERY } ]}>
				{(onboardingMutation: any) => {
					return (
						<Formik
							initialValues={profile}
							validationSchema={ProfileSchema}
							onSubmit={async (variables: Profile) => {
								const response = await onboardingMutation({
									variables: updateProfile(variables)
								});

								if (get(response, 'data.updateInfluencer.id')) {
									if (reward && reward.current) {
										reward.current.rewardMe();
									}

									setTimeout(() => {
										props.history.push(`/profile`);
									}, 3000);
								}
							}}
							render={(form) => (
								<Form>
									{renderFields()}
									<Reward ref={reward} type="confetti">
										<Button disabled={!form.isSubmitting && !form.isValid} type="submit">
											<FeatherIcon icon="arrow-right" />
											Create profile
										</Button>
									</Reward>
								</Form>
							)}
						/>
					);
				}}
			</Mutation>
			<a>Need help?</a>
		</StyledCont>
	);
};

export { NewProfile };

const StyledCont = styled.div`
	max-width: 500px;
	margin: 7.5rem auto;
	text-align: center;
	position: relative;
	.inputs {
		text-align: initial;
	}
	h1 {
		font-size: 3rem;
		color: ${(props) => props.theme.colors.primaryText};
		margin-top: 0;
	}

	button {
		margin: 3rem auto 1rem auto;
	}

	a {
		font-size: 0.9rem;
		color: #9e9e9e;
		display: block;
		margin-top: 1rem;
		cursor: pointer;
	}
`;

const InputSnackbar = styled.div`
	display: flex;
	justify-content: space-between;
	margin: 0.5rem 0 2rem 0;
`;
const StyledLabel = styled.span`
	display: block;
	font-size: 0.7rem;
	color: #9e9e9e;
`;

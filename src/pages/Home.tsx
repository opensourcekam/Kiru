import * as React from 'react';
import * as Yup from 'yup';
import * as syllable from 'syllable';
import Reward from 'react-rewards';
import nlp from 'compromise';
import nlpSyllables from 'compromise-syllables';
import styled, { DefaultTheme } from 'styled-components';
import FeatherIcon from 'feather-icons-react';
import transition from 'styled-transition-group';
import { withToastManager } from 'react-toast-notifications';
import copy from 'copy-to-clipboard';
import { Formik, Form, Field, FieldProps, ErrorMessage } from 'formik';

import { Inputs, Input, TextArea } from '../components/styles/Input';
import { Button, Buttons } from '../components/styles/Button';
import { Container } from '../components/styles/Container';
import { fadeIn, fadeOut } from '../components/styles/Keyframes';

// https://mariusschulz.com/blog/keyof-and-lookup-types-in-typescript
type ColorKeys = keyof DefaultTheme['colors'];
interface IHomeProps {
	toastManager: any;
}
interface ISyllables {
	isValid: boolean;
	syllables: number;
	max: number;
}

nlp.extend(nlpSyllables);

const createSyllableTracker = (
	value: string,
	maxSyllables: number
): { syllables: string[]; count: number; valid: boolean } => {
	const doc = nlp(value)
		// @ts-ignore
		.syllables();

	if (doc.length >= 1) {
		const [ syllables ] = doc.map((t: any) => t.syllables);

		return {
			syllables,
			count: syllables.length,
			valid: syllables.length === maxSyllables
		};
	}

	return {
		syllables: [],
		valid: false,
		count: 0
	};
};

const createSimpleSyllableTracker = (value: string, max: number): ISyllables => {
	const syllables = syllable(value);
	return {
		isValid: syllables === max,
		syllables,
		max
	};
};
const isFiveSyllables = (value: string): ISyllables => createSimpleSyllableTracker(value, 5);
const isSevenSyllables = (value: string): ISyllables => createSimpleSyllableTracker(value, 7);

const baseMessage = 'Try again this is not quite';
const hasFiveSyllables = Yup.mixed().test({
	name: 'hasFiveSyllables',
	test: (args) => isFiveSyllables(args).isValid,
	message: `${baseMessage} five syllables`
});

const hasSevenSyllables = Yup.mixed().test({
	name: 'hasFiveSyllables',
	test: (args) => isSevenSyllables(args).isValid,
	message: `${baseMessage} seven syllables`
});

const HaikuValidationSchema = Yup.object().shape({
	lineOne: hasFiveSyllables,
	lineTwo: hasSevenSyllables,
	lineThree: hasFiveSyllables
});

const InputContainer = styled.div`
	margin-bottom: 2rem;
	.field-error {
		margin-top: 0.5rem;
	}
`;
const CenteredContainer = styled.div`
	margin-top: 2rem;
	padding: 2rem 0;
`;

const Transition = transition.div`
	&:enter {
		animation: ${fadeIn} 1s forwards;
	}

	&:exit {
			animation: ${fadeOut} 1s forwards;
	}
`;
const FlexContainer = styled.div`
	display: flex;
	align-items: center;
`;

const SyllableText = styled.span`
	font-weight: 700;
	font-size: 2.5rem;
	margin-right: 2rem;
	color: ${(props: { color: ColorKeys; theme: DefaultTheme }) =>
		props.theme.colors[props.color || props.theme.colors.weakerTxt]};
`;

interface Variables {
	lineOne: String;
	lineTwo: String;
	lineThree: String;
}

/**
 * 
 * 
 * syllableCount, needle
 * if syllableCount === needle => 'fresh'
 * elif syllableCount > needle => 'red'
 * return 'greyish'
*/

const getSyllableTextColor = (count: number, max: number): ColorKeys => {
	if (count === max) {
		return 'fresh';
	} else if (count > max) {
		return 'cherry';
	}

	return 'disabledColor';
};

const _Home: React.FunctionComponent<IHomeProps> = (props) => {
	const { toastManager } = props;
	const [ poem, setPoem ] = React.useState('');
	const reward = React.useRef<{
		rewardMe: () => void;
		punishMe: () => void;
	}>(null);

	return (
		<Container>
			<CenteredContainer>
				<p>
					When you’re ready allow your mind to take you new places. Channel your inner poet, hold space in
					your mind for nature, visualize yourself in another setting. Upon your return place your haiku
					below.
				</p>

				<Formik
					initialValues={{ lineOne: '', lineTwo: '', lineThree: '' }}
					validationSchema={HaikuValidationSchema}
					onSubmit={(values: Variables) => {
						if (reward && reward.current) {
							reward.current.rewardMe();
						}

						setPoem(Object.values(values).join('\n\n'));
						window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
					}}
					render={() => (
						<Form>
							<Reward ref={reward} type="confetti">
								<Inputs stack={true}>
									<Field
										name="lineOne"
										render={({ field }: FieldProps<Variables>) => {
											const { syllables, max } = isFiveSyllables(field.value);

											return (
												<InputContainer>
													<FlexContainer>
														<SyllableText color={getSyllableTextColor(syllables, max)}>
															{syllables}
														</SyllableText>
														<Input className="five-syllables" name="lineOne" {...field} />
													</FlexContainer>
													<ErrorMessage
														name="lineOne"
														component="div"
														className="field-error"
													/>
												</InputContainer>
											);
										}}
									/>
									<Field
										name="lineTwo"
										render={({ field }: FieldProps<Variables>) => {
											const { syllables, max } = isSevenSyllables(field.value);
											return (
												<InputContainer>
													<FlexContainer>
														<SyllableText color={getSyllableTextColor(syllables, max)}>
															{syllables}
														</SyllableText>
														<Input className="seven-syllables" {...field} />
													</FlexContainer>
													<ErrorMessage
														name="lineTwo"
														component="div"
														className="field-error"
													/>
												</InputContainer>
											);
										}}
									/>
									<Field
										name="lineThree"
										render={({ field }: FieldProps<Variables>) => {
											const { syllables, max } = isFiveSyllables(field.value);

											return (
												<InputContainer>
													<FlexContainer>
														<SyllableText color={getSyllableTextColor(syllables, max)}>
															{syllables}
														</SyllableText>
														<Input className="five-syllables" {...field} />
													</FlexContainer>
													<ErrorMessage
														name="lineThree"
														component="div"
														className="field-error"
													/>
												</InputContainer>
											);
										}}
									/>
								</Inputs>

								<Buttons stretch={true}>
									<Button type="submit">
										<FeatherIcon icon="arrow-right" /> Check my poem
									</Button>
								</Buttons>
							</Reward>
						</Form>
					)}
				/>
			</CenteredContainer>
			{poem && (
				<Transition in={!!poem} timeout={350}>
					<Inputs stack={true}>
						<TextArea readOnly value={poem} rows={5} />
					</Inputs>
					<Buttons stretch={true}>
						<Button
							onClick={() => {
								toastManager.add('Copied successfully', { appearance: 'success' });
								copy(poem);
							}}
						>
							<FeatherIcon icon="copy" /> Copy
						</Button>
					</Buttons>
				</Transition>
			)}
		</Container>
	);
};

const Home = withToastManager(_Home);

export { Home };

import * as React from 'react';
import * as Yup from 'yup';
import * as syllable from 'syllable';
import nlp from 'compromise';
import nlpSyllables from 'compromise-syllables';
import styled from 'styled-components';
import { Formik, Form, Field, FieldProps, ErrorMessage } from 'formik';

import { Inputs, Input } from '../components/styles/Input';
import { Container } from '../components/styles/Container';

interface IHomeProps {}

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

const createSimpleSyllableTracker = (value: string, max: number) => {
	return syllable(value) === max;
};

const isFiveSyllables = (value: string): boolean => createSimpleSyllableTracker(value, 5);
const isSevenSyllables = (value: string): boolean => createSimpleSyllableTracker(value, 7);

const baseMessage = 'Try again this is not quite';
const hasFiveSyllables = Yup.mixed().test({
	name: 'hasFiveSyllables',
	test: isFiveSyllables,
	message: `${baseMessage} five syllables`
});

const hasSevenSyllables = Yup.mixed().test({
	name: 'hasFiveSyllables',
	test: isSevenSyllables,
	message: `${baseMessage} seven syllables`
});

const HaikuValidationSchema = Yup.object().shape({
	lineOne: hasFiveSyllables,
	lineTwo: hasSevenSyllables,
	lineThree: hasFiveSyllables
});

const InputContainer = styled.div`margin-bottom: 2rem;`;
const CenteredContainer = styled.div`margin-top: 6rem;`;

interface Variables {
	lineOne: String;
	lineTwo: String;
	lineThree: String;
}

const Home: React.FunctionComponent<IHomeProps> = () => {
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
					onSubmit={() => {}}
					render={() => (
						<Form>
							<Inputs stack={true}>
								<Field
									name="lineOne"
									render={({ field }: FieldProps<Variables>) => (
										<InputContainer>
											<Input className="five-syllables" name="lineOne" {...field} />
											<ErrorMessage name="lineOne" component="div" className="field-error" />
											{/* <pre>{JSON.stringify(createSyllableTracker(field.value, 5), null, 4)}</pre> */}
										</InputContainer>
									)}
								/>
								<Field
									name="lineTwo"
									render={({ field }: FieldProps<Variables>) => (
										<InputContainer>
											<Input className="seven-syllables" {...field} />
											<ErrorMessage name="lineTwo" component="div" className="field-error" />
										</InputContainer>
									)}
								/>
								<Field
									name="lineThree"
									render={({ field }: FieldProps<Variables>) => (
										<InputContainer>
											<Input className="five-syllables" {...field} />
											<ErrorMessage name="lineThree" component="div" className="field-error" />
										</InputContainer>
									)}
								/>
							</Inputs>
						</Form>
					)}
				/>
			</CenteredContainer>
		</Container>
	);
};

export { Home };

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

const isFiveSyllables = (value: string): boolean => {
	console.log(nlp(value).syllables());
	return true;
};
const isSevenSyllables = (value: string): boolean => syllable(value) === 7;

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
const CenteredContainer = styled.div`
	padding: 3rem;
	margin-top: 6rem;
`;

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

import styled from 'styled-components';
interface IContainerProps {
	readonly max?: number;
}

export const Container = styled.div`
	max-width: ${({ max }: IContainerProps) => max || 75}%;

	@media screen and (min-width: 1800px) {
		max-width: 65%;
	}

	@media screen and (max-width: 1000px) {
		max-width: 85%;
	}

	@media screen and (max-width: 600px) {
		max-width: 90%;
	}
	overflow: hidden;

	margin: 0 auto;
`;

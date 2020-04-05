import * as React from 'react';
import styled from 'styled-components';
import FeatherIcon from 'feather-icons-react';
import Reward from 'react-rewards';
import { get } from 'lodash';
import { Mutation } from 'react-apollo';
import { withToastManager } from 'react-toast-notifications';
import { UploadAvatar } from './UploadAvatar';
import { zoomIn, fadeIn } from '../styles/Keyframes';
import { createFile } from '../../lib/formatters';
import { Button } from '../styles/Button';
import { UPDATE_INFLUENCER_MUTATION } from '../../api/mutation/updateInfluencer';
import { ME_QUERY } from '../../api/query/ME_QUERY';
import { UPLOAD_FILE_MUTATION } from '../../api/mutation/uploadFile';

interface INewAvatarProps {
	history: {
		push: (route: string) => void;
	};
	skipUpload: () => void;
}

const C: React.FunctionComponent<INewAvatarProps> = (props) => {
	const [ loading, setLoading ] = React.useState(false);
	const [ file, setFile ] = React.useState();
	const reward = React.useRef<{
		rewardMe: () => void;
		punishMe: () => void;
	}>(null);

	const handleFile = async (data: any) => {
		setFile(data);
	};

	const attemptSubmit = async (createFileMutation: any, updateInfluencer: any) => {
		setLoading(true);
		const url = `https://api.cloudinary.com/v1_1/${process.env.REACT_APP_CLOUD_NAME}/image/upload`;
		try {
			// do the upload
			const response = await fetch(url, {
				method: 'POST',
				body: file
			});
			let data = await response.json();

			const variables = createFile(data);
			const fileCreateResponse = await createFileMutation({
				variables
			});

			const setAvatarResponse = await updateInfluencer({
				variables: {
					data: {
						avatar: get(fileCreateResponse, 'data.uploadFile.url')
					}
				}
			});

			if (get(setAvatarResponse, 'data.updateInfluencer.id')) {
				if (reward && reward.current) {
					reward.current.rewardMe();
				}

				setTimeout(() => {
					props.history.push(`/profile`);
				}, 2000);
			}
		} catch (error) {
			setLoading(false);
		}
	};

	return (
		<StyledCont>
			<h1>Upload your photo</h1>
			<p>...or dont, anyway is cool</p>
			<Mutation mutation={UPDATE_INFLUENCER_MUTATION} refetchQueries={[ { query: ME_QUERY } ]}>
				{(updateInfluencer: any) => (
					<Mutation mutation={UPLOAD_FILE_MUTATION}>
						{(createFileMutation: any) => {
							return (
								<div>
									<UploadAvatar handleFile={handleFile} />
									<Reward ref={reward} type="confetti">
										<Button
											disabled={loading}
											onClick={() => attemptSubmit(createFileMutation, updateInfluencer)}
										>
											{file && <FeatherIcon icon="upload" />}
											Upload
										</Button>
									</Reward>
									<div className="skip-upload" onClick={() => props.skipUpload()}>
										Skip
									</div>
								</div>
							);
						}}
					</Mutation>
				)}
			</Mutation>
		</StyledCont>
	);
};

const NewAvatar = withToastManager(C);

export { NewAvatar };

const StyledCont = styled.div`
	max-width: 500px;
	margin: 12.5vh auto;
	text-align: center;
	animation: ${fadeIn} 0.5s ease-in-out;

	button {
		display: block;
		margin: 1rem auto;

		svg {
			animation: ${zoomIn} 0.2s ease-in-out forwards;
		}
	}

	.skip-upload {
		font-size: 0.9rem;
		color: #9e9e9e;
		display: block;
		margin-top: 2rem;
		cursor: pointer;
	}
`;

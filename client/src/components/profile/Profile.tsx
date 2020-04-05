import * as React from 'react';
import get from 'lodash/get';
import { Container } from '../styles/Container';
import { NewProfile } from './NewProfile';
import { NewAvatar } from './NewAvatar';

export interface IProfile {
	name: string;
	handle: string;
	bio: string;
	avatar: string;
	social: {
		instagram: {
			handle: string;
			link: string;
		};
	};
}
export interface IProfileProps {
	profile: IProfile;
}

export interface IProfileState {
	skip: boolean;
}

class Profile extends React.Component<IProfileProps, IProfileState> {
	constructor(props: IProfileProps) {
		super(props);

		this.state = {
			skip: false
		};
	}

	componentWillReceiveProps() {
		window.scrollTo(0, 0);
	}

	setSkip = () => this.setState((state) => ({ skip: !state.skip }));

	private renderProfile(props: any) {
		if (!get(props, 'profile.avatar', null) || this.state.skip) {
			return <NewAvatar history={props.history} skipUpload={this.setSkip} />;
		}

		if (!get(props, 'profile.name', null)) {
			return <NewProfile history={props.history} />;
		}

		return (
			<div>
				<h1>Hiii {props.profile.name}</h1>
				<pre>{JSON.stringify(props.profile, null, 3)}</pre>
			</div>
		);
	}

	public render() {
		return (
			<div>
				<Container>{this.renderProfile({ ...this.props })}</Container>
			</div>
		);
	}
}

export { Profile };

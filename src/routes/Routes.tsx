import React, { Component } from 'react';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';
import { BrowserRouter as Router } from 'react-router-dom';
import { PublicRoutes } from './PublicRoutes';
import { AuthRoutes } from './AuthRoutes';
import { Loader } from '../components/loader';

const IS_LOGGED_IN = gql`
	{
		isLoggedIn @client
	}
`;

interface IDataQuery {
	isLoggedIn: boolean;
}

class Routes extends Component {
	private routeHandler(data: IDataQuery) {
		const authenticated = data.isLoggedIn;
		if (authenticated) {
			return <AuthRoutes />;
		} else return <PublicRoutes />;
	}

	public render() {
		return (
			<Router>
				<Query query={IS_LOGGED_IN}>
					{({ data, loading, error }: { data: IDataQuery; loading: boolean; error?: any }) => {
						if (loading) {
							return <Loader />;
						}
						if (error) {
							return 'Something went wrong';
						}

						return this.routeHandler(data);
					}}
				</Query>
			</Router>
		);
	}
}

export { Routes };

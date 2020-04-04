import React, { Fragment } from 'react';
import { Route, Redirect, Switch } from 'react-router-dom';
import { TransitionGroup, CSSTransition } from 'react-transition-group';
import { NoMatch } from './NoMatch';
import { Profile, IProfile } from '../components/profile/Profile';
import { Navbar } from '../components/navbar';
import { Container } from '../components/styles/Container';
import { Query } from 'react-apollo';
import { ME_QUERY } from '../api/query/ME_QUERY';
import { Loader } from '../components/loader';
import { Promos } from '../components/promo/Promos';
import { NewPromo } from '../components/promo/new/NewPromo';

interface Data {
	me: IProfile;
}

const Workaround = ({ action, children }: { action: string; children: any }) =>
	action === 'REPLACE' ? null : children;

const AuthRoutes = () => (
	<Query query={ME_QUERY}>
		{({ data, loading, error }: { data: Data; loading: boolean; error?: any }) => {
			if (loading) {
				return <Loader />;
			}

			if (error) {
				// clear session because if we cant fetch "ME" cookie isnt present
				window.localStorage.clear();
				// @ts-ignore
				window.location = '/login';
			}

			return (
				<Fragment>
					<Route
						path="/"
						render={(route) => <Navbar avatar={data.me.avatar} handle={data.me.handle} {...route} />}
					/>
					<Route
						render={({ location, history }) => {
							return (
								<Container>
									<TransitionGroup>
										<CSSTransition key={location.key} classNames="page" timeout={500}>
											<Switch location={location}>
												<Route exact path="/" component={Promos} />
												<Route
													exact
													path="/login"
													render={() => (
														<Workaround action={history.action}>
															<Redirect to="/" />
														</Workaround>
													)}
												/>
												<Route exact path="/friends" component={() => <h1>FRIENDS</h1>} />
												<Route
													exact
													path="/profile"
													render={(route) => <Profile profile={data.me} {...route} />}
												/>
												<Route exact path="/promos/new" component={NewPromo} />
												<Route exact path="/u/:handle" component={() => <h1>Handle</h1>} />
												<Route
													exact
													path="/u/:handle/promos/:id"
													component={() => <h1>Single Promo</h1>}
												/>
												<Route component={NoMatch} />
											</Switch>
										</CSSTransition>
									</TransitionGroup>
								</Container>
							);
						}}
					/>
				</Fragment>
			);
		}}
	</Query>
);

export { AuthRoutes };

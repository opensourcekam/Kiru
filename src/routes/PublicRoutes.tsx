import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { NoMatch } from './NoMatch';
import { Home } from '../pages/Home';
import { AuthUser } from '../components/user/AuthUser';
import { Container } from '../components/styles/Container';
import { Navbar } from '../components/navbar';
import { TransitionGroup, CSSTransition } from 'react-transition-group';

const PublicRoutes = () => (
	<>
	<Route
		path="/"
		render={(route) => <Navbar {...route} />}
	/>
	<Route
		render={({ location }) => {
			return (
				<Container>
					<TransitionGroup>
						<CSSTransition key={location.key} classNames="page" timeout={300}>
							<Switch>
								<Route exact path="/" component={Home} />
								<Route exact path="/login" component={AuthUser} />
								<Route component={NoMatch} />
							</Switch>
						</CSSTransition>
					</TransitionGroup>
				</Container>
			);
		}}
	/>
	</>
);

export { PublicRoutes };

import React, { Component } from 'react';
import { ApolloProvider } from 'react-apollo';
import { ThemeProvider } from 'styled-components';
import { ToastProvider } from 'react-toast-notifications';
import { GlobalStyle } from './styles/global';
import { theme } from './styles/theme';
import { Routes } from '../routes/Routes';
import { client } from '../api/apollo';

class App extends Component {
	public render() {
		return (
			<ToastProvider placement="bottom-left">
				<ThemeProvider theme={theme}>
					<ApolloProvider client={client}>
						<Routes />
					</ApolloProvider>
				</ThemeProvider>
				<GlobalStyle theme={theme} />
			</ToastProvider>
		);
	}
}

export default App;

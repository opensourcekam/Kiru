import React, { Component } from 'react';
import { ApolloProvider } from 'react-apollo';
import { ThemeProvider } from 'styled-components';
import { ToastProvider } from 'react-toast-notifications';
import { GlobalStyle } from './styles/global';
import { theme } from './styles/theme';
import { Routes } from '../routes/Routes';
import { client } from '../api/apollo';

export const DarkMode = React.createContext({ darkMode: false, toggleDarkMode: (): void => {} });

const App = () => {
	const [ darkMode, setDarkMode ] = React.useState(false);

	return (
		<ToastProvider placement="bottom-left">
			<ThemeProvider theme={theme}>
				<ApolloProvider client={client}>
					<DarkMode.Provider value={{ darkMode, toggleDarkMode: () => setDarkMode((x) => !x) }}>
						<Routes />
					</DarkMode.Provider>
				</ApolloProvider>
			</ThemeProvider>
			<GlobalStyle theme={theme} darkMode={darkMode} />
		</ToastProvider>
	);
};

export default App;

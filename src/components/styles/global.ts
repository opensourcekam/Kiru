import { createGlobalStyle } from 'styled-components';
import { fadeIn, fadeOut, shake } from '../styles/Keyframes';

export const GlobalStyle =
	createGlobalStyle <
	{ darkMode: boolean } >
	`
    html {
        box-sizing: border-box;
        transition : -webkit-filter 200ms ease-in-out;
        filter: ${(props) => (props.darkMode ? 'invert(100%)' : 'none')};
    }

    *,
    *:before,
    *:after {
        box-sizing: inherit;
    }

    p {
        line-height: 1.8;
    }

    body {
        /* @import url('//fonts.googleapis.com/css?family=Poppins:300,400,700'); */
        /* BROKEN IN PRODUCTION FOR NOW */
        font-family: 'Poppins', -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif;
        background-color: ${(props) => (!props.darkMode ? props.theme.colors.bgColor : props.theme.colors.jetBlack)};
        overflow-x: hidden;
        margin: 0;
    }

    input::-webkit-inner-spin-button,
    input::-webkit-outer-spin-button {
        -webkit-appearance: none;
        margin: 0;
    }

    ::-webkit-scrollbar {
        width: 0.65em;
    }

    ::-webkit-scrollbar-track {
        -webkit-box-shadow: inset 0 0 3px rgba(0, 0, 0, 0.1);
        background-color: #eeeeee;
    }

    ::-webkit-scrollbar-thumb {
        background-color: #bdbdbd;
        outline: 1px solid #9e9e9e;
    }


    /* class for text not to be selected or focused */

    .no-select {
        -webkit-touch-callout: none;
        /* iOS Safari */
        -webkit-user-select: none;
        /* Safari */
        -khtml-user-select: none;
        /* Konqueror HTML */
        -moz-user-select: none;
        /* Firefox */
        -ms-user-select: none;
        /* Internet Explorer/Edge */
        user-select: none;
        /* Non-prefixed version, currently
                                        supported by Chrome and Opera */
    }

    ul li {
        list-style: none;
    }
    .page-enter {
		animation: ${fadeIn} 500ms ease-out;
	}

	.page-exit {
        display: none;
		animation: ${fadeOut} 500ms ease-out;
	}
    .field-error {
        color: ${(props) => props.theme.colors.secondaryColor};   
        animation: ${fadeIn} 750ms ease-out, ${fadeIn} 1000ms ease-in;
        font-size: 0.9rem;
        margin-left: 3.5rem;
    }
`;

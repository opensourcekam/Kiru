import {} from 'styled-components/cssprop';
import 'styled-components';

declare module 'styled-components' {
	export interface DefaultTheme {
		darkMode: boolean;
		colors: {
			primaryColor: string;
			secondaryColor: string;
			primaryText: string;
			secondaryText: string;
			fgColor: string;
			bgColor: string;
			borderColor: string;
			disabledBg: string;
			disabledColor: string;
			weakerTxt: string;
			cherry: string;
		};
	}
}

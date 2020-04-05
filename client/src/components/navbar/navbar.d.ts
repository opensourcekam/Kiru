export interface INavbarProps {
	history: {
		push: (route: string) => void;
		replace: (route: string) => void;
	};
	logoutAction?: () => void;
	handle?: string;
	source?: string;
	avatar?: string;
}

export const resetClientState = (client: any) => {
	client.writeData({ data: { isLoggedIn: false } });
	
	client.resetStore()
};

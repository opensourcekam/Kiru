export const parseGraphqlError = (error: any) => error.toString().replace('Error: GraphQL error: ', '');

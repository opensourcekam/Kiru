import { Prisma } from './generated/prisma-client';

export interface Context {
	prisma: Prisma;
	req: any;
	res: any;
	session: any;
	redis: any;
}


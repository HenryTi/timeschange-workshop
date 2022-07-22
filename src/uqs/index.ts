//=== UqApp builder created on Tue Jul 19 2022 10:42:12 GMT-0400 (北美东部夏令时间) ===//
import * as BzWorkshop from './BzWorkshop';

export interface UQs {
	BzWorkshop: BzWorkshop.UqExt;
}

export const uqsSchema = {
	"bizdev/workshop": BzWorkshop.uqSchema,
}

export * as BzWorkshop from './BzWorkshop';

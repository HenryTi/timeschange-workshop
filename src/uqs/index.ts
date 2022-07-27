//=== UqApp builder created on Sat Jul 23 2022 14:38:49 GMT-0400 (北美东部夏令时间) ===//
import * as BzWorkshop from './BzWorkshop';

export interface UQs {
	BzWorkshop: BzWorkshop.UqExt;
}

export const uqsSchema = {
	"bizdev/workshop": BzWorkshop.uqSchema,
}

export * as BzWorkshop from './BzWorkshop';

//=== UqApp builder created on Thu Aug 18 2022 00:00:26 GMT-0400 (北美东部夏令时间) ===//
import * as BzUShop from './BzUShop';

export interface UQs {
	BzUShop: BzUShop.UqExt;
}

export const uqsSchema = {
	"bizdev/ushop": BzUShop.uqSchema,
}

export * as BzUShop from './BzUShop';

//=== UqApp builder created on Sat Jul 16 2022 13:42:30 GMT-0400 (北美东部夏令时间) ===//
import * as JksWarehouse from './JksWarehouse';

export interface UQs {
	JksWarehouse: JksWarehouse.UqExt;
}

export const uqsSchema = {
	"jksoft/warehouse": JksWarehouse.uqSchema,
}

export * as JksWarehouse from './JksWarehouse';

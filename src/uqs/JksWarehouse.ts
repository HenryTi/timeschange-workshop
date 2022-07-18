//=== UqApp builder created on Sat Jul 16 2022 13:42:30 GMT-0400 (北美东部夏令时间) ===//
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { IDXValue, Uq, UqID, UqIDX, UqQuery, UqIX, UqAction } from "tonwa-uq";
// eslint-disable-next-line @typescript-eslint/no-unused-vars
// import { Render, IDXEntity } from "tonwa-react";


//===============================;
//======= UQ jksoft/warehouse ========;
//===============================';

export interface ID {
    id?: number;
}

export interface IDX {
    id: number;
}

export interface IX {
    ix: number;
    xi: number;
}

export enum WarehouseAction {
	out = 0,
	in = 1
}

export interface SpecHistory extends ID {
	Spec: number;
	Bin: number;
	action: any;
	quantity: number;
}

export interface SpecHistoryInActs extends ID {
	ID?: UqID<any>;
	Spec: number | ID;
	Bin: number | ID;
	action: any;
	quantity: number;
}

export interface BzType extends ID {
	name: string;
	type: number;
}

export interface BzTypeInActs extends ID {
	ID?: UqID<any>;
	name: string;
	type: number;
}

export interface BzOp extends ID {
	name: string;
	sign: number;
}

export interface BzOpInActs extends ID {
	ID?: UqID<any>;
	name: string;
	sign: number;
}

export interface BzValue extends IDX {
	id: number;
	value?: number;
	init?: number;
	initDate?: any;
	initCalcingDailyDate?: any;
	timeZone?: number;
	$act?: number;
}export interface ActParamBzValue {
	id: number|IDXValue;
	value?: number|IDXValue;
	init?: number|IDXValue;
	initDate?: any|IDXValue;
	initCalcingDailyDate?: any|IDXValue;
	timeZone?: number|IDXValue;
	$act?: number;
}

export interface ParamGetBzHistory {
	bz: number;
}
export interface ReturnGetBzHistory$page {
	track: number;
	value: number;
	op: number;
}
export interface ResultGetBzHistory {
	$page: ReturnGetBzHistory$page[];
}

export interface BzInventorySpec extends ID {
	bzType: number;
	spec: number;
}

export interface BzInventorySpecInActs extends ID {
	ID?: UqID<any>;
	bzType: number | BzTypeInActs;
	spec: number | ID;
}

export interface BzShipperInventorySpec extends ID {
	bzType: number;
	shipper: number;
	spec: number;
}

export interface BzShipperInventorySpecInActs extends ID {
	ID?: UqID<any>;
	bzType: number | BzTypeInActs;
	shipper: number | ShipperInActs;
	spec: number | ID;
}

export interface ParamGetBzInventorySpec {
}
export interface ReturnGetBzInventorySpec$page {
	id: number;
	value: number;
}
export interface ResultGetBzInventorySpec {
	$page: ReturnGetBzInventorySpec$page[];
}

export interface ParamGetBzShipperInventorySpec {
	shipper: number;
}
export interface ReturnGetBzShipperInventorySpec$page {
	id: number;
	value: number;
}
export interface ResultGetBzShipperInventorySpec {
	$page: ReturnGetBzShipperInventorySpec$page[];
}

export const NameBzOp = {
	InventoryIn: "inventory-in",
	InventoryOut: "inventory-out"
}

export const NameBzType = {
	Inventory: "inventory"
}

export interface Bin extends ID {
	serial: string;
}

export interface BinInActs extends ID {
	ID?: UqID<any>;
	serial: string;
}

export interface Product extends ID {
	no?: string;
	discription: string;
	industry: number;
}

export interface ProductInActs extends ID {
	ID?: UqID<any>;
	no?: string;
	discription: string;
	industry: number | IndustryInActs;
}

export interface Shipper extends ID {
	no?: string;
	discription: string;
}

export interface ShipperInActs extends ID {
	ID?: UqID<any>;
	no?: string;
	discription: string;
}

export const NameIndustry = {
	General: "general",
	Medicine: "medicine",
	Clothing: "clothing"
}

export interface Industry extends ID {
	name: string;
}

export interface IndustryInActs extends ID {
	ID?: UqID<any>;
	name: string;
}

export interface IxIndustryProduct extends IX {
}

export interface Spec extends ID {
	product: number;
	no?: string;
}

export interface SpecInActs extends ID {
	ID?: UqID<any>;
	product: number | ProductInActs;
	no?: string;
}

export interface SpecCloth extends ID {
	product: number;
	no?: string;
}

export interface SpecClothInActs extends ID {
	ID?: UqID<any>;
	product: number | ProductInActs;
	no?: string;
}

export interface SpecMedicine extends ID {
	product: number;
	no?: string;
	validTo: any;
}

export interface SpecMedicineInActs extends ID {
	ID?: UqID<any>;
	product: number | ProductInActs;
	no?: string;
	validTo: any;
}

export interface ParamGetIndustryProducts {
	industryName: string;
}
export interface ReturnGetIndustryProductsRet {
	id: number;
	no: string;
	discription: string;
	industry: number;
}
export interface ResultGetIndustryProducts {
	ret: ReturnGetIndustryProductsRet[];
}

export interface ParamGetClothingSpecs {
	product: number;
	key: string;
}
export interface ReturnGetClothingSpecsRet {
	id: number;
	product: number;
	no: string;
}
export interface ResultGetClothingSpecs {
	ret: ReturnGetClothingSpecsRet[];
}

export interface ParamGetMedicineSpecs {
	product: number;
	key: string;
}
export interface ReturnGetMedicineSpecsRet {
	id: number;
	product: number;
	no: string;
	validTo: any;
}
export interface ResultGetMedicineSpecs {
	ret: ReturnGetMedicineSpecsRet[];
}

export enum Gender {
	female = 0,
	male = 1
}

export interface Person extends ID {
	no?: string;
	name: string;
	gender: any;
}

export interface PersonInActs extends ID {
	ID?: UqID<any>;
	no?: string;
	name: string;
	gender: any;
}

export interface ParamGetPersonList {
}
export interface ReturnGetPersonListRet {
	id: number;
	no: string;
	name: string;
	gender: any;
	user: number;
}
export interface ReturnGetPersonListRoles {
	person: number;
	role: any;
}
export interface ResultGetPersonList {
	ret: ReturnGetPersonListRet[];
	roles: ReturnGetPersonListRoles[];
}

export interface ParamPersonSearch {
	role: any;
	key: string;
}
export interface ReturnPersonSearchRet {
	id: number;
	no: string;
	name: string;
	gender: any;
}
export interface ResultPersonSearch {
	ret: ReturnPersonSearchRet[];
}

export const NameSheetType = {
	BinIn: "bin-in",
	BinOut: "bin-out"
}

export const NameSheetState = {
	Draft: "draft",
	Start: "start",
	End: "end",
	Trash: "trash"
}

export const NameSheetAct = {
	ToStart: "to-start",
	ToEnd: "to-end",
	ToTrash: "to-trash"
}

export interface SheetType extends ID {
	entity: number;
	name: string;
}

export interface SheetTypeInActs extends ID {
	ID?: UqID<any>;
	entity: number | ID;
	name: string;
}

export interface SheetState extends ID {
	sheetType: number;
	name: string;
}

export interface SheetStateInActs extends ID {
	ID?: UqID<any>;
	sheetType: number | ID;
	name: string;
}

export interface Sheet extends ID {
	source: number;
}

export interface SheetInActs extends ID {
	ID?: UqID<any>;
	source: number | ID;
}

export interface BinSheet extends ID {
	no?: string;
	type: number;
	shipper: number;
}

export interface BinSheetInActs extends ID {
	ID?: UqID<any>;
	no?: string;
	type: number | SheetTypeInActs;
	shipper: number | ShipperInActs;
}

export interface BinSheetRow extends ID {
	sheet: number;
	bin: number;
	spec: number;
	quantity: number;
}

export interface BinSheetRowInActs extends ID {
	ID?: UqID<any>;
	sheet: number | ID;
	bin: number | ID;
	spec: number | ID;
	quantity: number;
}

export interface IxSheetState extends IX {
}

export interface ParamBinSheetAct {
	sheet: number;
	act: string;
}
export interface ResultBinSheetAct {
}

export interface ParamGetSheetsOfState {
	sheetEntity: string;
	sheetTypeName: string;
	stateName: string;
}
export interface ReturnGetSheetsOfState$page {
	sheet: number;
}
export interface ResultGetSheetsOfState {
	$page: ReturnGetSheetsOfState$page[];
}

export interface ParamGetSheet {
	sheet: number;
}
export interface ReturnGetSheetState {
	name: string;
}
export interface ReturnGetSheetMain {
	id: number;
	no: string;
	type: number;
	shipper: number;
}
export interface ReturnGetSheetDetails {
	id: number;
	sheet: number;
	bin: number;
	spec: number;
	quantity: number;
}
export interface ResultGetSheet {
	state: ReturnGetSheetState[];
	main: ReturnGetSheetMain[];
	details: ReturnGetSheetDetails[];
}

export const $Role = [
	'staff',
	'shipper.receiver',
	'shipper.delivery',
	'shipper.accountant'
];

export enum Role {
	staff = 10
}

export interface IxUserPerson extends IX {
}

export interface IxPersonRole extends IX {
}

export interface ParamActs {
	specHistory?: SpecHistoryInActs[];
	bzType?: BzTypeInActs[];
	bzOp?: BzOpInActs[];
	bzValue?: ActParamBzValue[];
	bzInventorySpec?: BzInventorySpecInActs[];
	bzShipperInventorySpec?: BzShipperInventorySpecInActs[];
	bin?: BinInActs[];
	product?: ProductInActs[];
	shipper?: ShipperInActs[];
	industry?: IndustryInActs[];
	ixIndustryProduct?: IxIndustryProduct[];
	spec?: SpecInActs[];
	specCloth?: SpecClothInActs[];
	specMedicine?: SpecMedicineInActs[];
	person?: PersonInActs[];
	sheetType?: SheetTypeInActs[];
	sheetState?: SheetStateInActs[];
	sheet?: SheetInActs[];
	binSheet?: BinSheetInActs[];
	binSheetRow?: BinSheetRowInActs[];
	ixSheetState?: IxSheetState[];
	ixUserPerson?: IxUserPerson[];
	ixPersonRole?: IxPersonRole[];
}


export interface UqExt extends Uq {
	Acts(param:ParamActs): Promise<any>;
	SQL: Uq;
	IDRender(id:number):JSX.Element;
	IDLocalRender(id:number):JSX.Element;

	SpecHistory: UqID<any>;
	BzType: UqID<any>;
	BzOp: UqID<any>;
	BzValue: UqIDX<any>;
	GetBzHistory: UqQuery<ParamGetBzHistory, ResultGetBzHistory>;
	BzInventorySpec: UqID<any>;
	BzShipperInventorySpec: UqID<any>;
	GetBzInventorySpec: UqQuery<ParamGetBzInventorySpec, ResultGetBzInventorySpec>;
	GetBzShipperInventorySpec: UqQuery<ParamGetBzShipperInventorySpec, ResultGetBzShipperInventorySpec>;
	Bin: UqID<any>;
	Product: UqID<any>;
	Shipper: UqID<any>;
	Industry: UqID<any>;
	IxIndustryProduct: UqIX<any>;
	Spec: UqID<any>;
	SpecCloth: UqID<any>;
	SpecMedicine: UqID<any>;
	GetIndustryProducts: UqQuery<ParamGetIndustryProducts, ResultGetIndustryProducts>;
	GetClothingSpecs: UqQuery<ParamGetClothingSpecs, ResultGetClothingSpecs>;
	GetMedicineSpecs: UqQuery<ParamGetMedicineSpecs, ResultGetMedicineSpecs>;
	Person: UqID<any>;
	GetPersonList: UqQuery<ParamGetPersonList, ResultGetPersonList>;
	PersonSearch: UqQuery<ParamPersonSearch, ResultPersonSearch>;
	SheetType: UqID<any>;
	SheetState: UqID<any>;
	Sheet: UqID<any>;
	BinSheet: UqID<any>;
	BinSheetRow: UqID<any>;
	IxSheetState: UqIX<any>;
	BinSheetAct: UqAction<ParamBinSheetAct, ResultBinSheetAct>;
	GetSheetsOfState: UqQuery<ParamGetSheetsOfState, ResultGetSheetsOfState>;
	GetSheet: UqQuery<ParamGetSheet, ResultGetSheet>;
	IxUserPerson: UqIX<any>;
	IxPersonRole: UqIX<any>;
}


export const uqSchema={
    "warehouseaction": {
        "name": "WarehouseAction",
        "type": "enum",
        "private": false,
        "sys": true,
        "values": {
            "out": 0,
            "in": 1
        }
    },
    "spechistory": {
        "name": "SpecHistory",
        "type": "id",
        "private": false,
        "sys": true,
        "fields": [
            {
                "name": "id",
                "type": "id",
                "null": false
            },
            {
                "name": "Spec",
                "type": "id"
            },
            {
                "name": "Bin",
                "type": "id"
            },
            {
                "name": "action",
                "type": "enum"
            },
            {
                "name": "quantity",
                "type": "dec",
                "scale": 4,
                "precision": 18
            }
        ],
        "keys": [] as any,
        "global": false,
        "idType": 4
    },
    "bztype": {
        "name": "BzType",
        "type": "id",
        "private": false,
        "sys": true,
        "fields": [
            {
                "name": "id",
                "type": "id",
                "null": false
            },
            {
                "name": "name",
                "type": "char",
                "size": 50
            },
            {
                "name": "type",
                "type": "tinyint"
            }
        ],
        "keys": [
            {
                "name": "name",
                "type": "char",
                "size": 50
            }
        ],
        "nameNoVice": [
            "name"
        ],
        "global": false,
        "idType": 3
    },
    "bzop": {
        "name": "BzOp",
        "type": "id",
        "private": false,
        "sys": true,
        "fields": [
            {
                "name": "id",
                "type": "id",
                "null": false
            },
            {
                "name": "name",
                "type": "char",
                "size": 50
            },
            {
                "name": "sign",
                "type": "tinyint"
            }
        ],
        "keys": [
            {
                "name": "name",
                "type": "char",
                "size": 50
            }
        ],
        "nameNoVice": [
            "name"
        ],
        "global": false,
        "idType": 3
    },
    "bzvalue": {
        "name": "BzValue",
        "type": "idx",
        "private": false,
        "sys": true,
        "fields": [
            {
                "name": "id",
                "type": "id"
            },
            {
                "name": "value",
                "type": "dec",
                "scale": 4,
                "precision": 18
            },
            {
                "name": "init",
                "type": "dec",
                "scale": 4,
                "precision": 18
            },
            {
                "name": "initDate",
                "type": "date"
            },
            {
                "name": "initCalcingDailyDate",
                "type": "date"
            },
            {
                "name": "timeZone",
                "type": "tinyint"
            }
        ],
        "update": true
    },
    "bzwrite": {
        "name": "BzWrite",
        "type": "proc",
        "private": false,
        "sys": true,
        "fields": [
            {
                "name": "bz",
                "type": "id"
            },
            {
                "name": "sheet",
                "type": "id"
            },
            {
                "name": "value",
                "type": "dec",
                "scale": 4,
                "precision": 18
            },
            {
                "name": "op",
                "type": "id"
            },
            {
                "name": "opSign",
                "type": "tinyint"
            }
        ],
        "returns": [] as any
    },
    "getbzhistory": {
        "name": "GetBzHistory",
        "type": "query",
        "private": false,
        "sys": true,
        "fields": [
            {
                "name": "bz",
                "type": "id"
            }
        ],
        "returns": [
            {
                "name": "$page",
                "fields": [
                    {
                        "name": "track",
                        "type": "id"
                    },
                    {
                        "name": "value",
                        "type": "dec",
                        "scale": 4,
                        "precision": 18
                    },
                    {
                        "name": "op",
                        "type": "id",
                        "ID": "bzop",
                        "tuid": "bzop"
                    }
                ],
                "order": "desc"
            }
        ]
    },
    "bzinventoryspec": {
        "name": "BzInventorySpec",
        "type": "id",
        "private": false,
        "sys": true,
        "fields": [
            {
                "name": "id",
                "type": "id",
                "null": false
            },
            {
                "name": "bzType",
                "type": "id",
                "ID": "bztype",
                "tuid": "bztype"
            },
            {
                "name": "spec",
                "type": "id"
            }
        ],
        "keys": [
            {
                "name": "bzType",
                "type": "id",
                "ID": "bztype",
                "tuid": "bztype"
            },
            {
                "name": "spec",
                "type": "id"
            }
        ],
        "global": false,
        "idType": 3
    },
    "bzshipperinventoryspec": {
        "name": "BzShipperInventorySpec",
        "type": "id",
        "private": false,
        "sys": true,
        "fields": [
            {
                "name": "id",
                "type": "id",
                "null": false
            },
            {
                "name": "bzType",
                "type": "id",
                "ID": "bztype",
                "tuid": "bztype"
            },
            {
                "name": "shipper",
                "type": "id",
                "ID": "shipper",
                "tuid": "shipper"
            },
            {
                "name": "spec",
                "type": "id"
            }
        ],
        "keys": [
            {
                "name": "bzType",
                "type": "id",
                "ID": "bztype",
                "tuid": "bztype"
            },
            {
                "name": "shipper",
                "type": "id",
                "ID": "shipper",
                "tuid": "shipper"
            },
            {
                "name": "spec",
                "type": "id"
            }
        ],
        "global": false,
        "idType": 3
    },
    "getbzinventoryspec": {
        "name": "GetBzInventorySpec",
        "type": "query",
        "private": false,
        "sys": true,
        "fields": [] as any,
        "returns": [
            {
                "name": "$page",
                "fields": [
                    {
                        "name": "id",
                        "type": "id"
                    },
                    {
                        "name": "value",
                        "type": "dec",
                        "scale": 4,
                        "precision": 18
                    }
                ],
                "order": "asc"
            }
        ]
    },
    "getbzshipperinventoryspec": {
        "name": "GetBzShipperInventorySpec",
        "type": "query",
        "private": false,
        "sys": true,
        "fields": [
            {
                "name": "shipper",
                "type": "id"
            }
        ],
        "returns": [
            {
                "name": "$page",
                "fields": [
                    {
                        "name": "id",
                        "type": "id"
                    },
                    {
                        "name": "value",
                        "type": "dec",
                        "scale": 4,
                        "precision": 18
                    }
                ],
                "order": "asc"
            }
        ]
    },
    "namebzop": {
        "name": "NameBzOp",
        "type": "const",
        "private": false,
        "sys": true,
        "fields": [] as any,
        "values": {
            "InventoryIn": "inventory-in",
            "InventoryOut": "inventory-out"
        }
    },
    "namebztype": {
        "name": "NameBzType",
        "type": "const",
        "private": false,
        "sys": true,
        "fields": [] as any,
        "values": {
            "Inventory": "inventory"
        }
    },
    "bin": {
        "name": "Bin",
        "type": "id",
        "private": false,
        "sys": true,
        "fields": [
            {
                "name": "id",
                "type": "id",
                "null": false
            },
            {
                "name": "serial",
                "type": "char",
                "size": 16
            }
        ],
        "keys": [
            {
                "name": "serial",
                "type": "char",
                "size": 16
            }
        ],
        "global": false,
        "idType": 3
    },
    "product": {
        "name": "Product",
        "type": "id",
        "private": false,
        "sys": true,
        "fields": [
            {
                "name": "id",
                "type": "id",
                "null": false
            },
            {
                "name": "no",
                "type": "char",
                "size": 20
            },
            {
                "name": "discription",
                "type": "char",
                "size": 200
            },
            {
                "name": "industry",
                "type": "id",
                "ID": "industry",
                "tuid": "industry"
            }
        ],
        "keys": [
            {
                "name": "no",
                "type": "char",
                "size": 20
            }
        ],
        "nameNoVice": [
            "no"
        ],
        "global": false,
        "idType": 2
    },
    "shipper": {
        "name": "Shipper",
        "type": "id",
        "private": false,
        "sys": true,
        "fields": [
            {
                "name": "id",
                "type": "id",
                "null": false
            },
            {
                "name": "no",
                "type": "char",
                "size": 20
            },
            {
                "name": "discription",
                "type": "char",
                "size": 200
            }
        ],
        "keys": [
            {
                "name": "no",
                "type": "char",
                "size": 20
            }
        ],
        "nameNoVice": [
            "no"
        ],
        "global": false,
        "idType": 2
    },
    "nameindustry": {
        "name": "NameIndustry",
        "type": "const",
        "private": false,
        "sys": true,
        "fields": [] as any,
        "values": {
            "General": "general",
            "Medicine": "medicine",
            "Clothing": "clothing"
        }
    },
    "industry": {
        "name": "Industry",
        "type": "id",
        "private": false,
        "sys": true,
        "fields": [
            {
                "name": "id",
                "type": "id",
                "null": false
            },
            {
                "name": "name",
                "type": "char",
                "size": 100
            }
        ],
        "keys": [
            {
                "name": "name",
                "type": "char",
                "size": 100
            }
        ],
        "nameNoVice": [
            "name"
        ],
        "global": false,
        "idType": 3
    },
    "ixindustryproduct": {
        "name": "IxIndustryProduct",
        "type": "ix",
        "private": false,
        "sys": true,
        "fields": [
            {
                "name": "ix",
                "type": "id"
            },
            {
                "name": "xi",
                "type": "id"
            }
        ],
        "ixxx": false,
        "ixx": false,
        "xiType": 0
    },
    "spec": {
        "name": "Spec",
        "type": "id",
        "private": false,
        "sys": true,
        "fields": [
            {
                "name": "id",
                "type": "id",
                "null": false
            },
            {
                "name": "product",
                "type": "id",
                "ID": "product",
                "tuid": "product"
            },
            {
                "name": "no",
                "type": "char",
                "size": 20
            }
        ],
        "keys": [
            {
                "name": "product",
                "type": "id",
                "ID": "product",
                "tuid": "product"
            },
            {
                "name": "no",
                "type": "char",
                "size": 20
            }
        ],
        "nameNoVice": [
            "no"
        ],
        "global": false,
        "idType": 2
    },
    "speccloth": {
        "name": "SpecCloth",
        "type": "id",
        "private": false,
        "sys": true,
        "fields": [
            {
                "name": "id",
                "type": "id",
                "null": false
            },
            {
                "name": "product",
                "type": "id",
                "ID": "product",
                "tuid": "product"
            },
            {
                "name": "no",
                "type": "char",
                "size": 20
            }
        ],
        "keys": [
            {
                "name": "product",
                "type": "id",
                "ID": "product",
                "tuid": "product"
            },
            {
                "name": "no",
                "type": "char",
                "size": 20
            }
        ],
        "nameNoVice": [
            "no"
        ],
        "global": false,
        "idType": 2
    },
    "specmedicine": {
        "name": "SpecMedicine",
        "type": "id",
        "private": false,
        "sys": true,
        "fields": [
            {
                "name": "id",
                "type": "id",
                "null": false
            },
            {
                "name": "product",
                "type": "id",
                "ID": "product",
                "tuid": "product"
            },
            {
                "name": "no",
                "type": "char",
                "size": 20
            },
            {
                "name": "validTo",
                "type": "date"
            }
        ],
        "keys": [
            {
                "name": "product",
                "type": "id",
                "ID": "product",
                "tuid": "product"
            },
            {
                "name": "no",
                "type": "char",
                "size": 20
            }
        ],
        "nameNoVice": [
            "no"
        ],
        "global": false,
        "idType": 2
    },
    "getindustryproducts": {
        "name": "GetIndustryProducts",
        "type": "query",
        "private": false,
        "sys": true,
        "fields": [
            {
                "name": "industryName",
                "type": "char",
                "size": 100
            }
        ],
        "returns": [
            {
                "name": "ret",
                "fields": [
                    {
                        "name": "id",
                        "type": "id",
                        "null": false
                    },
                    {
                        "name": "no",
                        "type": "char",
                        "size": 20
                    },
                    {
                        "name": "discription",
                        "type": "char",
                        "size": 200
                    },
                    {
                        "name": "industry",
                        "type": "id",
                        "ID": "industry",
                        "tuid": "industry"
                    }
                ]
            }
        ]
    },
    "getclothingspecs": {
        "name": "GetClothingSpecs",
        "type": "query",
        "private": false,
        "sys": true,
        "fields": [
            {
                "name": "product",
                "type": "id"
            },
            {
                "name": "key",
                "type": "char",
                "size": 100
            }
        ],
        "returns": [
            {
                "name": "ret",
                "fields": [
                    {
                        "name": "id",
                        "type": "id",
                        "null": false
                    },
                    {
                        "name": "product",
                        "type": "id",
                        "ID": "product",
                        "tuid": "product"
                    },
                    {
                        "name": "no",
                        "type": "char",
                        "size": 20
                    }
                ]
            }
        ]
    },
    "getmedicinespecs": {
        "name": "GetMedicineSpecs",
        "type": "query",
        "private": false,
        "sys": true,
        "fields": [
            {
                "name": "product",
                "type": "id"
            },
            {
                "name": "key",
                "type": "char",
                "size": 100
            }
        ],
        "returns": [
            {
                "name": "ret",
                "fields": [
                    {
                        "name": "id",
                        "type": "id",
                        "null": false
                    },
                    {
                        "name": "product",
                        "type": "id",
                        "ID": "product",
                        "tuid": "product"
                    },
                    {
                        "name": "no",
                        "type": "char",
                        "size": 20
                    },
                    {
                        "name": "validTo",
                        "type": "date"
                    }
                ]
            }
        ]
    },
    "gender": {
        "name": "Gender",
        "type": "enum",
        "private": false,
        "sys": true,
        "values": {
            "female": 0,
            "male": 1
        }
    },
    "person": {
        "name": "Person",
        "type": "id",
        "private": false,
        "sys": true,
        "fields": [
            {
                "name": "id",
                "type": "id",
                "null": false
            },
            {
                "name": "no",
                "type": "char",
                "size": 20
            },
            {
                "name": "name",
                "type": "char",
                "size": 30
            },
            {
                "name": "gender",
                "type": "enum"
            }
        ],
        "keys": [
            {
                "name": "no",
                "type": "char",
                "size": 20
            }
        ],
        "nameNoVice": [
            "name",
            "no"
        ],
        "global": false,
        "idType": 2
    },
    "getpersonlist": {
        "name": "GetPersonList",
        "type": "query",
        "private": false,
        "sys": true,
        "fields": [] as any,
        "returns": [
            {
                "name": "ret",
                "fields": [
                    {
                        "name": "id",
                        "type": "id",
                        "null": false
                    },
                    {
                        "name": "no",
                        "type": "char",
                        "size": 20
                    },
                    {
                        "name": "name",
                        "type": "char",
                        "size": 30
                    },
                    {
                        "name": "gender",
                        "type": "enum"
                    },
                    {
                        "name": "user",
                        "type": "id"
                    }
                ]
            },
            {
                "name": "roles",
                "fields": [
                    {
                        "name": "person",
                        "type": "id"
                    },
                    {
                        "name": "role",
                        "type": "enum"
                    }
                ]
            }
        ]
    },
    "personsearch": {
        "name": "PersonSearch",
        "type": "query",
        "private": false,
        "sys": true,
        "fields": [
            {
                "name": "role",
                "type": "enum"
            },
            {
                "name": "key",
                "type": "char",
                "size": 30
            }
        ],
        "returns": [
            {
                "name": "ret",
                "fields": [
                    {
                        "name": "id",
                        "type": "id",
                        "null": false
                    },
                    {
                        "name": "no",
                        "type": "char",
                        "size": 20
                    },
                    {
                        "name": "name",
                        "type": "char",
                        "size": 30
                    },
                    {
                        "name": "gender",
                        "type": "enum"
                    }
                ]
            }
        ]
    },
    "namesheettype": {
        "name": "NameSheetType",
        "type": "const",
        "private": false,
        "sys": true,
        "fields": [] as any,
        "values": {
            "BinIn": "bin-in",
            "BinOut": "bin-out"
        }
    },
    "namesheetstate": {
        "name": "NameSheetState",
        "type": "const",
        "private": false,
        "sys": true,
        "fields": [] as any,
        "values": {
            "Draft": "draft",
            "Start": "start",
            "End": "end",
            "Trash": "trash"
        }
    },
    "namesheetact": {
        "name": "NameSheetAct",
        "type": "const",
        "private": false,
        "sys": true,
        "fields": [] as any,
        "values": {
            "ToStart": "to-start",
            "ToEnd": "to-end",
            "ToTrash": "to-trash"
        }
    },
    "sheettype": {
        "name": "SheetType",
        "type": "id",
        "private": false,
        "sys": true,
        "fields": [
            {
                "name": "id",
                "type": "id",
                "null": false
            },
            {
                "name": "entity",
                "type": "id"
            },
            {
                "name": "name",
                "type": "char",
                "size": 50
            }
        ],
        "keys": [
            {
                "name": "entity",
                "type": "id"
            },
            {
                "name": "name",
                "type": "char",
                "size": 50
            }
        ],
        "nameNoVice": [
            "name"
        ],
        "global": false,
        "idType": 3
    },
    "sheetstate": {
        "name": "SheetState",
        "type": "id",
        "private": false,
        "sys": true,
        "fields": [
            {
                "name": "id",
                "type": "id",
                "null": false
            },
            {
                "name": "sheetType",
                "type": "id"
            },
            {
                "name": "name",
                "type": "char",
                "size": 50
            }
        ],
        "keys": [
            {
                "name": "sheetType",
                "type": "id"
            },
            {
                "name": "name",
                "type": "char",
                "size": 50
            }
        ],
        "nameNoVice": [
            "name"
        ],
        "global": false,
        "idType": 3
    },
    "sheet": {
        "name": "Sheet",
        "type": "id",
        "private": false,
        "sys": true,
        "fields": [
            {
                "name": "id",
                "type": "id",
                "null": false
            },
            {
                "name": "source",
                "type": "id"
            }
        ],
        "keys": [] as any,
        "global": false,
        "idType": 4
    },
    "binsheet": {
        "name": "BinSheet",
        "type": "id",
        "private": false,
        "sys": true,
        "fields": [
            {
                "name": "id",
                "type": "id",
                "null": false
            },
            {
                "name": "no",
                "type": "char",
                "size": 20
            },
            {
                "name": "type",
                "type": "id",
                "ID": "sheettype",
                "tuid": "sheettype"
            },
            {
                "name": "shipper",
                "type": "id",
                "ID": "shipper",
                "tuid": "shipper"
            }
        ],
        "keys": [
            {
                "name": "no",
                "type": "char",
                "size": 20
            }
        ],
        "nameNoVice": [
            "no"
        ],
        "global": false,
        "idType": 4
    },
    "binsheetrow": {
        "name": "BinSheetRow",
        "type": "id",
        "private": false,
        "sys": true,
        "fields": [
            {
                "name": "id",
                "type": "id",
                "null": false
            },
            {
                "name": "sheet",
                "type": "id"
            },
            {
                "name": "bin",
                "type": "id"
            },
            {
                "name": "spec",
                "type": "id"
            },
            {
                "name": "quantity",
                "type": "dec",
                "scale": 4,
                "precision": 18
            }
        ],
        "keys": [] as any,
        "global": false,
        "idType": 4
    },
    "ixsheetstate": {
        "name": "IxSheetState",
        "type": "ix",
        "private": false,
        "sys": true,
        "fields": [
            {
                "name": "ix",
                "type": "id"
            },
            {
                "name": "xi",
                "type": "id"
            }
        ],
        "ixxx": false,
        "ixx": false,
        "xiType": 0
    },
    "binsheetact": {
        "name": "BinSheetAct",
        "type": "action",
        "private": false,
        "sys": true,
        "fields": [
            {
                "name": "sheet",
                "type": "id"
            },
            {
                "name": "act",
                "type": "char",
                "size": 50
            }
        ],
        "returns": [] as any
    },
    "getsheetsofstate": {
        "name": "GetSheetsOfState",
        "type": "query",
        "private": false,
        "sys": true,
        "fields": [
            {
                "name": "sheetEntity",
                "type": "char",
                "size": 100
            },
            {
                "name": "sheetTypeName",
                "type": "char",
                "size": 50
            },
            {
                "name": "stateName",
                "type": "char",
                "size": 50
            }
        ],
        "returns": [
            {
                "name": "$page",
                "fields": [
                    {
                        "name": "sheet",
                        "type": "id"
                    }
                ],
                "order": "asc"
            }
        ]
    },
    "getsheet": {
        "name": "GetSheet",
        "type": "query",
        "private": false,
        "sys": true,
        "fields": [
            {
                "name": "sheet",
                "type": "id"
            }
        ],
        "returns": [
            {
                "name": "state",
                "fields": [
                    {
                        "name": "name",
                        "type": "char",
                        "size": 100
                    }
                ]
            },
            {
                "name": "main",
                "fields": [
                    {
                        "name": "id",
                        "type": "id",
                        "null": false
                    },
                    {
                        "name": "no",
                        "type": "char",
                        "size": 20
                    },
                    {
                        "name": "type",
                        "type": "id",
                        "ID": "sheettype",
                        "tuid": "sheettype"
                    },
                    {
                        "name": "shipper",
                        "type": "id",
                        "ID": "shipper",
                        "tuid": "shipper"
                    }
                ]
            },
            {
                "name": "details",
                "fields": [
                    {
                        "name": "id",
                        "type": "id",
                        "null": false
                    },
                    {
                        "name": "sheet",
                        "type": "id"
                    },
                    {
                        "name": "bin",
                        "type": "id"
                    },
                    {
                        "name": "spec",
                        "type": "id"
                    },
                    {
                        "name": "quantity",
                        "type": "dec",
                        "scale": 4,
                        "precision": 18
                    }
                ]
            }
        ]
    },
    "$role": {
        "name": "$role",
        "type": "$role",
        "private": false,
        "names": [
            "staff",
            "shipper.receiver",
            "shipper.delivery",
            "shipper.accountant"
        ]
    },
    "role": {
        "name": "Role",
        "type": "enum",
        "private": false,
        "sys": true,
        "values": {
            "staff": 10
        }
    },
    "ixuserperson": {
        "name": "IxUserPerson",
        "type": "ix",
        "private": false,
        "sys": true,
        "fields": [
            {
                "name": "ix",
                "type": "id",
                "ID": "$user",
                "tuid": "$user"
            },
            {
                "name": "xi",
                "type": "id",
                "ID": "$uu",
                "tuid": "$uu"
            }
        ],
        "ixxx": false,
        "ixx": false,
        "xiType": 2
    },
    "ixpersonrole": {
        "name": "IxPersonRole",
        "type": "ix",
        "private": false,
        "sys": true,
        "fields": [
            {
                "name": "ix",
                "type": "id",
                "ID": "$uu",
                "tuid": "$uu"
            },
            {
                "name": "xi",
                "type": "id"
            }
        ],
        "ixxx": false,
        "ixx": false,
        "xiType": 0
    }
}
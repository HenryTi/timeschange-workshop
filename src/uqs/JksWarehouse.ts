//=== UqApp builder created on Tue Jun 14 2022 08:18:44 GMT-0400 (北美东部夏令时间) ===//
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { IDXValue, Uq, UqQuery, UqAction, UqIX, UqID } from "tonwa-uq";
// eslint-disable-next-line @typescript-eslint/no-unused-vars
// import { Render, IDXEntity } from "tonwa-react";


//===============================
//======= UQ jksoft/warehouse ========
//===============================

export interface Param$poked {
}
export interface Return$pokedRet {
	poke: number;
}
export interface Result$poked {
	ret: Return$pokedRet[];
}

export interface Param$setMyTimezone {
	_timezone: number;
}
export interface Result$setMyTimezone {
}

export interface Param$getUnitTime {
}
export interface Return$getUnitTimeRet {
	timezone: number;
	unitTimeZone: number;
	unitBizMonth: number;
	unitBizDate: number;
}
export interface Result$getUnitTime {
	ret: Return$getUnitTimeRet[];
}

export enum WarehouseAction {
	out = 0,
	in = 1
}

export interface IxSpecBin {
	quantity: number;
	ix: number;
	xi: number;
}

export enum EnumSpecState {
	on = 1,
	lock = 10
}

export interface IxSpecState {
	quantity: number;
	ix: number;
	xi: number;
}

export interface SpecHistory {
	id?: number;
	Spec: number;
	Bin: number;
	action: any;
	quantity: number;
}

export interface IxProductSpec {
	ix: number;
	xi: number;
}

export interface IxOwnerSpec {
	ix: number;
	xi: number;
}

export interface Bin {
	id?: number;
	serial: string;
}

export interface Product {
	id?: number;
	no?: string;
	discription: string;
	industry: any;
}

export interface Shipper {
	id?: number;
	no?: string;
	discription: string;
}

export enum Industry {
	Medicine = 1,
	Clothing = 2
}

export interface Spec {
	id?: number;
	product: number;
	no?: string;
}

export interface SpecCloth {
	id?: number;
	product: number;
	no?: string;
}

export interface SpecMedicine {
	id?: number;
	product: number;
	no?: string;
	validTo: any;
}

export enum Gender {
	female = 0,
	male = 1
}

export interface Person {
	id?: number;
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

export enum SheetType {
	out = 0,
	in = 1
}

export interface SpecSheet {
	id?: number;
	no?: string;
	shipper: number;
	type: any;
}

export interface SpecSheetRow {
	id?: number;
	sheet: number;
	bin: number;
	spec: number;
	quantity: number;
}

export enum Role {
	staff = 10
}

export interface IxUserPerson {
	ix: number;
	xi: number;
}

export interface IxPersonRole {
	ix: number;
	xi: number;
}

export interface ParamActs {
	ixSpecBin?: IxSpecBin[];
	ixSpecState?: IxSpecState[];
	specHistory?: SpecHistory[];
	ixProductSpec?: IxProductSpec[];
	ixOwnerSpec?: IxOwnerSpec[];
	bin?: Bin[];
	product?: Product[];
	shipper?: Shipper[];
	spec?: Spec[];
	specCloth?: SpecCloth[];
	specMedicine?: SpecMedicine[];
	person?: Person[];
	specSheet?: SpecSheet[];
	specSheetRow?: SpecSheetRow[];
	ixUserPerson?: IxUserPerson[];
	ixPersonRole?: IxPersonRole[];
}


export interface UqExt extends Uq {
	Acts(param:ParamActs): Promise<any>;
	SQL: Uq;
	IDRender(id:number):JSX.Element;
	IDLocalRender(id:number):JSX.Element;

	$poked: UqQuery<Param$poked, Result$poked>;
	$setMyTimezone: UqAction<Param$setMyTimezone, Result$setMyTimezone>;
	$getUnitTime: UqQuery<Param$getUnitTime, Result$getUnitTime>;
	IxSpecBin: UqIX<any>;
	IxSpecState: UqIX<any>;
	SpecHistory: UqID<any>;
	IxProductSpec: UqIX<any>;
	IxOwnerSpec: UqIX<any>;
	Bin: UqID<any>;
	Product: UqID<any>;
	Shipper: UqID<any>;
	Spec: UqID<any>;
	SpecCloth: UqID<any>;
	SpecMedicine: UqID<any>;
	Person: UqID<any>;
	GetPersonList: UqQuery<ParamGetPersonList, ResultGetPersonList>;
	PersonSearch: UqQuery<ParamPersonSearch, ResultPersonSearch>;
	SpecSheet: UqID<any>;
	SpecSheetRow: UqID<any>;
	IxUserPerson: UqIX<any>;
	IxPersonRole: UqIX<any>;
}


export const uqSchema={
    "$poked": {
        "name": "$poked",
        "type": "query",
        "private": false,
        "sys": true,
        "fields": [] as any,
        "returns": [
            {
                "name": "ret",
                "fields": [
                    {
                        "name": "poke",
                        "type": "tinyint"
                    }
                ]
            }
        ]
    },
    "$setmytimezone": {
        "name": "$setMyTimezone",
        "type": "action",
        "private": false,
        "sys": true,
        "fields": [
            {
                "name": "_timezone",
                "type": "tinyint"
            }
        ],
        "returns": [] as any
    },
    "$getunittime": {
        "name": "$getUnitTime",
        "type": "query",
        "private": false,
        "sys": true,
        "fields": [] as any,
        "returns": [
            {
                "name": "ret",
                "fields": [
                    {
                        "name": "timezone",
                        "type": "tinyint"
                    },
                    {
                        "name": "unitTimeZone",
                        "type": "tinyint"
                    },
                    {
                        "name": "unitBizMonth",
                        "type": "tinyint"
                    },
                    {
                        "name": "unitBizDate",
                        "type": "tinyint"
                    }
                ]
            }
        ]
    },
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
    "ixspecbin": {
        "name": "IxSpecBin",
        "type": "ix",
        "private": true,
        "sys": true,
        "fields": [
            {
                "name": "quantity",
                "type": "dec",
                "scale": 4,
                "precision": 18
            },
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
    "enumspecstate": {
        "name": "EnumSpecState",
        "type": "enum",
        "private": false,
        "sys": true,
        "values": {
            "on": 1,
            "lock": 10
        }
    },
    "ixspecstate": {
        "name": "IxSpecState",
        "type": "ix",
        "private": true,
        "sys": true,
        "fields": [
            {
                "name": "quantity",
                "type": "dec",
                "scale": 4,
                "precision": 18
            },
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
    "ixproductspec": {
        "name": "IxProductSpec",
        "type": "ix",
        "private": true,
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
    "ixownerspec": {
        "name": "IxOwnerSpec",
        "type": "ix",
        "private": true,
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
    "industry": {
        "name": "Industry",
        "type": "enum",
        "private": false,
        "sys": true,
        "values": {
            "Medicine": 1,
            "Clothing": 2
        }
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
                "type": "id"
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
                "type": "id"
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
        "idType": 3
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
                "type": "id"
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
                "type": "id"
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
                "type": "id"
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
                "type": "id"
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
    "sheettype": {
        "name": "SheetType",
        "type": "enum",
        "private": false,
        "sys": true,
        "values": {
            "out": 0,
            "in": 1
        }
    },
    "specsheet": {
        "name": "SpecSheet",
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
                "name": "shipper",
                "type": "id"
            },
            {
                "name": "type",
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
            "no"
        ],
        "global": false,
        "idType": 3
    },
    "specsheetrow": {
        "name": "SpecSheetRow",
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
        "idType": 3
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
                "tuid": "$user"
            },
            {
                "name": "xi",
                "type": "id",
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
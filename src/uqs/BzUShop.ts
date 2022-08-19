//=== UqApp builder created on Thu Aug 18 2022 00:00:26 GMT-0400 (北美东部夏令时间) ===//
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { IDXValue, Uq, UqQuery, UqAction, UqID } from "tonwa-uq";
// eslint-disable-next-line @typescript-eslint/no-unused-vars
// import { Render, IDXEntity } from "tonwa-react";


//===============================;
//======= UQ bizdev/ushop ========;
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

export interface Param$role_My {
}
export interface Return$role_MyAdmins {
    id: number;
    unit: number;
    admin: number;
    entity: string;
    assigned: string;
}
export interface Return$role_MyRoles {
    unit: number;
    role: string;
}
export interface Return$role_MyUnitProps {
    unit: number;
    props: string;
}
export interface Result$role_My {
    admins: Return$role_MyAdmins[];
    roles: Return$role_MyRoles[];
    unitProps: Return$role_MyUnitProps[];
}

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

export interface ItemSale extends ID {
    no?: string;
    discription: string;
    icon: string;
}

export interface ItemSaleInActs extends ID {
    ID?: UqID<any>;
    no?: string;
    discription: string;
    icon: string;
}

export interface ItemPackSale extends ID {
    item: number;
    pack: number;
}

export interface ItemPackSaleInActs extends ID {
    ID?: UqID<any>;
    item: number | ID;
    pack: number | ID;
}

export interface ItemBatchSale extends ID {
    item: number;
    batch: number;
}

export interface ItemBatchSaleInActs extends ID {
    ID?: UqID<any>;
    item: number | ID;
    batch: number | ID;
}

export interface ItemPack extends ID {
    discription: string;
    item: number;
    pack: number;
    x: number;
    y: number;
}

export interface ItemPackInActs extends ID {
    ID?: UqID<any>;
    discription: string;
    item: number | ID;
    pack: number | ID;
    x: number;
    y: number;
}

export interface Pack extends ID {
    name: string;
}

export interface PackInActs extends ID {
    ID?: UqID<any>;
    name: string;
}

export interface Batch extends ID {
    no?: string;
    item: number;
    product: any;
    expire: any;
}

export interface BatchInActs extends ID {
    ID?: UqID<any>;
    no?: string;
    item: number | ID;
    product: any;
    expire: any;
}

export interface ItemChemical extends ID {
    no?: string;
    chemical: number;
}

export interface ItemChemicalInActs extends ID {
    ID?: UqID<any>;
    no?: string;
    chemical: number | ID;
}

export interface Reagent extends ID {
    chemical: number;
}

export interface ReagentInActs extends ID {
    ID?: UqID<any>;
    chemical: number | ID;
}

export interface Chemical extends ID {
    chinese: string;
    english: string;
    formula: string;
}

export interface ChemicalInActs extends ID {
    ID?: UqID<any>;
    chinese: string;
    english: string;
    formula: string;
}

export interface Shop extends ID {
    no?: string;
    name: string;
    discription: string;
}

export interface ShopInActs extends ID {
    ID?: UqID<any>;
    no?: string;
    name: string;
    discription: string;
}

export interface Shelf extends ID {
    no?: string;
    caption: string;
    shop: number;
}

export interface ShelfInActs extends ID {
    ID?: UqID<any>;
    no?: string;
    caption: string;
    shop: number | ID;
}

export enum EnumRole {
    shopmanager = 'shopmanager',
};

export enum Enumshop {
    product = 'shop.product',
    delivery = 'shop.delivery',
    accountant = 'shop.accountant',
};

export const Role = {
    $: [
        EnumRole.shopmanager,
    ],
    shop: [
        Enumshop.product, Enumshop.delivery, Enumshop.accountant,
    ],
};

export interface ParamA {
}
export interface ResultA {
}

export interface ParamRole_My {
}
export interface ReturnRole_MyAdmins {
    id: number;
    unit: number;
    user: number;
    admin: number;
    entity: string;
    unitProps: string;
}
export interface ReturnRole_MyRoles {
    id: number;
    unit: number;
    user: number;
    role: string;
    entity: string;
    unitProps: string;
}
export interface ReturnRole_MyUnitProps {
    unit: number;
    props: string;
}
export interface ResultRole_My {
    admins: ReturnRole_MyAdmins[];
    roles: ReturnRole_MyRoles[];
    unitProps: ReturnRole_MyUnitProps[];
}

export interface ParamActs {
    itemSale?: ItemSaleInActs[];
    itemPackSale?: ItemPackSaleInActs[];
    itemBatchSale?: ItemBatchSaleInActs[];
    itemPack?: ItemPackInActs[];
    pack?: PackInActs[];
    batch?: BatchInActs[];
    itemChemical?: ItemChemicalInActs[];
    reagent?: ReagentInActs[];
    chemical?: ChemicalInActs[];
    shop?: ShopInActs[];
    shelf?: ShelfInActs[];
}


export interface UqExt extends Uq {
    Acts(param: ParamActs): Promise<any>;
    SQL: Uq;

    $role_My: UqQuery<Param$role_My, Result$role_My>;
    $poked: UqQuery<Param$poked, Result$poked>;
    $setMyTimezone: UqAction<Param$setMyTimezone, Result$setMyTimezone>;
    $getUnitTime: UqQuery<Param$getUnitTime, Result$getUnitTime>;
    ItemSale: UqID<any>;
    ItemPackSale: UqID<any>;
    ItemBatchSale: UqID<any>;
    ItemPack: UqID<any>;
    Pack: UqID<any>;
    Batch: UqID<any>;
    ItemChemical: UqID<any>;
    Reagent: UqID<any>;
    Chemical: UqID<any>;
    Shop: UqID<any>;
    Shelf: UqID<any>;
    A: UqAction<ParamA, ResultA>;
    Role_My: UqQuery<ParamRole_My, ResultRole_My>;
}


export const uqSchema = {
    "$role_my": {
        "name": "$role_my",
        "type": "query",
        "private": false,
        "sys": true,
        "fields": [] as any,
        "returns": [
            {
                "name": "admins",
                "fields": [
                    {
                        "name": "id",
                        "type": "id"
                    },
                    {
                        "name": "unit",
                        "type": "id"
                    },
                    {
                        "name": "admin",
                        "type": "tinyint"
                    },
                    {
                        "name": "entity",
                        "type": "char",
                        "size": 100
                    },
                    {
                        "name": "assigned",
                        "type": "char",
                        "size": 100
                    }
                ]
            },
            {
                "name": "roles",
                "fields": [
                    {
                        "name": "unit",
                        "type": "id"
                    },
                    {
                        "name": "role",
                        "type": "char",
                        "size": 100
                    }
                ]
            },
            {
                "name": "unitProps",
                "fields": [
                    {
                        "name": "unit",
                        "type": "id"
                    },
                    {
                        "name": "props",
                        "type": "text"
                    }
                ]
            }
        ]
    },
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
    "itemsale": {
        "name": "ItemSale",
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
                "size": 100
            },
            {
                "name": "icon",
                "type": "char",
                "size": 100
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
        "idType": 3,
        "isMinute": true
    },
    "itempacksale": {
        "name": "ItemPackSale",
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
                "name": "item",
                "type": "id"
            },
            {
                "name": "pack",
                "type": "id"
            }
        ],
        "keys": [
            {
                "name": "item",
                "type": "id"
            },
            {
                "name": "pack",
                "type": "id"
            }
        ],
        "global": false,
        "idType": 3,
        "isMinute": true
    },
    "itembatchsale": {
        "name": "ItemBatchSale",
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
                "name": "item",
                "type": "id"
            },
            {
                "name": "batch",
                "type": "id"
            }
        ],
        "keys": [
            {
                "name": "item",
                "type": "id"
            },
            {
                "name": "batch",
                "type": "id"
            }
        ],
        "global": false,
        "idType": 3,
        "isMinute": true
    },
    "itempack": {
        "name": "ItemPack",
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
                "name": "discription",
                "type": "char",
                "size": 20
            },
            {
                "name": "item",
                "type": "id"
            },
            {
                "name": "pack",
                "type": "id"
            },
            {
                "name": "x",
                "type": "dec",
                "scale": 4,
                "precision": 8
            },
            {
                "name": "y",
                "type": "dec",
                "scale": 4,
                "precision": 8
            }
        ],
        "keys": [] as any,
        "global": false,
        "idType": 3,
        "isMinute": true
    },
    "pack": {
        "name": "Pack",
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
        "idType": 3,
        "isMinute": true
    },
    "batch": {
        "name": "Batch",
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
                "name": "item",
                "type": "id"
            },
            {
                "name": "product",
                "type": "date"
            },
            {
                "name": "expire",
                "type": "date"
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
        "idType": 3,
        "isMinute": true
    },
    "itemchemical": {
        "name": "ItemChemical",
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
                "name": "chemical",
                "type": "id"
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
        "idType": 3,
        "isMinute": true
    },
    "reagent": {
        "name": "Reagent",
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
                "name": "chemical",
                "type": "id"
            }
        ],
        "keys": [] as any,
        "global": false,
        "idType": 3,
        "isMinute": true
    },
    "chemical": {
        "name": "Chemical",
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
                "name": "chinese",
                "type": "char",
                "size": 100
            },
            {
                "name": "english",
                "type": "char",
                "size": 100
            },
            {
                "name": "formula",
                "type": "char",
                "size": 100
            }
        ],
        "keys": [] as any,
        "global": false,
        "idType": 3,
        "isMinute": true
    },
    "shop": {
        "name": "Shop",
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
                "size": 50
            },
            {
                "name": "discription",
                "type": "text"
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
        "idType": 2,
        "isMinute": true,
        "permit": "shop+"
    },
    "shelf": {
        "name": "Shelf",
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
                "name": "caption",
                "type": "char",
                "size": 100
            },
            {
                "name": "shop",
                "type": "id"
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
        "idType": 3,
        "isMinute": true
    },
    "role": {
        "name": "Role",
        "type": "$role",
        "private": false,
        "names": {
            "$": [
                "shopmanager"
            ],
            "shop": [
                "product",
                "delivery",
                "accountant"
            ]
        }
    },
    "a": {
        "name": "a",
        "type": "action",
        "private": false,
        "sys": true,
        "fields": [] as any,
        "returns": [] as any
    },
    "role_my": {
        "name": "role_my",
        "type": "query",
        "private": false,
        "sys": true,
        "fields": [] as any,
        "returns": [
            {
                "name": "admins",
                "fields": [
                    {
                        "name": "id",
                        "type": "id"
                    },
                    {
                        "name": "unit",
                        "type": "id"
                    },
                    {
                        "name": "user",
                        "type": "id"
                    },
                    {
                        "name": "admin",
                        "type": "tinyint"
                    },
                    {
                        "name": "entity",
                        "type": "char",
                        "size": 100
                    },
                    {
                        "name": "unitProps",
                        "type": "text"
                    }
                ]
            },
            {
                "name": "roles",
                "fields": [
                    {
                        "name": "id",
                        "type": "id"
                    },
                    {
                        "name": "unit",
                        "type": "id"
                    },
                    {
                        "name": "user",
                        "type": "id"
                    },
                    {
                        "name": "role",
                        "type": "char",
                        "size": 100
                    },
                    {
                        "name": "entity",
                        "type": "char",
                        "size": 100
                    },
                    {
                        "name": "unitProps",
                        "type": "text"
                    }
                ]
            },
            {
                "name": "unitProps",
                "fields": [
                    {
                        "name": "unit",
                        "type": "id"
                    },
                    {
                        "name": "props",
                        "type": "text"
                    }
                ]
            }
        ]
    }
}
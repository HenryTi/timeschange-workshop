//=== UqApp builder created on Tue Jul 19 2022 10:42:12 GMT-0400 (北美东部夏令时间) ===//
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { IDXValue, Uq, UqQuery, UqAction, UqID, UqIX } from "tonwa-uq";
// eslint-disable-next-line @typescript-eslint/no-unused-vars
// import { Render, IDXEntity } from "tonwa-react";


//===============================;
//======= UQ bizdev/workshop ========;
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

export interface Draft extends ID {
    entity: number;
    content: string;
}

export interface DraftInActs extends ID {
    ID?: UqID<any>;
    entity: number;
    content: string;
}

export interface IxDraft extends IX {
}

export enum EnumOpType {
    a = 1,
    b = 2
}

export interface Biz extends ID {
    value: number;
    stamp: any;
}

export interface BizInActs extends ID {
    ID?: UqID<any>;
    value: number;
    stamp: any;
}

export interface BizPack extends ID {
    stamp: any;
}

export interface BizPackInActs extends ID {
    ID?: UqID<any>;
    stamp: any;
}

export interface IxBizPack extends IX {
}

export interface Op extends ID {
    biz: number;
    type: any;
    value: number;
    stamp: any;
}

export interface OpInActs extends ID {
    ID?: UqID<any>;
    biz: number | ID;
    type: any;
    value: number;
    stamp: any;
}

export interface Item extends ID {
}

export interface ItemInActs extends ID {
    ID?: UqID<any>;
}

export interface OpiBooking extends ID {
    opType: any;
    post: number;
    postItem: number;
    item: number;
    ratio: number;
    start: any;
    span: number;
    ratioInit: number;
    memo: number;
}

export interface OpiBookingInActs extends ID {
    ID?: UqID<any>;
    opType: any;
    post: number | ID;
    postItem: number | ID;
    item: number | ID;
    ratio: number;
    start: any;
    span: number;
    ratioInit: number;
    memo: number;
}

export interface Opi extends ID {
    object: number;
    post: number;
    item: number;
}

export interface OpiInActs extends ID {
    ID?: UqID<any>;
    object: number | ID;
    post: number | ID;
    item: number | ID;
}

export interface ItemHistory extends ID {
    op: number;
    item: number;
    value: number;
}

export interface ItemHistoryInActs extends ID {
    ID?: UqID<any>;
    op: number | ID;
    item: number | ID;
    value: number;
}

export interface OpiHistory extends ID {
    opi: number;
    itemHistory: number;
    value: number;
    booking: number;
}

export interface OpiHistoryInActs extends ID {
    ID?: UqID<any>;
    opi: number | ID;
    itemHistory: number | ID;
    value: number;
    booking: number | ID;
}

export interface IxOpiDate extends IX {
    value: number;
    rows: number;
    p0: number;
    p1: number;
}

export interface Note extends ID {
    staff: number;
    client: number;
    note: string;
    sensitive: number;
}

export interface NoteInActs extends ID {
    ID?: UqID<any>;
    staff: number | ID;
    client: number | ID;
    note: string;
    sensitive: number;
}

export interface IxStaffClient extends IX {
    tick: number;
}

export interface ParamSaveNote {
    id: number;
    staff: number;
    client: number;
    note: string;
    sensitive: number;
}
export interface ReturnSaveNoteRet {
    id: number;
}
export interface ResultSaveNote {
    ret: ReturnSaveNoteRet[];
}

export interface ParamMyClients {
}
export interface ReturnMyClientsRet {
    id: number;
    no: string;
    name: string;
    vice: string;
    firstName: string;
    lastName: string;
    middleName: string;
    gender: any;
    year: number;
    month: number;
    day: number;
    email: string;
    mobile: string;
    mobileCountry: string;
}
export interface ResultMyClients {
    ret: ReturnMyClientsRet[];
}

export enum Gender {
    female = 0,
    male = 1
}

export interface Person extends ID {
    no?: string;
    name: string;
    vice: string;
    firstName: string;
    lastName: string;
    middleName: string;
    gender: any;
    year: number;
    month: number;
    day: number;
    email: string;
    mobile: string;
    mobileCountry: string;
}

export interface PersonInActs extends ID {
    ID?: UqID<any>;
    no?: string;
    name: string;
    vice: string;
    firstName: string;
    lastName: string;
    middleName: string;
    gender: any;
    year: number;
    month: number;
    day: number;
    email: string;
    mobile: string;
    mobileCountry: string;
}

export interface IxPersonLog extends IX {
}

export interface ClientSurvey extends ID {
    client: number;
}

export interface ClientSurveyInActs extends ID {
    ID?: UqID<any>;
    client: number | ID;
}

export interface ParamGetPersonList {
    role: any;
}
export interface ReturnGetPersonListRet {
    id: number;
    no: string;
    name: string;
    vice: string;
    firstName: string;
    lastName: string;
    middleName: string;
    gender: any;
    year: number;
    month: number;
    day: number;
    email: string;
    mobile: string;
    mobileCountry: string;
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
    vice: string;
    firstName: string;
    lastName: string;
    middleName: string;
    gender: any;
    year: number;
    month: number;
    day: number;
    email: string;
    mobile: string;
    mobileCountry: string;
}
export interface ResultPersonSearch {
    ret: ReturnPersonSearchRet[];
}

export interface ParamGetPersonLog {
    person: number;
}
export interface ReturnGetPersonLogRet {
    log: number;
    type: string;
    value: string;
}
export interface ResultGetPersonLog {
    ret: ReturnGetPersonLogRet[];
}

export interface TagGroup extends ID {
    name: string;
}

export interface TagGroupInActs extends ID {
    ID?: UqID<any>;
    name: string;
}

export interface Tag extends ID {
    name: string;
    vice: string;
    single: number;
}

export interface TagInActs extends ID {
    ID?: UqID<any>;
    name: string;
    vice: string;
    single: number;
}

export interface TagItem extends ID {
    name: string;
}

export interface TagItemInActs extends ID {
    ID?: UqID<any>;
    name: string;
}

export interface IxTag extends IX {
}

export interface IxLocalIdTag extends IX {
}

export interface IxGlobalIdTag extends IX {
}

export enum Role {
    staff = 10,
    counselor = 11,
    volunteer = 12,
    board = 13,
    support = 14,
    client = 20,
    donator = 30
}

export interface IxUserPerson extends IX {
}

export interface IxPersonRole extends IX {
}

export interface Workshop extends ID {
    no?: string;
    name: string;
    vice: string;
    staff: number;
}

export interface WorkshopInActs extends ID {
    ID?: UqID<any>;
    no?: string;
    name: string;
    vice: string;
    staff: number | ID;
}

export interface Session extends ID {
    workshop: number;
    date: any;
    vice: string;
    time: any;
    span: number;
}

export interface SessionInActs extends ID {
    ID?: UqID<any>;
    workshop: number | ID;
    date: any;
    vice: string;
    time: any;
    span: number;
}

export interface SessionPerson extends ID {
    session: number;
    person: number;
    workshop: number;
    deleted: number;
}

export interface SessionPersonInActs extends ID {
    ID?: UqID<any>;
    session: number | ID;
    person: number | ID;
    workshop: number | ID;
    deleted: number;
}

export interface IxWorkshopSession extends IX {
}

export interface IxSessionStaff extends IX {
    own: number;
    substitue: number;
    done: number;
}

export interface IxSessionClient extends IX {
    deleted: number;
}

export interface ParamSetSessionStaff {
    session: number;
    staff: number;
    own: number;
    substitue: number;
    done: number;
}
export interface ResultSetSessionStaff {
}

export interface ParamSaveWorkshopStaff {
    id: number;
    staff: number;
}
export interface ResultSaveWorkshopStaff {
}

export interface ParamSaveSessionAttendee {
    session: number;
    client: number;
    deleted: number;
}
export interface ResultSaveSessionAttendee {
}

export interface ParamMySessions {
}
export interface ReturnMySessionsRet {
    id: number;
    workshop: number;
    date: any;
    vice: string;
    time: any;
    span: number;
    own: number;
    substitue: number;
    done: number;
}
export interface ResultMySessions {
    ret: ReturnMySessionsRet[];
}

export interface ParamActs {
    draft?: DraftInActs[];
    ixDraft?: IxDraft[];
    biz?: BizInActs[];
    bizPack?: BizPackInActs[];
    ixBizPack?: IxBizPack[];
    op?: OpInActs[];
    item?: ItemInActs[];
    opiBooking?: OpiBookingInActs[];
    opi?: OpiInActs[];
    itemHistory?: ItemHistoryInActs[];
    opiHistory?: OpiHistoryInActs[];
    ixOpiDate?: IxOpiDate[];
    note?: NoteInActs[];
    ixStaffClient?: IxStaffClient[];
    person?: PersonInActs[];
    ixPersonLog?: IxPersonLog[];
    clientSurvey?: ClientSurveyInActs[];
    tagGroup?: TagGroupInActs[];
    tag?: TagInActs[];
    tagItem?: TagItemInActs[];
    ixTag?: IxTag[];
    ixLocalIdTag?: IxLocalIdTag[];
    ixGlobalIdTag?: IxGlobalIdTag[];
    ixUserPerson?: IxUserPerson[];
    ixPersonRole?: IxPersonRole[];
    workshop?: WorkshopInActs[];
    session?: SessionInActs[];
    sessionPerson?: SessionPersonInActs[];
    ixWorkshopSession?: IxWorkshopSession[];
    ixSessionStaff?: IxSessionStaff[];
    ixSessionClient?: IxSessionClient[];
}


export interface UqExt extends Uq {
    Acts(param: ParamActs): Promise<any>;
    SQL: Uq;
    IDRender(id: number): JSX.Element;
    IDLocalRender(id: number): JSX.Element;

    $poked: UqQuery<Param$poked, Result$poked>;
    $setMyTimezone: UqAction<Param$setMyTimezone, Result$setMyTimezone>;
    $getUnitTime: UqQuery<Param$getUnitTime, Result$getUnitTime>;
    Draft: UqID<any>;
    IxDraft: UqIX<any>;
    Biz: UqID<any>;
    BizPack: UqID<any>;
    IxBizPack: UqIX<any>;
    Op: UqID<any>;
    Item: UqID<any>;
    OpiBooking: UqID<any>;
    Opi: UqID<any>;
    ItemHistory: UqID<any>;
    OpiHistory: UqID<any>;
    IxOpiDate: UqIX<any>;
    Note: UqID<any>;
    IxStaffClient: UqIX<any>;
    SaveNote: UqAction<ParamSaveNote, ResultSaveNote>;
    MyClients: UqQuery<ParamMyClients, ResultMyClients>;
    Person: UqID<any>;
    IxPersonLog: UqIX<any>;
    ClientSurvey: UqID<any>;
    GetPersonList: UqQuery<ParamGetPersonList, ResultGetPersonList>;
    PersonSearch: UqQuery<ParamPersonSearch, ResultPersonSearch>;
    GetPersonLog: UqQuery<ParamGetPersonLog, ResultGetPersonLog>;
    TagGroup: UqID<any>;
    Tag: UqID<any>;
    TagItem: UqID<any>;
    IxTag: UqIX<any>;
    IxLocalIdTag: UqIX<any>;
    IxGlobalIdTag: UqIX<any>;
    IxUserPerson: UqIX<any>;
    IxPersonRole: UqIX<any>;
    Workshop: UqID<any>;
    Session: UqID<any>;
    SessionPerson: UqID<any>;
    IxWorkshopSession: UqIX<any>;
    IxSessionStaff: UqIX<any>;
    IxSessionClient: UqIX<any>;
    SetSessionStaff: UqAction<ParamSetSessionStaff, ResultSetSessionStaff>;
    SaveWorkshopStaff: UqAction<ParamSaveWorkshopStaff, ResultSaveWorkshopStaff>;
    SaveSessionAttendee: UqAction<ParamSaveSessionAttendee, ResultSaveSessionAttendee>;
    MySessions: UqQuery<ParamMySessions, ResultMySessions>;
}


export const uqSchema = {
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
    "draft": {
        "name": "Draft",
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
                "type": "smallint"
            },
            {
                "name": "content",
                "type": "text"
            }
        ],
        "keys": [] as any,
        "global": false,
        "idType": 4
    },
    "ixdraft": {
        "name": "IxDraft",
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
    "enumoptype": {
        "name": "EnumOpType",
        "type": "enum",
        "private": true,
        "sys": true,
        "values": {
            "a": 1,
            "b": 2
        }
    },
    "biz": {
        "name": "Biz",
        "type": "id",
        "private": true,
        "sys": true,
        "fields": [
            {
                "name": "id",
                "type": "id",
                "null": false
            },
            {
                "name": "value",
                "type": "dec",
                "scale": 4,
                "precision": 18
            },
            {
                "name": "stamp",
                "type": "timestamp"
            }
        ],
        "keys": [] as any,
        "create": true,
        "global": false,
        "idType": 3
    },
    "bizpack": {
        "name": "BizPack",
        "type": "id",
        "private": true,
        "sys": true,
        "fields": [
            {
                "name": "id",
                "type": "id",
                "null": false
            },
            {
                "name": "stamp",
                "type": "timestamp"
            }
        ],
        "keys": [] as any,
        "create": true,
        "global": false,
        "idType": 3
    },
    "ixbizpack": {
        "name": "IxBizPack",
        "type": "ix",
        "private": true,
        "sys": true,
        "fields": [
            {
                "name": "ix",
                "type": "id",
                "tuid": "$nu"
            },
            {
                "name": "xi",
                "type": "id",
                "tuid": "$nu"
            }
        ],
        "ixxx": false,
        "ixx": false,
        "xiType": 0
    },
    "op": {
        "name": "Op",
        "type": "id",
        "private": true,
        "sys": true,
        "fields": [
            {
                "name": "id",
                "type": "id",
                "null": false
            },
            {
                "name": "biz",
                "type": "id"
            },
            {
                "name": "type",
                "type": "enum"
            },
            {
                "name": "value",
                "type": "dec",
                "scale": 4,
                "precision": 18
            },
            {
                "name": "stamp",
                "type": "timestamp"
            }
        ],
        "keys": [] as any,
        "create": true,
        "global": false,
        "idType": 3
    },
    "item": {
        "name": "Item",
        "type": "id",
        "private": true,
        "sys": true,
        "fields": [
            {
                "name": "id",
                "type": "id",
                "null": false
            }
        ],
        "keys": [] as any,
        "global": false,
        "idType": 3
    },
    "opibooking": {
        "name": "OpiBooking",
        "type": "id",
        "private": true,
        "sys": true,
        "fields": [
            {
                "name": "id",
                "type": "id",
                "null": false
            },
            {
                "name": "opType",
                "type": "enum"
            },
            {
                "name": "post",
                "type": "id"
            },
            {
                "name": "postItem",
                "type": "id"
            },
            {
                "name": "item",
                "type": "id"
            },
            {
                "name": "ratio",
                "type": "dec",
                "scale": 2,
                "precision": 6
            },
            {
                "name": "start",
                "type": "date"
            },
            {
                "name": "span",
                "type": "smallint"
            },
            {
                "name": "ratioInit",
                "type": "dec",
                "scale": 2,
                "precision": 6
            },
            {
                "name": "memo",
                "type": "int"
            }
        ],
        "keys": [
            {
                "name": "opType",
                "type": "enum"
            },
            {
                "name": "post",
                "type": "id"
            },
            {
                "name": "postItem",
                "type": "id"
            },
            {
                "name": "item",
                "type": "id"
            }
        ],
        "global": false,
        "idType": 3
    },
    "opi": {
        "name": "Opi",
        "type": "id",
        "private": true,
        "sys": true,
        "fields": [
            {
                "name": "id",
                "type": "id",
                "null": false
            },
            {
                "name": "object",
                "type": "id"
            },
            {
                "name": "post",
                "type": "id"
            },
            {
                "name": "item",
                "type": "id"
            }
        ],
        "keys": [
            {
                "name": "object",
                "type": "id"
            },
            {
                "name": "post",
                "type": "id"
            },
            {
                "name": "item",
                "type": "id"
            }
        ],
        "global": false,
        "idType": 3
    },
    "itemhistory": {
        "name": "ItemHistory",
        "type": "id",
        "private": true,
        "sys": true,
        "fields": [
            {
                "name": "id",
                "type": "id",
                "null": false
            },
            {
                "name": "op",
                "type": "id"
            },
            {
                "name": "item",
                "type": "id"
            },
            {
                "name": "value",
                "type": "dec",
                "scale": 4,
                "precision": 18
            }
        ],
        "keys": [
            {
                "name": "op",
                "type": "id"
            },
            {
                "name": "item",
                "type": "id"
            }
        ],
        "global": false,
        "idType": 4
    },
    "opihistory": {
        "name": "OpiHistory",
        "type": "id",
        "private": true,
        "sys": true,
        "fields": [
            {
                "name": "id",
                "type": "id",
                "null": false
            },
            {
                "name": "opi",
                "type": "id"
            },
            {
                "name": "itemHistory",
                "type": "id"
            },
            {
                "name": "value",
                "type": "dec",
                "scale": 4,
                "precision": 18
            },
            {
                "name": "booking",
                "type": "id"
            }
        ],
        "keys": [] as any,
        "global": false,
        "idType": 4
    },
    "ixopidate": {
        "name": "IxOpiDate",
        "type": "ix",
        "private": true,
        "sys": true,
        "fields": [
            {
                "name": "value",
                "type": "dec",
                "scale": 4,
                "precision": 18
            },
            {
                "name": "rows",
                "type": "int"
            },
            {
                "name": "p0",
                "type": "id"
            },
            {
                "name": "p1",
                "type": "id"
            },
            {
                "name": "ix",
                "type": "id",
                "tuid": "$nu"
            },
            {
                "name": "xi",
                "type": "date"
            }
        ],
        "ixxx": false,
        "ixx": false,
        "xiType": 0
    },
    "note": {
        "name": "Note",
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
                "name": "staff",
                "type": "id"
            },
            {
                "name": "client",
                "type": "id"
            },
            {
                "name": "note",
                "type": "text"
            },
            {
                "name": "sensitive",
                "type": "tinyint"
            }
        ],
        "keys": [] as any,
        "global": false,
        "idType": 4
    },
    "ixstaffclient": {
        "name": "IxStaffClient",
        "type": "ix",
        "private": false,
        "sys": true,
        "fields": [
            {
                "name": "tick",
                "type": "int"
            },
            {
                "name": "ix",
                "type": "id",
                "tuid": "$uu"
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
    "savenote": {
        "name": "SaveNote",
        "type": "action",
        "private": false,
        "sys": true,
        "fields": [
            {
                "name": "id",
                "type": "id",
                "null": false
            },
            {
                "name": "staff",
                "type": "id"
            },
            {
                "name": "client",
                "type": "id"
            },
            {
                "name": "note",
                "type": "text"
            },
            {
                "name": "sensitive",
                "type": "tinyint"
            }
        ],
        "returns": [
            {
                "name": "ret",
                "fields": [
                    {
                        "name": "id",
                        "type": "id"
                    }
                ]
            }
        ]
    },
    "myclients": {
        "name": "MyClients",
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
                        "size": 100
                    },
                    {
                        "name": "vice",
                        "type": "char",
                        "size": 50
                    },
                    {
                        "name": "firstName",
                        "type": "char",
                        "size": 50
                    },
                    {
                        "name": "lastName",
                        "type": "char",
                        "size": 50
                    },
                    {
                        "name": "middleName",
                        "type": "char",
                        "size": 50
                    },
                    {
                        "name": "gender",
                        "type": "enum"
                    },
                    {
                        "name": "year",
                        "type": "smallint"
                    },
                    {
                        "name": "month",
                        "type": "tinyint"
                    },
                    {
                        "name": "day",
                        "type": "tinyint"
                    },
                    {
                        "name": "email",
                        "type": "char",
                        "size": 100
                    },
                    {
                        "name": "mobile",
                        "type": "char",
                        "size": 30
                    },
                    {
                        "name": "mobileCountry",
                        "type": "char",
                        "size": 10
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
                "size": 100
            },
            {
                "name": "vice",
                "type": "char",
                "size": 50
            },
            {
                "name": "firstName",
                "type": "char",
                "size": 50
            },
            {
                "name": "lastName",
                "type": "char",
                "size": 50
            },
            {
                "name": "middleName",
                "type": "char",
                "size": 50
            },
            {
                "name": "gender",
                "type": "enum"
            },
            {
                "name": "year",
                "type": "smallint"
            },
            {
                "name": "month",
                "type": "tinyint"
            },
            {
                "name": "day",
                "type": "tinyint"
            },
            {
                "name": "email",
                "type": "char",
                "size": 100
            },
            {
                "name": "mobile",
                "type": "char",
                "size": 30
            },
            {
                "name": "mobileCountry",
                "type": "char",
                "size": 10
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
            "no",
            "vice"
        ],
        "global": false,
        "idType": 2
    },
    "ixpersonlog": {
        "name": "IxPersonLog",
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
                "type": "id",
                "tuid": "$uid"
            }
        ],
        "ixxx": false,
        "ixx": false,
        "xiType": 0
    },
    "clientsurvey": {
        "name": "ClientSurvey",
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
                "name": "client",
                "type": "id"
            }
        ],
        "keys": [] as any,
        "global": false,
        "idType": 4
    },
    "getpersonlist": {
        "name": "GetPersonList",
        "type": "query",
        "private": false,
        "sys": true,
        "fields": [
            {
                "name": "role",
                "type": "enum"
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
                        "size": 100
                    },
                    {
                        "name": "vice",
                        "type": "char",
                        "size": 50
                    },
                    {
                        "name": "firstName",
                        "type": "char",
                        "size": 50
                    },
                    {
                        "name": "lastName",
                        "type": "char",
                        "size": 50
                    },
                    {
                        "name": "middleName",
                        "type": "char",
                        "size": 50
                    },
                    {
                        "name": "gender",
                        "type": "enum"
                    },
                    {
                        "name": "year",
                        "type": "smallint"
                    },
                    {
                        "name": "month",
                        "type": "tinyint"
                    },
                    {
                        "name": "day",
                        "type": "tinyint"
                    },
                    {
                        "name": "email",
                        "type": "char",
                        "size": 100
                    },
                    {
                        "name": "mobile",
                        "type": "char",
                        "size": 30
                    },
                    {
                        "name": "mobileCountry",
                        "type": "char",
                        "size": 10
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
                        "size": 100
                    },
                    {
                        "name": "vice",
                        "type": "char",
                        "size": 50
                    },
                    {
                        "name": "firstName",
                        "type": "char",
                        "size": 50
                    },
                    {
                        "name": "lastName",
                        "type": "char",
                        "size": 50
                    },
                    {
                        "name": "middleName",
                        "type": "char",
                        "size": 50
                    },
                    {
                        "name": "gender",
                        "type": "enum"
                    },
                    {
                        "name": "year",
                        "type": "smallint"
                    },
                    {
                        "name": "month",
                        "type": "tinyint"
                    },
                    {
                        "name": "day",
                        "type": "tinyint"
                    },
                    {
                        "name": "email",
                        "type": "char",
                        "size": 100
                    },
                    {
                        "name": "mobile",
                        "type": "char",
                        "size": 30
                    },
                    {
                        "name": "mobileCountry",
                        "type": "char",
                        "size": 10
                    }
                ]
            }
        ]
    },
    "getpersonlog": {
        "name": "GetPersonLog",
        "type": "query",
        "private": false,
        "sys": true,
        "fields": [
            {
                "name": "person",
                "type": "id"
            }
        ],
        "returns": [
            {
                "name": "ret",
                "fields": [
                    {
                        "name": "log",
                        "type": "id"
                    },
                    {
                        "name": "type",
                        "type": "char",
                        "size": 50
                    },
                    {
                        "name": "value",
                        "type": "text"
                    }
                ]
            }
        ]
    },
    "taggroup": {
        "name": "TagGroup",
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
        "create": true,
        "update": true,
        "global": false,
        "idType": 12
    },
    "tag": {
        "name": "Tag",
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
                "name": "vice",
                "type": "char",
                "size": 100
            },
            {
                "name": "single",
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
            "name",
            "vice"
        ],
        "create": true,
        "update": true,
        "global": false,
        "idType": 3
    },
    "tagitem": {
        "name": "TagItem",
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
        "create": true,
        "update": true,
        "global": false,
        "idType": 3
    },
    "ixtag": {
        "name": "IxTag",
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
    "ixlocalidtag": {
        "name": "IxLocalIdTag",
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
    "ixglobalidtag": {
        "name": "IxGlobalIdTag",
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
    "role": {
        "name": "Role",
        "type": "enum",
        "private": false,
        "sys": true,
        "values": {
            "staff": 10,
            "counselor": 11,
            "volunteer": 12,
            "board": 13,
            "client": 20,
            "donator": 30
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
    },
    "b": {
        "name": "B",
        "type": "bus",
        "private": true,
        "sys": true,
        "version": 6,
        "busOwner": "$$$",
        "busName": "test",
        "schema": {
            "query1": {
                "param": [
                    {
                        "name": "p1",
                        "type": "string"
                    },
                    {
                        "name": "p2",
                        "type": "number"
                    },
                    {
                        "name": "p3",
                        "type": "id"
                    },
                    {
                        "name": "p4",
                        "type": "array",
                        "fields": [
                            {
                                "name": "a1",
                                "type": "string"
                            },
                            {
                                "name": "a2",
                                "type": "number"
                            },
                            {
                                "name": "a3",
                                "type": "number"
                            },
                            {
                                "name": "a4",
                                "type": "id"
                            }
                        ]
                    }
                ],
                "returns": {
                    "fields": [
                        {
                            "name": "c1",
                            "type": "string"
                        },
                        {
                            "name": "c3",
                            "type": "string"
                        },
                        {
                            "name": "bbba37",
                            "type": "string"
                        }
                    ],
                    "arrs": [
                        {
                            "name": "arrname",
                            "type": "array",
                            "fields": [
                                {
                                    "name": "a1",
                                    "type": "string"
                                },
                                {
                                    "name": "a2",
                                    "type": "number"
                                },
                                {
                                    "name": "a3",
                                    "type": "number"
                                },
                                {
                                    "name": "a4",
                                    "type": "id"
                                }
                            ]
                        },
                        {
                            "name": "arrname2",
                            "type": "array",
                            "fields": [
                                {
                                    "name": "b3",
                                    "type": "string"
                                },
                                {
                                    "name": "cb2",
                                    "type": "number"
                                },
                                {
                                    "name": "aa3",
                                    "type": "number"
                                }
                            ]
                        }
                    ]
                },
                "query": false
            },
            "schema1": {
                "fields": [
                    {
                        "name": "a1",
                        "type": "string"
                    },
                    {
                        "name": "a2",
                        "type": "number"
                    },
                    {
                        "name": "a3",
                        "type": "number"
                    },
                    {
                        "name": "a4",
                        "type": "id"
                    }
                ],
                "accept": {}
            },
            "schema2": {
                "fields": [
                    {
                        "name": "b3",
                        "type": "string"
                    },
                    {
                        "name": "cb2",
                        "type": "number"
                    },
                    {
                        "name": "aa3",
                        "type": "number"
                    }
                ]
            },
            "schema3": {
                "fields": [
                    {
                        "name": "a3",
                        "type": "string"
                    },
                    {
                        "name": "cb2",
                        "type": "number"
                    },
                    {
                        "name": "aa3",
                        "type": "id"
                    }
                ]
            },
            "complex1": {
                "fields": [
                    {
                        "name": "c1",
                        "type": "string"
                    },
                    {
                        "name": "c3",
                        "type": "string"
                    },
                    {
                        "name": "bbba37",
                        "type": "string"
                    }
                ],
                "arrs": [
                    {
                        "name": "arrname",
                        "type": "array",
                        "fields": [
                            {
                                "name": "a1",
                                "type": "string"
                            },
                            {
                                "name": "a2",
                                "type": "number"
                            },
                            {
                                "name": "a3",
                                "type": "number"
                            },
                            {
                                "name": "a4",
                                "type": "id"
                            }
                        ]
                    },
                    {
                        "name": "arrname2",
                        "type": "array",
                        "fields": [
                            {
                                "name": "b3",
                                "type": "string"
                            },
                            {
                                "name": "cb2",
                                "type": "number"
                            },
                            {
                                "name": "aa3",
                                "type": "number"
                            }
                        ]
                    }
                ]
            }
        }
    },
    "workshop": {
        "name": "Workshop",
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
                "size": 100
            },
            {
                "name": "vice",
                "type": "text"
            },
            {
                "name": "staff",
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
            "name",
            "no",
            "vice"
        ],
        "create": true,
        "global": false,
        "idType": 2
    },
    "session": {
        "name": "Session",
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
                "name": "workshop",
                "type": "id"
            },
            {
                "name": "date",
                "type": "date"
            },
            {
                "name": "vice",
                "type": "char",
                "size": 200
            },
            {
                "name": "time",
                "type": "time"
            },
            {
                "name": "span",
                "type": "smallint"
            }
        ],
        "keys": [] as any,
        "nameNoVice": [
            "vice"
        ],
        "global": false,
        "idType": 2
    },
    "sessionperson": {
        "name": "SessionPerson",
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
                "name": "session",
                "type": "id"
            },
            {
                "name": "person",
                "type": "id"
            },
            {
                "name": "workshop",
                "type": "id"
            },
            {
                "name": "deleted",
                "type": "tinyint"
            }
        ],
        "keys": [
            {
                "name": "session",
                "type": "id"
            },
            {
                "name": "person",
                "type": "id"
            }
        ],
        "global": false,
        "idType": 4
    },
    "ixworkshopsession": {
        "name": "IxWorkshopSession",
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
                "type": "id",
                "tuid": "$uu"
            }
        ],
        "ixxx": false,
        "ixx": false,
        "xiType": 2
    },
    "ixsessionstaff": {
        "name": "IxSessionStaff",
        "type": "ix",
        "private": false,
        "sys": true,
        "fields": [
            {
                "name": "own",
                "type": "tinyint"
            },
            {
                "name": "substitue",
                "type": "tinyint"
            },
            {
                "name": "done",
                "type": "tinyint"
            },
            {
                "name": "ix",
                "type": "id",
                "tuid": "$uu"
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
    "ixsessionclient": {
        "name": "IxSessionClient",
        "type": "ix",
        "private": false,
        "sys": true,
        "fields": [
            {
                "name": "deleted",
                "type": "tinyint"
            },
            {
                "name": "ix",
                "type": "id",
                "tuid": "$uu"
            },
            {
                "name": "xi",
                "type": "id",
                "tuid": "$uu"
            }
        ],
        "ixxx": false,
        "ixx": false,
        "create": true,
        "update": true,
        "xiType": 2
    },
    "setsessionstaff": {
        "name": "SetSessionStaff",
        "type": "action",
        "private": false,
        "sys": true,
        "fields": [
            {
                "name": "session",
                "type": "id"
            },
            {
                "name": "staff",
                "type": "id"
            },
            {
                "name": "own",
                "type": "tinyint"
            },
            {
                "name": "substitue",
                "type": "tinyint"
            },
            {
                "name": "done",
                "type": "tinyint"
            }
        ],
        "returns": [] as any
    },
    "saveworkshopstaff": {
        "name": "SaveWorkshopStaff",
        "type": "action",
        "private": false,
        "sys": true,
        "fields": [
            {
                "name": "id",
                "type": "id"
            },
            {
                "name": "staff",
                "type": "id"
            }
        ],
        "returns": [] as any
    },
    "savesessionattendee": {
        "name": "SaveSessionAttendee",
        "type": "action",
        "private": false,
        "sys": true,
        "fields": [
            {
                "name": "session",
                "type": "id"
            },
            {
                "name": "client",
                "type": "id"
            },
            {
                "name": "deleted",
                "type": "tinyint"
            }
        ],
        "returns": [] as any
    },
    "mysessions": {
        "name": "MySessions",
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
                        "name": "workshop",
                        "type": "id"
                    },
                    {
                        "name": "date",
                        "type": "date"
                    },
                    {
                        "name": "vice",
                        "type": "char",
                        "size": 200
                    },
                    {
                        "name": "time",
                        "type": "time"
                    },
                    {
                        "name": "span",
                        "type": "smallint"
                    },
                    {
                        "name": "own",
                        "type": "tinyint"
                    },
                    {
                        "name": "substitue",
                        "type": "tinyint"
                    },
                    {
                        "name": "done",
                        "type": "tinyint"
                    }
                ]
            }
        ]
    }
}
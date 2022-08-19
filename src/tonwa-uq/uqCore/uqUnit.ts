import { Query } from "./query";
import { UqMan } from "./uqMan";

export interface UserUnit<T = any> {
    id: number;
    user: number;
    unitId: number;
    unit: T;
    isOwner: boolean;
    isAdmin: boolean;
    assigned: string;
    name: string;
    nick: string;
    icon: string;
    roles: string[];
    entity: string;
}

export interface UnitRoles {
    meOwner: boolean;
    owners: UserUnit[];
    meAdmin: boolean;
    admins: UserUnit[];
    users: UserUnit[];
    usersOfRole: { [role: string]: UserUnit[] };
}

export class UqUnit {
    private myUnitsColl: { [unit: number]: UserUnit };
    private uqMan: UqMan;
    readonly myUnits: UserUnit[];
    userUnit: UserUnit;       // current unit;

    constructor(uqMan: UqMan) {
        this.uqMan = uqMan;
        this.myUnits = [];
    }

    setCurrentUnit(userUnit: UserUnit) {
        this.userUnit = userUnit;
    }

    async Poked(): Promise<boolean> {
        //let query: Query = this.entities['$poked'] as any;
        let query: Query = this.uqMan.entities['$poked'] as any;
        let ret = await query.query({});
        let arr: { poke: number; }[] = ret.ret;
        if (arr.length === 0) return false;
        let row = arr[0];
        return row["poke"] === 1;
    }

    async loadMyRoles(): Promise<UserUnit[]> {
        if (this.myUnitsColl !== undefined) return this.myUnits;
        this.myUnitsColl = {};
        let query: Query = this.uqMan.entities['$role_my'] as any;
        let { admins, roles, unitProps } = await query.query({});
        const getMyUnit = (unit: number) => {
            let myUnit = this.myUnitsColl[unit];
            if (myUnit === undefined) {
                myUnit = {
                    unit,
                } as UserUnit;
                this.myUnitsColl[unit] = myUnit;
                this.myUnits.push(myUnit);
            }
            return myUnit;
        }
        for (let adminRow of admins) {
            let { id, unit, admin, entity, assigned } = adminRow;
            let myUnit = getMyUnit(unit);
            myUnit.id = id;
            myUnit.unitId = unit;
            myUnit.isAdmin = ((admin & 1) === 1);
            myUnit.isOwner = ((admin & 2) === 2);
            myUnit.entity = entity;
            myUnit.assigned = assigned;
        }
        for (let roleRow of roles) {
            let { unit, role } = roleRow;
            let myUnit = getMyUnit(unit);
            let roles = myUnit.roles;
            if (roles === undefined) {
                myUnit.roles = roles = [];
            }
            roles.push(role);
        }
        for (let propsRow of unitProps) {
            let { unit, props } = propsRow;
            let myUnit = getMyUnit(unit);
            let ID = this.uqMan.getID(myUnit.entity);
            myUnit.unit = ID.valueFromString(props);
        }
    }

    async loadUnitUsers(me: number, unit: number): Promise<UnitRoles> {
        let meOwner: boolean;
        let meAdmin: boolean;
        let owners: UserUnit[] = [];
        let admins: UserUnit[] = [];
        let coll: { [user: number]: UserUnit } = {};
        let query: Query = this.uqMan.entities['$role_unit_users'] as any;
        let { users, roles: roleRows } = await query.query({ unit });
        for (let userRow of users) {
            let { user, admin } = userRow;
            coll[user] = userRow;
            let isAdmin = userRow.isAdmin = ((admin & 1) === 1);
            let isOwner = userRow.isOwner = ((admin & 2) === 2);
            if (isAdmin === true) {
                if (user === me) {
                    meAdmin = true;
                }
                else {
                    admins.push(userRow);
                }
            }
            if (isOwner === true) {
                if (user === me) {
                    meOwner = true;
                }
                else {
                    owners.push(userRow);
                }
            }
        }

        let rolesColl: { [role: string]: UserUnit[] } = {};
        let usersOfRole: { [role: string]: UserUnit[]; };
        for (let roleRow of roleRows) {
            let { user, role } = roleRow;
            let userUnit = coll[user];
            if (userUnit !== undefined) {
                let { roles: roleArr } = userUnit;
                if (rolesColl === undefined) {
                    userUnit.roles = roleArr = [];
                }
                roleArr.push(role);
            }
            let roleUsers = rolesColl[role];
            if (roleUsers === undefined) {
                rolesColl[role] = roleUsers = [];
                usersOfRole[role] = roleUsers;
            }
            roleUsers.push(userUnit);
        }
        return { meOwner, owners, meAdmin, admins, users, usersOfRole };
    }
}

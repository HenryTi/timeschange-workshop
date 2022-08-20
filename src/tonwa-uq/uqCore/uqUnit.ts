import { Action } from "./action";
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
    // meOwner: boolean;
    // meAdmin: boolean;
    owners: UserUnit[];
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

    reset() {
        this.userUnit = undefined;
        this.myUnitsColl = undefined;
        this.myUnits.splice(0);
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

    async loadUnitUsers(/*me: number*/): Promise<UnitRoles> {
        let unit = this.userUnit.unit
        //let meOwner: boolean;
        //let meAdmin: boolean;
        let owners: UserUnit[] = [];
        let admins: UserUnit[] = [];
        let coll: { [user: number]: UserUnit } = {};
        let query: Query = this.uqMan.entities['$role_unit_users'] as any;
        let { users: userRows, roles: roleRows } = await query.query({ unit });
        let users: UserUnit[] = [];
        for (let userRow of userRows) {
            let { user, admin } = userRow;
            coll[user] = userRow;
            let isAdmin = userRow.isAdmin = ((admin & 1) === 1);
            let isOwner = userRow.isOwner = ((admin & 2) === 2);
            /*
            if (user === me) {
                if (isOwner === true) meOwner = true;
                else if (isAdmin === true) meAdmin = true;
            }
            else {
            */
            if (isOwner === true) owners.push(userRow);
            else if (isAdmin === true) admins.push(userRow);
            else users.push(userRow);
            //}
        }

        let rolesColl: { [role: string]: UserUnit[] } = {};
        let usersOfRole: { [role: string]: UserUnit[]; } = {};
        for (let roleRow of roleRows) {
            let { user, role } = roleRow;
            let userUnit = coll[user];
            if (userUnit !== undefined) {
                let { roles: roleArr } = userUnit;
                if (roleArr === undefined) {
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
        return { /*meOwner, meAdmin, */owners, admins, users, usersOfRole };
    }

    async addAdmin(user: number, admin: 1 | 3, assigned: string) {
        let act: Action = this.uqMan.entities['$role_unit_add_admin'] as any;
        await act.submit({
            unit: this.userUnit.unitId,
            user,
            admin,
            assigned,
        });
        return await this.uqMan.syncUser(user);
    }

    async addUser(user: number, assigned: string) {
        let act: Action = this.uqMan.entities['$role_unit_add_user'] as any;
        await act.submit({
            unit: this.userUnit.unitId,
            user,
            assigned,
        });
        return await this.uqMan.syncUser(user);
    }

    async setUserRole(user: number, action: 'add' | 'del' | 'clear', role: string) {
        let act: Action = this.uqMan.entities['$role_unit_user_role'] as any;
        await act.submit({
            unit: this.userUnit.unitId,
            user,
            action,
            role
        });
    }
}
